import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI")
MONGODB_DB = os.getenv("MONGODB_DB", "pizza24")

client = MongoClient(MONGODB_URI)

db = client[MONGODB_DB]

pizzas_collection = db["pizzas"]
users_collection = db["users"]
orders_collection = db["orders"]