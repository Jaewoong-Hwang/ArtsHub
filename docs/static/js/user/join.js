function goToStep(step) {
    // 모든 섹션 숨기기
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  
    // 해당 섹션 보이기
    const target = document.getElementById('step' + step);
    if (target) {
      target.classList.add('active');
      target.scrollIntoView({ behavior: "smooth" });
    }
  }
  
  function submitForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
  
    if (!name || !email) {
      alert("이름과 이메일을 입력하세요.");
      goToStep(1);
      return;
    }
  
    alert("제출 완료! 🎉");
  }
  