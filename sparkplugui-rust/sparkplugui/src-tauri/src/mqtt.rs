use std::time::Duration;
use crate::MyState;

extern crate paho_mqtt;

// ******************************************
// * Connect to the broker
// ******************************************
#[tauri::command]
pub fn connect(mut state: tauri::State<MyState>) {
    // see: https://crates.io/crates/paho-mqtt

    // Create a client & define connect options
    // TODO: make this configurable with args
    //  if args  == "tcp://localhost:1883"
    // unsafe {
    //     MQTT_CLIENT = paho_mqtt::Client::new("tcp://localhost:1883").expect("Error creating the client");
    // }
    println!("###### coucou command connect");

    state = paho_mqtt::Client::new("tcp://localhost:1883").expect("Error creating the client");

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
