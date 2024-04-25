$(function () {

    $(window).load(function () {
        AOS.init({
            duration: 1500
        });

    });

    $('#section1').mouseover(function () {
       $('.snb-depth2').stop().slideUp();
    });

    $('.sub-category nav .snb-depth1 > li > a').mouseover(function () {
        $('.sub-category nav .snb-depth1 > li > a').parent('li').children('.snb-depth2').stop().slideUp();
        $(this).parent('li').children('.snb-depth2').stop().slideDown();
    });
    $('.snb-depth2').mouseleave(function () {
        $('.sub-category nav .snb-depth1 > li > a').parent('li').children('.snb-depth2').stop().slideUp();
    });

});