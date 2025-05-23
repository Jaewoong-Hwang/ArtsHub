document.addEventListener('DOMContentLoaded', () => {
  // 헤더 컴포넌트 삽입
  const header = document.getElementById('header-placeholder');
  if (header) {
    fetch('/components/projectHeader.html')
      .then(res => res.text())
      .then(html => {
        header.innerHTML = html;
      });
  }
});