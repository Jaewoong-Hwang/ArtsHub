document.addEventListener('DOMContentLoaded', () => {
  const stepOrder = ['info.html', 'description.html', 'reward.html', 'policy.html'];
  const currentPage = location.pathname.split('/').pop();
  const currentIndex = stepOrder.indexOf(currentPage);

  fetch('../../components/stepNavigation.html')
    .then(res => res.text())
    .then(html => {
      document.getElementById('step-nav-placeholder').innerHTML = html;

      const prevBtn = document.getElementById('prev-step');
      const nextBtn = document.getElementById('next-step');

      // 이전 단계 숨김 처리
      if (currentIndex <= 0) {
        prevBtn.style.display = 'none';
      } else {
        prevBtn.addEventListener('click', () => {
          location.href = stepOrder[currentIndex - 1];
        });
      }

      // 마지막 단계면 텍스트 변경
      if (currentIndex >= stepOrder.length - 1) {
        nextBtn.textContent = '제출하기';
      } else {
        // 다음 단계로 form 전송
        nextBtn.addEventListener('click', () => {
          const form = document.querySelector('form');
          if (form) {
            form.action = stepOrder[currentIndex + 1];
            form.submit();
          }
        });
      }
    });
});