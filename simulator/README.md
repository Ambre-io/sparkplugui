# SparkpluGUI IoT Simulator

| Family | Topics | Payload types | Intervals |
| --- | --- | --- | --- |
| `spBv1.0/` | ~56 (nodes + devices) | Sparkplug B encoded | 50–2000 ms |
| `home/{room}/…` | ~96 | int, bool, string | 0.8–15 s |
| `zigbee2mqtt/{addr}` | ~40 | JSON, string | 1–20 s |
| `weather/{city}/…` | ~56 | float, string, JSON | 8–60 s |
| `fleet/{vehicle}/…` | ~120 | float, bool, JSON, raw int | 0.1–15 s |
| `factory/{line}/machine{n}/…` | ~130 | float, int, string, JSON | 0.1–20 s |
| `energy/solar\|battery\|grid\|consumption` | ~60 | float, string | 1–60 s |
| `building/floor{n}/…` | ~100 | float, int, string | 2–30 s |
| `security/camera\|door\|alarm` | ~60 | bool, int, JSON | 0.5–60 s |
| `farm/{field}/…` | ~48 | float, bool, string, JSON | 5–60 s |
| `$aws/things/{d}/shadow/…` | ~36 | JSON | 1–15 s |
| `sensors/SENS_{n}/…` | ~75 | float string, raw binary (4-byte float) | 50ms–60 s |
| `alerts/{level}` | ~5 | JSON | 0.5–10 s |
| `files/upload/…` | ~6 | **binary buffers** (1 KB → 256 KB) | 5 s–2 min |
| `system/…`, `modbus/…`, `opc-ua/…`, `iot/gateway/…` | ~20 | int, float, bool, JSON | 0.1–20 s |

Binary files are real `Buffer` payloads with random bytes — sensor dumps, camera frames, firmware images, CSV batches, and a config JSON blob. MQTT handles them as opaque binary just fine.
