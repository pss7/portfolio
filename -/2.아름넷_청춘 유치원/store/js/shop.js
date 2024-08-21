
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
	var $faq2 = $('#faq2 tbody');
	$faq2.children('tr:odd').hide();
	$faq2.find('.question a').click(function(){
		var $thisAnswer = $(this).closest('tr').next();
		if($thisAnswer.is(':hidden')){
			var secretYn = $(this).attr("secretYn");
			var writeId = $(this).attr("writeId");
			if (!commonUtils.isEmpty(secretYn) && !commonUtils.isEmpty(writeId) && secretYn === '1' && (loginUser.loginYn === 'N' || writeId !== loginUser.membId)) {
				alert("비공개 글은 작성자만 확인할 수 있습니다.");
				return false;
			}
			$faq2.children('tr:odd').hide();
			$thisAnswer.show();
		}else{
			$thisAnswer.hide();
		}
		return false;
	});
};

//탭메뉴
$(document).ready(function() {
	//hiding tab content except first one
	$(".tabContent").not(":first").hide(); 
	// adding Active class to first selected tab and show 
	$("ul.tabs li:first").addClass("active").show();  
	
	// Click event on tab
	$("ul.tabs li").click(function() {
		// Removing class of Active tab
		$("ul.tabs li.active").removeClass("active"); 
		// Adding Active class to Clicked tab
		$(this).addClass("active"); 
		// hiding all the tab contents
		$(".tabContent").hide();		
		// showing the clicked tab's content using fading effect
		$($('a',this).attr("href")).fadeIn('slow'); 
		
		return false;
	});
});