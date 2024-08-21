//jQuery(function($){
//	$.datepicker.regional['ko'] = {
//		closeText: '닫기',
//		prevText: '이전달',
//		nextText: '다음달',
//		currentText: '오늘',
//		monthNames: ['1월(JAN)','2월(FEB)','3월(MAR)','4월(APR)','5월(MAY)','6월(JUN)',
//		'7월(JUL)','8월(AUG)','9월(SEP)','10월(OCT)','11월(NOV)','12월(DEC)'],
//		monthNamesShort: ['1월(JAN)','2월(FEB)','3월(MAR)','4월(APR)','5월(MAY)','6월(JUN)',
//		'7월(JUL)','8월(AUG)','9월(SEP)','10월(OCT)','11월(NOV)','12월(DEC)'],
//		dayNames: ['일','월','화','수','목','금','토'],
//		dayNamesShort: ['일','월','화','수','목','금','토'],
//		dayNamesMin: ['일','월','화','수','목','금','토'],
//		dateFormat: 'yy-mm-dd', firstDay: 0,
//		isRTL: false};
//	$.datepicker.setDefaults($.datepicker.regional['ko']);
//});
//
//var sDate 	= $('#start_date').val().split("-");
//var eDate 	= $('#end_date').val().split("-");
//
//$(document).ready(function() {
//		
//	/*
//	 * 기간 라디오버튼 선택시 임시 기억
//	 */
//	$(".search_radio").click(function() {
//		var idx = $(".search_radio").index(this);
//		var val = $("input:radio:eq("+idx+")").val();
//		if ( val ) {
//			var start_date = getDayFromToday(val);			
//			$('#start_date').val(start_date);
//			$('#end_date').val(formatDate(new Date()));
//			if (val == '0') val = 'today';			
//			$("#select_check").val(val);
//			check_date(start_date, 's');
//		}
//	});
//	
//	// 시작, 종료 날자 calendar 를 화면에 표시한다.
//	$("#start_date").datepicker({ 
//		changeFirstDay: false,
//		hideIfNoPrevNext: true,
//		onSelect: function(date) { check_date(date, 's') }
//		//maxDate: new Date(eDate[0], eDate[1] - 1, eDate[2])
//	});
//	
//	
//	$("#end_date").datepicker({ 
//		changeFirstDay: false,
//		hideIfNoPrevNext: true,
//		//onSelect: function(date) { check_date(date, 'e') },
//		minDate: new Date(sDate[0], sDate[1] - 1, sDate[2])
//	});
//	
//	
//	// calendar 클릭시 라디오 버튼 해제를 위한 문
//	$("#start_date").click(function() {
//		$("#select_check").val(-1);
//	});
//	$("#end_date").click(function() {
//		$("#select_check").val(-1);
//	});
//});	
//
///**
// *  선택제한
// */
//function check_date(date, type){
//	var chgDate = date.split("-");
//	if(type == 'e'){
//		$('#start_date').datepicker('option', 'maxDate', new Date(chgDate[0], chgDate[1] - 1, chgDate[2]));
//	}else{ // 시작 변경시
//		if( date > $('#end_date').val() ){
//			$('#end_date').val(date);
//		}
//		$('#end_date').datepicker('option', 'minDate', new Date(chgDate[0], chgDate[1] - 1, chgDate[2]));
//	}
//}


jq(document).ready(function() {
	
	if(jq('#start_date').val() ==""){
		jq('#start_date').val(commonUtils.formatDate('yyyy-MM-dd'));
	}
	
	if(jq('#end_date').val() ==""){
		jq('#end_date').val(commonUtils.formatDate('yyyy-MM-dd'));
	}
	
	var sDate 	= jq('#start_date').val().split("-");
//	var eDate 	= jq('#end_date').val().split("-");
	
	jq('#start_date').attr('readonly', true);
	jq('#end_date').attr('readonly', true);
		
	/*
	 * 기간 라디오버튼 선택시 임시 기억
	 */
	jq(".search_radio").click(function() {
		var idx = jq(".search_radio").index(this);
		var day = jq("input:radio:eq("+idx+")").val();
		if ( day ) {
			var start_date = commonUtils.calculateDate(day, 'yyyy-MM-dd');			
			jq('#start_date').val(start_date);
			jq('#end_date').val(commonUtils.formatDate('yyyy-MM-dd'));
			if (day == '0') {
				day = 'today';			
			}
			jq("#select_check").val(day);
			check_date(start_date, 's');
		}
	});
	
	// 시작, 종료 날자 calendar 를 화면에 표시한다.
	jq("#start_date").datepicker({ 
		changeFirstDay: false,
		hideIfNoPrevNext: true,
		onSelect: function(date) { check_date(date, 's'); }
		//maxDate: new Date(eDate[0], eDate[1] - 1, eDate[2])
	});
	
	
	jq("#end_date").datepicker({ 
		changeFirstDay: false,
		hideIfNoPrevNext: true,
		//onSelect: function(date) { check_date(date, 'e') },
		minDate: new Date(sDate[0], sDate[1] - 1, sDate[2])
	});
	
	// calendar 클릭시 라디오 버튼 해제를 위한 문
	jq("#start_date").click(function() {
		jq("#select_check").val(-1);
	});
	jq("#end_date").click(function() {
		jq("#select_check").val(-1);
	});
});	

/**
 *  선택제한
 */
function check_date(date, type){
	var chgDate = date.split("-");
	if(type == 'e'){
		jq('#start_date').datepicker('option', 'maxDate', new Date(chgDate[0], chgDate[1] - 1, chgDate[2]));
	}else{ // 시작 변경시
		if( date > jq('#end_date').val() ){
			jq('#end_date').val(date);
		}
		jq('#end_date').datepicker('option', 'minDate', new Date(chgDate[0], chgDate[1] - 1, chgDate[2]));
	}
}