
  function toggleDropdown(button) {
    // 모든 드롭다운 숨김
    document.querySelectorAll('.dropdown-menu').forEach(el => el.style.display = 'none');

    // 해당 버튼 바로 다음 드롭다운만 표시
    const dropdown = button.nextElementSibling;
    if (dropdown.style.display === 'block') {
      dropdown.style.display = 'none';
    } else {
      dropdown.style.display = 'block';
    }
  }

  function handleSelect(action) {
    console.log("선택된 옵션:", action);

    // 여기에 AJAX 로직 삽입 가능
    // 예: fetch('/update', { method: 'POST', body: JSON.stringify({ status: action }) })

    // 드롭다운 닫기
    document.querySelectorAll('.dropdown-menu').forEach(el => el.style.display = 'none');
  }

  // 외부 클릭 시 드롭다운 닫기
  window.addEventListener('click', function(e) {
    if (!e.target.matches('.edit-button')) {
      document.querySelectorAll('.dropdown-menu').forEach(el => el.style.display = 'none');
    }
  });

