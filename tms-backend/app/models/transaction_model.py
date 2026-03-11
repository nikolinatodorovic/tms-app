from datetime import date
from pydantic import BaseModel, Field
from typing import Optional, Literal

class TransactionCreate(BaseModel): # using BaseModel for automatic validation (field presence and types)
    transaction_date: date = Field(
        ..., 
        description="Transaction date in YYYY-MM-DD format") # using Field for additional validation and Swagger metadata
    
    account_number: str = Field(
        ..., 
        min_length=1, 
        pattern=r"^\d{4}-\d{4}-\d{4}$", 
        description="Account number in format xxxx-xxxx-xxxx")
    
    account_holder_name: str = Field(
        ..., 
        min_length=1, 
        description="Account holder full name")
    
    amount: float = Field(
        ..., 
        gt=0, 
        description="Transaction amount")
    
    status: Optional[Literal["Pending", "Settled", "Failed"]] = Field(
        default=None,
        description="Optional transaction status",
    )

class TransactionResponse(BaseModel):
    transaction_date: date
    account_number: str
    account_holder_name: str
    amount: float
    status: str