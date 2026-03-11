from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
CSV_FILE_PATH = BASE_DIR / "data" / "transactions.csv"

ALLOWED_ORIGINS = [
    "http://localhost:5173", # frontend app 
]

TRANSACTION_STATUSES = [
    "Pending",
    "Settled",
    "Failed",
]

CSV_HEADERS = [
    "Transaction Date",
    "Account Number",
    "Account Holder Name",
    "Amount",
    "Status",
]