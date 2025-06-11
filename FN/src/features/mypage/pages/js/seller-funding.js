
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







// #region 전문가 프로필 수정버튼

  function startEdit(el) {
    const container = el.closest('.expert-info-data');
    const input = container.querySelector('input');
    const editLink = container.querySelector('.edit-link');
    const editActions = container.querySelector('.edit-actions');

    input.dataset.original = input.value; // 원본 값 저장
    input.disabled = false;
    input.focus();

    editLink.style.display = 'none';
    editActions.style.display = 'flex';
  }

  function cancelEdit(el) {
    const container = el.closest('.expert-info-data');
    const input = container.querySelector('input');
    const editLink = container.querySelector('.edit-link');
    const editActions = container.querySelector('.edit-actions');

    input.value = input.dataset.original; // 원래 값으로 복원
    input.disabled = true;

    editLink.style.display = 'inline';
    editActions.style.display = 'none';
  }

  function applyEdit(el) {
    const container = el.closest('.expert-info-data');
    const input = container.querySelector('input');
    const editLink = container.querySelector('.edit-link');
    const editActions = container.querySelector('.edit-actions');

    input.disabled = true;

    editLink.style.display = 'inline';
    editActions.style.display = 'none';

    // 필요 시 서버 전송도 여기에 추가
    console.log('수정된 값:', input.value);
  }

// #endregion