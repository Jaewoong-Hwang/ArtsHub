//파일 첨부하는 코드

function loadFile(input){
    let file = input.files[0];
    let newImage = document.createElement("img");

    newImage.src= URL.createObjectURL(file);
    newImage.style.width = "100%";
    newImage.style.height = "100%";
    newImage.style.objectFit = "cover";

    let container = document.getElementById('image-show');
    container.appendChild(newImage);
}

// 년월일이 너무 많아서 자바 스크립트로 작업해둔것

document.addEventListener("DOMContentLoaded", function(){

    // 연도 생성 (1900년 ~ 올해까지)
    const yearSelect = document.getElementById('year');
    const currentYear = new Date().getFullYear();
    for (let y = currentYear; y >= 1900; y--) {
    const option = document.createElement('option');
    option.value = y;
    option.text = y;
    yearSelect.appendChild(option);
    }

    // 월 생성
    const monthSelect = document.getElementById('month');
    for (let m = 1; m <= 12; m++) {
    const option = document.createElement('option');
    option.value = m;
    option.text = m;
    monthSelect.appendChild(option);
    }

    // 일 생성
    const daySelect = document.getElementById('day');
    for (let d = 1; d <= 31; d++) {
    const option = document.createElement('option');
    option.value = d;
    option.text = d;
    daySelect.appendChild(option);
    }
})

function checkPasswordMatch() {
    const password = document.getElementById('password').value;
    const repassword = document.getElementById('re-password').value;
    const message = document.getElementById('match-message');

    if (repassword === '') {
      message.textContent = '';
    } else if (password === repassword) {
      message.textContent = '✅ 비밀번호가 일치합니다!';
      message.style.color = 'green';
    } else {
      message.textContent = '❌ 비밀번호가 일치하지 않습니다.';
      message.style.color = 'red';
    }
  }