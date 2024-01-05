// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod mqtt;
// mod database;

struct MyState(paho_mqtt::Client);

fn main() {

    let mut MQTTClient = None;

    tauri::Builder::default()
        .manage(MyState(None))
        .invoke_handler(tauri::generate_handler![mqtt::connect])
        .invoke_handler(tauri::generate_handler![mqtt::disconnect])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
