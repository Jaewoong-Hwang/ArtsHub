/**
 * 마이페이지 사이드메뉴 클릭시 선택메뉴 표시
 */
$(function () {
    $(".menu-item").click(function () {
      $(".menu-item").removeClass("active");
      $(this).addClass("active");
    });
  });