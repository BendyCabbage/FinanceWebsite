from transaction import Transaction
import re

def categorise_transactions(transactions):
    categories = {"Utilities": [], "Transport": [], "Entertainment": [], "Health": [], "Groceries": [], "Income": [], "Eating Out": [], "Miscellaneous": []}

    for i in transactions:
        if is_income(i):
            categories["Income"].append(i)
        elif is_transport(i):
            categories["Transport"].append(i)
        elif is_entertainment(i):
            categories["Entertainment"].append(i)
        elif is_health(i):
            categories["Health"].append(i)
        elif is_groceries(i):
            categories["Groceries"].append(i)
        elif is_utilities(i):
            categories["Utilities"].append(i)
        elif is_eating_out(i):
            categories["Eating Out"].append(i)
        else:
            categories["Miscellaneous"].append(i)
    return categories

def is_utilities(transaction: Transaction) -> bool:
    keywords = ["circles.life", "horne", "optus", "vodafone", "telstra", "energy", "internet", "phone", 
                "electricity", "water", "gas", "internet", "broadband", "nbn", "dodo", "exetel", "telecom", "covau", "metro", "united"]
    return is_matching(keywords, transaction)

def is_entertainment(transaction: Transaction) -> bool:
    keywords = ["netflix", "spotify", "disney", "hulu", "prime", "youtube", "gaming", "playstation", "xbox", "nintendo", "steam", "epic games", "origin", "ubisoft", "blizzard", "riot", "twitch", "discord", "patreon", "binge", "golf", "karting", "game", "jb hi fi", "billiards"]
    return is_matching(keywords, transaction)

def is_health(transaction: Transaction) -> bool:
    keywords = ["pharmacy", "chemist", "doctor", "hospital", "medical", "health", "medicare", "physio", "dentist", "pathology", "radiology", "gym", "fitness", "plusglebe"]
    return is_matching(keywords, transaction)

def is_groceries(transaction: Transaction) -> bool:
    keywords = ["iga", "woolworths", "coles", "aldi", " mart", "ezymart"]
    return is_matching(keywords, transaction)

def is_income(transaction: Transaction) -> bool:
    return transaction.amount > 0

def is_eating_out(transaction: Transaction) -> bool:
    keywords = ["zambrero", "mcdonalds", "dominos", "guzman", "cafe", "burger", "boost", "mad mex", "subway", "kfc",
                "sharetea", "chatime", "jamaica blue", "rivareno", "krispy kreme", "hungry jacks", "bakery", "grill", 
                "dumpling", "cdmx", "coffee", "coco", "oakberry", "gozlem", "spicy", "schnitz", "restaurant", "greek",
                "oporto", "geekarni", " eat ", "salsa", " bar ", "muffin", "beresford"
              ]
    return is_matching(keywords, transaction)

def is_transport(transaction: Transaction) -> bool:
    keywords = ["transport", "travel", "uber", "taxi", "train", "bus", "tram", "lyft", "grab", "goget", "car rental", "collingwood", "jetstar", "myki", "airport", "v/line", "highway", "virgin"]
    return is_matching(keywords, transaction)

def is_matching(keywords: list, transaction: Transaction) -> bool:
    re_pattern = "|".join(map(re.escape, keywords))
    return re.search(re_pattern, transaction.transaction_name, re.IGNORECASE) is not None
