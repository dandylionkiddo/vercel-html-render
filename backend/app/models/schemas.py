from pydantic import BaseModel
from typing import List, Optional

class DataPoint(BaseModel):
    date: str
    value: float
    memo: Optional[str] = None

class Message(BaseModel):
    role: str  # user 또는 assistant
    content: str

class ChatRequest(BaseModel):
    message: str