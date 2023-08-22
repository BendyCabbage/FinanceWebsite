
import csv, re, os
from dataclasses import dataclass
from datetime import date

output_file = "summary.txt"
transaction_output = "transactions.txt"

@dataclass
class Transaction:
    date: date
    amount: float
    transaction_name: str
    balance: float


def main(transaction_filename):
    transactions = parse_csv(transaction_filename)
    categories = categorise_transactions(transactions)

    summary = create_summary(categories)

    summary_filename = "summary_" + get_basename(transaction_filename) + ".txt"
    trans_filename = "transactions_" + get_basename(transaction_filename) + ".txt"

    write_to_file(summary, summary_filename)

    transaction_string = create_transactions_string(categories)
    write_to_file(transaction_string, trans_filename)

def get_basename(filename):
    basename = os.path.basename(filename)
    return basename.split(".")[0]

def parse_csv(csv_file):
    try:
        file = open(csv_file, "r")
    except:
        print(f"Invalid filename: {csv_file}")
        exit(1)

    csv_reader = csv.reader(file)

    transactions = []

    for row in csv_reader:
        date = parse_date(row[0])
        amount = float(row[1])
        transaction_name = row[2]
        balance = float(row[3])

        new_transaction = Transaction(date=date, amount=amount, transaction_name=transaction_name, balance=balance)

        new_transaction = format_transaction(new_transaction)

        transactions.append(new_transaction)

    return transactions

def parse_date(date_string: str) -> date:
    day, month, year = date_string.split("/")
    return date(int(year), int(month), int(day))

def categorise_transactions(transactions):
    categories = {"utilities": [], "transport": [], "groceries": [], "rent": [], "income": [], "eating out": [], "miscellaneous": [], "recurring": []}

    for i in transactions:
        if is_income(i):
            categories["income"].append(i)
        elif is_transport(i):
            categories["transport"].append(i)
        elif is_groceries(i):
            categories["groceries"].append(i)
        elif is_utilities(i):
            categories["utilities"].append(i)
        elif is_rent(i):
            categories["rent"].append(i)
        elif is_eating_out(i):
            categories["eating out"].append(i)
        else:
            categories["miscellaneous"].append(i)
    return categories

def is_utilities(transaction: Transaction) -> bool:
    keywords = ["gym", "desrenford", "spotify", "circles.life", "unsw village"]
    return is_matching(keywords, transaction)

def is_groceries(transaction: Transaction) -> bool:
    keywords = ["iga", "woolworths", "coles", "aldi"]
    return is_matching(keywords, transaction)

def is_income(transaction: Transaction) -> bool:
    return transaction.amount > 0

def is_eating_out(transaction: Transaction) -> bool:
    keywords = ["zambrero", "mcdonalds", "dominos", "guzman", "cafe", "burger", "boost juice", "mad mex", "subway", "kfc", 
                "sharetea", "chatime", "jamaica blue", "rivareno", "krispy kreme"]
    return is_matching(keywords, transaction)

def is_transport(transaction: Transaction) -> bool:
    keywords = ["transport"]
    return is_matching(keywords, transaction)

def is_rent(transaction: Transaction) -> bool:
    keywords = ["unsw randwick"]
    return transaction.amount < -150 and is_matching(keywords, transaction)

def is_matching(keywords: list, transaction: Transaction) -> bool:
    re_pattern = "|".join(map(re.escape, keywords))
    return re.search(re_pattern, transaction.transaction_name, re.IGNORECASE) is not None

def format_transaction(transaction: Transaction):
    date_match = re.search(r'([0-9]{2}/[0-9]{2}/[0-9]{4})$', transaction.transaction_name)
    if date_match:
        transaction.date = parse_date(date_match.group(1))

    name = transaction.transaction_name

    name = re.sub(r'( [A-Z]{2} )?[A-Z]{3} Card.*', r'', name) #Removes card references
    name = re.sub(r'( |^)[0-9]{4,}( |$)', ' ', name) # Removes 4 or more consecutive numbers
    name = re.sub(r' PTY LTD( |$)', ' ', name) #Removes PTY LTD
    name = re.sub(r'[\b\_](?=\w*\d)(?=\w*[a-zA-Z])\w+[\b\_]', '', name) #Removes words containing both letters and numbers
    name = re.sub(r' [\b\_](?=\w*[A-Z][A-Z]\w*[a-z])\w+[\b\_] ', ' ', name) #Removes mixed case words with capital letters not at the start

    name = re.sub(r'( ){2,}', ' ', name) #Removes duplicated spaces

    transaction.transaction_name = name
    return transaction

def create_summary(categories) -> str:
    summary_string = ""

    total_profit_loss = 0
    min_date = date(2999, 12, 30)
    max_date = date(1901, 1, 1)

    for category in categories:
        if len(categories[category]) == 0:
            continue
        summary_string += category + ":\n"
        category_sum = round(sum([i.amount for i in categories[category]]),2)

        start_date = min([i.date for i in categories[category]])
        end_date = max([i.date for i in categories[category]])

        min_date = min(start_date, min_date)
        max_date = max(end_date, max_date)

        total_profit_loss += category_sum

        num_transactions = len(categories[category])
        summary_string += f"\t{format_amount(category_sum)}\n"

        summary_string += f"\tNumber of Transactions: {num_transactions}\n\n"
    start_summary = f"Summary:\nPeriod: {date_to_str(min_date)} - {date_to_str(max_date)}\nTotal profit/loss: {format_amount(total_profit_loss)}\n"
    summary_string = start_summary + summary_string


    return summary_string

def format_amount(amount):
    amount = round(amount, 2)
    if amount < 0:
        return  f"-${-amount}"
    else:
        return f"${amount}"

def create_transactions_string(categories) -> str:
    transaction_string = "Transactions:\n"
    for i in categories:
        transaction_string += i + ":\n"
        for t in sorted(categories[i], key=lambda t: t.date):
            transaction_string += "\t" + transaction_to_str(t) + "\n"

    return transaction_string

def date_to_str(date: date) -> str:
    return f"{date.day}/{date.month}/{date.year}"

def transaction_to_str(transaction: Transaction) ->str:
    return f"{date_to_str(transaction.date)}: {format_amount(transaction.amount)}, {transaction.transaction_name}"

def write_to_file(contents, filename):
    with open(filename, "w") as file:
        file.write(contents)

if __name__ == "__main__":
    filename = input("Enter the transactions filename: ")
    main(filename)