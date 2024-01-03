use std::time::Duration;

extern crate paho_mqtt;

use lazy_static::lazy_static;
use std::collections::HashMap;

// ******************************************
// Create a client
// ******************************************
lazy_static! {
    static ref MQTT: HashMap<&'static str, paho_mqtt::Client> = {
        let mut map = HashMap::new();
        let client = paho_mqtt::Client::new("tcp://localhost:1883").expect("Error creating the client");
        map.insert("client", client);
        map
    };
}
// ******************************************
// * Connect to the broker
// ******************************************
#[tauri::command]
pub fn connect() {
    // see: https://crates.io/crates/paho-mqtt

    // Create a client & define connect options
    // TODO: make this configurable with args
    //  if args  == "tcp://localhost:1883"
    // unsafe {
    //     MQTT_CLIENT = paho_mqtt::Client::new("tcp://localhost:1883").expect("Error creating the client");
    // }
    println!("###### coucou command connect");

    let client = MQTT.get("client").expect("Error getting the client");

    let connect_options = paho_mqtt::ConnectOptionsBuilder::new()
        .keep_alive_interval(Duration::from_secs(20))
        .clean_session(true)
        .finalize();

    // Connect client
    client.connect(connect_options).expect("Unable to connect to the broker");
    println!("###### MQTT client connected");
}

// ******************************************
// * Disconnect from the broker
// ******************************************
#[tauri::command]
pub fn disconnect() {
    println!("###### coucou command disconnect");
    let client = MQTT.get("client").expect("Error getting the client");
    let disconnect_options = paho_mqtt::DisconnectOptions::new();
    client.disconnect(disconnect_options).expect("Unable to disconnect from the broker");
    println!("###### MQTT client disconnected");
}
