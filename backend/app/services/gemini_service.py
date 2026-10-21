import google.generativeai as genai
from app.core.config import settings

genai.configure(api_key=settings.GEMINI_API_KEY)
# model = genai.GenerativeModel('gemini-pro')
model = genai.GenerativeModel('gemini-flash-latest')

def get_gemini_response(prompt: str):
    response = model.generate_content(prompt)
    return response.text