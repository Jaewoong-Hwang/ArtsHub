/**
 * 마이페이지 사이드메뉴 클릭 시 해당 콘텐츠만 표시
 */
$(function () {
  const contentIds = [
    "content-userinfo_Authentication",
    "content-funding",
    "content-inquiry",
    "content-project"
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