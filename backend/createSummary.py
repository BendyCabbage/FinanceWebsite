from datetime import date

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

def date_to_str(date: date) -> str:
    return f"{date.day}/{date.month}/{date.year}"
