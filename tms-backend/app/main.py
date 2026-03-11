from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.transactions import router as transactions_router
from app.config import ALLOWED_ORIGINS

app = FastAPI(
    title="Transaction Management System API",
    description="API for reading and creating transactions stored in a CSV file",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(transactions_router) # including our router

@app.get("/")
def root():
    return {"message": "Transaction Management System API is running"}