// jQuery 로드 함수
function loadJQuery(callback) {
  if (window.jQuery) {
    callback();
  } else {
    var script = document.createElement("script");
    script.src = "https://code.jquery.com/jquery-3.6.0.min.js";
    script.onload = callback; // jQuery 로드 완료 후 실행
    document.head.appendChild(script);
  }
}

// jQuery 코드 실행
loadJQuery(function () {
  //옆 슬라이더 바 내려오는 제이쿼리
  $(document).ready(function () {
    var $floating = $(".floating");
    var stopPosition = 150;
    var startOffset = 300;

    $(window).on("scroll", function () {
      var scrollTop = $(window).scrollTop();
      var newTop = scrollTop + startOffset;

      if (scrollTop < stopPosition) {
        $floating.stop().animate({ top: newTop + "px" });
      } else {
        $floating.stop().animate({ top: stopPosition + "px" });
      }
    });
  });

  // 헤더랑 푸터 불러오는 제이쿼리
  $(function () {
    $("#header").load("../../common/header.html");
  });
  $(function () {
    $("#footer").load("../../common/footer.html");
  });
});

