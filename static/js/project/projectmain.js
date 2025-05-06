// 👉 로그인 및 전문가 여부는 서버에서 렌더링한 값이거나, 세션/쿠키 기반임
// (예시로 하드코딩 처리. 실제 환경에서는 동적 변수 대입 필요)
const isLoggedIn = true;
const isExpert = true;

// ✅ 프로젝트 만들기 버튼 클릭
const createBtn = document.querySelector('.btn.blue');
createBtn.addEventListener('click', () => {
  if (!isLoggedIn) {
    alert("로그인이 필요합니다.");
    window.location.href = "/login";
  } else if (!isExpert) {
    alert("전문가 권한이 필요합니다.");
  } else {
    window.location.href = "/project/create";
  }
});

// ✅ 프로젝트 참가하기 버튼 클릭
const joinBtn = document.querySelector('.btn.outline');
joinBtn.addEventListener('click', () => {
  window.location.href = "/project/explore";
});

// ✅ 프로젝트 카드 동적 생성 함수 예시 (탐색 페이지용)
function renderProjectCards(containerId, projectList) {
  const container = document.getElementById(containerId);
  if (!container) return;

  projectList.forEach(project => {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <img src="${project.thumbnail}" alt="${project.title}">
      <h3>${project.title}</h3>
      <p>창작자: ${project.creator}</p>
      <div class="progress-bar">
        <span style="width:${project.percent}%;"></span>
      </div>
      <span class="status-badge">${project.status}</span>
    `;

    card.addEventListener('click', () => {
      window.location.href = `/project/${project.id}`;
    });

    container.appendChild(card);
  });
}

// ✅ 더미 데이터 (추후 API 연동 가능)
const dummyProjects = [
  {
    id: 101,
    title: "무용과 영상의 경계",
    creator: "김예술",
    percent: 65,
    status: "진행중",
    thumbnail: "/static/img/sample1.jpg"
  },
  {
    id: 102,
    title: "현대 클래식 콜라보",
    creator: "이작곡",
    percent: 85,
    status: "예정",
    thumbnail: "/static/img/sample2.jpg"
  }
];

// ❗예시 호출: 탐색 페이지에서 사용
// renderProjectCards('recommended-projects', dummyProjects);