/*
 * SparkpluGUI - Software that displays decoded Sparkplug messages from MQTT IoT
 *    @author guiklimek
 *    @site https://ambre.io/
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU GENERAL PUBLIC LICENSE which is available at
 *    https://github.com/Ambre-io/sparkplugui
 */
import {connectAsync, MqttClient} from 'mqtt';
import {encodePayload, UPayload} from 'sparkplug-payload/lib/sparkplugbpayload';

import SETTINGS from '../../settings.json';

// ── Config ────────────────────────────────────────────────────────────────────
const SPB_NODES        = parseInt(process.argv[2] ?? '8');
const SPB_DEVICES      = parseInt(process.argv[3] ?? '6');
const GROUP_ID         = process.argv[4] ?? 'LOAD_TEST';
const TOPIC_BASE       = 'spBv1.0';

// ── Stats ─────────────────────────────────────────────────────────────────────
let totalPublished = 0;
let lastSnapshot   = 0;
let topicCount     = 0;

setInterval(() => {
    const rate = totalPublished - lastSnapshot;
    lastSnapshot = totalPublished;
    process.stdout.write(
        `\r[${new Date().toISOString()}]  topics=${topicCount}  total=${totalPublished}  rate=${rate} msg/s   `
    );
}, 1000);

process.on('SIGINT', () => {
    console.log(`\n\nStopped. Total published: ${totalPublished}`);
    process.exit(0);
});

// ── Primitive helpers ─────────────────────────────────────────────────────────
const ri  = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;
const rf  = (min = 0, max = 1000): number => parseFloat((Math.random() * (max - min) + min).toFixed(3));
const rb  = (): boolean => Math.random() > 0.5;
const rs  = (arr: string[]): string => arr[ri(0, arr.length - 1)];
const buf = (s: string): Buffer => Buffer.from(s);
const jbuf = (obj: unknown): Buffer => buf(JSON.stringify(obj));

const rFile = (minKb = 1, maxKb = 64): Buffer => {
    const size = ri(minKb * 1024, maxKb * 1024);
    const b = Buffer.alloc(size);
    for (let i = 0; i <= size - 4; i += 4) b.writeUInt32LE(Math.random() * 0xffffffff >>> 0, i);
    return b;
};

// ── Generic publisher (plain MQTT, any Buffer payload) ────────────────────────
function rawPublisher(client: MqttClient, topic: string, intervalMs: number, generate: () => Buffer): void {
    topicCount++;
    const tick = () => {
        client.publish(topic, generate());
        totalPublished++;
        const jitter = (Math.random() - 0.5) * intervalMs * 0.4;
        setTimeout(tick, Math.max(30, intervalMs + jitter));
    };
    setTimeout(tick, ri(0, intervalMs)); // spread startup
}

// ── Sparkplug B publisher ─────────────────────────────────────────────────────
type SpbMetric = {name: string; type: string; value: unknown};
const rJson = (): string => {
    const keys = ['temp','pressure','humidity','rpm','voltage','current','power','flow','torque','vibration'];
    const out: Record<string, unknown> = {ts: Date.now(), seq: ri(0, 999999), ok: rb()};
    for (let i = 0; i < ri(2, 6); i++) out[keys[ri(0, keys.length - 1)]] = rf();
    return JSON.stringify(out);
};

const SPB_GENERATORS: Array<() => SpbMetric> = [
    () => ({name: 'Temperature', type: 'Float',   value: rf(-40, 150)}),
    () => ({name: 'Pressure',    type: 'Int32',   value: ri(0, 10000)}),
    () => ({name: 'Active',      type: 'Boolean', value: rb()}),
    () => ({name: 'JSONPayload', type: 'String',  value: rJson()}),
    () => ({name: 'Voltage',     type: 'Double',  value: rf(0, 480)}),
    () => ({name: 'Current',     type: 'Float',   value: rf(0, 100)}),
    () => ({name: 'ErrorCode',   type: 'Int32',   value: ri(0, 255)}),
    () => ({name: 'Label',       type: 'String',  value: `unit_${ri(1000, 9999)}`}),
    () => ({name: 'Enabled',     type: 'Boolean', value: rb()}),
    () => ({name: 'RPM',         type: 'Float',   value: rf(0, 3600)}),
    () => ({name: 'FlowRate',    type: 'Double',  value: rf(0, 500)}),
    () => ({name: 'Counter',     type: 'Int32',   value: ri(0, 2147483647)}),
];

let globalSeq = 0;
function spbPayload(metricsCount: number): Buffer {
    const metrics = Array.from({length: metricsCount}, (_, i) => SPB_GENERATORS[i % SPB_GENERATORS.length]());
    const payload: UPayload = {timestamp: Date.now(), seq: globalSeq++ % 256, metrics: metrics as any};
    return Buffer.from(encodePayload(payload));
}

function spbPublisher(client: MqttClient, birthTopic: string, dataTopic: string, intervalMs: number, metricsCount: number): void {
    topicCount++;
    client.publish(birthTopic, spbPayload(metricsCount));
    totalPublished++;
    const tick = () => {
        client.publish(dataTopic, spbPayload(metricsCount));
        totalPublished++;
        const jitter = (Math.random() - 0.5) * intervalMs * 0.4;
        setTimeout(tick, Math.max(20, intervalMs + jitter));
    };
    setTimeout(tick, ri(0, intervalMs));
}

// ═════════════════════════════════════════════════════════════════════════════
// ── Topic families ────────────────────────────────────────────────────────────
// ═════════════════════════════════════════════════════════════════════════════

function spawnHomeAutomation(client: MqttClient): void {
    const rooms    = ['bedroom','living_room','kitchen','bathroom','garage','office','basement','attic','hallway','garden'];
    const WEATHER  = ['clear','cloudy','rainy','windy','foggy','stormy'];
    const MODES    = ['home','away','night','vacation'];

    for (const room of rooms) {
        rawPublisher(client, `home/${room}/temperature`,   ri(3000, 8000),  () => buf(rf(15, 35).toString()));
        rawPublisher(client, `home/${room}/humidity`,      ri(5000, 12000), () => buf(rf(30, 90).toString()));
        rawPublisher(client, `home/${room}/light/state`,   ri(800, 4000),   () => buf(rb() ? 'ON' : 'OFF'));
        rawPublisher(client, `home/${room}/light/brightness`, ri(1000, 5000), () => buf(ri(0, 255).toString()));
        rawPublisher(client, `home/${room}/motion`,        ri(2000, 6000),  () => buf(rb() ? '1' : '0'));
        rawPublisher(client, `home/${room}/door/state`,    ri(3000, 10000), () => buf(rb() ? 'open' : 'closed'));
        rawPublisher(client, `home/${room}/window/state`,  ri(5000, 15000), () => buf(rb() ? 'open' : 'closed'));
        rawPublisher(client, `home/${room}/co2`,           ri(4000, 10000), () => buf(ri(400, 2000).toString()));
    }
    rawPublisher(client, 'home/alarm/state',     ri(5000, 20000), () => buf(rs(['disarmed','armed_home','armed_away','triggered'])));
    rawPublisher(client, 'home/mode',            ri(10000, 30000), () => buf(rs(MODES)));
    rawPublisher(client, 'home/outdoor/weather', ri(8000, 20000), () => buf(rs(WEATHER)));
    rawPublisher(client, 'home/outdoor/temperature', ri(5000, 10000), () => buf(rf(-20, 45).toString()));
    rawPublisher(client, 'home/outdoor/uv_index',    ri(10000, 30000), () => buf(ri(0, 11).toString()));
    rawPublisher(client, 'home/energy/consumption',  ri(2000, 5000), () => buf(rf(0.5, 8.0).toString()));
    rawPublisher(client, 'home/energy/solar_output', ri(3000, 6000), () => buf(rf(0, 5.0).toString()));
}

function spawnZigbee(client: MqttClient): void {
    const deviceCount = 20;
    const types = ['sensor','switch','bulb','plug','lock','button','cover','thermostat'];
    for (let i = 0; i < deviceCount; i++) {
        const addr = `0x${ri(0x1000, 0xffff).toString(16).padStart(4,'0')}`;
        const type = rs(types);
        rawPublisher(client, `zigbee2mqtt/${addr}`, ri(1000, 8000), () => jbuf({
            type,
            battery:     ri(10, 100),
            linkquality: ri(0, 255),
            state:       rb() ? 'ON' : 'OFF',
            temperature: rf(10, 40),
            humidity:    rf(20, 90),
            last_seen:   new Date().toISOString(),
        }));
        rawPublisher(client, `zigbee2mqtt/${addr}/availability`, ri(5000, 20000), () => buf(rb() ? 'online' : 'offline'));
    }
}

function spawnWeather(client: MqttClient): void {
    const stations = [
        {id: 'WS_PARIS',   lat: 48.85, lon: 2.35},
        {id: 'WS_LONDON',  lat: 51.50, lon: -0.12},
        {id: 'WS_BERLIN',  lat: 52.52, lon: 13.40},
        {id: 'WS_TOKYO',   lat: 35.68, lon: 139.69},
        {id: 'WS_NYC',     lat: 40.71, lon: -74.00},
        {id: 'WS_SYDNEY',  lat: -33.86, lon: 151.20},
        {id: 'WS_DUBAI',   lat: 25.20, lon: 55.27},
        {id: 'WS_TORONTO', lat: 43.65, lon: -79.38},
    ];
    const CONDITIONS = ['clear','partly_cloudy','overcast','light_rain','heavy_rain','thunderstorm','snow','fog'];
    for (const s of stations) {
        rawPublisher(client, `weather/${s.id}/temperature`,  ri(10000, 30000), () => buf(rf(-30, 50).toString()));
        rawPublisher(client, `weather/${s.id}/humidity`,     ri(10000, 30000), () => buf(rf(10, 100).toString()));
        rawPublisher(client, `weather/${s.id}/pressure`,     ri(15000, 40000), () => buf(rf(960, 1040).toString()));
        rawPublisher(client, `weather/${s.id}/wind_speed`,   ri(8000, 20000),  () => buf(rf(0, 120).toString()));
        rawPublisher(client, `weather/${s.id}/wind_dir`,     ri(10000, 30000), () => buf(ri(0, 359).toString()));
        rawPublisher(client, `weather/${s.id}/condition`,    ri(15000, 60000), () => buf(rs(CONDITIONS)));
        rawPublisher(client, `weather/${s.id}/full`,         ri(30000, 60000), () => jbuf({
            station:     s.id,
            lat:         s.lat,
            lon:         s.lon,
            ts:          new Date().toISOString(),
            temperature: rf(-30, 50),
            humidity:    rf(10, 100),
            pressure:    rf(960, 1040),
            wind_speed:  rf(0, 120),
            wind_dir:    ri(0, 359),
            condition:   rs(CONDITIONS),
            visibility:  rf(0.1, 50),
        }));
    }
}

function spawnFleet(client: MqttClient): void {
    const vehicles = Array.from({length: 15}, (_, i) => `VH${String(i + 1).padStart(4, '0')}`);
    const STATUSES = ['moving','idle','stopped','refueling','maintenance'];
    for (const v of vehicles) {
        rawPublisher(client, `fleet/${v}/speed`,     ri(200, 1000),  () => buf(rf(0, 130).toString()));
        rawPublisher(client, `fleet/${v}/fuel`,      ri(5000, 15000), () => buf(rf(0, 100).toString()));
        rawPublisher(client, `fleet/${v}/engine`,    ri(500, 2000),   () => buf(rb() ? 'ON' : 'OFF'));
        rawPublisher(client, `fleet/${v}/odometer`,  ri(2000, 8000),  () => buf(ri(0, 999999).toString()));
        rawPublisher(client, `fleet/${v}/location`,  ri(1000, 3000),  () => jbuf({
            lat:   parseFloat((48.8 + (Math.random() - 0.5) * 10).toFixed(6)),
            lon:   parseFloat((2.35 + (Math.random() - 0.5) * 10).toFixed(6)),
            alt:   rf(0, 2000),
            speed: rf(0, 130),
            hdg:   ri(0, 359),
            ts:    Date.now(),
        }));
        rawPublisher(client, `fleet/${v}/status`,    ri(3000, 10000), () => buf(rs(STATUSES)));
        rawPublisher(client, `fleet/${v}/can/rpm`,   ri(100, 500),    () => buf(ri(0, 7000).toString()));
        rawPublisher(client, `fleet/${v}/can/load`,  ri(200, 800),    () => buf(ri(0, 100).toString()));
    }
}

function spawnFactory(client: MqttClient): void {
    const lines   = ['lineA','lineB','lineC','lineD','lineE'];
    const MSTATUS = ['running','stopped','fault','maintenance','standby'];
    for (const line of lines) {
        rawPublisher(client, `factory/${line}/conveyor/speed`,  ri(200, 1000), () => buf(rf(0, 5).toString()));
        rawPublisher(client, `factory/${line}/conveyor/state`,  ri(500, 2000), () => buf(rb() ? 'running' : 'stopped'));
        rawPublisher(client, `factory/${line}/throughput`,      ri(1000, 3000), () => buf(ri(0, 1000).toString()));
        rawPublisher(client, `factory/${line}/reject_count`,    ri(2000, 8000), () => buf(ri(0, 50).toString()));
        for (let m = 1; m <= 4; m++) {
            rawPublisher(client, `factory/${line}/machine${m}/status`,      ri(500, 2000),  () => buf(rs(MSTATUS)));
            rawPublisher(client, `factory/${line}/machine${m}/rpm`,         ri(100, 500),   () => buf(rf(0, 3600).toString()));
            rawPublisher(client, `factory/${line}/machine${m}/temperature`, ri(500, 2000),  () => buf(rf(20, 200).toString()));
            rawPublisher(client, `factory/${line}/machine${m}/vibration`,   ri(200, 1000),  () => buf(rf(0, 10).toString()));
            rawPublisher(client, `factory/${line}/machine${m}/power`,       ri(500, 2000),  () => buf(rf(0, 50).toString()));
            rawPublisher(client, `factory/${line}/machine${m}/fault_code`,  ri(5000, 20000), () => buf(ri(0, 255).toString()));
            rawPublisher(client, `factory/${line}/machine${m}/telemetry`,   ri(1000, 3000), () => jbuf({
                line, machine: m, ts: Date.now(),
                rpm:         rf(0, 3600),
                temperature: rf(20, 200),
                vibration:   rf(0, 10),
                power:       rf(0, 50),
                cycle_count: ri(0, 1000000),
                ok:          rb(),
            }));
        }
    }
}

function spawnEnergy(client: MqttClient): void {
    const panels   = Array.from({length: 10}, (_, i) => `PANEL_${String(i + 1).padStart(2, '0')}`);
    const batteries = Array.from({length: 4}, (_, i) => `BAT_${i + 1}`);
    const zones    = ['zone_A','zone_B','zone_C','zone_D','zone_E','office','workshop','server_room'];

    for (const p of panels) {
        rawPublisher(client, `energy/solar/${p}/output`,      ri(1000, 5000),  () => buf(rf(0, 400).toString()));
        rawPublisher(client, `energy/solar/${p}/voltage`,     ri(2000, 6000),  () => buf(rf(0, 48).toString()));
        rawPublisher(client, `energy/solar/${p}/temperature`, ri(5000, 15000), () => buf(rf(20, 80).toString()));
    }
    for (const b of batteries) {
        rawPublisher(client, `energy/battery/${b}/soc`,        ri(5000, 15000), () => buf(rf(0, 100).toString()));
        rawPublisher(client, `energy/battery/${b}/voltage`,    ri(2000, 8000),  () => buf(rf(44, 56).toString()));
        rawPublisher(client, `energy/battery/${b}/current`,    ri(1000, 4000),  () => buf(rf(-100, 100).toString()));
        rawPublisher(client, `energy/battery/${b}/temp`,       ri(5000, 15000), () => buf(rf(15, 45).toString()));
        rawPublisher(client, `energy/battery/${b}/health`,     ri(30000, 60000), () => buf(rf(70, 100).toString()));
    }
    rawPublisher(client, 'energy/grid/voltage',    ri(1000, 3000), () => buf(rf(220, 240).toString()));
    rawPublisher(client, 'energy/grid/frequency',  ri(2000, 5000), () => buf(rf(49.9, 50.1).toString()));
    rawPublisher(client, 'energy/grid/power',      ri(1000, 3000), () => buf(rf(-20000, 20000).toString()));
    rawPublisher(client, 'energy/grid/state',      ri(5000, 20000), () => buf(rs(['connected','island','fault'])));
    for (const z of zones) {
        rawPublisher(client, `energy/consumption/${z}/power`,  ri(2000, 6000), () => buf(rf(0, 5000).toString()));
        rawPublisher(client, `energy/consumption/${z}/energy`, ri(5000, 15000), () => buf(rf(0, 1000).toString()));
    }
}

function spawnBuilding(client: MqttClient): void {
    const floors = [1, 2, 3, 4, 5, 6, 7, 8];
    for (const f of floors) {
        rawPublisher(client, `building/floor${f}/hvac/temperature`, ri(3000, 8000),  () => buf(rf(18, 28).toString()));
        rawPublisher(client, `building/floor${f}/hvac/setpoint`,    ri(10000, 30000), () => buf(rf(19, 26).toString()));
        rawPublisher(client, `building/floor${f}/hvac/mode`,        ri(10000, 30000), () => buf(rs(['cool','heat','fan','auto','off'])));
        rawPublisher(client, `building/floor${f}/hvac/state`,       ri(2000, 6000),  () => buf(rb() ? 'on' : 'off'));
        rawPublisher(client, `building/floor${f}/co2`,              ri(5000, 12000), () => buf(ri(400, 1500).toString()));
        rawPublisher(client, `building/floor${f}/occupancy`,        ri(3000, 10000), () => buf(ri(0, 50).toString()));
        rawPublisher(client, `building/floor${f}/lights`,           ri(2000, 8000),  () => buf(rb() ? 'ON' : 'OFF'));
        for (let spot = 1; spot <= 5; spot++) {
            rawPublisher(client, `building/parking/${f}_${spot}/occupied`, ri(5000, 20000), () => buf(rb() ? '1' : '0'));
        }
    }
    for (let elev = 1; elev <= 3; elev++) {
        rawPublisher(client, `building/elevator/${elev}/floor`,   ri(1000, 5000), () => buf(ri(1, 8).toString()));
        rawPublisher(client, `building/elevator/${elev}/state`,   ri(2000, 6000), () => buf(rs(['idle','moving_up','moving_down','doors_open'])));
        rawPublisher(client, `building/elevator/${elev}/door`,    ri(2000, 6000), () => buf(rb() ? 'open' : 'closed'));
        rawPublisher(client, `building/elevator/${elev}/load`,    ri(1000, 4000), () => buf(ri(0, 1000).toString()));
    }
    rawPublisher(client, 'building/fire_alarm/state',  ri(10000, 60000), () => buf(rs(['ok','alert','test'])));
    rawPublisher(client, 'building/water/flow',        ri(2000, 6000),   () => buf(rf(0, 100).toString()));
    rawPublisher(client, 'building/water/pressure',    ri(3000, 8000),   () => buf(rf(2, 6).toString()));
    rawPublisher(client, 'building/generator/state',   ri(10000, 30000), () => buf(rs(['standby','running','fault'])));
}

function spawnSecurity(client: MqttClient): void {
    const camCount  = 12;
    const doorCount = 8;
    const SEVERITY  = ['info','low','medium','high','critical'];

    for (let c = 1; c <= camCount; c++) {
        rawPublisher(client, `security/camera/CAM${String(c).padStart(2,'0')}/motion`,     ri(500, 3000),   () => buf(rb() ? '1' : '0'));
        rawPublisher(client, `security/camera/CAM${String(c).padStart(2,'0')}/state`,      ri(5000, 20000), () => buf(rb() ? 'online' : 'offline'));
        rawPublisher(client, `security/camera/CAM${String(c).padStart(2,'0')}/people`,     ri(1000, 5000),  () => buf(ri(0, 10).toString()));
    }
    for (let d = 1; d <= doorCount; d++) {
        rawPublisher(client, `security/door/D${d}/locked`,   ri(5000, 20000),  () => buf(rb() ? '1' : '0'));
        rawPublisher(client, `security/door/D${d}/state`,    ri(2000, 8000),   () => buf(rb() ? 'closed' : 'open'));
        rawPublisher(client, `security/door/D${d}/access`,   ri(3000, 10000),  () => jbuf({door: d, user: `USR${ri(100,999)}`, granted: rb(), ts: Date.now()}));
    }
    rawPublisher(client, 'security/alarm/state',        ri(10000, 60000), () => buf(rs(['disarmed','armed','alert','test'])));
    rawPublisher(client, 'security/alarm/zone',         ri(10000, 60000), () => buf(rs(['perimeter','interior','all'])));
    rawPublisher(client, 'security/events/latest',      ri(1000, 4000),   () => jbuf({
        event:    rs(['motion','access','tamper','fault','test']),
        severity: rs(SEVERITY),
        source:   `CAM${ri(1, 12)}`,
        ts:       Date.now(),
        details:  `auto_generated_${ri(0,9999)}`,
    }));
}

function spawnAgriculture(client: MqttClient): void {
    const fields = ['field_north','field_south','field_east','field_west','greenhouse_A','greenhouse_B'];
    for (const f of fields) {
        rawPublisher(client, `farm/${f}/soil_moisture`,    ri(5000, 15000), () => buf(rf(0, 100).toString()));
        rawPublisher(client, `farm/${f}/soil_temperature`, ri(10000, 30000), () => buf(rf(5, 35).toString()));
        rawPublisher(client, `farm/${f}/soil_ph`,          ri(30000, 60000), () => buf(rf(5.5, 8.0).toString()));
        rawPublisher(client, `farm/${f}/irrigation`,       ri(5000, 20000),  () => buf(rb() ? 'active' : 'idle'));
        rawPublisher(client, `farm/${f}/ndvi`,             ri(15000, 60000), () => buf(rf(0, 1).toString()));
        rawPublisher(client, `farm/${f}/light`,            ri(5000, 15000),  () => buf(ri(0, 120000).toString()));
        rawPublisher(client, `farm/${f}/telemetry`,        ri(10000, 30000), () => jbuf({
            field: f, ts: Date.now(),
            soil_moisture:    rf(0, 100),
            soil_temperature: rf(5, 35),
            air_temperature:  rf(-5, 45),
            humidity:         rf(20, 100),
            light:            ri(0, 120000),
            wind:             rf(0, 60),
        }));
    }
    rawPublisher(client, 'farm/weather/temperature', ri(10000, 30000), () => buf(rf(-5, 45).toString()));
    rawPublisher(client, 'farm/weather/rain',        ri(5000, 20000),  () => buf(rf(0, 50).toString()));
    rawPublisher(client, 'farm/tank/level',          ri(5000, 15000),  () => buf(rf(0, 100).toString()));
    rawPublisher(client, 'farm/pump/state',          ri(5000, 15000),  () => buf(rb() ? 'on' : 'off'));
}

function spawnDeviceShadows(client: MqttClient): void {
    const devices = Array.from({length: 12}, (_, i) => `device_${ri(1000, 9999)}_${i}`);
    for (const d of devices) {
        rawPublisher(client, `$aws/things/${d}/shadow/update`,           ri(2000, 8000), () => jbuf({
            state: {
                reported: {
                    online:      rb(),
                    temperature: rf(0, 100),
                    firmware:    `v${ri(1,5)}.${ri(0,9)}.${ri(0,20)}`,
                    uptime:      ri(0, 86400),
                    rssi:        ri(-100, -30),
                },
                desired: {brightness: ri(0, 255), mode: rs(['auto','manual','eco'])},
            },
            timestamp: Date.now(),
        }));
        rawPublisher(client, `$aws/things/${d}/shadow/get/accepted`,     ri(5000, 15000), () => jbuf({version: ri(1, 999), timestamp: Date.now()}));
        rawPublisher(client, `devices/${d}/heartbeat`,                   ri(1000, 5000),  () => jbuf({ts: Date.now(), alive: true, seq: ri(0, 9999)}));
    }
}

function spawnRawSensors(client: MqttClient): void {
    const sensorCount = 25;
    const UNITS = ['°C','%','Pa','V','A','W','rpm','lux','ppm','dB','m/s','bar'];
    for (let i = 0; i < sensorCount; i++) {
        const sid = `SENS_${String(i).padStart(3, '0')}`;
        rawPublisher(client, `sensors/${sid}/value`, ri(100, 2000), () => buf(rf(0, 100).toString()));
        rawPublisher(client, `sensors/${sid}/raw`,   ri(50, 500),   () => {
            const b = Buffer.alloc(4);
            b.writeFloatLE(rf(0, 4096));
            return b;
        });
        rawPublisher(client, `sensors/${sid}/meta`,  ri(30000, 60000), () => jbuf({
            id: sid, unit: rs(UNITS), calibrated: rb(), last_calib: Date.now() - ri(0, 86400000),
        }));
    }
}

function spawnAlerts(client: MqttClient): void {
    const LEVELS  = ['info','warning','error','critical'];
    const SOURCES = ['factory','building','fleet','security','energy','farm','sensors'];
    const CODES   = [0, 100, 200, 404, 500, 503, 1001, 2002, 9999];

    for (const level of LEVELS) {
        rawPublisher(client, `alerts/${level}`, ri(1000, 10000), () => jbuf({
            level,
            code:    rs(CODES.map(String)),
            source:  rs(SOURCES),
            message: `${rs(SOURCES)}_event_${ri(0, 9999)}`,
            ts:      Date.now(),
            ack:     false,
        }));
    }
    rawPublisher(client, 'alerts/stream', ri(500, 3000), () => jbuf({
        id:      ri(0, 999999),
        level:   rs(LEVELS),
        source:  rs(SOURCES),
        payload: rf(0, 500),
        ts:      Date.now(),
    }));
}

function spawnFiles(client: MqttClient): void {
    rawPublisher(client, 'files/upload/sensor_dump.bin',   ri(10000, 30000), () => rFile(2, 32));
    rawPublisher(client, 'files/upload/camera_frame.jpg',  ri(5000, 15000),  () => rFile(20, 64));
    rawPublisher(client, 'files/upload/log_batch.txt',     ri(8000, 20000),  () => rFile(1, 16));
    rawPublisher(client, 'files/upload/config_backup.json',ri(30000, 60000), () => jbuf({
        version: `${ri(1,9)}.${ri(0,9)}`,
        ts:      Date.now(),
        data:    Array.from({length: ri(20, 80)}, () => ({k: `key_${ri(0,999)}`, v: rb() ? ri(0,1000) : rf()})),
    }));
    rawPublisher(client, 'files/upload/firmware.bin',      ri(60000, 120000), () => rFile(50, 256));
    rawPublisher(client, 'files/upload/telemetry_batch.csv', ri(15000, 45000), () => {
        const rows = Array.from({length: ri(10, 100)}, () =>
            `${Date.now()},${rf(-40,150)},${rf(0,100)},${ri(0,10000)},${rb() ? 1 : 0}`
        );
        return buf(`ts,temperature,humidity,pressure,active\n${rows.join('\n')}`);
    });
}

function spawnMisc(client: MqttClient): void {
    rawPublisher(client, 'system/server/cpu',    ri(1000, 3000),  () => buf(rf(0, 100).toString()));
    rawPublisher(client, 'system/server/ram',    ri(2000, 5000),  () => buf(rf(0, 100).toString()));
    rawPublisher(client, 'system/server/disk',   ri(5000, 20000), () => buf(rf(0, 100).toString()));
    rawPublisher(client, 'system/server/net_in', ri(500, 2000),   () => buf(ri(0, 1000000).toString()));
    rawPublisher(client, 'system/server/net_out',ri(500, 2000),   () => buf(ri(0, 1000000).toString()));
    rawPublisher(client, 'system/server/status', ri(5000, 15000), () => jbuf({
        cpu: rf(0,100), ram: rf(0,100), disk: rf(0,100), uptime: ri(0, 31536000), ts: Date.now(),
    }));

    rawPublisher(client, 'iot/gateway/GW001/state',    ri(2000, 6000), () => buf(rb() ? 'online' : 'offline'));
    rawPublisher(client, 'iot/gateway/GW001/connected_devices', ri(5000, 15000), () => buf(ri(0, 64).toString()));
    rawPublisher(client, 'iot/gateway/GW002/state',    ri(2000, 6000), () => buf(rb() ? 'online' : 'offline'));
    rawPublisher(client, 'iot/gateway/GW002/connected_devices', ri(5000, 15000), () => buf(ri(0, 64).toString()));

    rawPublisher(client, 'modbus/RTU1/coil/0',  ri(200, 1000), () => buf(rb() ? '1' : '0'));
    rawPublisher(client, 'modbus/RTU1/coil/1',  ri(200, 1000), () => buf(rb() ? '1' : '0'));
    rawPublisher(client, 'modbus/RTU1/register/0', ri(100, 500), () => buf(ri(0, 65535).toString()));
    rawPublisher(client, 'modbus/RTU1/register/1', ri(100, 500), () => buf(ri(0, 65535).toString()));

    rawPublisher(client, 'opc-ua/server1/node/temperature', ri(500, 2000), () => buf(rf(0, 100).toString()));
    rawPublisher(client, 'opc-ua/server1/node/pressure',    ri(500, 2000), () => buf(rf(0, 10000).toString()));
    rawPublisher(client, 'opc-ua/server1/node/status',      ri(2000, 8000), () => buf(ri(0, 7).toString()));
}

// ═════════════════════════════════════════════════════════════════════════════
// ── Main ──────────────────────────────────────────────────────────────────────
// ═════════════════════════════════════════════════════════════════════════════
(async () => {
    const brokerUrl = `${SETTINGS.mqttServer.mqtt}://${SETTINGS.mqttServer.host}:${SETTINGS.mqttServer.port}`;
    console.log(`Connecting to ${brokerUrl} …`);

    const client: MqttClient = await connectAsync(brokerUrl, {
        keepalive: 60,
        reconnectPeriod: 1000,
    });
    console.log('Connected.\n');

    // ── Sparkplug B ───────────────────────────────────────────────────────────
    for (let n = 0; n < SPB_NODES; n++) {
        const nodeId = `node_${String(n).padStart(3, '0')}`;
        spbPublisher(client,
            `${TOPIC_BASE}/${GROUP_ID}/NBIRTH/${nodeId}`,
            `${TOPIC_BASE}/${GROUP_ID}/NDATA/${nodeId}`,
            ri(50, 300), ri(3, 8));
        for (let d = 0; d < SPB_DEVICES; d++) {
            const deviceId = `device_${String(d).padStart(3, '0')}`;
            const intervals = [50, 80, 120, 200, 400, 750, 1000, 1500, 2000];
            spbPublisher(client,
                `${TOPIC_BASE}/${GROUP_ID}/DBIRTH/${nodeId}/${deviceId}`,
                `${TOPIC_BASE}/${GROUP_ID}/DDATA/${nodeId}/${deviceId}`,
                intervals[ri(0, intervals.length - 1)], ri(2, 12));
        }
    }

    // ── Plain MQTT topic families ─────────────────────────────────────────────
    spawnHomeAutomation(client);
    spawnZigbee(client);
    spawnWeather(client);
    spawnFleet(client);
    spawnFactory(client);
    spawnEnergy(client);
    spawnBuilding(client);
    spawnSecurity(client);
    spawnAgriculture(client);
    spawnDeviceShadows(client);
    spawnRawSensors(client);
    spawnAlerts(client);
    spawnFiles(client);
    spawnMisc(client);

    console.log(`\n${topicCount} publishers running across all topic families.`);
    console.log(`Press Ctrl+C to stop.\n`);

    await new Promise<never>(() => {});
})();
