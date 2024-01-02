use std::process;
use std::time::Duration;

extern crate paho_mqtt;


#[tauri::command]
pub fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

#[tauri::command]
pub fn connect() {
    // see: https://crates.io/crates/paho-mqtt
    // Create a client & define connect options
    let client = paho_mqtt::Client::new("tcp://localhost:1883").unwrap_or_else(|err| {
        println!("Error: creating the client: {:?}", err);
        process::exit(1);
    });
    let conn_opts = paho_mqtt::ConnectOptionsBuilder::new()
        .keep_alive_interval(Duration::from_secs(20))
        .clean_session(true)
        .finalize();

    // Connect and wait for it to complete or fail
    // if let Err(e) = client.connect(conn_opts).wait() {
    //     println!("Unable to connect:\n\t{:?}", e);
    //     process::exit(1);
    // }

    println!("###### MQTT client connected");

    // Publish message
    let message = paho_mqtt::Message::new("BWOAH/INCR", "Hello from Rust!", 0);
    let token = client.publish(message);
    // if let Err(e) = token.wait() {
    //     println!("Error: Could not publish message: {:?}", e);
    // }
}
