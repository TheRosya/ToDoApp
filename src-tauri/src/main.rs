use std::fs::File;
use std::io::{Write, Read};
use chrono::{Datelike, Timelike, Utc};
use chrono::TimeZone;

#[derive(serde::Serialize)]
struct CustomResponse {
  message: String,
}


// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#[cfg_attr(not(debug_assertions), windows_subsystem = "windows")]


#[tauri::command]
fn get_date_description(year: i32, month: u32, day: u32) -> String {
    let now = Utc::now();
    println!("{:?}", now);
    let today = Utc.ymd(now.year(), now.month(), now.day()).and_hms(0, 0, 0);
    println!("{:?}", today);
    let date = Utc.ymd(year, month, day).and_hms(0, 0, 0);
    println!("{:?}", date);

    
    let tomorrow = today + chrono::Duration::days(1);
    let day_after_tomorrow = today + chrono::Duration::days(2);
    let current_week_start = today - chrono::Duration::days(today.weekday().num_days_from_monday() as i64);
    let current_week_end = current_week_start + chrono::Duration::days(6);
    let current_month_start = Utc.ymd(now.year(), now.month(), 1).and_hms(0, 0, 0);
    let next_month_start = current_month_start + chrono::Duration::days(32);
    let current_month_end = next_month_start - chrono::Duration::days(next_month_start.day() as i64);

    let mut day = String::from("");
    
    if date == today {
        day = String::from("Сегодня");
    } else if date == tomorrow {
        day = String::from("Завтра");
    } else if date == day_after_tomorrow {
        day = String::from("После завтра");
    } else if date >= current_week_start && date <= current_week_end {
        day = String::from("На этой неделе");
    } else if date >= current_month_start && date <= current_month_end {
        day = String::from("В этом месяце");
    } else {
        day = String::from("Пока не придумал");
    }
    day.into()
}


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
        .invoke_handler(tauri::generate_handler![write_json_to_file, get_json_from_file, get_date_description])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
