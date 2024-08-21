$(function () {

    /* section1 */
    $('#section1 .slick').slick({
        autoplay: true,
        arrows: true,
        dots: true,
        accessibility: false,
        draggable: true,
        prevArrow: $('#section1 .control .prev'),
        nextArrow: $('#section1 .control .next'),
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        zIndex: 1000,
        pauseOnHover: false,
        autoplaySpeed: 5000,
        speed: 1500,
    });

    /* section2 */
    $('#section2 .slick').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        prevArrow: $('#section2 .control .prev'),
        nextArrow: $('#section2 .control .next'),
    });


});