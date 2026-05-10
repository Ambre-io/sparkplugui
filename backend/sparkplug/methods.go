/*
 * SparkpluGUI - Software that displays decoded Sparkplug messages from MQTT IoT
 *    @author guiklimek
 *    @site https://ambre.io/
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU GENERAL PUBLIC LICENSE which is available at
 *    https://github.com/Ambre-io/sparkplugui
 */

package sparkplug

import (
	"fmt"
	"sparkplugui/backend/sparkplug/sproto"
	"strings"
	"time"

	"google.golang.org/protobuf/proto"
)

// see the JavaScipt version to be inspired:
// https://github.com/eclipse/tahu/blob/master/javascript/core/sparkplug-payload/lib/sparkplugbpayload.ts

type Metric struct {
	Name     string
	DataType string
	Value    any
}

type Payload struct {
	Timestamp time.Time
	Seq       uint64
	Metrics   []Metric
}

// TODO rewrite it with Metric.DataType as string
//func (p *Payload) EncodePayload(isDeathPayload bool) ([]byte, error) {
//	now := time.Now().UnixMilli()
//	ms := []*sproto.Payload_Metric{}
//
//	for i, m := range p.Metrics {
//		sm := sproto.Payload_Metric{}
//		sm.Name = &p.Metrics[i].Name
//		dt := m.DataType.toUint32()
//		sm.Datatype = &dt
//		/**********************************
//		TypeInt DataType = 10
//		TypeFloat DataType = 12
//		TypeBool DataType = 14
//		TypeString DataType = 15
//		**********************************/
//		switch m.DataType {
//		case TypeInt:
//			iv, err := strconv.ParseUint(m.Value, 10, 64)
//			if err != nil {
//				return nil, err
//			}
//			sm.Value = &sproto.Payload_Metric_IntValue{IntValue: uint32(iv)}
//		case TypeFloat:
//			fv, err := strconv.ParseFloat(m.Value, 32)
//			if err != nil {
//				return nil, err
//			}
//			sm.Value = &sproto.Payload_Metric_FloatValue{FloatValue: float32(fv)}
//		case TypeBool:
//			bv, err := strconv.ParseBool(m.Value)
//			if err != nil {
//				return nil, err
//			}
//			sm.Value = &sproto.Payload_Metric_BooleanValue{BooleanValue: bv}
//		case TypeString:
//			sm.Value = &sproto.Payload_Metric_StringValue{StringValue: m.Value}
//		}
//		//fmt.Println(*sm.Name, "=", sm.Value)
//		ms = append(ms, &sm)
//	}
//	//fmt.Println("---------")
//
//	sp := sproto.Payload{}
//
//	if !isDeathPayload {
//		// Set Payload timestamp
//		tn := uint64(now)
//		sp.Timestamp = &tn
//		// Set Payload sequence
//		sp.Seq = &p.Seq
//	}
//	sp.Metrics = ms
//	return proto.Marshal(&sp)
//}

func (p *Payload) DecodePayload(data []byte) error {
	pl := sproto.Payload{}
	if err := proto.Unmarshal(data, &pl); err != nil {
		return err
	}

	if pl.Timestamp != nil {
		p.Timestamp = time.UnixMilli(int64(*pl.Timestamp))
	}
	p.Seq = pl.GetSeq()

	p.Metrics = make([]Metric, len(pl.Metrics))

	for i, m := range pl.Metrics {
		// Name is optional in NDATA/DDATA — metrics may be alias-only.
		if m.Name != nil {
			p.Metrics[i].Name = *m.Name
		} else if m.Alias != nil {
			p.Metrics[i].Name = fmt.Sprintf("alias:%d", *m.Alias)
		}

		// Datatype is optional; skip value extraction if absent.
		if m.Datatype == nil {
			p.Metrics[i].DataType = "Unknown"
			p.Metrics[i].Value = m.GetValue()
			continue
		}

		dt := sproto.DataType(*m.Datatype)
		if name, ok := sproto.DataType_name[int32(*m.Datatype)]; ok {
			p.Metrics[i].DataType = name
		} else {
			p.Metrics[i].DataType = fmt.Sprintf("Unknown(%d)", *m.Datatype)
		}

		switch dt {
		case sproto.DataType_Int8:
			p.Metrics[i].Value = int8(m.GetIntValue())
		case sproto.DataType_Int16:
			p.Metrics[i].Value = int16(m.GetIntValue())
		case sproto.DataType_Int32:
			p.Metrics[i].Value = int32(m.GetIntValue())
		case sproto.DataType_UInt8, sproto.DataType_UInt16, sproto.DataType_UInt32:
			p.Metrics[i].Value = m.GetIntValue()
		case sproto.DataType_Int64:
			p.Metrics[i].Value = int64(m.GetLongValue())
		case sproto.DataType_UInt64:
			p.Metrics[i].Value = m.GetLongValue()
		case sproto.DataType_Float:
			p.Metrics[i].Value = m.GetFloatValue()
		case sproto.DataType_Double:
			p.Metrics[i].Value = m.GetDoubleValue()
		case sproto.DataType_Boolean:
			p.Metrics[i].Value = m.GetBooleanValue()
		case sproto.DataType_String, sproto.DataType_Text:
			p.Metrics[i].Value = m.GetStringValue()
		case sproto.DataType_Bytes:
			p.Metrics[i].Value = m.GetBytesValue()
		case sproto.DataType_DataSet:
			p.Metrics[i].Value = m.GetDatasetValue()
		case sproto.DataType_Template:
			p.Metrics[i].Value = m.GetTemplateValue()
		default:
			p.Metrics[i].Value = m.GetValue()
		}
	}

	return nil
}

// LooksValid returns true if the decoded payload has a plausible Sparkplug shape.
// proto.Unmarshal is permissive and can "succeed" on arbitrary bytes — a payload
// that has neither a timestamp nor any metrics is almost certainly not Sparkplug.
func (p *Payload) LooksValid() bool {
	return !p.Timestamp.IsZero() || len(p.Metrics) > 0
}

// isSparkplugTopic returns true for topics that follow the spBv1.0 / spAv1.0 namespace.
func (p *Payload) IsSparkplugTopic(topic string) bool {
	return strings.HasPrefix(topic, "spBv1.0/") || strings.HasPrefix(topic, "spAv1.0/")
}
