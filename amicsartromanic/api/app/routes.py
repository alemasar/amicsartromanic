import json
from app import app
from flask import jsonify
from flask import request, Response, abort

books = [{
    'id': 33,
    'title': 'The Raven',
    'author_id': 1
}]

@app.route('/add', methods=['POST', 'OPTIONS', 'GET'])
def add_new():
    response = Response(
        json.dumps(books), status=200, mimetype='application/json')
    return  response

@app.route('/')
@app.route('/index')
def index():
    return "Hello, World!"