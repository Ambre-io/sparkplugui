/*
 * SparkpluGUI - Software that displays decoded Sparkplug messages from MQTT IoT
 *    @author guiklimek
 *    @site https://ambre.io/
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU GENERAL PUBLIC LICENSE which is available at
 *    https://github.com/Ambre-io/sparkplugui
 */

package core

import (
	"context"
	"encoding/json"
	"sparkplugui/backend/sparkplug"
	"sync/atomic"
	"time"

	MQTT "github.com/eclipse/paho.mqtt.golang"
)

// App struct
type App struct {
	context       context.Context
	MQTTCLIENT    MQTT.Client
	QUEUE         chan MQTTMessage
	DROPCOUNT     int64
	RAWMESSAGES   chan MQTT.Message
	stop          context.CancelFunc
	lastTopic     string
	aliasRegistry map[string]map[uint64]string
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// Startup is called when the app starts. The context is saved, so we can call the runtime methods
func (a *App) Startup(context context.Context) {
	a.context = context
	a.MQTTCLIENT = MQTT.NewClient(MQTT.NewClientOptions())
	a.init()
}

// ******************************************
// * PUBLIC METHODS
// ******************************************

func (a *App) GetDroppedCount() int64 {
	return atomic.LoadInt64(&a.DROPCOUNT)
}

// ******************************************
// * PRIVATE METHODS
// ******************************************

func (a *App) init() {
	a.QUEUE = make(chan MQTTMessage, 2000)
	a.RAWMESSAGES = make(chan MQTT.Message, 1000)
	a.DROPCOUNT = 0
	a.lastTopic = ""
	a.aliasRegistry = make(map[string]map[uint64]string)
}

func (a *App) newPayload(payload []byte) (string, int64) {
	return string(payload), time.Now().Unix()
}

func (a *App) decode(topic string, payload []byte) (string, int64) {

	p := sparkplug.Payload{}

	// not Sparkplug
	if !p.IsSparkplugTopic(topic) {
		return a.newPayload(payload)
	}

	group, msgType, nodeID, deviceID := sparkplug.ParseSparkplugTopic(topic)

	// Build the registry key scoped to the edge node (NBIRTH/NDATA) or device (DBIRTH/DDATA).
	var registryKey string
	if group != "" {
		registryKey = group + "/" + nodeID
		if deviceID != "" {
			registryKey += "/" + deviceID
		}
	}

	payload = sparkplug.TryDecompress(payload)

	// For data messages, pass the cached alias map so alias-only metrics resolve to names.
	var aliasLookup map[uint64]string
	if (msgType == "NDATA" || msgType == "DDATA") && registryKey != "" {
		aliasLookup = a.aliasRegistry[registryKey]
	}

	if err := p.DecodePayload(payload, aliasLookup); err != nil || !p.LooksValid() {
		return a.newPayload(payload)
	}

	// Populate the alias registry from birth messages so subsequent data messages resolve cleanly.
	if (msgType == "NBIRTH" || msgType == "DBIRTH") && registryKey != "" {
		if aliases := p.ExtractAliases(); len(aliases) > 0 {
			a.aliasRegistry[registryKey] = aliases
		}
	}

	pjson, _ := json.Marshal(p.Metrics)
	ts := p.Timestamp.Unix()
	if p.Timestamp.IsZero() {
		ts = time.Now().Unix()
	}
	return string(pjson), ts
}

func (a *App) pushMessage(topic string, payload string, timestamp int64) {
	message := MQTTMessage{Topic: topic, Payload: payload, Timestamp: timestamp}
	// Try non-blocking send first.
	select {
	case a.QUEUE <- message:
		// ok
		return
	default:
		// queue full: apply "drop oldest, keep latest"
	}

	// Remove one oldest item to make room (non-blocking).
	select {
	case <-a.QUEUE:
		// freed one slot
	default:
		// nothing freed (race), will try to send anyway
	}

	// Try to enqueue the new (fresh) message.
	select {
	case a.QUEUE <- message:
		// ok after dropping one old item
		atomic.AddInt64(&a.DROPCOUNT, 1)
		return
	default:
		// still full: drop the new message (very rare if above succeeded)
		atomic.AddInt64(&a.DROPCOUNT, 1)
		return
	}
}

func (a *App) popMessage() *MQTTMessage {
	select {
	case p := <-a.QUEUE:
		return &p
	default:
		return nil
	}
}

func (a *App) startWorker() {
	ctx, cancel := context.WithCancel(context.Background())
	a.stop = cancel

	go func() {
		ticker := time.NewTicker(100 * time.Millisecond) // batch UI
		defer ticker.Stop()

		type item struct {
			topic   string
			decoded string
			ts      int64
		}
		batch := make([]item, 0, 200)

		for {
			select {
			case <-ctx.Done():
				if len(batch) > 0 {
					for _, it := range batch {
						a.pushMessage(it.topic, it.decoded, it.ts)
					}
					batch = batch[:0]
				}
				return
			case m := <-a.RAWMESSAGES:
				decoded, ts := a.decode(m.Topic(), m.Payload())
				batch = append(batch, item{m.Topic(), decoded, ts})
			case <-ticker.C:
				if len(batch) > 0 {
					// push par lots pour soulager l’UI
					for _, it := range batch {
						a.pushMessage(it.topic, it.decoded, it.ts)
					}
					batch = batch[:0]
				}
			}
		}
	}()
}

func (a *App) stopWorker() {
	if a.stop != nil {
		a.stop()
		a.stop = nil
	}
}
