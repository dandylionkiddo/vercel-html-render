from fastapi import APIRouter, HTTPException
from app.core.firebase import db
from app.models.schemas import DataPoint
from app.services.analysis import generate_summary

router = APIRouter()

@router.post("/")
async def add_data(dp: DataPoint):
    db.collection("data").document(dp.date).set(dp.dict())
    return {"message": "저장 성공", "data": dp}

@router.get("/")
async def get_all_data():
    docs = db.collection("data").order_by("date").stream()
    return [{"id": doc.id, **doc.to_dict()} for doc in docs]

@router.delete("/{doc_id}")
async def delete_data(doc_id: str):
    db.collection("data").document(doc_id).delete()
    return {"message": "삭제 성공"}

@router.get("/summary")
async def get_data_summary():
    docs = db.collection("data").order_by("date").stream()
    data_list = [doc.to_dict() for doc in docs]
    return generate_summary(data_list)