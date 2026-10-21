from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api import data, chat

app = FastAPI(title=settings.PROJECT_NAME)

# CORS 설정 (Vercel 배포 시 필수)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 라우터 등록
app.include_router(data.router, prefix="/api/data", tags=["Data"])
app.include_router(chat.router, prefix="/api/chat", tags=["Chat"])

@app.get("/")
async def root():
    return {"message": "AI 비서 백엔드 서버가 작동 중입니다."}