from flask import Flask, request
import parseCSV

app = Flask(__name__)

@app.route('/upload', methods=['POST'])
def parse_csv():
  if 'file' not in request.files:
      return "No file part"
  
  file = request.files['file']
  if file.filename == '':
      return "No selected file"
    
  if file:
      response = parseCSV.parse_file(file)
      return response

  
if __name__ == '__main__':
    app.run(debug=True, port=5000)