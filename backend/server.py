from flask import Flask, request
from flask_cors import CORS

import parseCSV
import random
import string

app = Flask(__name__)
CORS(app)

@app.route('/upload', methods=['POST'])
def upload_csv():
  if 'file' not in request.files:
    return "No file part"
  
  file = request.files['file']
  filename = ''.join(random.choices(string.ascii_letters + string.digits, k=7))
  
  if file.filename == '':
    return "No selected file"
  
  if file:
    file.save(f"uploads/{filename}.csv")
    response = parseCSV.parse_file(filename)
    return response

  
if __name__ == '__main__':
    app.run(debug=True, port=5000)