$(function () {

    $(window).load(function () {
        AOS.init({
            duration: 1500
        });

    });

    $('#section1').mouseover(function () {
       $('.aside_depth2').stop().slideUp();
    });

    $('aside nav .aside_depth1 > li > a').mouseover(function () {
        $('aside nav .aside_depth1 > li > a').parent('li').children('.aside_depth2').stop().slideUp();
        $(this).parent('li').children('.aside_depth2').stop().slideDown();
    });
    $('.aside_depth2').mouseleave(function () {
        $('aside nav .aside_depth1 > li > a').parent('li').children('.aside_depth2').stop().slideUp();
    });

});