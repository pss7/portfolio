/**
 * jQuery관련 유틸 클래스
 */
var pgUtils = pgUtils || {};


/** 
 * LG 유플러스 고정 변수들
 */
var LGD_window_type = '';
var CST_PLATFORM = '';

function getFormObject() {
    return document.getElementById("LGD_PAYINFO");
}

/**
 * LG 유플러스 고정 변수들 끝
*/

(function (window, context) {
	var jq = jQuery;
		

	/*
	 *   약자
	 *   iwm = Inicis WebStandard Module
	 *   iom = Inicis Original Module (이건 이제 폐기해야함 사용 X)
	 *   imm = Inicis Mobile Module
	 *   lom = Lguplus Original Module (추후 개발예정, lg사 pg 사용하게되면 개발)
	 */
	
	context.launchCrossPlatform = function(){
		
		lgdwin = openXpay(document.getElementById('LGD_PAYINFO'), CST_PLATFORM, $("#LGD_WINDOW_TYPE").val(), null, "", "");
		
	}
	
	context.lomCall = function (){
		
		
			
			jqUtils.ajax({
		        url : '/order/orderListEncrypt.json',
		        data : $("#mainForm").serialize(),
		        success : function (res) {
		        	
		        	var pg    = res.pg;
		        	var pgObject = {};
		        	
		        	if(pg!=null){
		        		
		        		context.lomGenerateElement();
		        		var pmgb =  $('input[name="paymentGb"]:radio:checked').val();
			        	var lgParam="";
			        	
			        	if(pmgb=="3120" || pmgb=="3130" || pmgb=="3200" ){
			        		//에스크로일경우 
			        		lgParam += "CST_MID="+pg.escrowCd;
			        	}else{
			        		lgParam += "CST_MID="+pg.paygateCd;	
			        	}
			        	
			        	//값은 test 운영일땐 service 
			        	lgParam +="&CST_PLATFORM=test";
			        	lgParam +="&LGD_BUYER="+$("#membNm").val();
			        	lgParam +="&LGD_PRODUCTINFO="+pg.itemNames;
			        	lgParam +="&LGD_AMOUNT="+parseInt($("#payment_amount").val());
			        	lgParam +="&LGD_BUYEREMAIL="+$("#membEmail").val();;
			        	lgParam +="&LGD_OID="+pg.oid; //주문번호
			        	lgParam +="&LGD_TIMESTAMP="+makeoid();
			        	
			        	
			        	var pmgbLgValue = "";
			        	
			        	if(pmgb=="3200"){ //에스크로카드
			        		pmgbLgValue = "SC0010";
			        	}else if(pmgb=="0200"){
			        		pmgbLgValue = "SC0010";
			        	}else if(pmgb=="0130"){ //실시간 계좌이체
			        		pmgbLgValue = "SC0030";
			        	}else if(pmgb=="3130"){ //실시간 계좌이체
			        		pmgbLgValue = "SC0030";
			        	}else if(pmgb=="0110" || pmgb=="0120" || pmgb=="3120"){
			        		pmgbLgValue = "SC0040"
			        	}else if(pmgb=="0510"){ // 온누리
			        		pmgbLgValue = "SC0010";
			        	}
			        	
			        	if(pmgb=="0510"){
			        		$("#LGD_USABLECARD").val("31");
			        	}else{
			        		$("#LGD_USABLECARD").val("");
			        	}
			        	
			        	if(pmgb=="3120" || pmgb=="3130" || pmgb=="3200"){
			        		$("#LGD_ESCROW_USEYN").val("Y")
			        	}else{
			        		$("#LGD_ESCROW_USEYN").val("N")
			        	}
			        	
			        	
			        	lgParam +="&LGD_CUSTOM_USABLEPAY="+pmgbLgValue;
			        	lgParam +="&LGD_WINDOW_TYPE=iframe";
			        	lgParam +="&LGD_CUSTOM_SWITCHINGTYPE=IFRAME";
			        	
						//$("#lgPgIframe").attr("src","/order/lgUPStart.do?"+lgParam);
			        	jqUtils.ajax({
			                url : '/order/lgUPStartAjax.do',
			                data : lgParam,
			               	mask : {
			               		autoClose:false,
			               		message : '<span style="font-size:15px;">&nbsp;주문 결제중 ...</span>'
			               	},
			                success : function (res) {
			                	if(res.success) {
			                		LGD_window_type = res.LGD_WINDOW_TYPE;
			                		CST_PLATFORM = res.CST_PLATFORM;
			                		$("#type").val(pmgb);
			                		$("#CST_PLATFORM").val(res.payReqMap.CST_PLATFORM);
			                		$("#CST_MID").val(res.payReqMap.CST_MID);
			                		$("#LGD_WINDOW_TYPE").val(res.payReqMap.LGD_WINDOW_TYPE);
			                		$("#LGD_MID").val(res.payReqMap.LGD_MID);
			                		$("#LGD_OID").val(res.payReqMap.LGD_OID);
			                		$("#invNo").val(res.payReqMap.LGD_OID);
			                		$("#LGD_BUYER").val(res.payReqMap.LGD_BUYER);
			                		$("#LGD_PRODUCTINFO").val(res.payReqMap.LGD_PRODUCTINFO);
			                		$("#LGD_AMOUNT").val(res.payReqMap.LGD_AMOUNT);
			                		
			                		$("#LGD_BUYEREMAIL").val(res.payReqMap.LGD_BUYEREMAIL);
			                		$("#LGD_CUSTOM_SKIN").val(res.payReqMap.LGD_CUSTOM_SKIN);
			                		$("#LGD_CUSTOM_PROCESSTYPE").val(res.payReqMap.LGD_CUSTOM_PROCESSTYPE);
			                		$("#LGD_TIMESTAMP").val(res.payReqMap.LGD_TIMESTAMP);
			                		$("#LGD_HASHDATA").val(res.payReqMap.LGD_HASHDATA);
			                		$("#LGD_RETURNURL").val(res.payReqMap.LGD_RETURNURL);
			                		$("#LGD_CUSTOM_USABLEPAY").val(res.payReqMap.LGD_CUSTOM_USABLEPAY);
			                		
			                		$("#LGD_CUSTOM_SWITCHINGTYPE").val(res.payReqMap.LGD_CUSTOM_SWITCHINGTYPE);
			                		$("#LGD_WINDOW_VER").val(res.payReqMap.LGD_WINDOW_VER);
			                		$("#LGD_OSTYPE_CHECK").val(res.payReqMap.LGD_OSTYPE_CHECK);
			                		$("#LGD_VERSION").val(res.payReqMap.LGD_VERSION);
			                		$("#LGD_CASNOTEURL").val(res.payReqMap.LGD_CASNOTEURL);
			                		$("#LGD_RESPCODE").val(res.payReqMap.LGD_RESPCODE);
			                		$("#LGD_RESPMSG").val(res.payReqMap.LGD_RESPMSG);
			                		$("#LGD_PAYKEY").val(res.payReqMap.LGD_PAYKEY);
			                		  $.unblockUI();
			                		
			                		context.launchCrossPlatform();
			                	}
			                } 
			            });
			        	
		        	}else{
		        	
		        		context.pgComplete();
		        	
		        	}
		        	
		        } 
		    });
			
		
	}
	
	context.iwmCall = function () {
		
		$(".webItemNm").each(function(){
			$(this).val(encodeURIComponent($(this).val()));
		});
		
		var enCryptParams = $("#mainForm").serialize();
		
		$(".webItemNm").each(function(){
			$(this).val(decodeURIComponent($(this).val()));
		});
		
		if($("#itemNmEncodeYn").val() == undefined){
			$("#mainForm").append("<input type='hidden' name='itemNmEncodeYn' id='itemNmEncodeYn' value='1' >");
		}
		
		jqUtils.ajax({
	        url : '/order/webStsCheck.do',
	        data : enCryptParams,
	        success : function (res) {
	        	
	        	var pg    = res.pg;
	        	var pgObject = {};
	 
	        	if(pg!=null){
	       
	        		context.iwmGenerateElement();
	        		
	        		$("#version").val("1.0");
	        		$("#mid").val(pg.mid);
					$("#goodsname").val(pg.goodsname);
					$("#oid").val(pg.oid);
					$("#invNo").val(pg.oid);
					$("#price").val(pg.price);
					$("#currency").val("WON");
					$("#buyername").val($("#membNm").val());
					$("#buyertel").val($("#membTelHp1").val() + '-' + $("#membTelHp2").val() + '-' + $("#membTelHp3").val());
					$("#buyeremail").val($("#membEmail").val());
					$("#timestamp").val(pg.timestamp);
					$("#signature").val(pg.signature);
					$("#returnUrl").val(sslShopUrl+'/order/webStdResult.do?orderNo='+pg.oid);
					$("#closeUrl").val(sslShopUrl+'/order/pgClose.do');
					$("#mKey").val(pg.mKey);
					$("#gopaymethod").val(pg.gopaymethod);
					$("#offerPeriod").val(pg.offerPeriod);
					$("#acceptmethod").val(pg.acceptmethod+":popreturn");
					$("#merchantData").val(pg.merchantData);
					$("#quotabase").val("2:3:4:5:6:7:8:9:10:11:12");
					$("#mainForm").attr("method","post");
					
					INIStdPay.pay('mainForm');
					
	        	}else{
	        		context.pgComplete();
	        	
	        	}
	        	
	        } 
	    });
		
		
	}; 
	
	
	
	context.immCall = function () {
		$(".webItemNm").each(function(){
			$(this).val(encodeURIComponent($(this).val()));
		});
		
		var enCryptParams = $("#mainForm").serialize();
		
		$(".webItemNm").each(function(){
			$(this).val(decodeURIComponent($(this).val()));
		});
		
		
		jqUtils.ajax({
	        url : '/mobile/order/orderListEncryptPrepare.json',
	        data : enCryptParams,
	        success : function (res) {
	        	
	        	var pg    = res.pg;
	        	var pgObject = {};
	        	var pgYn = res.pgYn;
	        	var pmgb = $('input[name="paymentGb"]:radio:checked').val(); 
	        	
	        	if(pgYn=="1"){
	        		$("#mainForm").attr("accept-charset","euc-kr")
	        		context.immGenerateElement();
	        		
	        		var payType = "";
	        		
		        	if(pmgb =="0120" || pmgb =="3120"){
						payType="vbank";	        		
		        	}else if(pmgb=="0130" || pmgb=="3130"){
		        		payType="bank";	        
	        		}else if(pmgb=="0300"){
	        			payType="mobile";
	        		}else{
		        		payType="wcard";
		        	}
		        	
		        	if(pmgb =="3200" || pmgb =="3120" || pmgb=="3130"){
		        		$("#P_MID").val(res.escrowCd);	
		        	}else if(pmgb == "3210"){
		        		$("#P_MID").val(res.kakaoPayCd);
	        		}else if(pmgb == "0510"){
	        			$("#P_MID").val(res.onnuriPayCd);
	        		}else{
		        		$("#P_MID").val(res.paygateCd);
		        	}
		        	
		        	$("#P_NOTI").val($("#P_MID").val());
		        	
		        	$("#P_EMAIL").val($("#membEmail").val());
		        	$("#P_MOBILE").val($("#membTelHp").val());
		        	$("#P_GOODS").val(res.itemName);
		        	
		        	
		        	$("#P_OID").val(res.invNo); 
		        	$("#invNo").val(res.invNo);
		        	$("#P_AMT").val(parseInt($('#payment_amount').val()));
		        	$("#P_UNAME").val($("#membNm").val());
	 	        	$("#type").val(pmgb);
	        		
	        		
	        		//모바일에서 pg결제를 하게되면, 무조건 임시로 데이터를 넣어준다.
		    		var chkParam = "amount="+$("#P_AMT").val();
		    		var itemNos="";
		    		
		    		$(".itemIds").each(function(){
		    			itemNos += $(this).val()+"^";
		    		});
		    		
		    		var itemQtys = "";
		    		
		    		$(".qty").each(function(){
		    			itemQtys += $(this).val()+"^";
		    		});
		    		
		    		var couponNos = $("#couponNos").val();
		    		
		    		chkParam +="&itemNos="+itemNos+"&itemQtys="+itemQtys+"&couponNos="+couponNos+"&invNo="+$("#P_OID").val();
		    		
		    		var phoneLog = ua + "||"+pmgb;
		    		phoneLog = encodeURIComponent(phoneLog); 
		    		chkParam +="&arumMemo=" + phoneLog;
		    		
		    		jqUtils.ajax({
		    			
		                url : '/order/mobilePgLog.do',
		                data : chkParam,
		                success : function (res) {
		                	if(res.success) {
		                		
		                	}
		                } 
		            });
		    		
		    		
		    		
		    		if ( /iphone/.test(ua) || /ipad/.test(ua) ) {
		    			
		    			
		    			
		    			if(/naver/.test(ua)|| /crios/.test(ua) || /daumapps/.test(ua)) {
		    				if(sessionScope.shopId == "2000087235"){
		    					$("#P_RESERVED").val("twotrs_isp=Y&block_isp=Y&twotrs_isp_noti=N&ismart_use_sign=Y&vbank_receipt=Y&cp_yn=N&disable_kpay=Y&extension_enable=Y");
		    				}else{
		    					$("#P_RESERVED").val("twotrs_isp=Y&block_isp=Y&twotrs_isp_noti=N&ismart_use_sign=Y&vbank_receipt=N&cp_yn=N&disable_kpay=Y&extension_enable=Y");
		    				}
		    			} else {
		    				if(sessionScope.shopId == "2000087235"){
		    					$("#P_RESERVED").val("twotrs_isp=Y&block_isp=Y&twotrs_isp_noti=N&ismart_use_sign=Y&vbank_receipt=Y&cp_yn=N&disable_kpay=Y");
		    				}else{
		    					$("#P_RESERVED").val("twotrs_isp=Y&block_isp=Y&twotrs_isp_noti=N&ismart_use_sign=Y&vbank_receipt=N&cp_yn=N&disable_kpay=Y");
		    				}
		    			}
		    			
		    			if(pmgb=="0510"){
		    				$("#P_RESERVED").val($("#P_RESERVED").val()+"&d_card=11&d_qota=00")
		    			}
		    			
			        	$("#pgForm").attr("action","https://mobile.inicis.com/smart/"+payType);
			    		$("#pgForm").submit(); 
			    		
		    		} else {
		    			if(pmgb=="0510"){
		    				$("#P_RESERVED").val($("#P_RESERVED").val()+"&d_card=11&d_qota=00")
		    			}
		    		
		    			$("#pgForm").attr("action","https://mobile.inicis.com/smart/"+payType);
			    		$("#pgForm").submit(); 
		    		}
					
	        	}else{
	        	
	        		$("#mainForm").attr("accept-charset","utf-8")
	        		
	        		
	        		$(".webItemNm").each(function(){
		    			$(this).val(encodeURIComponent($(this).val()));
		    		});
		    		
		    		var params = $("#mainForm").serialize();
		    		
		    		$(".webItemNm").each(function(){
		    			$(this).val(decodeURIComponent($(this).val()));
		    		});
	            	
	            	jqUtils.ajax({
	                    url : '/order/payment.do',
	                    data : params,
	                    async: false,
	       				mask : {
				       				autoClose : true,
				       				message : '<span style="font-size:15px;">결제진행중</span>',
				       				css:{
				       					 border: 'none', 
				       	    			   padding: '15px', 
				       	    			   backgroundColor: '#000', 
				       	    			   '-webkit-border-radius': '10px', 
				       	    			   '-moz-border-radius': '10px', 
				       	    			   'border-radius': '10px', 
				       	    			   opacity: .4, 
				       	    			   color: '#fff',
				       	    			   width:'100px'
				       				},
				       				loadImage:' '
	       						},
	                    success : function (res) {
	                    	if(res.success) {
	                    		
	                    		$("#invNo").val(res.invNo);
	                    		$(".lastTotalPrice").val($("#lastTotalPrice").html());
	                    		$(".lastDiscount").val($("#lastDiscount").html());
	                    		$(".lastDeliverPrice").val($("#lastDeliverPrice").html());
	                    		
	                    		$("#cashIdNo").val(res.cashIdNo);
	                    		$("#mainForm").attr("method","post");
	                    		$("#mainForm").attr("action","/mobile/order/orderList3.do");
	                    		$("#mainForm").submit();
	                    		
	                    	}
	                    } 
	                });
	        	
	        	}
	        	
	        } 
	    });
		
		
	};
	
	
	context.immGenerateElement =function(){
		
		var pmgb = $('input[name="paymentGb"]:radio:checked').val();
//		
//		
		if($("#P_ONLY_CARDCODE").val() == undefined){
			$("#pgForm").append("<input type='hidden' name='P_ONLY_CARDCODE' id='P_ONLY_CARDCODE' >");
		}
		
		if(pmgb=="0510"){
			$("#P_ONLY_CARDCODE").val("11");
		}else{
			$("#P_ONLY_CARDCODE").val("");
		}
		
		if($("#P_RETURN_URL").val() == undefined){
			$("#pgForm").append("<input type='hidden' name='P_RETURN_URL' id='P_RETURN_URL' value='"+sslShopUrl+"/mobile/pg/pReturn.do' >");
		}
		
		if($("#P_EMAIL").val() == undefined){
			$("#pgForm").append("<input type='hidden' name='P_EMAIL' id='P_EMAIL' value='' >");
		}
		
		if($("#P_MOBILE").val() == undefined){
			$("#pgForm").append("<input type='hidden' name='P_MOBILE' id='P_MOBILE' value='' >");
		}
		
		if($("#P_GOODS").val() == undefined){
			$("#pgForm").append("<input type='hidden' name='P_GOODS' id='P_GOODS' value='' >");
		}
		
		if($("#P_OID").val() == undefined){
			$("#pgForm").append("<input type='hidden' name='P_OID' id='P_OID' value='' >");
		}
		
		if($("#P_NOTI").val() == undefined){
			$("#pgForm").append("<input type='hidden' name='P_NOTI' id='P_NOTI' value='' >");
		}
		
		if($("#P_UNAME").val() == undefined){
			$("#pgForm").append("<input type='hidden' name='P_UNAME' id='P_UNAME' value='' >");
		}
		
		if($("#P_NEXT_URL").val() == undefined){
			$("#pgForm").append("<input type='hidden' name='P_NEXT_URL' id='P_NEXT_URL' value='"+sslShopUrl+"/mobile/pg/pNextNew.do' >");
		}
		
		if($("#P_NOTI_URL").val() == undefined){
			$("#pgForm").append("<input type='hidden' name='P_NOTI_URL' id='P_NOTI_URL' value='"+sslShopUrl+"/mobile/pg/pNoti.do' >");
		}
		
		if($("#P_MID").val() == undefined){
			$("#pgForm").append("<input type='hidden' name='P_MID' id='P_MID' value='' >");
		}
		
		if($("#P_AMT").val() == undefined){
			$("#pgForm").append("<input type='hidden' name='P_AMT' id='P_AMT' value='' >");
		}
		
		if($("#P_MNAME").val() == undefined){
			$("#pgForm").append("<input type='hidden' name='P_MNAME' id='P_MNAME' value='"+sessionScope.shopNm+"' >");
		}
		
		if($("#P_HPP_METHOD").val() == undefined){
			$("#pgForm").append("<input type='hidden' name='P_HPP_METHOD' id='P_HPP_METHOD' value='2' >");
		}
		
		if($("#P_RESERVED").val() == undefined){
			if(sessionScope.shopId == "2000087235"){
				$("#pgForm").append("<input type='hidden' name='P_RESERVED' id='P_RESERVED' value='twotrs_isp=Y&block_isp=Y&twotrs_isp_noti=N&ismart_use_sign=Y&vbank_receipt=Y&cp_yn=N&disable_kpay=Y' >");
			}else{
				$("#pgForm").append("<input type='hidden' name='P_RESERVED' id='P_RESERVED' value='twotrs_isp=Y&block_isp=Y&twotrs_isp_noti=N&ismart_use_sign=Y&vbank_receipt=N&cp_yn=N&disable_kpay=Y' >");
			}
		}
		
		if($("#P_CHARSET").val() == undefined){
			$("#pgForm").append("<input type='hidden' name='P_CHARSET' id='P_CHARSET' value='utf8' >");
		}
		
		
		
	}
	
	
	
	context.iwmGenerateElement =function(){
		
		var pmgb = $('input[name="paymentGb"]:radio:checked').val();
		
		
		if($("#ini_onlycardcode").val() == undefined){
			$("#mainForm").append("<input type='hidden' name='ini_onlycardcode' id='ini_onlycardcode' >");
		}
		if($("#ini_cardcode").val() == undefined){
			$("#mainForm").append("<input type='hidden' name='ini_cardcode' id='ini_cardcode' >");
		}
		
		if(pmgb=="0510"){
			$("#ini_onlycardcode").val("11");
			
			//온누리전용 필드
			
			if($("#ansim_quota").val() == undefined){
				$("#mainForm").append("<input type='hidden' name='ansim_quota' id='ansim_quota' >");
			}
			if($("#ini_cardcode").val() == undefined){
				$("#mainForm").append("<input type='hidden' name='ini_cardcode' id='ini_cardcode' >");
			}
			
			$("#ansim_quota").val("0"); //일시불
			$("#ini_cardcode").val("11"); //일시불
			
		}else{
			$("#ini_onlycardcode").val("");
			$("#ini_cardcode").val("");
			$("#ansim_quota").val(""); //온누리전용코드값 초기화
		}
		
		
		
		
		if($("#version").val() == undefined){
			$("#mainForm").append("<input type='hidden' name='version' id='version' >");
		}
		if($("#mid").val() == undefined){
			$("#mainForm").append("<input type='hidden' name='mid' id='mid' >");
		}
		if($("#goodsname").val() == undefined){
			$("#mainForm").append("<input type='hidden' name='goodsname' id='goodsname' >");
		}
		if($("#oid").val() == undefined){
			$("#mainForm").append("<input type='hidden' name='oid' id='oid' >");
		}
		if($("#invNo").val() == undefined){
			$("#mainForm").append("<input type='hidden' name='invNo' id='invNo' >");
		}
		if($("price").val() == undefined){
			$("#mainForm").append("<input type='hidden' name='price' id='price' >");
		}
		if($("#currency").val() == undefined){
			$("#mainForm").append("<input type='hidden' name='currency' id='currency' >");
		}
		if($("#buyername").val() == undefined){
			$("#mainForm").append("<input type='hidden' name='buyername' id='buyername' >");
		}
		if($("#buyertel").val() == undefined){
			$("#mainForm").append("<input type='hidden' name='buyertel' id='buyertel' >");
		}
		if($("#buyeremail").val() == undefined){
			$("#mainForm").append("<input type='hidden' name='buyeremail' id='buyeremail' >");
		}
		if($("#timestamp").val() == undefined){
			$("#mainForm").append("<input type='hidden' name='timestamp' id='timestamp' >");
		}
		if($("#signature").val() == undefined){
			$("#mainForm").append("<input type='hidden' name='signature' id='signature' >");
		}
		if($("#returnUrl").val() == undefined){
			$("#mainForm").append("<input type='hidden' name='returnUrl' id='returnUrl' >");
		}
		if($("#closeUrl").val() == undefined){
			$("#mainForm").append("<input type='hidden' name='closeUrl' id='closeUrl' >");
		}
		if($("#mKey").val() == undefined){
			$("#mainForm").append("<input type='hidden' name='mKey' id='mKey' >");
		}
		if($("#gopaymethod").val() == undefined){
			$("#mainForm").append("<input type='hidden' name='gopaymethod' id='gopaymethod' >");
		}
		if($("#offerPeriod").val() == undefined){
			$("#mainForm").append("<input type='hidden' name='offerPeriod' id='offerPeriod' >");
		}
		if($("#acceptmethod").val() == undefined){
			$("#mainForm").append("<input type='hidden' name='acceptmethod' id='acceptmethod' >");
		}
		if($("#merchantData").val() == undefined){
			$("#mainForm").append("<input type='hidden' name='merchantData' id='merchantData' >");
		}
		if($("#payViewType").val() == undefined){
			$("#mainForm").append("<input type='hidden' name='payViewType' id='payViewType' value='overlay' >");
		}
		if($("#quotabase").val() == undefined){
			$("#mainForm").append("<input type='hidden' name='quotabase' id='quotabase' >");
		}
	}
	
	
	context.lomGenerateElement = function(){
		
		
		if($("#LGD_PAYINFO").val() == undefined){
			$("body").append("<form method='post' name='LGD_PAYINFO' id='LGD_PAYINFO' action=''>");
		}
		
		if($("#CST_PLATFORM").val() == undefined){
			$("#LGD_PAYINFO").append('<input type="hidden" name="CST_PLATFORM" id="CST_PLATFORM" />');
		}
		
		if($("#CST_MID").val() == undefined){
			$("#LGD_PAYINFO").append('<input type="hidden" name="CST_MID" id="CST_MID" />');
		}
		
		if($("#LGD_WINDOW_TYPE").val() == undefined){
			$("#LGD_PAYINFO").append('<input type="hidden" name="LGD_WINDOW_TYPE" id="LGD_WINDOW_TYPE" />');
		}
		
		if($("#LGD_MID").val() == undefined){
			$("#LGD_PAYINFO").append('<input type="hidden" name="LGD_MID" id="LGD_MID" />');
		}
		
		if($("#LGD_OID").val() == undefined){
			$("#LGD_PAYINFO").append('<input type="hidden" name="LGD_OID" id="LGD_OID" />');
		}
		
		if($("#LGD_BUYER").val() == undefined){
			$("#LGD_PAYINFO").append('<input type="hidden" name="LGD_BUYER" id="LGD_BUYER" />');
		}
		
		if($("#LGD_PRODUCTINFO").val() == undefined){
			$("#LGD_PAYINFO").append('<input type="hidden" name="LGD_PRODUCTINFO" id="LGD_PRODUCTINFO" />');
		}
		
		if($("#LGD_AMOUNT").val() == undefined){
			$("#LGD_PAYINFO").append('<input type="hidden" name="LGD_AMOUNT" id="LGD_AMOUNT" />');
		}
		
		if($("#LGD_BUYEREMAIL").val() == undefined){
			$("#LGD_PAYINFO").append('<input type="hidden" name="LGD_BUYEREMAIL" id="LGD_BUYEREMAIL" />');
		}
		
		if($("#LGD_CUSTOM_SKIN").val() == undefined){
			$("#LGD_PAYINFO").append('<input type="hidden" name="LGD_CUSTOM_SKIN" id="LGD_CUSTOM_SKIN" />');
		}
		
		if($("#LGD_CUSTOM_PROCESSTYPE").val() == undefined){
			$("#LGD_PAYINFO").append('<input type="hidden" name="LGD_CUSTOM_PROCESSTYPE" id="LGD_CUSTOM_PROCESSTYPE" />');
		}
		
		if($("#LGD_TIMESTAMP").val() == undefined){
			$("#LGD_PAYINFO").append('<input type="hidden" name="LGD_TIMESTAMP" id="LGD_TIMESTAMP" />');
		}
		
		if($("#LGD_HASHDATA").val() == undefined){
			$("#LGD_PAYINFO").append('<input type="hidden" name="LGD_HASHDATA" id="LGD_HASHDATA" />');
		}
		
		if($("#LGD_RETURNURL").val() == undefined){
			$("#LGD_PAYINFO").append('<input type="hidden" name="LGD_RETURNURL" id="LGD_RETURNURL" />');
		}
		
		if($("#LGD_CUSTOM_USABLEPAY").val() == undefined){
			$("#LGD_PAYINFO").append('<input type="hidden" name="LGD_CUSTOM_USABLEPAY" id="LGD_CUSTOM_USABLEPAY" />');
		}
		
		if($("#LGD_CUSTOM_SWITCHINGTYPE").val() == undefined){
			$("#LGD_PAYINFO").append('<input type="hidden" name="LGD_CUSTOM_SWITCHINGTYPE" id="LGD_CUSTOM_SWITCHINGTYPE" />');
		}
		
		if($("#LGD_WINDOW_VER").val() == undefined){
			$("#LGD_PAYINFO").append('<input type="hidden" name="LGD_WINDOW_VER" id="LGD_WINDOW_VER" />');
		}
		
		if($("#LGD_OSTYPE_CHECK").val() == undefined){
			$("#LGD_PAYINFO").append('<input type="hidden" name="LGD_OSTYPE_CHECK" id="LGD_OSTYPE_CHECK" />');
		}
		
		if($("#LGD_VERSION").val() == undefined){
			$("#LGD_PAYINFO").append('<input type="hidden" name="LGD_VERSION" id="LGD_VERSION" />');
		}
		
		if($("#LGD_CASNOTEURL").val() == undefined){
			$("#LGD_PAYINFO").append('<input type="hidden" name="LGD_CASNOTEURL" id="LGD_CASNOTEURL" />');
		}
		
		if($("#LGD_RESPCODE").val() == undefined){
			$("#LGD_PAYINFO").append('<input type="hidden" name="LGD_RESPCODE" id="LGD_RESPCODE" />');
		}
		
		if($("#LGD_RESPMSG").val() == undefined){
			$("#LGD_PAYINFO").append('<input type="hidden" name="LGD_RESPMSG" id="LGD_RESPMSG" />');
		}
		
		if($("#LGD_PAYKEY").val() == undefined){
			$("#LGD_PAYINFO").append('<input type="hidden" name="LGD_PAYKEY" id="LGD_PAYKEY" />');
		}
		
		if($("#LGD_ENCODING").val() == undefined){
			$("#LGD_PAYINFO").append('<input type="hidden" name="LGD_ENCODING" id="LGD_ENCODING" value="UTF-8" />');
		}
		
		if($("#LGD_ENCODING_RETURNURL").val() == undefined){
			$("#LGD_PAYINFO").append('<input type="hidden" name="LGD_ENCODING_RETURNURL" id="LGD_ENCODING_RETURNURL" value="UTF-8" />');
		}
		
		if($("#LGD_CASHRECEIPTYN").val() == undefined){
			$("#LGD_PAYINFO").append('<input type="hidden" name="LGD_CASHRECEIPTYN" id="LGD_CASHRECEIPTYN" value="Y" />');
		}
		
		if($("#LGD_ENCODING_NOTEURL").val() == undefined){
			$("#LGD_PAYINFO").append('<input type="hidden" name="LGD_ENCODING_NOTEURL" id="LGD_ENCODING_NOTEURL" value="UTF-8" />');
		}
		
		if($("#LGD_ESCROW_USEYN").val() == undefined){
			$("#LGD_PAYINFO").append('<input type="hidden" name="LGD_ESCROW_USEYN" id="LGD_ESCROW_USEYN" />');
		}
		
		
		if($("#LGD_USABLECARD").val() == undefined){
			$("#LGD_PAYINFO").append('<input type="hidden" name="LGD_USABLECARD" id="LGD_USABLECARD" value="" />');
		}
		
		if($("#LGD_INSTALLRANGE").val() == undefined){
			$("#LGD_PAYINFO").append('<input type="hidden" name="LGD_INSTALLRANGE" id="LGD_INSTALLRANGE" value="0:2:3:4:5:6:7:8:9:10:11:12" />');
		}
		
	}
	
	
	context.pgComplete = function () {

		
    	var params = $("#mainForm").serialize();
    	
    	if(params=="" || params==undefined){  //자체창이 아닌 iframe 창에서 호출할때 
    		
    		$(".webItemNm",parent.document).each(function(){
    			$(this).val(encodeURIComponent($(this).val()));
    		});
    		
    		$(".itemNm",parent.document).each(function(){
    			$(this).val(encodeURIComponent($(this).val()));
    		});
    		
    		params = $("#mainForm",parent.document).serialize();
    		
    		$(".webItemNm",parent.document).each(function(){
    			$(this).val(decodeURIComponent($(this).val()));
    		});
    		
    		$(".itemNm",parent.document).each(function(){
    			$(this).val(decodeURIComponent($(this).val()));
    		});

    		
    		jqUtils.ajax({
	            url : '/order/payment.do',
	            data : params,
	           	mask : {
	           		autoClose:true,
	           		message : '<span style="font-size:15px;">&nbsp;주문 결제중 ...</span>'
	           	},
	            success : function (res) {
	            	
	            	if(res.success) {
	            		
	            		$("#invNo",parent.document).val(res.invNo);
	            		$(".lastTotalPrice",parent.document).val($("#lastTotalPrice",parent.document).html());
	            		$(".lastDiscount",parent.document).val($("#lastDiscount",parent.document).html());
	            		$(".lastDeliverPrice",parent.document).val($("#lastDeliverPrice",parent.document).html());
	            		$("#mainForm",parent.document).attr("target","_self");
	            		$("#mainForm",parent.document).attr("method","post");
	            		$("#mainForm",parent.document).attr("action","/order/orderList3.do");
	            		$("#mainForm",parent.document).submit();
	            	}else{
	            		alert("결제중 오류가 발생하였습니다. 관리자에게 문의하세요");
	            		location.href = sslShopUrl+'/order/pgClose.do'
	            		$.unblockUI();
	            	}
	            },
	            error : function(res){
	            	alert("결제중 오류가 발생하였습니다. 관리자에게 문의하세요");
	            	location.href = sslShopUrl+'/order/pgClose.do'
	            	$.unblockUI();
	            }
	        });
    		
    		
    		
    	}else{ //자체창에서 호출될때
    		
//    		$(".webItemNm",parent.document).each(function(){
//    			$(this).val(encodeURIComponent($(this).val()));
//    		});
//    		
//    		$(".itemNm",parent.document).each(function(){
//    			$(this).val(encodeURIComponent($(this).val()));
//    		});
    		
    		params = $("#mainForm").serialize();
    		
//    		$(".webItemNm",parent.document).each(function(){
//    			$(this).val(decodeURIComponent($(this).val()));
//    		});
//    		
//    		$(".itemNm",parent.document).each(function(){
//    			$(this).val(decodeURIComponent($(this).val()));
//    		});
    		
    	
	    	jqUtils.ajax({
	            url : '/order/payment.do',
	            data : params,
	           	mask : {
	           		autoClose:true,
	           		message : '<span style="font-size:15px;">&nbsp;주문 결제중 ...</span>'
	           	},
	            success : function (res) {
	            	if(res.success) {
	            		
	            		$("#invNo").val(res.invNo);
	            		$(".lastTotalPrice").val($("#lastTotalPrice").html());
	            		$(".lastDiscount").val($("#lastDiscount").html());
	            		$(".lastDeliverPrice").val($("#lastDeliverPrice").html());
	            		$("#mainForm").attr("target","_self");
	            		$("#mainForm").attr("method","post");
	            		$("#mainForm").attr("action","/order/orderList3.do");
	            		$("#mainForm").submit();
	            	}else{
	            		try{
	            		$.unblockUI();
	            		closeIframe();
	            		}catch(e){
	            			
	            		}
	            	}
	            },
	            error : function(res){
	            	try{
	            		$.unblockUI();
	            		closeIframe();
	            		}catch(e){
	            			
	            		}
	            }
	        });
		
    	}
		
	};
	
	
})(window, pgUtils);