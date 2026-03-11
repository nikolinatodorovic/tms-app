from typing import List
from fastapi import APIRouter, status

from app.models.transaction_model import TransactionCreate, TransactionResponse
from app.services.transaction_service import get_all_transactions, create_transaction

router = APIRouter(prefix="/transactions", tags=["Transactions"])

@router.get("", response_model=List[TransactionResponse], status_code=status.HTTP_200_OK)
def read_transactions():
    return get_all_transactions()

@router.post("", response_model=TransactionResponse, status_code=status.HTTP_201_CREATED)
def add_transaction(transaction: TransactionCreate):
    return create_transaction(transaction)

