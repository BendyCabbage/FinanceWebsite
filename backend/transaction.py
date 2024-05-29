from dataclasses import dataclass
from datetime import date

@dataclass
class Transaction:
    date: date
    amount: float
    transaction_name: str
    balance: float