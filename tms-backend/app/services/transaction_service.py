import random
from typing import List

from app.models.transaction_model import TransactionCreate, TransactionResponse
from app.utils.csv_handler import read_csv_rows, append_csv_row
from app.config import CSV_FILE_PATH, CSV_HEADERS, TRANSACTION_STATUSES


def get_all_transactions() -> List[TransactionResponse]:
    # reading transaction data from CSV file and converting into a list of TransactionResponse model
    rows = read_csv_rows(CSV_FILE_PATH)

    transactions = []
    for row in rows:
        transaction = TransactionResponse(
            transaction_date = row["Transaction Date"],
            account_number = row["Account Number"],
            account_holder_name = row["Account Holder Name"],
            amount = float(row["Amount"]),
            status = row["Status"],
        )
        transactions.append(transaction)

    return transactions


def create_transaction(transaction_data: TransactionCreate) -> TransactionResponse:
    # reading input transaction, converting to CSV rows and storing
    generated_status = transaction_data.status or random.choice(TRANSACTION_STATUSES) # randomly choosing one of statuses if status not present

    csv_row = {
        "Transaction Date": transaction_data.transaction_date.isoformat(),
        "Account Number": transaction_data.account_number,
        "Account Holder Name": transaction_data.account_holder_name,
        "Amount": f"{transaction_data.amount:.2f}",
        "Status": generated_status,
    }

    append_csv_row(CSV_FILE_PATH, CSV_HEADERS, csv_row)

    return TransactionResponse(
        transaction_date=transaction_data.transaction_date,
        account_number=transaction_data.account_number,
        account_holder_name=transaction_data.account_holder_name,
        amount=transaction_data.amount,
        status=generated_status,
    )