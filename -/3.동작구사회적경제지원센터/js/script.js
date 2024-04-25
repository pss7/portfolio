$(function () {

    /* header */
    $('#header .depth1 > li').mouseover(function () {
        $(this).find('.depth2').stop().fadeIn();
    });
    $('#header .depth1 > li').mouseleave(function () {
        $(this).find('.depth2').hide();
    });

    /* footer */
    $('#footer .slick').slick({
        autoplay: true,
        arrows: true,
        infinite: true,
        variableWidth: true,
        prevArrow: $('#footer .control .prev'),
        nextArrow: $('#footer .control .next'),
        slidesToScroll: 1,
        zIndex: 1000,
        autoplaySpeed: 5000,
        speed: 1500,
        responsive: [
            {
                breakpoint: 481,
                settings: {
                    vertical: true,
                    autoplay: false,
                    verticalSwiping: true,
                    infinite: true,
                    variableWidth: false,
                    rows: 2,
                    centerMode: true
                }
            },
        ]

    });


});