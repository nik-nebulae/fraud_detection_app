from fastapi import FastAPI
from .simulator import start_simulation, stop_simulation
from .crud import get_transactions
from .database import create_table

app = FastAPI()


# Initialize DB on startup
@app.on_event("startup")
def startup():
    create_table()


@app.get("/")
def root():
    return {"message": "Fraud Detection API is running"}


@app.post("/start")
def start():
    return {"status": start_simulation()}


@app.post("/stop")
def stop():
    return {"status": stop_simulation()}


@app.get("/transactions")
def fetch_transactions():
    data = get_transactions()
    return {"transactions": data}