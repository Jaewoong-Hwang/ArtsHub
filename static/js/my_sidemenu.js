/**
 * 마이페이지 사이드메뉴 클릭 시 해당 콘텐츠만 표시
 */
$(function () {
  const contentIds = [
    "content-userinfo_Authentication",
    "content-userinfo_update",
    "content-funding",
    "content-funding-history",
    "content-funding-refund",
    "content-inquiry",
    "content-inquiry-write",
    "content-inquiry-list",
    "content-project",
    "content-project-join",
    "content-logout"
  ];

  // 메인 메뉴 클릭
  $(".menu-item").click(function (e) {
    const isSubmenu = $(this).hasClass("has-submenu");
    const target = $(this).data("target");

    // 콘텐츠 전환
    contentIds.forEach((id) => $("#" + id).hide());
    if (target) $("#" + target).show();

    // 메뉴 상태 초기화
    $(".menu-item").removeClass("active open");
    $(".submenu-item").removeClass("active");

    if (isSubmenu) {
      // 서브메뉴 토글
      $(this).addClass("open active");
    } else {
      $(this).addClass("active");
    }
  });

  // 서브메뉴 클릭
  $(".submenu-item").click(function (e) {
    e.stopPropagation(); // 부모 menu-item 클릭 방지
    const target = $(this).data("target");

    // 콘텐츠 전환
    contentIds.forEach((id) => $("#" + id).hide());
    $("#" + target).show();

    // 메뉴 상태 표시
    $(".submenu-item").removeClass("active");
    $(".menu-item").removeClass("active");
    $(this).closest(".menu-item").addClass("active open");
    $(this).addClass("active");
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