$(function () {
    'use strict';
    // 신세계몰 메인 왼쪽 메뉴 - 조건에 따라 존재!
    $(".nav .s_tit").bind({
        mouseenter: function () {
            $(".nav .s_tit").parent("li").removeClass("on");
            if ($(this).siblings(".s_dep").length > 0) {
                $(this).parent("li").addClass("on");
            }
            $(".s_dep").hide();
            $(this).siblings(".s_dep").show();
        },
        focusin: function () {
            $(".nav .s_tit").parent("li").removeClass("on");
            if ($(this).siblings(".s_dep").length > 0) {
                $(this).parent("li").addClass("on");
            }
            $(".s_dep").hide();
            $(this).siblings(".s_dep").show();
        }
    }).last().closest('li').find('.s_dep ul>li').last().on('focusout',function(e){
        var welTarget = $(e.currentTarget).parents("li");
        welTarget.removeClass("on").find(".s_dep").hide();
    });

    $(".snb .nav").bind("mouseleave", function () {
        $(".nav .s_tit").parent("li").removeClass("on");
        $(".s_dep").hide();
    });

    $(".nav .last .small_mn li a").last().focusout(function () {
        $(".nav .s_tit").parent("li").removeClass("on");
        $(".s_dep").hide();
    });


    /* 상단 카테고리 경로 선택 */
    $(".location .select strong").bind("mousedown", function () {
        $(this).next().toggleClass("on");
    });


    /* 상단 메인 비쥬얼 롤링 */
    var nMainCurrentNum = 0;
    $('.main_visual .list a').eq(nMainCurrentNum).addClass("on");
    $('.main_visual .visual_box div').eq(nMainCurrentNum).css("z-index", "5");

    $(".main_visual .list a").bind("focusin mouseenter", function () {
        var nOldNum = nMainCurrentNum;
        var nNewNum = $(this).index();
        $('.main_visual .list a').eq(nOldNum).removeClass();
        $(this).addClass("on");
        $('.main_visual .visual_box div').eq(nMainCurrentNum).css("z-index", "-1");
        $('.main_visual .visual_box div').eq(nNewNum).css("z-index", "5");
        nMainCurrentNum = nNewNum;
    });


    /* 프로모션 버튼 */
    var $pr_currentNum = 1;
    $(".promotion .btns li a").eq(0).addClass("on");
    $(".promotion .btns li > a").bind("focusin mouseenter", function () {
        var $pr_oldNum = $pr_currentNum;
        var $pr_newNum = $(this).html();
        $('.promotion .btns li > a').eq($pr_oldNum - 1).removeClass();
        $(this).addClass("on");
        $(".promotion .banners div").eq($pr_currentNum - 1).hide();
        $(".promotion .banners div").eq($pr_newNum - 1).show();
        $pr_currentNum = $pr_newNum;
    });
    /* 대 카테고리 브랜드 찾기 */
    // 브랜드 찾기열기
    $('.snb .brand_search>a').click(function () {
        $(this).siblings('.brand_srch').show();
        // 브랜드 찾기 내 스크롤러
        $('#scrollbar1').tinyscrollbar();
    });
    // 브랜드 찾기닫기
    $('.brand_srch .close_btn a').click(function () {
        $('.brand_srch').hide();
    });


    /* 소카테고리 */

    // 브랜드 검색 JS 더보기 닫기 이벤트 - 브랜드 전체보기[button]
    $(".brand_search .search_box li:gt(14)").hide();
    if ($(".brand_search .search_box li").size() < 5) {
        // 2013.08.02 디자인 변경후 ul 나열이 아닌 li 로 리스팅으로 변경 ul 갯수$(".brand_search .more_btn").hide();
    }

    $(".brand_search .more_btn a").click(function () {
        if($(".brand_search .search_box li").length > 15){
            var searBox = $(".brand_search .search_box");
            if (searBox.hasClass('on')) {
                $(this).removeClass('on');
                searBox.removeClass('on');
                $(".brand_search .search_box li:gt(14)").hide();
            } else {
                $(this).addClass('on');
                searBox.addClass('on').find('li').show();
            }
        }

    });


    /* 소카테고리 SM-display-A-003-01.html */
    // 상품수 정렬 select (20개, 30개...)

    $('.view_control .sort_select a').click(function () {
        $(this).parents('.view_control').find('.list').show();
    });
    $('.view_control .list a').click(function () {
        $('.view_control .list').hide();
    });


    /* 2013.08.05 중,소, 브랜드매장 브랜드찾기 */
    $('.brand_cate_box .brand_find_btn>a').click(function () {
        $('.brand_srch').show();
        // 브랜드 찾기 내 스크롤러
        $('#scrollbar1').tinyscrollbar();
    });
    // 브랜드 찾기닫기
    $('.brand_srch .close_btn a').click(function () {
        $('.brand_srch').hide();
    });

    /* 2013.08.06 개발자 요청 수정 - 상단 현재 위치 셀렉트 박스  */
    $(".path_area .select_box").bind({
        mouseenter: function () {
            $(this).addClass("on");
        },
        mouseleave: function () {
            $(this).removeClass("on");
        },
        focusin: function () {
            $('.select_box').removeClass("on");
            $(this).addClass("on");
        }

    });

    $(".path_over_list a:last").bind({
        focusout: function () {
            $('.select_box').removeClass("on");
        }

    });

    /* 여행카테 GNB */
    $('.tr_gnb > ul > li').bind({
        mouseenter: function () {
            $(this).addClass("on");
            $(this).css("z-index", "2");
        },
        mouseleave: function () {
            $(this).removeClass("on");
            $(this).css("z-index", "1");
        }
    });
});


