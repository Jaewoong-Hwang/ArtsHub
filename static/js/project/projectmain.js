// 사용자 로그인 상태 확인용 (Mock)
const isLoggedIn = true;
const isExpert = true;

// 카드 템플릿 생성 함수
function createProjectCard({ title, creator, percent, status, thumbnail }) {
  return `
    <div class="card">
      <img src="${thumbnail}" alt="${title}">
      <h3>${title}</h3>
      <p>창작자: ${creator}</p>
      <div class="progress-bar"><span style="width: ${percent}%;"></span></div>
      <span class="status-badge">${status}</span>
    </div>
  `;
}

// 데이터 렌더링 예시
function renderProjects() {
  const dummy = [
    { title: "어느 피아니스트의 이야기", creator: "홍길동", percent: 80, status: "진행중", thumbnail: "/static/img/thumb1.jpg" },
    { title: "연극 <기억의 조각>", creator: "이예술", percent: 40, status: "예정", thumbnail: "/static/img/thumb2.jpg" }
  ];
  const popular = document.getElementById('popular-slider');
  const recommended = document.getElementById('recommended-projects');
  const recent = document.getElementById('new-projects');

  dummy.forEach(item => {
    const card = createProjectCard(item);
    popular.innerHTML += card;
    recommended.innerHTML += card;
    recent.innerHTML += card;
  });
}

// 등록 버튼 클릭 처리
function handleProjectCreate() {
  if (!isLoggedIn) {
    window.location.href = "/login";
  } else if (!isExpert) {
    alert("전문가 권한이 필요합니다.");
  } else {
    window.location.href = "/project/create";
  }
}

// '내 프로젝트 보기' 버튼 조건부 노출
window.onload = () => {
  renderProjects();
  if (isLoggedIn && isExpert) {
    document.getElementById("my-project-btn").style.display = "block";
  }
};