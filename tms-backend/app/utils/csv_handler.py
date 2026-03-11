import csv
from pathlib import Path
from typing import List, Dict

def read_csv_rows(file_path: Path) -> List[Dict[str, str]]:
    if not file_path.exists():
        return []

    with open(file_path, mode="r", newline="", encoding="utf-8") as csv_file:
        reader = csv.DictReader(csv_file) # converting csv rows into dicts
        return list(reader)

def append_csv_row(file_path: Path, fieldnames: List[str], row: Dict[str, str]) -> None:
    with open(file_path, mode="a", newline="", encoding="utf-8") as csv_file:
        writer = csv.DictWriter(csv_file, fieldnames=fieldnames) # converting dict into a csv row
        writer.writerow(row)


