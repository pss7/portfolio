$(function() {

  /* 타이핑 효과 */
  var typingBool = false;
  var typingIdx = 0;
  var liIndex = 0;
  var liLength = $(".section1 .video_text .typing-txt ul li").length;

  var typingTxt = $(".section1 .video_text .typing-txt ul li").eq(liIndex).text();

  typingTxt = typingTxt.split("");

  if (typingBool == false) {
    typingBool = true;
    var tyInt = setInterval(typing, 110);
  }

  function typing() {
    $(".section1 .video_text .typing-txt ul li").removeClass("on");
    $(".section1 .video_text .typing-txt ul li").eq(liIndex).addClass("on");

    if (typingIdx < typingTxt.length) {
      $(".typing ul li").eq(liIndex).append(typingTxt[typingIdx]);
      typingIdx++;
    } else {
      if (liIndex < liLength - 1) {
        liIndex++;
        typingIdx = 0;
        typingBool = false;
        typingTxt = $(".typing-txt>ul>li").eq(liIndex).text();

        clearInterval(tyInt);

        setTimeout(function() {
          tyInt = setInterval(typing, 110);
        }, 1000);
      } else if (liIndex == liLength - 1) {

        clearInterval(tyInt);

        setTimeout(function() {

          typingBool = false;
          liIndex = 0;
          typingIdx = -0;

          typingTxt = $(".typing-txt>ul>li").eq(liIndex).text();

          $(".typing ul li").html("");

          tyInt = setInterval(typing, 110);
        }, 1000);

      }
    }
  }

  /* 메뉴 누르면 해당 영역으로 이동3 */
  $('.header a').on('click', function(e) {
    var index = $(this).attr('href');
    var secTop = $(index).offset().top;
    $("html, body").animate({
      'scrollTop': secTop - 60
    }, 600);
  });

  /* 메뉴 누르면 해당 영역으로 이동3 -mobile- */
  $('.header .mobile_menu_main_nav a').on('click', function(e) {
    var index = $(this).attr('href');
    var secTop = $(index).offset().top;
    $("html, body").animate({
      'scrollTop': secTop - 60
    }, 600);
  });

  /* 클릭 시 스크롤 내리기 */
  $(".click").click(function(event) {
    event.preventDefault();
    $('html,body').animate({
      scrollTop: $(this.hash).offset().top - 60
    }, 700);
  });

  /* 스크롤 이벤트 플러그인 */
  $(function() {
    AOS.init({
      disable: false,
      startEvent: 'DOMContentLoaded',
      initClassName: 'aos-init',
      animatedClassName: 'aos-animate',
      useClassNames: false,
      disableMutationObserver: false,
      debounceDelay: 50,
      throttleDelay: 99,
      offset: 120,
      delay: 400,
      duration: 1500,
      easing: 'ease',
      once: false,
      mirror: false,
      anchorPlacement: 'top-bottom',
    });
  });

  /* tab */
  $('.portfolio_content').hide();
  $('.portfolio_content').first().show();
  $('.portfolio_tab li').click(function() {
    $('.portfolio_tab li').children().removeClass('active');
    $(this).children().addClass('active');
    var Idx = $(this).index();
    $('.portfolio_content').hide();
    $('.portfolio_content').eq(Idx).show();
    return false;
  });

  /* 상단으로 이동 */
  $('#top').click(function() {
    $('html, body').animate({
        scrollTop: 0
      },
      1000);
    return false;
  });

  /* 스크롤 시 top 버튼 */
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#top').fadeIn();
    } else {
      $('#top').fadeOut();
    }
  });

})
