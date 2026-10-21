import json
import firebase_admin
from firebase_admin import credentials, firestore
from .config import settings

if settings.FIREBASE_SERVICE_ACCOUNT_JSON:
    # Render: 환경변수에 넣은 JSON 내용 사용
    cred = credentials.Certificate(json.loads(settings.FIREBASE_SERVICE_ACCOUNT_JSON))
else:
    # 로컬: .env에 적힌 파일 경로 사용
    cred = credentials.Certificate(settings.FIREBASE_SERVICE_ACCOUNT_PATH)

if not firebase_admin._apps:
    firebase_admin.initialize_app(cred)

db = firestore.client()