$(function () {

    /* header */
    $(window).scroll(function () {
        if ($(window).scrollTop() > 0) {
            $('#header').addClass('fixed');
        } else {
            $('#header').removeClass('fixed');
        }
    });
    $(window).on('load', function () {
        $('#header').addClass('active');
    });
    $('#header .depth1 li').mouseover(function () {
        $(this).find('.depth2_wrap').css('height', 'auto');
    });
    $('#header .depth1 li').mouseleave(function () {
        $('#header .depth2_wrap').css('height', '0');
    });

    /* sitemap */
    $('#header .sitemap').click(function () {
        $('#site_map').animate({ left: 0 }, 1000);
        $('#header #site_map .m_depth1').addClass('active');
    });
    $('#header .m_sitempa_close').click(function () {
        $('#site_map').animate({ left: -3000 }, 1000);
        $('#header #site_map .m_depth1').removeClass('active');
    });
    $('#header #site_map .m_depth2 > li').mouseover(function () {
        if ($(this).find('.m_depth3').length) {
            $(this).find('.m_depth3').stop().fadeIn();
        }
    });
    $('#header #site_map .m_depth2 > li').mouseleave(function () {
        $('#header #site_map .m_depth2 > li').find('.m_depth3').stop().hide();
    });

    $('#header .sitemap').click(function () {
        $('#mobile_menu').animate({ left: 0 }, 1000);
    });
    $('#header .m_sitempa_close').click(function () {
        $('#mobile_menu').animate({ left: -3000 }, 1000);
    });

    /* mobile */
    $('#header .mobilemenu').click(function () {
        $('#mobile_menu').animate({ left: 0 }, 1000);

    });
    $('#header .m_mobile_close').click(function () {
        $('#mobile_menu').animate({ left: -3000 }, 1000);

    });
    $('#header #mobile_menu .m_depth1 li h2 a').click(function () {
        if ($(this).parents('li').hasClass('active')) {
            $('#header #mobile_menu .m_depth1 li h2 a').parents('li').find('.m_depth2').stop().slideUp();
            $('#header #mobile_menu .m_depth1 li h2 a').parents('li').removeClass('active');
        } else {
            $('#header #mobile_menu .m_depth1 li h2 a').parents('li').removeClass('active');
            $('#header #mobile_menu .m_depth1 li h2 a').parents('li').find('.m_depth2').stop().slideUp();
            $(this).parents('li').addClass('active');
            $(this).parents('li').find('.m_depth2').stop().slideDown();
        }
        return false;
    });
    $('#header #mobile_menu .m_depth2 li h3 a').click(function () {
        if ($(this).parent().parent().find('.m_depth3').length) {
            if ($(this).parent().hasClass('active')) {
                $(this).parent().removeClass('active');
                $(this).parent().siblings('.m_depth3').slideUp(400);
            } else {
                $('.m_depth2 li h3').removeClass('active');
                $('.m_depth3').slideUp(400);
                $(this).parent().addClass('active');
                $(this).parent().siblings('.m_depth3').slideDown(400);
            }
            return false;
        }
    });
    $('#header #mobile_menu .m_depth3 li h4 a').click(function () {
        $('#header #mobile_menu .m_depth3 li h4 a').parent().removeClass('active');
        $(this).parent().addClass('active');
    });

    /* footer */
    $('.site_wrap .box a').click(function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $(this).parent('.box').next('.view_box').slideUp();
        } else {
            $(this).addClass('active');
            $(this).parent('.box').next('.view_box').slideDown();
        }
        return false
    });


});