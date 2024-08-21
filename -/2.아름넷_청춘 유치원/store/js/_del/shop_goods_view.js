function goOrder2(id){
	var frm = document.pinfo;
	if($('table#minicart tr.order_detail_rows[delete=0]').length == 0){
		for(i=0;i < frm.elements.length;i++){
			if(!CheckForm(frm.elements[i])){
				return false;
			}
		}
	}
	if(confirm('비회원으로 구매 시 회원에게 제공되는 각종 혜택을 받을 수 없습니다. 비회원으로 구매하시겠습니까?\n 취소 시 로그인 페이지로 이동 합니다.')){
		  //  goOrder('order','/shop/cart.php','direct');
		  goCart(document.pinfo, false,'direct');
	}
	else{
			//document.location.href = "/member/login.php?go_url=/shop/goods_view.php?id="+id;
			document.location.href = "/member/login.php?url="+encodeURIComponent("/shop/goods_view.php?id="+id);
	}
}
function goCart2(id){
	var frm = document.pinfo;

	if($('table#minicart tr.order_detail_rows[delete=0]').length == 0){
		for(i=0;i < frm.elements.length;i++){
			if(!CheckForm(frm.elements[i])){
				return false;
			}
		}
	}

	if(confirm('비회원으로 구매 시 회원에게 제공되는 각종 혜택을 받을 수 없습니다. 비회원으로 구매하시겠습니까?')){
		goCart(document.pinfo, false,"");
	}
	else{
		//document.location.href = "/member/login.php?go_url=/shop/goods_view.php?id="+id;
		document.location.href = "/member/login.php?url="+encodeURIComponent("/shop/goods_view.php?id="+id);
	}
}
//아이프레임 내용만큼 아이프레임 높이 변경시키는 스크립트
function resizeHeight(id) {
	var the_height = document.getElementById(id).contentWindow.document.body.scrollHeight;
	document.getElementById(id).height = the_height + 30;
}

function ChangeImage(src_){
	var obj = document.getElementById('pview_img');
	var objb = document.getElementById('pview_img_b');
	
	obj.src = src_;
	obj.style.display = "block";
	document.getElementById('movie1').style.display = "none";
	document.getElementById('movie2').style.display = "none";
	objb.src = src_;
}

		
function calcurationOptionPrice(frm, m_level){
	var	_options = $(".goods_options");
	var _options_price_sum = 0;
	
	for(i=0;i<_options.length;i++){
		if(_options[i].type == "select-one"){
			if(m_level == "A"){
				_options_price_sum =  parseInt(_options_price_sum) + parseInt(_options[i][_options[i].selectedIndex].getAttribute("a_price"));
			}else if(m_level == "D"){
				_options_price_sum =  parseInt(_options_price_sum) + parseInt(_options[i][_options[i].selectedIndex].getAttribute("d_price"));	
			}else if(m_level == "M"){
				_options_price_sum =  parseInt(_options_price_sum) + parseInt(_options[i][_options[i].selectedIndex].getAttribute("m_price"));
			}else{
				_options_price_sum =  parseInt(_options_price_sum) + parseInt(_options[i][_options[i].selectedIndex].getAttribute("n_price"));
			}
		}
	}
	return parseInt(_options_price_sum);
}

function calcurationOptionPrice2(frm, m_level){
	var	_options = $(".add_goods_options")[0];
	var _options_price_sum = 0;
	
	if(m_level == "A"){
		_options_price_sum =  parseInt(_options[_options.selectedIndex].getAttribute("a_price"));
	}else if(m_level == "D"){
		_options_price_sum =  parseInt(_options[_options.selectedIndex].getAttribute("d_price"));	
	}else if(m_level == "M"){
		_options_price_sum =  parseInt(_options[_options.selectedIndex].getAttribute("m_price"));
	}else{
		_options_price_sum =  parseInt(_options[_options.selectedIndex].getAttribute("n_price"));
	}
	return parseInt(_options_price_sum);
}

function ChangeOption(m_level,obj, idx, option_type){
	var frm = document.pinfo;
	var _options_total_price_sum = calcurationOptionPrice2(frm, m_level);

	var add_price = 0;
	var ori_sellprice=parseInt($("#sellprice").attr("basic_price"));
	if(_options_total_price_sum==0) $('#sellprice').val(ori_sellprice);
	else $('#sellprice').val(_options_total_price_sum);
	//alert(o_kind);
	if(m_level == "A"){
		//frm.sellprice.value = parseInt(frm.sellprice.value) + parseInt(obj[idx].a_price) - parseInt(frm.sellprice.basic_price) - parseInt(obj.before_price);	
		//document.getElementById('sellprice_area').innerHTML = "옵션포함금액 : "+FormatNumber2(parseInt(frm.sellprice.value)+_options_total_price_sum) + " 원";
		document.getElementById('ori_sellprice').innerHTML="<font color='red'>"+FormatNumber2(parseInt(frm.sellprice.value)+_options_total_price_sum) + "원</font>";
		//frm.sellprice.basic_price = obj[idx].a_price;
		frm.option_stock.value = obj[idx].getAttribute("stock");
	}else if(m_level == "D"){
		//frm.sellprice.value = parseInt(frm.sellprice.value) + parseInt(obj[idx].d_price) -  parseInt(frm.sellprice.basic_price) - parseInt(obj.before_price);
		//document.getElementById('sellprice_area').innerHTML = "옵션포함금액 : "+FormatNumber2(parseInt(frm.sellprice.value)+_options_total_price_sum) + " 원";
		document.getElementById('ori_sellprice').innerHTML="<font color='red'>"+FormatNumber2(parseInt(frm.sellprice.value)+_options_total_price_sum) + "원</font>";
		//frm.sellprice.basic_price = obj[idx].d_price;
		frm.option_stock.value = obj[idx].getAttribute("stock");
	}else if(m_level == "M"){
		//frm.sellprice.value = parseInt(frm.sellprice.value) + parseInt(obj[idx].m_price) - parseInt(frm.sellprice.basic_price) - parseInt(obj.before_price);
		//document.getElementById('sellprice_area').innerHTML = "옵션포함금액 : "+FormatNumber2(parseInt(frm.sellprice.value)+_options_total_price_sum) + " 원";
		document.getElementById('ori_sellprice').innerHTML="<font color='red'>"+FormatNumber2(parseInt(frm.sellprice.value)+_options_total_price_sum) + "원</font>";
		//frm.sellprice.basic_price = obj[idx].m_price;
		frm.option_stock.value = obj[idx].getAttribute("stock");
	}else{	
		//frm.sellprice.value = parseInt(frm.sellprice.value) + parseInt(obj[idx].n_price) - parseInt(frm.sellprice.basic_price) - parseInt(obj.before_price);
		//document.getElementById('sellprice_area').innerHTML = "옵션포함금액 : "+FormatNumber2(parseInt(frm.sellprice.value)+_options_total_price_sum)  + " 원";
		$('#ori_sellprice').html("<font color='red'>"+FormatNumber2(_options_total_price_sum) + "원</font>");
		
		
		
		var _options_add_price_sum = calcurationOptionPrice(frm, m_level);
		/*if($('#sale_rate').val() > 0){
			if(obj.selectedIndex==0) {
				$('#sale_sellprice').html(FormatNumber2((ori_sellprice+_options_add_price_sum)*(100-$('#sale_rate').val())/100));
			} else {
				$('#sale_sellprice').html(FormatNumber2((_options_total_price_sum+_options_add_price_sum)*(100-$('#sale_rate').val())/100));
			}
		}*/
		if($('#sale_rate').val() > 0){
			if(obj.selectedIndex==0) {
				$('#sale_sellprice').html(FormatNumber2(Math.round((ori_sellprice+_options_add_price_sum)*(100-$('#sale_rate').val())/100))+"원");
			} else {
				$('#sale_sellprice').html(FormatNumber2(Math.round((_options_total_price_sum+_options_add_price_sum)*(100-$('#sale_rate').val())/100))+"원");
			}
		} else {
			if(obj.selectedIndex==0) {
				$('#ori_sellprice').html(FormatNumber2(ori_sellprice+_options_add_price_sum)+"원");
			} else {
				$('#ori_sellprice').html(FormatNumber2(_options_total_price_sum+_options_add_price_sum)+"원");
			}
		}
		//frm.sellprice.basic_price = obj[idx].n_price;
		frm.option_stock.value = obj[idx].getAttribute("stock");
	}

	if(_options_total_price_sum==0) {
		document.getElementById('ori_sellprice').innerHTML=FormatNumber2(parseInt(frm.sellprice.value)) + "원";
	}
	
	
	/*if(obj[idx].etc1 != ""){
		document.getElementById('option_etc1_area').innerHTML = "색상 : "+ obj[idx].etc1;
	}*/
	
	frm.select_option_id.value = obj[idx].value;
	//var _options_total_price_sum2 = calcurationOptionPrice(frm, m_level);
	//frm.option_price.value =_options_total_price_sum+_options_total_price_sum2;
	
}


function ChangeAddPriceOption(m_level,obj, idx, option_type){

	var frm = document.pinfo;
	var _options_total_price_sum = calcurationOptionPrice(frm, m_level);
	//alert(o_kind);
	var sellprice=parseInt(frm.sellprice.value);
	var dcprice=parseInt(frm.dcprice.value);
	var pid = frm.id.value;
	var option_text = "";
	var opnd_ix = "";

	if(obj.find("option:selected").val() == ""){
		return;
	} 
	 
	if(obj.find("option:selected").attr('soldout') == 1){
		alert('선택하신 상품은 품절된 상품입니다. ');
		obj.find("option:first").attr("selected","selected");
		//alert($("input[id^="+obj.attr("id")+"_input]").val());
		//$("input[id^="+obj.attr("id")+"_input]").val(obj.find("option:first").text());
		return false;
	}
	//alert(sellprice);
	//alert($('.goods_options[validation=true]').length +">"+ $(".goods_options[validation=true] option:selected[value!='']").length)	s
	//일반옵션(가격추가, 선택옵션) 갯수중에 필수가 모두 선택되었는지 판단
	//alert(obj.parent().find("select.goods_options").length);
	if(obj.parent().find("select.goods_options").length > 0){		
		//alert($('table#minicart tr.order_detail_rows:visible').length);
		if($('table#minicart tr.order_detail_rows:visible').length == 0){ 			
			if(obj.attr('option_kind') == "a" ){
				obj.find("option:first").attr("selected","selected");
				alert("기본상품을 한개이상 구매후 추가상품 구매가 가능합니다.");
				exit;
			}
		}
		//alert(11);
		//if($('.goods_options[validation=true]').length > $(".goods_options[validation=true] option:selected[value!='']").length){
		if(obj.attr('option_kind') == "i1" || obj.attr('option_kind') == "i2" || obj.attr('option_kind') == "a" ){
				var goods_options_size = $(".goods_options option:selected[value!='']").length;
				//alert(goods_options_size);
				$(".goods_options option:selected[value!='']").each(function(index){
					//alert($(this).text());
					if(index == 0){
						option_text += " - "+ $(this).attr("option_text");
						opnd_ix += $(this).val();				
					}else{
						option_text += "+"+ $(this).attr("option_text");//$(this).text();
						opnd_ix += "-"+ $(this).val();
					}
					sellprice += parseInt($(this).attr('n_price'));
					dcprice += parseInt($(this).attr('dc_price'));
					//alert(sellprice+"::"+dcprice);
					//if(option_type
				});
				//obj.attr('disabled','disabled');
				obj.click(function(){
					//alert('선택된 옵션은 다시 선택하실수 없습니다.');
				});
		}else{
			// i1, i2 는 독립옵션  , c1,c2는 조합옵션
			//alert($('.goods_options').length+"::"+$(".goods_options[option_kind=i1],[option_kind=i2],[option_kind=a]").length +"::"+ $(".goods_options").find("option:not(:first):selected").length);
			
			if(($('.goods_options').length - $(".goods_options[option_kind=i1],[option_kind=i2],[option_kind=a]").length) > $(".goods_options").find("option:not(:first):selected").length){
				//alert('필수 옵션을 선택하셔야 합니다.');		
				return false; // 선택되지 않았으면 추가하지 않음
			}else{
				if(obj.attr('option_kind') != "c1" && obj.attr('option_kind') != "c2"){
					 
					sellprice = 0;
					dcprice = 0;
				}
				var goods_options_size = $(".goods_options option:selected[value!='']").length;
				//alert(goods_options_size);
				$(".goods_options option:selected[value!='']").each(function(index){
					//alert($(this).text());
					if(index == 0){
						option_text += " - "+ $(this).attr("option_text");//$(this).text();
						opnd_ix += $(this).val();				
					}else{
						option_text += "+"+ $(this).attr("option_text");//$(this).text();
						opnd_ix += "-"+ $(this).val();
					}
					sellprice += parseInt($(this).attr('n_price'));
					dcprice += parseInt($(this).attr('n_price'));
					/*
					* 1. dc_price 는 보여주기 위한 가격이므로  의미가 없어서 n_price 로 처리
					*/
					//alert($(this).attr('n_price')+"::"+sellprice+"::"+dcprice);
					//if(option_type
				});
			}
		}
	}else{
		opnd_ix = obj.val();
	}
	//alert(opnd_ix);
	$('#minicart').show();//옵션 추가시 미니카트 노출
	$('#minicart_sum').show();//옵션 추가시 미니카트 합계 영역 노출


	if($('#minicart').find('.order_detail_rows:first').find('input[minicart_id=pid]').val() == ""){// 미니카트에 첫번째 요소에 아무 값도 셋팅되지 않았으면 ..
		var newObj = $('#minicart').find('.order_detail_rows:first');
	}else{
		//alert($('#minicart').find("input[minicart_id=opnd_ix][value='"+opnd_ix+"']").length +"::"+opnd_ix);
		if($('#minicart').find("input[minicart_id=opnd_ix][value='"+opnd_ix+"']").length){			
			//alert(1);
			//var newObj = $('#minicart').find("input[minicart_id=opnd_ix][value='"+opnd_ix+"']");
			/*
			* 미니카트에 추가된 옵션을 다시 추가했을경우 
			* 1. 셀렉트 박스 초기화
			* 2. 
			*/
			obj.find("option:first").attr("selected","selected");
			return false;
		//	var newObj = $('#minicart').find('.order_detail_rows:first');
		}else{
			var newObj = $('#minicart').find('.order_detail_rows:first').clone(true).appendTo($('#minicart'));
		}
	}
	
	//alert(1);
	newObj.find('input[minicart_id=deleteable]').val(0);
	newObj.find('input[minicart_id=pid]').val(pid);
	newObj.find('input[minicart_id=opnd_ix]').val(opnd_ix);//obj.find("option:selected").val();
	newObj.find('input[minicart_id=cart_ix]').val("");
	newObj.css('display','');
	//newObj.find('input[id=order_pid]').val(pid);
	//alert(obj.find("option:selected").text());
	
	if(option_type == "p" || option_type == "s" || option_type == "b" || option_type == "c1" || option_type == "c2" || option_type == "i1" || option_type == "i2"){		
		newObj.find('span[minicart_id=pname_text]').html(option_text);//obj.find("option:selected").text() //"[기본상품]"+$('#pname_text').html()+":"+
		if(dcprice > 0){
			newObj.find('strong[minicart_id=total_price]').html(FormatNumber2(dcprice));// + parseInt(obj.find("option:selected").attr('n_price'))
		}else{
			newObj.find('strong[minicart_id=total_price]').html(FormatNumber2(sellprice));// + parseInt(obj.find("option:selected").attr('n_price'))
		}
		newObj.find('input[minicart_id=sellprice]').val(sellprice);// + parseInt(obj.find("option:selected").attr('n_price'))
		newObj.find('input[minicart_id=dcprice]').val(dcprice);
		newObj.find('input[minicart_id=option_price]').val(0);
		newObj.find('input[minicart_id=option_kind]').val(option_type);
		
		if(newObj.find('input[minicart_id=amount]').attr("allow_basic_cnt") != "" && newObj.find('input[minicart_id=amount]').attr("allow_basic_cnt") != "0"){
			newObj.find('input[minicart_id=amount]').val(newObj.find('input[minicart_id=amount]').attr("allow_basic_cnt"));
		}else{
			newObj.find('input[minicart_id=amount]').val("1");
		}
		newObj.find('input[minicart_id=basic]').val("1"); // 기본옵션 여부
		newObj.attr('delete','0');// 삭제여부 1: 삭제된 항목 0 : 정상항목
	}else{
		newObj.find('span[minicart_id=pname_text]').html(obj.find("option:selected").text());
		if(parseInt(obj.find("option:selected").attr('dc_price')) > 0){
			newObj.find('strong[minicart_id=total_price]').html(FormatNumber2(obj.find("option:selected").attr('dc_price')));
		}else{
			newObj.find('strong[minicart_id=total_price]').html(FormatNumber2(obj.find("option:selected").attr('n_price')));
		}
		newObj.find('input[minicart_id=sellprice]').val(parseInt(obj.find("option:selected").attr('n_price')));
		newObj.find('input[minicart_id=dcprice]').val(parseInt(obj.find("option:selected").attr('dc_price')));
		newObj.find('input[minicart_id=option_price]').val(0);
		newObj.find('input[minicart_id=option_kind]').val(option_type);
		newObj.find('input[minicart_id=basic]').val("0");
		if(newObj.find('input[minicart_id=amount]').attr("allow_basic_cnt") != "" && newObj.find('input[minicart_id=amount]').attr("allow_basic_cnt") != "0"){
			newObj.find('input[minicart_id=amount]').val(newObj.find('input[minicart_id=amount]').attr("allow_basic_cnt"));
		}else{
			newObj.find('input[minicart_id=amount]').val("1");
		}
		newObj.attr('delete','0');// 삭제여부 1: 삭제된 항목 0 : 정상항목
	}
	

	minicart_total();
 
	//var _options_total_price_sum2 = calcurationOptionPrice2(frm, m_level);
	var _options_total_price_sum2 = parseInt(sellprice);
	//alert(_options_total_price_sum2);
	//alert(_options_total_price_sum+":::"+_options_total_price_sum2);
	//var _options_total_price_sum2 = 0;
	frm.option_price.value = _options_total_price_sum; //_options_total_price_sum+
	if($('#sale_rate').val() > 0){
		//$('#sale_sellprice').html(FormatNumber2((_options_total_price_sum+_options_total_price_sum2)*(100-$('#sale_rate').val())/100));
		$('#sale_sellprice').html(FormatNumber2(Math.round((_options_total_price_sum+_options_total_price_sum2)*(100-$('#sale_rate').val())/100))+"원");
	}
	//alert(1);
	$(".goods_options").each(function(){
		$(this).find("option:eq(0)").attr("selected","selected");
		//alert($(this).find("option:selected").html());
		$(this).parent().find("input[id="+$(this).attr("id")+"_input]").val($(this).find("option:selected").html());

	});
}


function goCart(frm, direct_bool, act_type){	 
	//newObj.find('input[minicart_id=deleteable]').val(0);

	if($('table#minicart tr.order_detail_rows[delete=0]').length == 0){
		for(i=0;i < frm.elements.length;i++){
			if(!CheckForm(frm.elements[i])){
				return false;
			}
		}
	}else{
		var checkAmount = true;
		$('table#minicart tr.order_detail_rows').each(function(){
			if($(this).find('input[minicart_id=amount]').val() == "" || parseInt($(this).find('input[minicart_id=amount]').val()) < 0){
				alert('구매수량을 입력해주세요');
				checkAmount = false;
				return false;
			}
		});
		if(!checkAmount){
			return false;
		}
	}

	if(act_type == "direct"){
		$.ajax({
			url : '/shop/cart.php',
			type : 'get',
			datatype : 'html',
			async : false,
			data : "act=choice_initialize",
			error : function(data,error) {
			}, 
			success : function(xml) {
				//alert(xml);
			}
		});
	}

	if($('table#minicart tr.order_detail_rows').length > 0){
		var pid = frm.id.value;
		var set_group = "";
		
		var basic_option_cnt = $('table#minicart tr.order_detail_rows').find("input[minicart_id=option_kind][value=b],input[minicart_id=option_kind][value=i1],input[minicart_id=option_kind][value=i2],input[minicart_id=option_kind][value=c1],input[minicart_id=option_kind][value=c2],input[minicart_id=option_kind][value=]").length;	
		var add_option_cnt = $('table#minicart tr.order_detail_rows').find("input[minicart_id=option_kind][value=a]").length;	
		//alert(basic_option_cnt+"::"+add_option_cnt);
		if($("select.goods_options[option_kind!=a]").length > 0 ){
			if(add_option_cnt > 0 && basic_option_cnt == 0){
				alert("기본상품을 한개이상 구매하셔야 합니다.");
				return false;
			}
		}


		//배송비 관련 값 시작 2014-05-16 이학봉
		var dt_ix = $('#change_dt_ix option:selected').val();	//상품별 배송정책 키값
		if($('#delivery_method_self').is(":checked")){			//방문수령 체크시 1
			var delivery_method_self = '1';
		}else{
			var delivery_method_self = '0';
		}
		var delivery_pay_method = $('select[name=delivery_pay_method] option:selected').val();	//배송비 결제 방법
		//배송비 관련 값 끝 2014-05-16 이학봉
		//alert(add_option_cnt);
		if($('#option_kind').val() == "x" || $('#option_kind').val() == "c" || $('#option_kind').val() == "x2" || $('#option_kind').val() == "s2" || add_option_cnt > 0){
			if($("input[name=set_group]").length > 0 && $("input[name=set_group]").val() != ""){
				set_group = $("input[name=set_group]").val();
			}else{
				set_group = getCartGoodsGroupNo(pid);
			}
		}
		//alert(set_group);
		if($('#option_kind').val() == "x"){
			
			var box_count = $('#box_count').val();
			var goods_cnt_per_1box = parseInt($('#goods_cnt_per_1box').html());
			var total_pcount = 0;
			$('table#minicart tr.order_detail_rows').each(function(){
				if($(this).find('input[minicart_id=opnd_ix]').is(":checked")){
					total_pcount += parseInt($(this).find('input[minicart_id=amount]').val());
				}
			});

			if((goods_cnt_per_1box*box_count) > total_pcount){
				alert(((goods_cnt_per_1box*box_count) - total_pcount )+" 개의 수량을 더 구매하셔야 합니다. ");
				return false;
			}			
		}
		var _act = "";
		
		$('table#minicart tr.order_detail_rows').each(function(){
			var d=new Date();
			var error_cnt = 0;
			var success_cnt = 0;
			var opnd_ix = "";
			if($('#option_kind').val() == "c"){
				var cart_ix = $(this).find('select[minicart_id=opnd_ix] option:selected').attr('cart_ix');
			}else{
				var cart_ix = $(this).find('input[minicart_id=cart_ix]').val();
			}
			if(act_type != ""){
				_act = act_type;
			}else{
				if(cart_ix){
					_act = "minicart_update";
				}else{
					_act = "minicart_add";
				}
			}
			
			//alert($(this).find('input[minicart_id=opnd_ix]').attr('checked'));
			//alert($(this).find('select[minicart_id=opnd_ix]').length);
			if($(this).find('input[minicart_id=opnd_ix]').attr('type') == "checkbox"){	
				if($(this).find('input[minicart_id=opnd_ix]').attr('checked') == "checked"){	
					opnd_ix = $(this).find('input[minicart_id=opnd_ix]').val(); //frm.sellprice.value;
				}
			}else if($(this).find('select[minicart_id=opnd_ix]').length > 0){	//코디상품일때 
				opnd_ix = $(this).find('select[minicart_id=opnd_ix]').val();
			}else{
				//var sellprice = $(this).find('input[minicart_id=sellprice]').val(); //frm.sellprice.value;		
				opnd_ix = $(this).find('input[minicart_id=opnd_ix]').val(); //frm.sellprice.value;		
			}
			//alert(opnd_ix);
			if(opnd_ix != undefined && opnd_ix != ''){
				var set_count = 0;
				var _options = "";
				var opnd_ix_array = opnd_ix.split("-");
				//alert(opnd_ix_array.length);
				if(opnd_ix_array.length > 0){
					for(i=0;i < opnd_ix_array.length;i++){
						_options += "&options[]="+opnd_ix_array[i];
					}
				}else{
					var _options = opnd_ix;
				}
				//var listprice = frm.listprice.value;
				//var stock = frm.stock.value;
				var select_option_id = opnd_ix;//frm.select_option_id.value;
				//var pcount = 1;
				//alert($('#option_kind').val());
				if($('#option_kind').val() == "x2" || $('#option_kind').val() == "s2" ){
					var pcount = parseInt($(this).find('input[minicart_id=set_cnt]').val()) * parseInt($(this).parent().parent().parent().find('input[minicart_id=amount]').val());
					//set_count = parseInt($(this).closest('input[minicart_id=amount]').val());
					set_count = parseInt($(this).parent().parent().parent().find('input[minicart_id=amount]').val());

					//alert(parseInt($(this).find('input[minicart_id=set_cnt]').val()) +" * "+parseInt($(this).parent().parent().parent().find('input[minicart_id=amount]').val()));
				}else if($('#option_kind').val() == "c"){
					var pcount = parseInt($("table#minicart").find('input[minicart_id=pcount]').val());
					set_count = pcount;
				}else if($('#option_kind').val() == "x"){
					var pcount = $(this).find('input[minicart_id=amount]').val();
					//alert($(this).closest('table[class=choice_box]').find('input[id^=box_count]').val());
					set_count = parseInt($(this).closest('table[class=choice_box]').find('input[id^=box_count]').val());
				}else{
					var pcount = $(this).find('input[minicart_id=amount]').val();
				}
				
				if(act_type != ""){
					_act = act_type;
				}else{
					if(cart_ix){
						_act = "minicart_update";
					}else{
						_act = "minicart_add";
					}
				}				
				//alert($(this).find('input[minicart_id=deleteable]').val());
				if($(this).find('input[minicart_id=deleteable]').val() == "1"){
					_act = "minicart_delete";
				}
				//alert($('#option_kind').val()+"::"+dt_ix+"::"+delivery_method_self+"::"+pid+":::"+opnd_ix+"::"+pcount+":::"+cart_ix +"::"+set_group+":::"+_options +"::"+set_count+":::"+set_count);
				//alert ("act="+_act+"&act_type="+act_type+"&id="+pid+"&set_group="+set_group+"&opnd_ix="+opnd_ix+"&pcount="+pcount);

				$.ajax({
					url : '/shop/cart.php',
					type : 'get',
					datatype : 'html',
					async : false,
					data : "act="                    + _act +
							"&cart_ix="              + cart_ix +
							"&id="                   + pid +
							"&set_group="            + set_group +
							"&select_option_id="     + select_option_id +
							"&opnd_ix="              + opnd_ix +
							"&pcount="               + pcount +
							"&set_count="            + set_count + "" + _options +
							"&dt_ix="                + dt_ix +
							"&delivery_method_self=" + delivery_method_self +
							"&delivery_pay_method="  + delivery_pay_method
					,
					error : function(data,error) {
						error_cnt = error_cnt+1;
						//alert(error_cnt);
					}, 
					success : function(xml) {
						 success_cnt = success_cnt+1;
					//	alert(success_cnt);
					//	alert(xml);
					}
				});
			}
		}); 
		//alert(_act);
		if(_act == "minicart_update"){
				document.location.reload();
		}else{
			if(direct_bool){ 
				if(frm.act.value == "add"){
					if(confirm('"장바구니에 담았습니다" 장바구니로 이동하시겠습니까?')){
						document.location.href ='/shop/cart.php';
					} 
				}else{
					document.location.reload();
				}
			}else{ 
				if(act_type == "direct"){
					document.location.href ='/shop/infoinput.php';
				}else{
					if(confirm('"장바구니에 담았습니다" 장바구니로 이동하시겠습니까?')){
						document.location.href ='/shop/cart.php';
					}else{
						document.location.reload();
					}
				}
			}
		}
		//alert(error_cnt+';;;'+success_cnt);
	}else{
		
		if(frm.pcount.value == "" || parseInt(frm.pcount.value) < 1){
			alert('구매수량은 1개 이상이어야 합니다.');
			return false;
		}

		if(parseInt(frm.stock.value) < parseInt(frm.pcount.value) && frm.stock_use_yn.value == "Y"){
			if(frm.stock.value > 0){
				alert('수량이 부족하여 주문이 이루어 지지 않습니다. '+frm.stock.value+' 개 까지 주문이 가능합니다.');
			}else{
				alert('수량이 부족하여 주문이 이루어 지지 않습니다.');
			}
			return false;
		}

		if(frm.option_stock.value != ""){
			if(parseInt(frm.option_stock.value) < parseInt(frm.pcount.value) && frm.stock_use_yn.value == "Y"){
				if(frm.option_stock.value > 0){
					alert('해당옵션에 대한 수량이 부족하여 주문이 이루어 지지 않습니다. '+frm.option_stock.value+' 개 까지 주문이 가능합니다.');
				}else{
					alert('수량이 부족하여 주문이 이루어 지지 않습니다.');
				}
				return false;
			}
		}
		
		if(act_type == "direct"){
			frm.target='_self';
			frm.act.value = 'direct';
			frm.action = "/shop/cart.php";
			frm.submit();
		}else if(frm.act.value == "add"){
			if(confirm('장바구니로 이동하시겠습니까?')){
				frm.target='_self';
				frm.action = "/shop/cart.php";
				frm.submit();
			}else{
				frm.target='act';
				frm.action = "/shop/cart.php";
				frm.submit();
			}
		}else{
			frm.target='_self';
			frm.action = "/shop/cart.php";
			frm.submit();
		}
	}
}

function getCartGoodsGroupNo(pid){
	var set_group = "";
	$.ajax({
			url : './cart.php',
			type : 'get',
			datatype : 'html',
			async : false,
			data : "act=get_set_group&id="+pid,
			error : function(data,error) {
				
			}, 
			success : function(result) {
				set_group = result;
			}
		});
	return set_group;
}

function goCartNC(frm){

        for(i=0;i < frm.elements.length;i++){
                if(!CheckForm(frm.elements[i])){
                        return false;
                }
        }
        
        if(frm.pcount.value == "" || parseInt(frm.pcount.value) < 1){
                alert('구매수량은 1개 이상이어야 합니다.');
                return false;
        }

        if(parseInt(frm.stock.value) < parseInt(frm.pcount.value) && frm.stock_use_yn.value == "Y"){
                if(frm.stock.value > 0){
                        alert('수량이 부족하여 주문이 이루어 지지 않습니다. '+frm.stock.value+' 개 까지 주문이 가능합니다.');
                }else{
                        alert('수량이 부족하여 주문이 이루어 지지 않습니다.');
                }
                return false;
        }

        if(parseInt(frm.option_stock.value) < parseInt(frm.pcount.value) && frm.stock_use_yn.value == "Y"){
                alert('해당옵션에 대한 수량이 부족하여 주문이 이루어 지지 않습니다. '+frm.option_stock.value+' 개 까지 주문이 가능합니다.');
                return false;
        }
	return true;
}

function buyNC(url)

{
    var frm = document.forms["pinfo"];
    
    if ( goCartNC(frm) ) {
		frm.target='_blank';
		frm.action = "./nc/order_nc.php";
		frm.submit();
    } 
    return false;
}

function wishlistNC(url)

{
    // 네이버 체크아웃으로 찜 정보를 등록하는 가맹점 페이지 팝업 창 생성.
    // 해당 페이지에서 찜 정보 등록 후 네이버 체크아웃 찜 페이지로 이동.
	var frm = document.forms["pinfo"];
    window.open(url,"naver_checkout","scrollbars=yes,width=400,height=267");

    frm.target='naver_checkout';
	frm.action = "./nc/zzim_nc.php";
	frm.submit();

    return false;

}



function goOrder(gubun,vURL,vact){
	var frm = document.pinfo;
	if(gubun != 'wish'){	
		for(i=0;i < frm.elements.length;i++){
			if(!CheckForm(frm.elements[i])){
				return false;
			}
		}
	}
		
	if($('input[name=pcount]').val() == "" || parseInt($('input[name=pcount]').val()) < 1){
		alert('구매수량은 1개 이상이어야 합니다.');
		return false;
	}
	
	if(gubun != 'wish' && frm.stock_use_yn.value == "Y" && parseInt(frm.stock.value) < parseInt($('input[name=pcount]').val())){
		if(frm.stock.value > 0){
			alert('수량이 부족하여 주문이 이루어 지지 않습니다. '+document.pinfo.stock.value+' 개 까지 주문이 가능합니다.');
		}else{
			alert('수량이 부족하여 주문이 이루어 지지 않습니다.');
		}
		return false;	
	}
	if(frm.stock_use_yn.value == "Y" && parseInt(frm.option_stock.value) < parseInt($('input[name=pcount]').val())){
		if(frm.option_stock.value > 0){
			alert('해당옵션에 대한 수량이 부족하여 주문이 이루어 지지 않습니다. '+frm.option_stock.value+' 개 까지 주문이 가능합니다.');
		}else{
			alert('수량이 부족하여 주문이 이루어 지지 않습니다.');
		}
		return false;	
	}	
	if(gubun == 'wish'){
		document.pinfo.target = 'act';			
	}else{
		document.pinfo.target = '';			
	}
	document.pinfo.action=vURL;
	document.pinfo.act.value = vact;
	
	document.pinfo.submit();
}

function imgChange(idname){
	var b_img_src=$("#addimg_"+idname).attr("rel").replace("m_","b_");//kbk cliparts 이미지를 클릭했을 때 큰 이미지 경로 잡아줌 11/11/08
	$("#pview_img_b").attr("src", b_img_src);//kbk cliparts 이미지를 클릭했을 때 큰 이미지 경로 잡아줌 11/11/08
	$("#main_img").fadeOut(500, function () {
		$("#main_img").attr("src", $("#addimg_"+idname).attr("rel")).fadeIn(300);
	});
}

function pcount_cnt_ori(plus_yn,iobj){//iobj(대상 아이디) 값을 받아서 처리하도록 수정 kbk 13/06/28
	var pcount = $("#"+iobj).val();
	pcount = parseInt(pcount);
	if(plus_yn == "p"){
		$("#"+iobj).val(pcount + 1);
	}
	if(plus_yn == "m"){
		if(pcount <= 1) {
			alert("수량은 1개 이상이어야 합니다.");
			return false;
		} else {
			$("#"+iobj).val(pcount - 1);
		}
	}
	//alert($(".add_goods_options:eq(0) option").index($(".add_goods_options:eq(0) option:selected")));
	//alert($(".add_goods_options").eq(0));
	//ChangeOption('',document.getElementsByName("options[]")[1],$(".add_goods_options:eq(0) option").index($(".add_goods_options:eq(0) option:selected")));
}

function pcount_cnt(plus_yn){
	var pcount = $("#pcount").val();
	pcount = parseInt(pcount);
	if(plus_yn == "p"){
		$("#pcount").val(pcount + 1);
	}
	if(plus_yn == "m"){
		if(pcount <= 1) {
			alert("수량은 1개 이상이어야 합니다.");
			return false;
		} else {
			$("#pcount").val(pcount - 1);
		}
	}
}

function change_di_ix(dt_ix,pid){	//배송방법 선택후 배송정책 뿌려주는 함수
	
	if(dt_ix == ''){
		return false;
	}

	$.ajax({
    url : '../shop/goods.act.php',
    type : 'POST',
    data : {
			dt_ix:dt_ix,
			pid:pid,
			act:'change_template_ix'
			},
    dataType: 'html',
    error: function(data,error){// 실패시 실행함수 
        alert(error);},
    success: function(args){
			if(args != null){
				//alert(args);
				$('#delivery_policy_template').html(args);
			}
        }
    });

}

$(document).ready(function (){

//배송방법 선택 시작
	var change_dt_value = $('#change_dt_ix option:selected').val();
	var pid = $('input[name=id]').val();

	$('#change_dt_ix').change(function (){	//셀렉트박스 선택시 실행
		var value = $(this).val();
		change_di_ix(value,pid);
	});

	//change_di_ix(change_dt_value,pid);	//페이지 새로고침시 실행

//배송방법 선택 끝

});
