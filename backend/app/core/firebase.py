import firebase_admin
from firebase_admin import credentials, firestore
import os

def init_firebase():
    # 이미 초기화되어 있는지 확인
    if not firebase_admin._apps:
        cred_path = os.getenv("FIREBASE_SERVICE_ACCOUNT_PATH")
        cred = credentials.Certificate(cred_path)
        firebase_admin.initialize_app(cred)
    
    return firestore.client()

# DB 객체 생성
db = init_firebase()