/**
 * 마이페이지 사이드메뉴 클릭 시 해당 콘텐츠만 표시
 */
$(function () {
  const contentIds = [
    "content-userinfo_Authentication",
    "content-funding",
    "content-inquiry",
    "content-project",
    "content-logout",
    "content-userinfo_update"
  ];

  $(".menu-item").click(function () {
    const index = $(".menu-item").index(this);

    // 메뉴 활성화 처리
    $(".menu-item").removeClass("active");
    $(this).addClass("active");

    // 콘텐츠 표시 제어
    contentIds.forEach((id, i) => {
      if (i === index) {
        $("#" + id).show();
      } else {
        $("#" + id).hide();
      }
    });
  });
});


/**
 * 회원정보 수정_인증 버튼누르면 회원정보 수정페이지 show
 */
$(document).ready(function () {
  $('#btn-password-check').click(function (e) {
    e.preventDefault(); // 기본 form 전송 막기

    // 콘텐츠 전환
    $('#content-userinfo_Authentication').hide();
    $('#content-userinfo_update').show();

    // 선택사항: 메뉴 active 클래스 변경
    $('.menu-item').removeClass('active');
    $('.menu-item').eq(0).addClass('active'); // 첫 번째 메뉴 항목에 active 설정
  });
});