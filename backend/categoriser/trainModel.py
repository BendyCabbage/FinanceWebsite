import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import accuracy_score
# Example dataset
data = {
    'transaction_name': ['Grocery Store', 'Online Subscription', 'Gas Station', 'Coffee Shop', 'Electric Bill'],
    'category': ['Groceries', 'Subscription', 'Fuel', 'Food', 'Utilities']
}

df = pd.DataFrame(data)

# Split the data
X_train, X_test, y_train, y_test = train_test_split(df['transaction_name'], df['category'], test_size=0.2, random_state=42)

# Vectorize the text data
vectorizer = CountVectorizer()
X_train_vect = vectorizer.fit_transform(X_train)
X_test_vect = vectorizer.transform(X_test)

# Train the Naive Bayes classifier
clf = MultinomialNB()
clf.fit(X_train_vect, y_train)

# Evaluate the model
y_pred = clf.predict(X_test_vect)
accuracy = accuracy_score(y_test, y_pred)
print(f'Accuracy: {accuracy}')
