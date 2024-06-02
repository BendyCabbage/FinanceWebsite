from datetime import date

def create_summary(categories) -> dict:
    summary = {
      'categories': {},
    }
    
    total_profit_loss = 0
    min_date = date(9999, 12, 30)
    max_date = date(1001, 1, 1)

    for category in categories:
        if len(categories[category]) == 0:
            continue
        category_sum = round(sum([i.amount for i in categories[category]]),2)
        num_transactions = len(categories[category])

        start_date = min([i.date for i in categories[category]])
        end_date = max([i.date for i in categories[category]])

        min_date = min(start_date, min_date)
        max_date = max(end_date, max_date)

        total_profit_loss += category_sum

        summary['categories'][category] = {
            'startDate': start_date,
            'endDate': end_date,
            'cashflow': category_sum,
            'numTransactions': num_transactions
        }

    summary['startDate'] = min_date
    summary['endDate'] = max_date
    summary['cashflow'] = total_profit_loss

    return summary