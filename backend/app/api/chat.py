from fastapi import APIRouter
from app.core.firebase import db
from app.models.schemas import ChatRequest
from app.services.gemini_service import get_gemini_response
from .data import get_data_summary
import time

router = APIRouter()

@router.post("/")
async def chat_with_ai(req: ChatRequest):
    # 1. 데이터 요약 정보 가져오기 (컨텍스트 주입)
    summary = await get_data_summary()
    
    # 2. 시스템 프롬프트 생성
    system_prompt = f"""
    당신은 사용자의 학습 데이터를 분석하는 전문 비서입니다. 
    아래의 [사용자 데이터 요약] 정보를 바탕으로 질문에 친절하게 답하세요.
    
    [사용자 데이터 요약]
    - 기간: {summary.get('period')}
    - 총 기록 횟수: {summary.get('count')}회
    - 평균 수치: {summary.get('metrics', {}).get('average')}
    - 현재 트렌드: {summary.get('trend')}
    """
    
    full_prompt = f"{system_prompt}\n\n사용자 질문: {req.message}"
    ai_answer = get_gemini_response(full_prompt)
    
    # 3. 대화 기록 저장 (미션 요구사항)
    chat_doc = db.collection("conversations").document()
    chat_doc.set({
        "messages": [
            {"role": "user", "content": req.message},
            {"role": "assistant", "content": ai_answer}
        ],
        "timestamp": time.time()
    })
    
    return {"answer": ai_answer}