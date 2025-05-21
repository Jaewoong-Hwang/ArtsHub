document.addEventListener('DOMContentLoaded', () => {

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