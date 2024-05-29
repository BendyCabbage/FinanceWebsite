import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline
from sklearn.metrics import classification_report

# Example data
data = {
    'transaction_name': ['Paid electricity bill', 'Bought ticket for bus', 'Movie night payment', 'Pharmacy visit payment'],
    'category': ['utilities', 'transport', 'entertainment', 'health']
}

df = pd.DataFrame(data)

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(df['transaction_name'], df['category'], test_size=0.2, random_state=42)
