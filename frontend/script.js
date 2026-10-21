// 나중에 백엔드 배포 후 URL을 여기에 넣을 거예요.
const API_URL = "http://localhost:8000"; 

fetch(API_URL)
    .then(res => res.json())
    .then(data => {
        document.getElementById('response').innerText = data.message;
    })
    .catch(err => console.error("연결 실패:", err));