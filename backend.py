
import csv, re
from dataclasses import dataclass

output_file = "summary.txt"
transaction_output = "transactions.txt"

@dataclass
class Transaction:
    date: str
    amount: float
    transaction_name: str
    balance: float


def main():
    transactions = parse_csv("transactions.csv")
    categories = parse_transactions(transactions)

    summary = create_summary(categories)
    write_to_file(summary, output_file)

    transaction_string = create_transactions_string(categories)
    write_to_file(transaction_string, transaction_output)

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

        new_transaction = Transaction(date=date, amount=amount, transaction_name=transaction_name, balance=balance)

        new_transaction = format_transaction(new_transaction)

        transactions.append(new_transaction)

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
    potential_strings = ["zambrero", "mcdonalds", "dominos", "guzman", "boost juice", "mad mex", "subway", "kfc", "sharetea", "chatime"]
    return any(s in transaction.transaction_name.lower() for s in potential_strings)

def is_transport(transaction: Transaction) -> bool:
    potential_strings = ["transport"]
    return any(s in transaction.transaction_name.lower() for s in potential_strings)

def is_rent(transaction: Transaction) -> bool:
    return transaction.amount < -150 and "unswrandwick" in transaction.transaction_name.replace(" ","").lower()

def format_transaction(transaction: Transaction):
    date_match = re.search(r'([0-9]{2}/[0-9]{2}/[0-9]{4})$', transaction.transaction_name)
    if date_match:
        transaction.date = date_match.group(1)
    transaction.transaction_name = re.sub(r'( [A-Z]{2} )?[A-Z]{3} Card.*', r'', transaction.transaction_name)
    return transaction

def create_summary(categories) -> str:
    summary_string = "Summary:\n"

    for category in categories:
        summary_string += category + ":\n"
        category_sum = round(sum([i.amount for i in categories[category]]),2)
        num_transactions = len(categories[category])
        summary_string += f"\t{format_amount(category_sum)}\n"

        summary_string += f"\tNumber of Transactions: {num_transactions}\n\n"

    return summary_string

def format_amount(amount):
    if amount < 0:
        return  f"-${-amount}"
    else:
        return f"${amount}"

def custom_key(transaction: Transaction):
    date = transaction.date.replace("/", "")
    return int(date)

def create_transactions_string(categories) -> str:
    transaction_string = "Transactions:\n"
    for i in categories:
        transaction_string += i + ":\n"
        for t in sorted(categories[i], key=custom_key):
            transaction_string += "\t" + transaction_to_str(t) + "\n"

    return transaction_string

def transaction_to_str(transaction: Transaction) ->str:
    return f"{transaction.date}: {format_amount(transaction.amount)}, {transaction.transaction_name}"

def write_to_file(contents, filename):
    with open(filename, "w") as file:
        file.write(contents)

if __name__ == "__main__":
    main()