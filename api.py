import json
import flask
import requests
import urllib.parse
from replit import db

import blooks

BASE = "https://blacket.org/worker"
BASE_2 = "https://blacket.org/worker2"

session = requests.Session()
session.headers = {
    "cookie": "token=s%3AFsE_gs8uXc8PxijZXwhcf-be9OJySomU.euvAegfVDCpg6o5zF2smeIP3TZ2AilXQfV0PMmg8AAA"
}

api = flask.Blueprint("api", __name__)

@api.route("/api/user", methods=["POST"])
def user_api():
    user = urllib.parse.quote_plus(flask.request.data)

    data = session.get(f"{BASE_2}/user/{user}").json()
    res = {
        "name": data["user"]["username"],
        "tokens": data["user"]["tokens"],
        "blooks": data["user"]["blooks"]
    }

    return res

@api.route("/api/search", methods=["POST"])
def search_api ():
    item = urllib.parse.quote_plus(flask.request.data)

    cheapest = {}
    listed = session.get(f"{BASE}/bazaar?item={item}").json()["bazaar"]
    for item in listed:
        if item["item"] not in cheapest:
            cheapest[item["item"]] = item["price"]
        else:
            cheapest[item["item"]] = min(item["price"], cheapest[item["item"]])

    return cheapest

@api.route("/api/item", methods=["POST"])
def item_api ():
    data = flask.request.json

    blook = data["blook"]
    ublook = urllib.parse.quote_plus(blook)
    
    cheapest = 10**18
    listed = session.get(f"{BASE}/bazaar?item={ublook}").json()["bazaar"]
    for item in listed:
        if item["item"] == blook:
            cheapest = min(item["price"], cheapest)

    last = 0
    rap = 0
    cnt = 0
    for sale in reversed(db["sales"]):
        if cnt == 10:
            break
            
        if sale["blook"] == blook:
            if cnt == 0:
                last = sale["amount"]
                
            rap += sale["amount"]
            cnt += 1
        
    value = blooks.values[blook]["value"] if blook in blooks.values else None
    notes = blooks.values[blook]["notes"] if blook in blooks.values else None
    return {
        "lowestListedPrice": cheapest,
        "lastSalePrice": last,
        "recentAveragePrice": rap / cnt,
        "value": value,
        "valueNotes": notes
    }

@api.route("/api/sales")
def sales_api ():
    limit = flask.request.args.get("limit")
    
    if limit is None:
        limit = len(db["sales"])

    return json.loads(db.get_raw("sales"))[-int(limit):]