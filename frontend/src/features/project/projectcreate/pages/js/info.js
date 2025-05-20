document.addEventListener('DOMContentLoaded', () => {
  // 현재 페이지에 따라 사이드바 active 처리
  const currentPage = location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('.sidebar li');

  navLinks.forEach((li) => {
    const link = li.querySelector('a');
    if (link && link.getAttribute('href') === currentPage) {
      li.classList.add('active');
    } else {
      li.classList.remove('active');
    }
  });

  // 임시 저장 버튼 클릭 시 모달 띄우기
  const saveButton = document.querySelector('.btn.outline');
  const modal = document.getElementById('save-modal');
  const closeBtn = document.getElementById('close-modal');

  if (saveButton && modal && closeBtn) {
    saveButton.addEventListener('click', () => {
      modal.classList.remove('hidden');
    });

    closeBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        modal.classList.add('hidden');
      }
    });
  }
});