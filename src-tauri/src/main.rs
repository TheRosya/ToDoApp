use std::fs::File;
use std::io::{Write, Read};

// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#[cfg_attr(not(debug_assertions), windows_subsystem = "windows")]



#[tauri::command]
fn write_json_to_file(content: &str) {
    if let Ok(mut file) = File::create("./../data.json") {
        if let Err(err) = file.write_all(content.as_bytes()) {
            eprintln!("Failed to write to file: {}", err);
        } else {
            println!("Content written to file successfully.");
        }
    } else {
        eprintln!("Failed to create file.");
    }
}

#[tauri::command]
fn get_json_from_file() -> String {
    let mut f = File::open("./../data.json").unwrap();
    let mut s = String::new();
    match f.read_to_string(&mut s) {
        Ok(_) => s.into(),
        Err(e) => String::from(e.to_string()),
    }

}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![write_json_to_file, get_json_from_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
