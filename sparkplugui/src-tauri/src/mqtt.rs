use std::process;
use std::time::Duration;

extern crate paho_mqtt as MQTT;


#[tauri::command]
pub fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

#[tauri::command]
pub fn connect() {
    // see: https://crates.io/crates/paho-mqtt
    // Create a client & define connect options
    let client = MQTT::Client::new("tcp://localhost:1883").unwrap_or_else(|err| {
        println!("Error: creating the client: {:?}", err);
        process::exit(1);
    });
    let connect_options = MQTT::ConnectOptionsBuilder::new()
        .keep_alive_interval(Duration::from_secs(20))
        .clean_session(true)
        .finalize();

    // Connect and wait for it to complete or fail
    client.connect(connect_options).unwrap_or_else(|err| {
        println!("Error: Unable to connect to the broker: {:?}", err);
        process::exit(1);
    });

    println!("###### MQTT client connected");

    // Publish message
    let message = MQTT::Message::new("BWOAH/INCR", "Hello from Rust!", 0);
    client.publish(message).unwrap_or_else(|err| {
        println!("Error: Unable to publish message: {:?}", err);
    });
}
