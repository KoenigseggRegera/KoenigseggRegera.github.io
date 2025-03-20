from blooks import blooks

import time
import requests
import urllib.parse
from replit import db

BASE = "https://blacket.org/worker"
BASE_2 = "https://blacket.org/worker2"

session = requests.Session()
session.headers = {
    "cookie": "token=s%3AqXqeL11vJLNnBEbb08wCVTJTlHjaUMMf.v0BQw4aCa5U1xPN%2FfXWidT%2BInTmjK%2FpyIbyiD3SYl2M"
}

prices = {}

def gather_latest ():
    try:
        listed = session.get(f"{BASE}/bazaar").json()["bazaar"]
    
        for blook in listed:
            try:    
                if blook["price"] < prices[blook["item"]]:
                    prices[blook["item"]] = blook["price"]
            except:
                pass
    except:
        pass

def gather_latest_loop ():
    while True:
        gather_latest()
        time.sleep(0.1)
        # print("orbit latest", time.time())

def gather_all ():
    try:
        for blook in blooks.keys():
            blooku = urllib.parse.quote_plus(blook)
    
            cheapest = 10**18
            listed = session.get(f"{BASE}/bazaar?item={blooku}").json()["bazaar"]
            for item in listed:
                cheapest = min(cheapest, item["price"])
    
            if blook in prices and prices[blook] < cheapest:
                print(blook, "sold", prices[blook], "->", cheapest)
                db["sales"].append({
                    "time": int(time.time()),
                    "blook": blook,
                    "amount": prices[blook]
                })
                
            prices[blook] = cheapest
    except:
        pass
        
def gather_all_loop ():
    while True:
        gather_all()
        time.sleep(3)
        # print("orbit all", time.time())
