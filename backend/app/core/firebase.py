import firebase_admin
from firebase_admin import credentials, firestore
from .config import settings

cred = credentials.Certificate(settings.FIREBASE_SERVICE_ACCOUNT_PATH)
if not firebase_admin._apps:
    firebase_admin.initialize_app(cred)

db = firestore.client()