from transaction import Transaction
import re

def categorise_transactions(transactions):
    categories = {"utilities": [], "transport": [], "entertainment": [], "health": [], "groceries": [], "income": [], "eating out": [], "miscellaneous": []}

    for i in transactions:
        if is_income(i):
            categories["income"].append(i)
        elif is_transport(i):
            categories["transport"].append(i)
        elif is_entertainment(i):
            categories["entertainment"].append(i)
        elif is_health(i):
            categories["health"].append(i)
        elif is_groceries(i):
            categories["groceries"].append(i)
        elif is_utilities(i):
            categories["utilities"].append(i)
        elif is_eating_out(i):
            categories["eating out"].append(i)
        else:
            categories["miscellaneous"].append(i)
    return categories

def is_utilities(transaction: Transaction) -> bool:
    keywords = ["circles.life", "horne", "optus", "vodafone", "telstra", "energy", "internet", "phone", 
                "electricity", "water", "gas", "internet", "broadband", "nbn"]
    return is_matching(keywords, transaction)

def is_entertainment(transaction: Transaction) -> bool:
    keywords = ["netflix", "spotify", "disney", "hulu", "prime", "youtube", "gaming", "playstation", "xbox", "nintendo", "steam", "epic games", "origin", "ubisoft", "blizzard", "riot", "twitch", "discord", "patreon", "binge"]
    return is_matching(keywords, transaction)

def is_health(transaction: Transaction) -> bool:
    keywords = ["pharmacy", "chemist", "doctor", "hospital", "medical", "health", "medicare", "physio", "dentist", "pathology", "radiology", "gym"]
    return is_matching(keywords, transaction)

def is_groceries(transaction: Transaction) -> bool:
    keywords = ["iga", "woolworths", "coles", "aldi"]
    return is_matching(keywords, transaction)

def is_income(transaction: Transaction) -> bool:
    return transaction.amount > 0

def is_eating_out(transaction: Transaction) -> bool:
    keywords = ["zambrero", "mcdonalds", "dominos", "guzman", "cafe", "burger", "boost", "mad mex", "subway", "kfc",
                "sharetea", "chatime", "jamaica blue", "rivareno", "krispy kreme", "hungry jacks"]
    return is_matching(keywords, transaction)

def is_transport(transaction: Transaction) -> bool:
    keywords = ["transport", "travel", "uber", "taxi", "train", "bus", "tram", "lyft", "grab", "goget", "car rental"]
    return is_matching(keywords, transaction)

def is_matching(keywords: list, transaction: Transaction) -> bool:
    re_pattern = "|".join(map(re.escape, keywords))
    return re.search(re_pattern, transaction.transaction_name, re.IGNORECASE) is not None
