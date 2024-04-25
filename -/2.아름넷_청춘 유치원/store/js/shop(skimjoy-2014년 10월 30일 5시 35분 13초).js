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

//수량 증가
function modifyProductQuantity(id, quantity){
	
	 if(isNaN($("#"+id).val())){
		  alert( '숫자만 입력가능 합니다.' );
		  $("#"+id).focus();
		  $("#"+id).val(0);
		  return;
	 }
	
	 //var v = parseFloat($("#"+id).val())+parseFloat(quantity);    
	 //$("#"+id).val(Math.round(v*10)/10);
	  
	 var q = parseInt($("#"+id).val())+parseInt(quantity);    
	 $("#"+id).val(q);


};

//상세페이지 내 FAQ
function faq(){
	var $faq = $('#faq tbody');
	$faq.children('tr:odd').hide();
	$faq.find('.question a').click(function(){
		var $thisAnswer = $(this).closest('tr').next();
		if($thisAnswer.is(':hidden')){
			$faq.children('tr:odd').hide();
			$thisAnswer.show();
		}else{
			$thisAnswer.hide();
		}
		return false;
	});
};