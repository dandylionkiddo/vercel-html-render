/**
 * app.js: 백엔드 API 통신 및 비즈니스 로직 담당
 */

// 1. API 설정 (로컬 테스트용)
// 배포 후에는 'https://your-backend-url.onrender.com/api'로 변경하세요.
const API_URL = "http://localhost:8000/api";

// 2. 초기화 및 이벤트 리스너 등록
document.addEventListener('DOMContentLoaded', () => {
    // 초기 데이터 로드
    loadData();

    // 데이터 추가 폼 제출 이벤트
    const dataForm = document.getElementById('data-form');
    if (dataForm) {
        dataForm.addEventListener('submit', handleDataSubmit);
    }

    // 채팅 전송 버튼 클릭 이벤트
    const sendBtn = document.getElementById('send-btn');
    if (sendBtn) {
        sendBtn.addEventListener('click', handleChatSubmit);
    }

    // 채팅 입력창 엔터키 이벤트
    const chatInput = document.getElementById('chat-input');
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleChatSubmit();
        });
    }
});

// 3. 데이터 로드 (요약 + 목록)
async function loadData() {
    try {
        // 요약 정보 가져오기
        const summaryRes = await fetch(`${API_URL}/data/summary`);
        const summaryData = await summaryRes.json();
        UI.renderSummary(summaryData);

        // 전체 데이터 목록 가져오기
        const dataRes = await fetch(`${API_URL}/data`);
        const dataList = await dataRes.json();
        UI.renderDataList(dataList);
    } catch (error) {
        console.error("데이터를 불러오는 중 오류 발생:", error);
    }
}

// 4. 데이터 추가 처리
async function handleDataSubmit(e) {
    e.preventDefault();

    const dateInput = document.getElementById('date-input');
    const valueInput = document.getElementById('value-input');
    const memoInput = document.getElementById('memo-input');

    const payload = {
        date: dateInput.value,
        value: parseFloat(valueInput.value),
        memo: memoInput.value
    };

    try {
        const response = await fetch(`${API_URL}/data/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            // 입력창 초기화
            dateInput.value = '';
            valueInput.value = '';
            memoInput.value = '';
            
            // 데이터 갱신
            await loadData();
            alert("데이터가 성공적으로 추가되었습니다!");
        }
    } catch (error) {
        console.error("데이터 추가 중 오류 발생:", error);
        alert("데이터 추가에 실패했습니다.");
    }
}

// 5. 데이터 삭제 처리 (window 객체에 등록하여 ui.js의 onclick에서 접근 가능하게 함)
window.handleDelete = async (id) => {
    if (!confirm("정말로 이 기록을 삭제하시겠습니까?")) return;

    try {
        const response = await fetch(`${API_URL}/data/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            await loadData();
        }
    } catch (error) {
        console.error("데이터 삭제 중 오류 발생:", error);
    }
};

// 6. AI 채팅 메시지 전송 처리
async function handleChatSubmit() {
    const chatInput = document.getElementById('chat-input');
    const message = chatInput.value.trim();

    if (!message) return;

    // 1) 사용자 메시지 화면에 추가
    UI.appendMessage('user', message);
    chatInput.value = '';

    // 2) 로딩 표시 시작
    UI.toggleLoading(true);

    try {
        // 3) 백엔드 API 호출
        const response = await fetch(`${API_URL}/chat/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: message })
        });

        if (!response.ok) throw new Error("서버 응답 오류");

        const data = await response.json();

        // 4) AI 응답 화면에 추가
        UI.appendMessage('assistant', data.answer);
    } catch (error) {
        console.error("채팅 중 오류 발생:", error);
        UI.appendMessage('assistant', "죄송합니다. 메시지를 처리하는 중에 문제가 발생했습니다.");
    } finally {
        // 5) 로딩 표시 종료
        UI.toggleLoading(false);
    }
}