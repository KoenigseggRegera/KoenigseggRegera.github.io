import flask
import requests
from threading import Thread

import scraper

from api import api

def scraper_boot ():
    print("started?")
    scraper.gather_all()
    requests.post("https://discord.com/api/webhooks/1306473574588088361/sKBnIEgwucZGKxCJ7kaXxykKpUpYWZJ0LAjTQ1Fvunhbt0ElZr86RJ7YKMnSEVDBcD1Z", json={"content": "round 1"})
    Thread(target=scraper.gather_all_loop).start()
    Thread(target=scraper.gather_latest_loop).start()

# Thread(target=scraper_boot).start()

app = flask.Flask(__name__)
app.register_blueprint(api)

@app.route("/")
def index():
    return flask.render_template("banned.html")

@app.errorhandler(404) 
def not_found(e): 
    return flask.render_template("banned.html") 

"""
@app.route("/user/<name>")
def user(name: str):
    return flask.render_template("user.html")

@app.route("/item/<name>")
def item(name: str):
    return flask.render_template("item.html", name=name)

@app.route("/search")
def search():
    return flask.render_template("search.html")

@app.route("/sales")
def sales():
    return flask.render_template("sales.html")
    """

app.run(host="0.0.0.0", port=8080)