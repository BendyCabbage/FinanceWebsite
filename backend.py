
import csv, re
from dataclasses import dataclass

@dataclass
class Transaction:
    date: str
    amount: float
    transaction_name: str
    balance: float

def main():
    transactions = parse_csv("transactions.csv")
    categories = parse_transactions(transactions)
    parsed_categories = parse_categories(categories)

def parse_csv(csv_file):
    try:
        file = open(csv_file, "r")
    except:
        print(f"Invalid filename: {csv_file}")
        exit(1)

    csv_reader = csv.reader(file)

    transactions = []

    for row in csv_reader:
        date = row[0]
        amount = float(row[1])
        transaction_name = row[2]
        balance = float(row[3])

        transactions.append(Transaction(date=date, amount=amount, transaction_name=transaction_name, balance=balance))

    return transactions

def parse_transactions(transactions):
    categories = {"gym": [], "transport": [], "groceries": [], "rent": [], "income": [], "eating out": [], "miscellaneous": []}

    for i in transactions:
        if is_income(i):
            categories["income"].append(i)
        elif is_transport(i):
            categories["transport"].append(i)
        elif is_groceries(i):
            categories["groceries"].append(i)
        elif is_gym(i):
            categories["gym"].append(i)
        elif is_rent(i):
            categories["rent"].append(i)
        elif is_eating_out(i):
            categories["eating out"].append(i)
        else:
            categories["miscellaneous"].append(i)
    return categories

def is_gym(transaction: Transaction) -> bool:
    potential_strings = ["gym", "desrenford"]
    return any(s in transaction.transaction_name.lower() for s in potential_strings)

def is_groceries(transaction: Transaction) -> bool:
    potential_strings = ["iga", "woolworths", "coles"]
    return any(s in transaction.transaction_name.lower() for s in potential_strings)

def is_income(transaction: Transaction) -> bool:
    return transaction.amount > 0

def is_eating_out(transaction: Transaction) -> bool:
    potential_strings = ["zambrero", "mcdonalds", "dominos", "guzman", "boost juice"]
    return any(s in transaction.transaction_name.lower() for s in potential_strings)

def is_transport(transaction: Transaction) -> bool:
    potential_strings = ["transport"]
    return any(s in transaction.transaction_name.lower() for s in potential_strings)

def is_rent(transaction: Transaction) -> bool:
    return transaction.amount > 150 and "unswrandwick" in transaction.transaction_name.replace(" ","").lower()

def parse_categories(categories):
    for category in categories:
        print(f"{category}: {categories[category]}")

if __name__ == "__main__":
    main()