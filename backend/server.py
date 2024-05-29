from flask import Flask, request, make_response
from flask_cors import CORS
from categoriseTransactions import categorise_transactions
from createSummary import create_summary

import os
import uuid
import parseCSV
import random
import string

app = Flask(__name__)
CORS(app, supports_credentials=True)

filenameMap = {}

@app.route('/upload', methods=['POST'])
def upload_csv():
  if 'file' not in request.files:
    return "No file part"
  
  file = request.files['file']
  return parse_uploaded_file(file)

@app.route('/summary', methods=['GET'])
def get_summary():
  id = request.cookies.get('id')
  if not id:
    return "No cookie", 403
  print(f"/summary: id={id}")
  
  filename = get_filename(id)
  
  if not filename:
    return "Invalid cookie", 403
  
  transactions = parseCSV.parse_file(filename)

  categories = categorise_transactions(transactions)
  summary = create_summary(categories)
  
  response = { "categories" : categories, "summary" : summary }, 200
  os.remove(f"uploads/{filename}.csv") # remove file after generating summary
  
  return response

def parse_uploaded_file(file):
  filename = ''.join(random.choices(string.ascii_letters + string.digits, k=12))
  
  if not file or file.filename == '':
    return "No file selected", 400
  
  file.save(f"uploads/{filename}.csv")
  try:
    transactions = parseCSV.parse_file(filename)
  except:
    os.remove(f"uploads/{filename}.csv")
    return "Invalid file", 400
  
  id = generate_id(filename)
  print(f"Generated id: {id}")

  response = make_response({"transactions": transactions}, 200)
  response.set_cookie('id', str(id), samesite='Strict')

  return response

def generate_id(filename):
  id = str(uuid.uuid4())
  print(f"Generated id: {id}")
  filenameMap[id] = filename
  return id

def get_filename(id):
  return filenameMap[str(id)]
  
  
if __name__ == '__main__':
    app.run(debug=True, port=5000)