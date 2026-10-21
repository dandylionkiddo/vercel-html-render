from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

# .env 파일 로드
load_dotenv()

app = FastAPI(title="AI 비서 API")

# CORS 설정: 프론트엔드에서 접근 가능하도록 허용
origins = os.getenv("ALLOWED_ORIGINS", "*").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "AI 비서 백엔드 서버가 작동 중입니다!"}

# 서버 실행: uvicorn main:app --reload