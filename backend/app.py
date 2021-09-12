from flask import Flask, request
from flask.json import jsonify
from flask_sqlalchemy import SQLAlchemy
import datetime
from flask_marshmallow import Marshmallow

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:password@localhost:3307/flask'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

class Articles(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    body = db.Column(db.Text())
    date = db.Column(db.DateTime, default = datetime.datetime.now)

    def __init__(self, title, body):
        self.title = title
        self.body = body

class ArticleSchema(ma.Schema):
    class Meta:
        fields = ('id', 'title', 'body', 'date')

article_schema = ArticleSchema()
articles_schema = ArticleSchema(many=True)


@app.route('/get', methods = ['GET'])
def get_articles():
    # return jsonify({"Hello":"World"})
    all_articles = Articles.query.all()
    results = articles_schema.dump(all_articles)  # note that we are using 's' as it will get many objects
    return jsonify(results)

@app.route('/add', methods = ['POST'])
def add_articles():
    title = request.json['title']
    body = request.json['body']

    articles = Articles(title, body) # creating an article object
    db.session.add(articles)  # adding the record to the object
    db.session.commit()
    return article_schema.jsonify(articles)



if __name__ == "__main__":
    app.run(debug=True)