import csv, re, os
from datetime import date
from categoriseTransactions import categorise_transactions
from createSummary import create_summary
from transaction import Transaction

output_file = "summary.txt"
transaction_output = "transactions.txt"

def main(transaction_filename):
    transactions = parse_csv(transaction_filename)
    categories = categorise_transactions(transactions)

    summary = create_summary(categories)

    summary_filename = "summary_" + get_basename(transaction_filename) + ".txt"
    write_to_file(summary, summary_filename)

def parse_file(file):
    transactions = parse_csv(file)
    return transactions

def get_basename(filename):
    basename = os.path.basename(filename)
    return basename.split(".")[0]

def parse_csv(csv_file):
    try:
        file = open(f"uploads/{csv_file}.csv", "r")
    except:
        print(f"Invalid filename: {csv_file}")
        return []

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

def format_transaction(transaction: Transaction):
    date_match = re.search(r'([0-9]{2}/[0-9]{2}/[0-9]{4})$', transaction.transaction_name)
    if date_match:
        transaction.date = parse_date(date_match.group(1))

    transaction.transaction_name = format_name(transaction.transaction_name)
    return transaction

def format_name(name: str) ->str:
    name = re.sub(r'( [A-Z]{2})?( [A-Z]{3})?( Card xx\d{4})?( [A-Z]{3} \d+.\d+)? Value Date.*', r'', name) #Removes card references
    name = re.sub(r' ([A-Z]*\d+[A-Z]*)+ ', ' ', name) # Removes words containing only numbers or full caps + numbers
    name = re.sub(r'(TAP|PTY LTD|Direct Debit|Direct Credit)( |$)', '', name) #Removes PTY LTD and TAP
    name = re.sub(r'(^| )[0-9]+( |$)', ' ', name) #Removes all words with only numbers

    name = re.sub(r'( ){2,}', ' ', name) #Removes duplicated spaces
    name = re.sub(r'\S*\d+\S*', '', name) #Removes all words containing numbers
    
    return name.strip()

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