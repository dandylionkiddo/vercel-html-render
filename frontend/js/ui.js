const UI = {
    // 1. 데이터 요약 정보 업데이트
    renderSummary: (summary) => {
        const container = document.getElementById('summary-content');
        if (!summary || summary.error) {
            container.innerHTML = "<p>데이터가 부족합니다.</p>";
            return;
        }
        container.innerHTML = `
            <div class="summary-item">📅 기간: <span>${summary.period}</span></div>
            <div class="summary-item">📈 평균: <span>${summary.metrics.average}h</span></div>
            <div class="summary-item">🔥 트렌드: <span class="trend-${summary.trend === '상승' ? 'up' : 'down'}">${summary.trend}</span></div>
        `;
    },

    // 2. 최근 데이터 목록 업데이트
    renderDataList: (dataList, onDelete) => {
        const listEl = document.getElementById('data-list');
        listEl.innerHTML = dataList.slice(-7).reverse().map(d => `
            <li class="data-item">
                <span>${d.date.slice(5)}: <strong>${d.value}h</strong></span>
                <button class="del-btn" onclick="handleDelete('${d.id}')">✕</button>
            </li>
        `).join('');
    },

    // 3. 채팅 메시지 추가
    appendMessage: (role, text) => {
        const chatWindow = document.getElementById('chat-window');
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${role}`;
        
        // 마크다운 형식이 섞여 올 수 있으므로 간단한 줄바꿈 처리
        msgDiv.innerText = text; 
        
        chatWindow.appendChild(msgDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight; // 스크롤 하단 이동
    },

    // 4. 로딩 표시 제어
    toggleLoading: (isLoading) => {
        const loader = document.getElementById('loading');
        if (isLoading) loader.classList.remove('hidden');
        else loader.classList.add('hidden');
    }
};