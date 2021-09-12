from flask import Flask
from flask.json import jsonify
from flask_sqlalchemy import SQLAlchemy
import datetime
from flask_marshmallow import Marshmallow

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:password@localhost:3307/flask'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

class Atricles(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    description = db.Column(db.Text())
    date = db.Column(db.DateTime, default = datetime.datetime.now)

    def __init__(self, title, body):
        self.title = title
        self.body = body

@app.route('/', methods = ['GET'])
def get_articles():
    return jsonify({"Hello":"World"})


if __name__ == "__main__":
    app.run(debug=True)