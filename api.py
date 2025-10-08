from flask import Flask, jsonify
import json

app = Flask(__name__)

# Load the university data from the JSON file
with open('university_info.json', 'r') as file:
    university_data = json.load(file)

@app.route('/api/universities', methods=['GET'])
def get_universities():
    """Endpoint to get all university data."""
    return jsonify(university_data)

@app.route('/api/universities/<program>', methods=['GET'])
def get_program(program):
    """Endpoint to get university data for a specific program."""
    program = program.replace('%20', ' ')  # Handle spaces in URL
    data = university_data.get(program)
    if data:
        return jsonify({program: data})
    else:
        return jsonify({"error": "Program not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)