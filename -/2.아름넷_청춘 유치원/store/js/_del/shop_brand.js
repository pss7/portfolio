$(function () {
    'use strict';
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

});