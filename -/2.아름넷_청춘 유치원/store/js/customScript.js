
	//각종 자바스크립트 변수
	var search_word_length = 1;
	var search_word_info = sessionScope.searchBoxHelp;
	var $form = null; // 공통폼
	
	$(document).ready(function() {
		$form = $("#mainForm");
		
		//로그인 한 상태에서 팩스주문서를 클릭하면 로그인한 사람의 배송권역에 있는 storeNm을 조회한다.
		$(".faxdown").click(function(){
//			alert('팩스주문서 점검중 입니다.');
//			return;
			
			jqUtils.ajax({
		         url : '/member/getFaxDownLoad.do',
		         success : function (res) {
	        	    if (res === undefined || res === null) {
						alert('해당 주문서가 존재하지 않습니다.');
						return false;
					}
		        	var storeNm = res.deliveryInfo.storeNm;
		        	storeNm = storeNm.replace(/(^\s*)|(\s*$)/gi, "");
		        	//location.href="/uploadFile/faxOrder/사무용품신청서_"+ storeNm +".xls";
		        	location.href="https://fs.arumnet.com/image/N2030ICUMT/fax/사무용품신청서_"+ storeNm +".xls";
		         }
		     });
		});	
		
		$(".category-wrap > ul > li > a > span").on("click",function(){
            var li_item = $(this).parent().siblings(".sub").find("li").length;
            if(li_item > 0){
                $(this).parent().parent().toggleClass("on");
                $(this).parent().siblings(".sub").slideToggle();
                return false;
            }
            
        })
        $(".category-wrap .sub ul > li > a > span").on("click",function(){
            $(this).parent().parent().toggleClass("on");
            $(this).parent().siblings(".depth03").slideToggle();
            return false;
        })
        
        $(".checkCartAll").click(function(){
		  	if($(this).is(':checked')){
			  $(this).parent().parent().parent().find(".itemId").each(function(){
			  	  	    $(this).prop('checked','checked');
			  })
			  $(this).parent().parent().parent().find(".checkAll").each(function(){
			  	  	    $(this).prop('checked','checked');
			  })
		    }else{
		    	$(this).parent().parent().parent().find(".itemId").each(function(){
			  	  	    $(this).prop('checked','');
				})
			   $(this).parent().parent().parent().find(".checkAll").each(function(){
		  	  	    $(this).prop('checked','');
				})
		    }
		});
		
		// 전체선택
		jq('#check_all').click(function() {
		    if(jq('#check_all').is(':checked')){
		  	    jq('.itemId').each(function(){
		  	  	    jq(this).prop('checked','checked');
		  	    });
		    }else{
		    	jq('.itemId').each(function(){
		  	  	    jq(this).prop('checked','');
		  	    });
		    }
		});	
		
		$('input,select').bind("keypress",function(event) { return event.keyCode != 13; });
		
		//이건 마이페이지 위시리스트와 장바구니에서 같이쓰임
		$(".btn_delete_all").click(function(){
			var cnt = $('.itemId').length;
			
			if(confirm("장바구니의 모든 상품을 삭제하시겠습니까?")){
			
				if(cnt<1){
					
					alert("장바구니에 담긴 상품이 없습니다.");
					return false;
				}
				$form.attr("action","/cart/delAllCartSubmit.do");
				$form.submit();
		
			}
		});
			
		$(".modifyCnt").click(function() {
			//낱개수정이기때문에 selectbox에 선택된건 모두 해제
			$(".itemId").each(function(){
				$(this).prop("checked","");
			});
			
			var itemCnt = $(this).parent().find(".itemCount").val();
			if(itemCnt == "0" || itemCnt == ""){
				alert("수량을 1 이상 입력해 주세요");
				return false;
			}
			$(this).parent().parent().find(".itemId").prop("checked","checked");
			$("#itemCnt").val(itemCnt);
			$("#pageType").val("itemCntUpdate");
			
			$form.attr("action","/cart/myCartUpdate.do");
			$form.submit();
		});
		
		// 상품 수량 증가
		$(document).on("click",".add_item_quantity",function(){
			var addCnt = 1;
			
			if ($(this).parent().parent().find(".itemCount").attr("unitEa") != "" && $(this).parent().parent().find(".itemCount").attr("unitEa") > 1) {
				addCnt = $(this).parent().parent().find(".itemCount").attr("unitEa");
			}
			
			var itemCnt = $(this).parent().parent().find(".itemCount").val();
			
			if (isNaN(itemCnt)) {
				itemCnt = addCnt;
			}
			$(this).parent().parent().find(".itemCount").val(parseInt(itemCnt) + parseInt(addCnt));
			var qty = $(this).parent().parent().find(".itemCount").val();
			var price = parseInt($(this).parent().parent().parent().find(".itemId").attr("price"));
			if(!isNaN(price)){
				$(this).parent().parent().parent().find(".optionPrice").html((price * qty).toLocaleString()+"원");
			}
			// 수량 변경 시 체크박스 자동 체크
			$(this).parent().parent().parent().find(".itemId").prop("checked", true);
		});	

		// 상품 수량 감소
		$(document).on("click",".del_item_quantity",function(){
			var delCnt = 1;
			
			if ($(this).parent().parent().find(".itemCount").attr("unitEa") != "" && $(this).parent().parent().find(".itemCount").attr("unitEa") > 1) {
				delCnt = $(this).parent().parent().find(".itemCount").attr("unitEa");
			}
			
			var itemCnt = $(this).parent().parent().find(".itemCount").val();
			
			if (isNaN(itemCnt)) {
				itemCnt = delCnt;
			}
			
			if (Number(itemCnt) > Number(delCnt)) {
				$(this).parent().parent().find(".itemCount").val(parseInt(itemCnt) - parseInt(delCnt));
			}
			
			var qty = $(this).parent().parent().find(".itemCount").val();
			var price = parseInt($(this).parent().parent().parent().find(".itemId").attr("price"));
			if(!isNaN(price)){
				$(this).parent().parent().parent().find(".optionPrice").html((price * qty).toLocaleString()+"원");
			}
			// 수량 변경 시 체크박스 자동 체크
			$(this).parent().parent().parent().find(".itemId").prop("checked", true);
		});
		
		
		// 모든카테고리 보기 알파
		$('#all_category').click( function() {
			if ($('.menu_all').css('display') == 'none') {
		    	$('.menu_all').show();
		    	$('#all_category').attr('src', '/skin/header/images/Tbtn_ALLcategory2.png');
			} else {							
				$('.menu_all').hide();
				$('#all_category').attr('src', '/skin/header/images/Tbtn_ALLcategory1.png');
			}
		});

		$('#div_category').mouseleave( function() {
			$('.menu_all').hide();		// 이파일의 수정사항은 모든 쇼핑몰에 공통으로 적용되는 부분입니다. 수정하지 말아주세요.
			$('#all_category').attr('src', '/skin/header/images/btn_view_category_off.gif');
		});
		
		$(".myCart").click(function(){
			
			$form.attr("action","/cart/myCart.do");
			$form.submit();
		});
		

		$(".SimpleOrderNow").click(function(){
			
			var n = $('input[name=easy_cart_check]:checked').length;
			if (n == 0) {
				alert('하나이상 체크하여 주십시오.');
				return false;
			}
			
			var flag=true;
			var param= '';
			$('input[name=easy_cart_check]').each( function() {
				if ($(this).is(':checked')) {
					
					if($(this).attr("itemSts")=="2"){
						alert("판매불가 상품은 주문을 할 수 없습니다.");
						flag =false;
						return false;
					}else if($(this).attr("itemSts")=="3"){
						alert("단종된 상품은 주문을 할 수 없습니다.");
						flag = false;
						return false;
					}else if($(this).attr("itemSts")=="4"){
						alert("일시품절된 상품은 주문을 할 수 없습니다.");
						flag = false;
						return false;
					}else if($(this).attr("itemSts")=="5"){
						alert("장기품절된 상품은 주문을 할 수 없습니다.");
						flag = false;
						return false;
					}else if(parseInt($(this).attr("cateCnt")) < 1) {
						alert("삭제된 상품이 포함되어 있습니다.");
						flag = false;
						return false;
					}else{
						param +='itemId='+$(this).val()+"&";
					}	
				}
			});	
			if(flag){
				if(loginUser.loginYn === 'N') {
					fnLoginPopup(true,param);
				} else {
					location.href=sslShopUrl+'/order/orderList.do?'+param;
				}
				
			}
			
		});
		
		// 하단 스크립트 시작

		// 상품리스트 이미지 미리보기
		$('.preview_image').hover( 
			function(e) {
				var img_src = $(this).attr('src').replace('/img02/', '/img03/');						
				var position = $(this).position();
				$('#preview').css('left', position.left+95).css('top', position.top-80);
				$('#preview img').attr('src', img_src);
				$('#preview').show();
			},
	
			function(e){
				$('#preview').hide();
			}
		);
	
		
		//unixbeauty는 뷰적인 스크립트가 shop.js에 있어서 이쪽에 있는건 가렸다.
		
//		$('#cartOpen_tit img').click( function() {
//			var cart_class = $('#cartOpen_tit img').hasClass('open_cart');
//			if (cart_class) {
//				$('.cartView').animate({ height: 'toggle' }, 500, function() {
//					$('#cartOpen_tit img').attr('src', '/skin/easy_cart/images/title_cart_close.gif');
//					$('#cartOpen_tit img').removeClass('open_cart').addClass('close_cart');
//				});
//			} else {
//				$('.cartView').hide();
//				$('#cartOpen_tit img').attr('src', '/skin/easy_cart/images/title_cart_open.gif');
//				$('#cartOpen_tit img').removeClass('close_cart').addClass('open_cart');
//			}
//		});

//		// 왼쪽 이동
//		$('.left_move').click( function() {
//			var show_count = $('.show').length;
//			var first_show_index = $('.cartContentBox').index($('.show').eq(0));
//			var last_show_index = first_show_index+3;
//			if (0 < first_show_index) {
//				first_show_index = first_show_index - 1;
//				$('.cartContentBox:eq(' + last_show_index + ')').hide().removeClass('show').addClass('hidden');			
//				$('.cartContentBox:eq(' + first_show_index + ')').show().removeClass('hidden').addClass('show');
//			}		
//		});	
//		
//		// 오른쪽 이동
//		$('.right_move').click( function() {
//			var show_count = $('.show').length;
//			var first_show_index = $('.cartContentBox').index($('.show').eq(0));
//			var last_show_index = first_show_index + 4;
//			if (1 < show_count) {
//				$('.cartContentBox:eq(' + first_show_index + ')').hide().removeClass('show').addClass('hidden');
//				$('.cartContentBox:eq(' + last_show_index + ')').show().removeClass('hidden').addClass('show');
//			}		
//		});
//		
		
		// 장바구니 선택삭제
		$('.btn_easy_cart_selected_delete').click( function() {
			var n = $('input[name=easy_cart_check]:checked').length;
			if (n == 0) {
				alert('하나이상 체크하여 주십시오.');
				return false;
			}
			
			var param= '';
			$('input[name=easy_cart_check]').each( function() {
				if ($(this).is(':checked')) {
								param +='itemId='+$(this).val()+"&";
				}else{
				}
				
			});	
			
			var config = {
				url : '/cart/delCart.do',
				data : param,
				success : function (res) {
					delCartCallback(res);
				}
			};
			jqUtils.ajax(config);
			
			if (0 == $('.cartContentBox').length) {
				fn_empty();
			}
		});
	
		// 장바구니 전체삭제
		$('.btn_easy_cart_all_delete').click( function() {
			if (confirm('장바구니 상품을 전체삭제 하시겠습니까?')) {				
				var config = {
					url : '/cart/delAllCart.do',
					data : '',
					success : function (res) {
						delCartCallback(res);
					}
				};
				jqUtils.ajax(config);
			}		
		});
	
		// 전체카테고리 2차분류 선택시(알파)
		$('div.jung_menu ul li').mouseover( function() {
			var idx = $('div.jung_menu ul li').index(this);
			var val = $("div.jung_menu ul li:eq(" + idx + ") a").attr("href").split("/");
			if (val[3]) {
				$('#SubGnb' + val[3]).show();
			}
		}).mouseout(function(){
			var idx = $('div.jung_menu ul li').index(this);
			var val = $("div.jung_menu ul li:eq(" + idx + ") a").attr("href").split("/");
			if (val[3]) {
				$('#SubGnb' + val[3]).hide();
			}
		});	
		
		
		
		//상단검색관련
		/* 상단 검색 입력창 관련 */
		jq('#kw').focus(function() {
			if (jq('#search_value').val()) {
				jq('#kw').css('background', 'url()');
				if (jq.browser.msie) {
					jq('#kw').css('padding-top', '0');
				} else {					
					jq('#kw').css('padding-top', '-10px');
				} 
			}
			var kw = get_searchword();
			if ( kw == search_word_info ) {
				jq('#kw').val('');
			}
		});		
		jq('#kw').blur(function() {
			var kw = get_searchword();
			if ( kw == '' ) {
				jq('#kw').val(search_word_info);
			}
			if ( jq('#search_value').val() && '' == jq('#kw').val() ) {				
				jq('#kw').css('background', 'transparent url(' + word_image + ') no-repeat 2px 2px');						
			}
		});
		
		$("#kw").keypress(function(event){
			if(event.keyCode =='13'){
				fnSearchItem();
				return;
			}
			
		});
		
		
		/* 다른 카테고리 전체보기 */
		jq('#full_category_view').click( function() {	
			if (jq('.full_category').css('display') == 'none') {
				jq('.full_category').show();
				jq('#full_category_view').attr('src', '/skin/path/images/btn_view_category_off.gif');
			} else {
				jq('.full_category').hide();
				jq('#full_category_view').attr('src', '/skin/path/images/btn_view_category_on.gif');
			}
		});
		
		jq('.mnv_category').mouseleave( function() {
			window.setTimeout(hideMnvPop, 400);
			jq('#full_category_view').attr('src', '/skin/path/images/btn_view_category.gif');
		});

		/* 서브 카테고리 전체보기 */
		jq('#sub_all_category').click( function() {			
			if (jq('#sub_full_category').css('display') == 'none') {
				jq('#sub_one_category').hide();
				jq('#sub_full_category').show();
				jq('#sub_all_category').attr('src', '/skin/category/images/category_off.gif');
			} else {
				jq('#sub_one_category').show();
				jq('#sub_full_category').hide();
				jq('#sub_all_category').attr('src', '/skin/category/images/category_on.gif');
			}
		});
		
		// 상품 목록의 10개씩, 20개씩 목록갯수 select box의 change (cateItemList.jsp, todaysItem.jsp에서 사용)
		$(".recordCountPerPage").change(function(){
			fnReloadPage();
		});
		
		// 오늘본상품의 롤링 이벤트 등록
		if($("#popupYn").val()!="Y"){
			fnInitTodayItems();
		}
		
		validUtils.onlyNumeric('.number');
//		$(".number").numeric();
		$(".number").css({"ime-mode":"disabled"});
		
		// 카테고리 콤보1 선택 변경시
		$('#cboCateLevel1').change(function() {
			var cateId = $(this).val();
			if (cateId == "") {
				return false;
			}
			//var cateId = $("#cboCateLevel1 option:selected").val();
			fnGoCate('1', cateId);
		});
		
		// 카테고리 콤보2 선택 변경시
		$('#cboCateLevel2').change(function() {
			var cateId = $(this).val();
			if (cateId == "") {
				return false;
			}
			//var cateId = $("#cboCateLevel2 option:selected").val();
			fnGoCate('2', cateId);
		});
		
		// 카테고리 콤보3 선택 변경시
		$('#cboCateLevel3').change(function() {
			var cateId = $(this).val();
			if (cateId == "") {
				return false;
			}
			//var cateId = $("#cboCateLevel3 option:selected").val();
			fnGoCate('3', cateId);
		});
		
	});
	
	
	
	/**
	 * 오늘본상품이 쿠키에 저장되어있으면 오늘본상품을 보여주고 
     * jquery rolling 이벤트를 걸어준다.
	 */
function fnInitTodayItems () {
		
		var todayItemsCookie = $.cookie(todayItemsCookieKey);
		if(todayItemsCookie === undefined) {
//			$('.view').hide();
//			$('.td_item').hide();
			
			$('.todayCnt').html('0'); 
			$('#slider_quick_bx').html('<li><div style="color:#9E9E9E; text-align:center;">최근 본<br/>상품이<br/>없습니다.</div></li>');
		} else { 
			// 오늘본상품이 쿠키에 있다면 오늘본상품 영역에 목록을 그려주고 visible을 show로 전환한후 jCarouselLite로 이벤트 만들어 준다.
			var todayItemsArr = todayItemsCookie.split(',');
			var todayItemsHtml = '';
			
			var cnt = 0 
			try {
				for(var i=todayItemsArr.length-1; i> -1; i--) {
					var todayItems = todayItemsArr[i].split('|');
					var itemId = todayItems[0];
					var image01 = todayItems[1];
					
					todayItemsHtml += '<li class="swiper-slide" style="width:91px;height:91px;"><a href="'+ shopUrl +'/item/itemView.do?itemId=' + itemId +'"><img style="width:91px;height:91px;" src="'+ imgServerUrl + '/' + image01 + '" alt="" onerror="fn_ChangeImage(this, \'list\');"/></a></li>';
					
					cnt++;
				}
				// 오늘본 아이템이 있는경우만 view보여주고 이벤트등록
				if(todayItemsArr.length > 0) {
					$('.todayItems').html(todayItemsHtml); // 오늘본아이탬리스트를 그린다
					$('.todayCnt').html(todayItemsArr.length); // 전체보기 숫자
					
				}
			} catch (e) {
				
			}
		}
		
		
		// 오늘 본 상품 롤링
//		var todayItemsCookie = $.cookie(todayItemsCookieKey);
//		if(todayItemsCookie === undefined) {
//			$('.today_items').hide();
//		} else { 
//			// 오늘본상품이 쿠키에 있다면 오늘본상품 영역에 목록을 그려주고 visible을 show로 전환한후 jCarouselLite로 이벤트 만들어 준다.
//			var todayItemsArr = todayItemsCookie.split(',');
//			var todayItemsHtml = '';
//			
//			try {
//				for(var i=todayItemsArr.length-1; i> -1; i--) {
//					var todayItems = todayItemsArr[i].split('|');
//					var itemId = todayItems[0];
//					var image01 = todayItems[1];
//					todayItemsHtml += '<li class="item_list" id="top0" style="text-align:center;overflow: hidden; float: none; height: 50px;">'; 
//					todayItemsHtml += '<a href="'+ shopUrl +'/item/itemView.do?itemId=' + itemId +'">';
//					todayItemsHtml += '<img src="'+ imgServerUrl + '/' + image01 + '" name="55_55" width="50" height="50" class="border_gray" alt="" onerror="fn_ChangeImage(this, \'list\')">';
//					todayItemsHtml += '</a>'; 
//					todayItemsHtml += '</li>'; 
//				}
//				
//				// 오늘본 아이템이 있는경우만 view보여주고 이벤트등록
//				if(todayItemsArr.length > 0) {
//					$('#today_items_list_ul').html(todayItemsHtml); // 오늘본아이탬리스트를 그린다
//					$('.today_items_body #view_item_count').html(todayItemsArr.length); // 전체보기 숫자
//					$('.today_items_body #todayItemsMyCartCount').html(myCartListSize); // 장바구니 숫자 (myCartListSize는 incHead에서 정의)
//					
//					// rolling이벤트.
//					$('.today_items').show();
//					$('#today_items_list').jCarouselLite({
//						btnNext: ".next_item",
//						btnPrev: ".prev_item",
//						mouseWheel: true,
//						visible: 3,
//						circular: false,
//						easing: "backEaseOut",
//						vertical: true
//					});
//				}
//			} catch (e) {
//			}
//		}
	}
	
	
	function newBrand_type(code){
		$("#newBrand_type_1").hide();
		$("#newBrand_type_2").hide();
		$("#newBrand_type_3").hide();
		if(code == '1')	$("#newBrand_type_1").show();
		if(code == '2')	$("#newBrand_type_2").show();
		if(code == '3')	$("#newBrand_type_3").show();
	}
	
	function fn_easyCart(web_cart_id, item_id, item_name, unit_code, quantity, price, item_url, last, duplicate_yn) {
		var param = web_cart_id + '||' + item_id;
	
		if ('N' == duplicate_yn) {
			var ext = item_url.substr((item_url.length)-3, 3);
			if ( 'jpg' != ext && 'JPG' != ext && 'gif' != ext && 'GIF' != ext && 'png' != ext && 'PNG' != ext ) {
				item_url = '/skin/tools/images/75_75.gif';
			}		
			
			html  = '<div class="cartContentBox show">';
			html += '	<div class="cart_img"><img src="' + item_url + '" width="80" height="80" class="border_gray" alt="" /></div>';
			html += '	<div class="cartContentBoxText01 itemName">' + item_name + '</div>';
			html += '	<div class="cartContentBoxText02">' + comma(parseInt(price)) + '원</div>';
			html += '	<div class="cartContentBoxText01">';
			html += '		<input type="checkbox" name="easy_cart_check" value="' + param + '" />&nbsp;';
			html += '		<span class="easy_cart_check_quantity">' + comma(quantity) + '</span>' + unit_code;
			html += '		<input type="hidden" name="easy_price" value="' + parseInt(price) + '" />';
			html += '		<input type="hidden" name="easy_quantity" value="' + parseInt(quantity) + '" />';
			html += '	</div>';
			html += '</div>';
		
			jq('.cartContentBox').each( function() {
				if (2 < jq('.cartContentBox').index(this)) {
					jq(this).hide().removeClass('show').addClass('hidden');	
				}
			});
		
			if (0 == jq('.cartContentBox').length) {
				jq('#easy_cart_items').html(html);
			} else {
				jq('#easy_cart_items').prepend(html);
			}
		} else {
			jq('input[name=easy_cart_check]').each( function() {
				if (jq(this).val() == param) {
					var idx = jq('input[name=easy_cart_check]').index(jq(this));
					var before_quantity = parseInt(jq('input[name=easy_quantity]:eq(' + idx + ')').val());
					var apply_quantity = before_quantity + parseInt(quantity);
					jq('input[name=easy_quantity]:eq(' + idx + ')').val(apply_quantity);
					jq('.easy_cart_check_quantity:eq(' + idx + ')').html(comma(apply_quantity));
					return false;
				}
			});	
		}
		if ('Y' == last) {
			jq('.cartView').show();
			jq('#cartOpen_tit img').attr('src', '/skin/easy_cart/images/title_cart_close.gif');
			jq('#cartOpen_tit img').removeClass('open_cart').addClass('close_cart');
		}
		jq("input.checkId:checked").attr("checked", "");
		fn_cal();	
	}


function fn_cal() {
	var idx = '';
	var price = 0;
	var quantity = 0;
	var sum_price = 0;
	var sum_quantity = 0;
	jq('input[name=easy_price]').each( function() {
			idx = jq('input[name=easy_price]').index(jq(this));
	
			price = parseInt(jq('input[name=easy_price]:eq(' + idx + ')').val());
			quantity = parseInt(jq('input[name=easy_quantity]:eq(' + idx + ')').val());
			 
			sum_price += (price * quantity);
			sum_quantity += quantity;
		});
	
		var cart_add_price = (sum_price < 30000 && 0 < sum_price ) ? 3000 : 0;
		var total_price = sum_price + cart_add_price;

		jq('#cart_quantity strong').html(comma(sum_quantity)+'개');
		jq('#cart_order_price strong').html(comma(sum_price)+'원');
		jq('#cart_add_price strong').html(comma(cart_add_price)+'원');
		jq('#cart_total_price span').html(comma((total_price))+'원');
	}	

	function fn_empty() {
		jq('#easy_cart_items').html('<div class="empty_data">장바구니에 담긴 상품이 없습니다.</div>');
	}
	

	// 카테고리 닫기		
	function hideMnvPop() {
		jq('.full_category').hide();
	}

	// 스크롤시 호출(ie6 에서만)
	function fn_ScrollSky() {
		try {
			var top = parseInt(document.documentElement.scrollTop) + 192 + "px";
			$('#skyscraper').css('top', top);
		} catch (e) {}
	}	
	
	/* 검색어의 공백을 없애고 리턴한다.*/
	function get_searchword() {
		if (jq('#search_value').val()) {
			return jq.trim(jq('#search_value').val());
		} else {
			return jq.trim(jq('#kw').val());
		}
	}

	// textarea id, 제한 글자 수, 입력 결과 메세지 저장 ID
	function limitCharacters(textid, limit, limitid) {
		// 입력 값 저장
	    var text = jq('#'+textid).val();
	    // 입력값 길이 저장
	    var textlength = text.length;
	    if (textlength > limit) {
	    	jq('#' + limitid).html('입력내용은 ' + limit + '자 이상 쓸수 없습니다!');
	        // 제한 글자 길이만큼 값 재 저장
	        jq('#'+textid).val(text.substr(0,limit));
	        return false;
	    } else {
	    	jq('#' + limitid).html('입력내용은 ' + (limit - textlength) + '자 까지 입력하실수 있습니다.');
	        return true;
	    }
	}	

	// 시작 페이지 설정	
	function fn_setStart(param) {
		var url = 'http://localhost:8388';
		if (window.sidebar && window.sidebar.addPanel){ // Firefox 
			window.sidebar.addPanel("아름쇼핑몰", url,""); 
		}else{ 
			param.style.behavior = 'url(#default#homepage)';
			param.setHomepage(url);
		}
	}
	
	// 즐겨 찾기
	function fn_AddFavorite() {
		if (window.sidebar)	{ // firefox
			window.sidebar.addPanel(sessionScope.shopNm, "http://"+sessionScope.shopCd, "");
		} else if(window.opera && window.print)	 { // opera  
			var elem = document.createElement('a'); 
			elem.setAttribute('href', "http://"+sessionScope.shopCd); 
			elem.setAttribute('title',sessionScope.shopNm); 
			elem.setAttribute('rel','sidebar'); 
			elem.click(); 
		}else if(window.chrome){
			alert("Ctrl+D를 누르시면 즐겨찾기에 추가하실 수 있습니다.")
		}else if(document.getElementById) { // ie
			window.external.AddFavorite("http://"+sessionScope.shopCd, sessionScope.shopNm);
		}
	}


	function fn_ViewCategory(v){
		if (0 == v) {
			jq('#category-tab-area0').show();
			jq('#category-tab-area1').hide();
			jq('#category-tab-area2').hide();
		} else if (1 == v) {
			jq('#category-tab-area0').hide();
			jq('#category-tab-area1').show();
			jq('#category-tab-area2').hide();
		} else if (2 == v) {
			jq('#category-tab-area0').hide();
			jq('#category-tab-area1').hide();
			jq('#category-tab-area2').show();
		}
	}
//	
//	function axInstallShortcut() {
//		var axap = document.getElementById("oapControl");
//		axap.InstallShortcut();
//		jq('#header_baro').hide();
//		alert('바탕화면에 바로가기가 생성 되었습니다.');
//	}
//	
	function axInstallFavorite() {
		if ('N' == jq('#activex_shortcut_install_yn').val()) {
			fn_activexInstall();
		} else {
			var axap = document.getElementById("oapControl");
			axap.InstallFavorite();
			alert('즐겨찾기에 추가 되었습니다.');
		}
	}
//	
	
	// 배너 다음페이지
	function fn_banner_next(idx) {
		var sum = jq('#BannerNo').val();

		if (sum == 0) {
			sum = parseInt(idx) + 14;
		} else {
			sum = parseInt(sum) + 1;
		}
		
		if (parseInt(sum) > 14) {
			sum = 10;
		}
		jq('#BannerNo').val(sum);
		
		if (sum == 10) {
			jq('#imgs_banner').attr({ src: '/skin/welcome/images/banner_03_1_0701.gif' });
		} else if (sum == 11) {
			jq('#imgs_banner').attr({ src: '/skin/welcome/images/banner_03_2_0701.gif' });
		} else if (sum == 12) {
			jq('#imgs_banner').attr({ src: '/skin/welcome/images/banner_03_3_0701.gif' });
		}  else if (sum == 13) {
			jq('#imgs_banner').attr({ src: '/skin/welcome/images/banner_03_4_0701.gif' });
		}  else if (sum == 14) {
			jq('#imgs_banner').attr({ src: '/skin/welcome/images/banner_03_5_0701.gif' });
		}
	}

	// 배너 클릭
	function fn_banner_click() {
		var BannerNo = jq('#BannerNo').val();

		if (parseInt(BannerNo) == 10) {
			jq('#banner_link').attr({ href: '/customer_center/chain_store/2/15' });
		} else if (parseInt(BannerNo) == 11) {
			jq('#banner_link').attr({ href: '/customer_center/chain_store/2/16' });
		} else if (parseInt(BannerNo) == 12) {
			jq('#banner_link').attr({ href: '/customer_center/chain_store/3/09' });
		} else if (parseInt(BannerNo) == 13) {
			jq('#banner_link').attr({ href: '/customer_center/chain_store/3/10' });
		} else if (parseInt(BannerNo) == 14) {
			jq('#banner_link').attr({ href: '/customer_center/chain_store/4/07' });
		}
	}
	
	function bannerRolling(){
		fn_roll_next('img_mro1','4','7');
		
		setTimeout(bannerRolling,4000);
	}
	
	// rolling 다음 상품
	// max : 숨겨진 이미지 + 1개
	function fn_roll_next(id, type, max)
	{
		if(id == '') return;
		var howmany = jq('#' + id + ' dd').size();
		var size= jq('#' + id + ' dd').width();
		var first_size = max * size;		
		current = parseInt(jq('#' + id + ' input[name=itemCnt]').val());
		current = current + 1;

		if (current == max) {
			first_size = (type == '4') ? (parseInt(type)*max) + parseInt(first_size) : first_size;
			
			jq('#' + id).animate({
				marginLeft : "+=" + first_size + "px"
			}, 0);

			current = 0;
		}
		
		if(current != howmany){
			size = (type == '4') ? size + parseInt(type) : size;
			jq('#' + id).animate({
				marginLeft : "-=" + size + "px"
			}, 300);
		} else {
			current = current - 1;
		}
		jq('#' + id + ' input[name=itemCnt]').val(current);

		if (type) {
			jq('.' + id).html(current+1);
		}
	}
	
	
	// 이전 상품
	function fn_prev(id, type, max)
	{
		if(id == '') return;
		var howmany = jq('#' + id + ' dd').size();
		var size= jq('#' + id + ' dd').width();
		var first_size = max * size;
		current = parseInt(jq('#' + id + ' input[name=itemCnt]').val());
		current = current - 1;

		if (current == -1) {
			first_size = (type == '4') ? (parseInt(type)*max) + parseInt(first_size) : first_size;
			
			jq('#' + id).animate({
				marginLeft : "-=" + parseInt(first_size) + "px"
			}, 0);

			current = parseInt(max);
		} else {
			if(current > -1){
				size = (type && type != 'on') ? size + parseInt(type) : size;
				
				jq('#' + id).animate({
					marginLeft : "+=" + size + "px"
				}, 300);
				
			} else {
				current = current + 1;
			}
		}
		jq('#' + id + ' input[name=itemCnt]').val(current);

		if (type) {
			jq('.' + id).html(current+1);
		}
	}
	
	// 다음 상품
	function fn_next(id, type, num)
	{
		if(id == '') return;
		var howmany = jq('#' + id + ' dd').size();
		var size= jq('#' + id + ' dd').width();
		current = parseInt(jq('#' + id + ' input[name=itemCnt]').val());
		current = current + 1;

		if (num) {
			howmany = howmany - parseInt(num);
		}
		
		if(current != howmany){
			size = (type != 'on') ? size + parseInt(type) : size;
			
			jq('#' + id).animate({
				marginLeft : "-=" + size + "px"
			}, 300);
			
		} else {
			current = current - 1;
		}
		jq('#' + id + ' input[name=itemCnt]').val(current);

		if (type) {
			jq('.' + id).html(current+1);
		}
	}
	//하단 스크립트 끝
	
	// 카테고리 추천상품
	function item_md(attr_id, img_name, view_no, tot_num) {
		var ext = '';

		if (attr_id == "banner_04_0" || attr_id == "banner_06_0") { ext = 'Y' }
		
		for (i=1; i<=tot_num; i++) {

			if (ext == 'Y') {
				jq('.' + attr_id + i).attr({ src: '/skin/welcome/images/' + img_name +'off.gif' });				                                                            
			} else {
				jq('.' + attr_id + i).attr({
					src: '/skin/welcome/images/' + img_name + i +'_off.gif'
			    });
			}

			jq('#' + attr_id + i).hide();
		}

		if (ext == 'Y') {
			jq('.' + attr_id + view_no).attr({ src: '/skin/welcome/images/' + img_name + 'on.gif' });
		} else {
			jq('.' + attr_id + view_no).attr({ src: '/skin/welcome/images/' + img_name + view_no +'_on.gif' });
		} 
		jq('#' + attr_id + view_no).show();
	}
	
	function fn_ChangeImage(obj, type) {	
		var imgUrl;
		switch (type) {
			case 'image' : imgUrl = '/images/icon/100_100.gif'; break;
			case 'list'  : imgUrl = '/images/icon/75_75.gif';   break;
			case 'detail': imgUrl = '/images/icon/250_250.gif'; break;
			case 'big'   : imgUrl = '/images/icon/500_500.gif'; break;
			default      : imgUrl = '/images/icon/75_75.gif';   break;
		}
		obj.src = imgUrl;
	}

	function fn_hide() {
		document.getElementById('image_content').style.display = 'none';
	}
	
	function fn_limit_chk(idx) {
		var limit_item_yn = jq("input[name=limit_item_yn[]]:eq(" + idx + ")").val();
		var quantity = jq('.quantity_chk:eq(' + idx + ')').val();
		var remain_sale_quantity = jq("input[name$='remain_sale_quantity[]']:eq(" + idx + ")").val();
					var box_quantity = jq("input[name=box_quantity[]]:eq(" + idx + ")").val() == '' ? 1 : jq("input[name$='box_quantity[]']:eq(" + idx + ")").val() ;  // 주문 수량 단위
				
		if ('Y' == limit_item_yn) {
			if (parseInt(remain_sale_quantity) < parseInt(quantity)) {
				unitError = false;	// alert 띄우면서 주문 수량 단위 체크가 안되게
				alert('남은 한정수량을 초과 하셨습니다.');
				jq('input[name=quantity[]]:eq('+idx+')').val(box_quantity);
				unitError = true;	// alert 띄우고 나서 주문 수량 단위 체크가 되게
				return false;
			}
		}
		jq('input[name=seq[]]:eq('+idx+')').attr('checked', 'checked');
	}

	// 주문 수량 체크
	function fn_quantity_chk(obj, unitError) {
		var idx = jq(".quantity_chk").index(obj);
		
		if (jq(obj).val() == '' || jq(obj).val() == 0) jq(obj).val(1);
    	var currentQuantity = jq(obj).val() == '' ? 1 : jq(obj).val() ; // 입력한 수량
    	    		var box_quantity = jq("input[name$='box_quantity[]']:eq(" + idx + ")").val();  // 주문 수량 단위
    	    	var remainNumber = parseInt(currentQuantity) % parseInt(box_quantity);  // 나머지
    	var quota = Math.floor( parseInt(currentQuantity) / parseInt(box_quantity) );  // 몫의 내림값
    	var changeValue = quota * box_quantity;   // 몫의 내림값 * 주문 수량 단위
		if (box_quantity != 0) {
	    	if (remainNumber != 0)  // 수량 단위 이상을 주문 했을 경우
	    	{
		    	if ( unitError !== false )
		    	{
			    	if (parseInt(box_quantity) > parseInt(currentQuantity))
			    	{
			    		jq(obj).val(box_quantity);
			    	}
			    	else
			    	{
			    		jq(obj).val(changeValue);
			    	}
			    	alert('해당 상품은 '+box_quantity+' 개 단위로 주문 하실 수 있습니다.\n\n');
					return false;
		    	}
	    	}
		}
	}
	
    /**
     *  왼쪽 카테고리 플래쉬 넓이 조정
     */
  	function resizeCateFlash(width) {  	  	
    	jq('#flash_area').attr('width', width);                // ie
      	jq("[name='flash_area']").attr('width', width);        // none ie
	}
  	
	function fn_activex_shortcut() {
		jq('#activex_shortcut_install_yn').val('N');
	}

	function axInstallShortcutHub(display_type) {
		if ('N' == jq('#activex_shortcut_install_yn').val()) {
			fn_activexInstall();
		} else {
			if ('show' == display_type) {
				jq('#header_baro').show();
			} else {
				jq('#header_baro').hide();
			}
		} 
	}
	
	function fn_over(id) {
		jq('#top_img1').attr('src', '/skin/header/images/gnb01.gif');
		jq('#top_img2').attr('src', '/skin/header/images/gnb02.gif');
		jq('#top_img3').attr('src', '/skin/header/images/gnb03.gif');

		if (id != '99') {
			jq('#top_img' + id).attr('src', '/skin/header/images/gnb0' + id + '_on.gif');
		}
    }
	
	//토너 카테고리 change
	function sb_change(cate_tree_level, web_cate_tree_cla1, web_cate_tree_cla2) {
		jq.post('/toner/get_ctg', {cate_tree_level: cate_tree_level, web_cate_tree_cla1: web_cate_tree_cla1, web_cate_tree_cla2: web_cate_tree_cla2},
			function(data) {
				var tree_code = str = '';
				var strlen = data.length;						
				if (cate_tree_level == '2') {
					str += '<option value="">프린터 시리즈 선택</option>';
				} else {
					str += '<option value="">프린터 모델명 선택</option>';
				}			
				for (var i=0; i<strlen; i++) {
					row = data[i];
					if (cate_tree_level == '2') {						
						tree_code =	row['WEB_CATE_TREE_CLA2'];
					} else {
						tree_code =	row['WEB_CATE_TREE_CLA3'];
					}
					str += '<option value="' + tree_code + '">' + row['WEB_CATE_TONER_TREE_NAME'] + '</option>';
				}									
				jq('#web_cate_tree_cla' + cate_tree_level).html(str);
			}, 'json');
	}
	
	
    

// jsp 솔루션 제작하며 새로 추가된 함수들//

	
/*
 * id:fnGoCate(level,category ID)
 * desc:카테고리를 클릭하면 선택한 카테고리의 sub 페이지로 이동
 */
	
	function fnGoCate(lvl,cateId){
		
		$form.attr("action","/cate/cateItemList.do");
		//$("#webCateTreeId").val(cateId);
		//$("#cateTreeLevel").val(lvl);
		location.href=shopUrl+"/cate/cateItemList.do?cateId="+cateId+"&rowLevel="+lvl;
		//$form.submit();
	}
	

	/**
	 * 카테고리의 아이템 리스트를 리스트형,이미지형 으로 선택해 페이지 이동
	 */
	function fnChangeListType(listType){
		var brandIds = "";
		var cnt = 0 ;
		$(".brandNm").each(function(){
			
			if($(this).is(":checked")){
				if(cnt==0){
					brandIds += $(this).attr("id");
				}else{
					brandIds += ","+$(this).attr("id");
				}
				cnt++;
			}
			
		});
		
		$("#brandIds").val(brandIds);
		
		$("#listType").val(listType);
		$form.attr("action", reqUrl); // incResource에서 정의
		$form.submit();
	
	}
	
	/**
	 * 상품 목록의 10개씩, 20개씩 목록갯수 select box의 change이벤트 (cateItemList.jsp, todaysItem.jsp에서 사용)
	 */
	function fnReloadPage(){
		$("#currentPageNo").val('1');
		$form.attr("action", reqUrl); // incResource에서 정의
		$form.submit();
	}
	
	/**
	 * 상품 목록의 신규상품, 상품명순, 낮은가격순등의 sort버튼 클릭 이벤트 (cateItemList.jsp, todaysItem.jsp에서 사용)
	 * @param sortNo
	 */
	function fn_sort(sortNo) {
		var brandIds = "";
		var cnt = 0 ;
		$(".brandNm").each(function(){
			
			if($(this).is(":checked")){
				if(cnt==0){
					brandIds += $(this).attr("id");
				}else{
					brandIds += ","+$(this).attr("id");
				}
				cnt++;
			}
			
		});
		
		$("#brandIds").val(brandIds);
		
		$form.attr("action", reqUrl); // incResource에서 정의
		$("#currentPageNo").val(1);
		$("#listSortNo").val(sortNo);
		$form.submit();
	}
	

	/**
	 * 상품 상세화면으로 이동.
	 * @param itemId
	 */
	function fnGoItem(itemId){
		$(".itemId").each(function(){
			if(this.checked){
				this.checked=false;
			}
		});
		
		$form.attr("action","/item/itemView.do");
		$("#itemId").val(itemId);
		$form.submit();
	}
	
	/**
	 * myoffice의 관심상품으로 이동.
	 * @param itemId
	 */
	function fnGoWishlist(itemId){
		$form.attr("action","/mypage/wishList.do");
		$form.submit();
	}
	
	/**
	 * 공지사항으로 이동.
	 * @param itemId
	 */
	function noticeView(writeNo){
		
		location.href="/customer/noticeView.do?writeNo="+writeNo;
		
		
	}

   /**
    * 페이징이 들어간 List에서 사용되는 페이지 이동.<br/>
    * pageInfo.jsp 내부에서 사용한다.
    * 
	* @param {String} url - URL
    * @param {Number} currentPageNo - 페이지 번호
    * @param {Number} currentPageNoName - 페이지 번호의 파라미터 이름
	*/
	function fnGoPage(url, currentPageNo, currentPageNoName) {
		$form.attr("method", 'get');
		$form.attr("action", url);
		$("#currentPageNo").val(currentPageNo);
		$form.submit();
	}
	
	/**
	 * 페이징이 들어간 List에서 사용되는 페이지 이동.<br/>
	 * pageInfo.jsp 내부에서 사용한다. ( ajax용)
	 * 
	 * @param {String} url - URL
	 * @param {Number} currentPageNo - 페이지 번호
	 * @param {Number} currentPageNoName - 페이지 번호의 파라미터 이름
	 */
	function fnGoPageAjaxItemAsk(url, currentPageNo, currentPageNoName) {
		var config = {
				url : '/item/itemAskAjaxList.do',
				data : 'currentPageNo='+currentPageNo+"&itemId="+$("#itemId").val(),
				success : function (res) {
					var html="";
					var cnt = 0;
					for(cnt ; cnt < res.itemAskList.length;cnt++){
						
						html += '<tr><td class="title question">';
						
						if (res.itemAskList[cnt].secretYn === '1') {
							html += '<span class="icoSecret" style="float: left;"><img src="/images/icon/icoSecret.gif" alt="비밀글" /></span>';
						}
						
						html += '<a href="#link" secretYn="' + res.itemAskList[cnt].secretYn + '" writeId="' + res.itemAskList[cnt].writeId + '">'+(res.itemAskList[cnt].title).substring(0,30)+'</a>';
						
						if(loginUser.membId==res.itemAskList[cnt].writeId ){
							html += '&nbsp;&nbsp;&nbsp;&nbsp;<a href="#link" onclick="fnDeleteItemAsk(\''+res.itemAskList[cnt].writeNo+'\')" ><img src="/images/shop/bbs_btn_del2.gif" alt="삭제하기" /></a></td>';
						}
						
						if(res.itemAskList[cnt].replyYn =="0"){
							html += '<td class="question">답변대기</td>';
						}else{
							html += '<td class="question">답변완료</td>';
						}
						html += '<td class="question"><ul><li>'+res.itemAskList[cnt].writeNm+'</li><li><span>'+res.itemAskList[cnt].createTime+'</span></li></ul></td></tr>';
						html += '<tr style="display:none;"><td class="ask" colspan="3"><p>'+res.itemAskList[cnt].contentsBr+'</p>';
						if(res.itemAskList[cnt].replyYn =="1"){
							html += '<p><span class="name">'+res.itemAskList[cnt].replyNm+'님이 작성하신 답변입니다.</span><br />'+res.itemAskList[cnt].reply+'</p>';
						}
						html += '</td></tr>';
						
					}
					if(cnt!= 0){
						$(".qandaBody").html(html);
					}
					
					html ="";
					
					var prevPageNo = currentPageNo-1;
					var nextPageNo = currentPageNo+1;
					
					if(prevPageNo ==0){
						prevPageNo = 1;
					}
					
					if(nextPageNo > res.pageInfo.totalPageCount){
						nextPageNo = res.pageInfo.totalPageCount;
					}
					
					
					html ='<div class="paging">';
					
					html += '<span class="pre">';
					html += '<a class="select_off" href="#none;" onclick=fnGoPageAjaxItemAsk(\"tmp\",'+prevPageNo+',\"currentPageNo\") title="'+prevPageNo+'페이지"><img src="/images/shop/goods_pag_prev.gif" alt="이전페이지"></a>';
					html += '</span>&nbsp;';
					
					for(var i =res.pageInfo.firstPageNoOnPageList; i <= res.pageInfo.lastPageNoOnPageList;  i++ ){
						
						if(i>1){
							html+='&nbsp;&nbsp;&nbsp;';
						}
						
						if(i == currentPageNo){
							html +='<strong class="select_on" title="${'+i+'}페이지">'+i+'</strong>';
						}else{
							html += '<a  href="#none;" onclick=fnGoPageAjaxItemAsk(\"tmp\",'+i+',\"currentPageNo\") title="'+i+'페이지">'+i+'</a>';
						}
						
					}
					
					html += '&nbsp;<span class="nex">';
					html += '<a class="select_off" href="#none;"  onclick= fnGoPageAjaxItemAsk(\"tmp\",'+nextPageNo+',\"currentPageNo\")  title="'+ nextPageNo +'페이지"><img src="/images/shop/goods_pag_next.gif" alt="다음페이지" /></a>';
					html += '</span>';	
					html += '<p></p></div>';
					
					
					if(cnt!= 0){
						$(".fnGoPageAjaxItemAsk").html(html);
						itemAskTable();
					}
					
				}
			};
			jqUtils.ajax(config);
			
	}
	
	
	/**
	 * 페이징이 들어간 List에서 사용되는 페이지 이동.<br/>
	 * pageInfo.jsp 내부에서 사용한다. ( ajax용)
	 * 
	 * @param {String} url - URL
	 * @param {Number} currentPageNo - 페이지 번호
	 * @param {Number} currentPageNoName - 페이지 번호의 파라미터 이름
	 */
	function fnGoPageAjaxReview(url, currentPageNo, currentPageNoName) {
		var config = {
				url : '/item/itemReviewAjaxList.do',
				data : 'currentPageNo='+currentPageNo+"&itemId="+$("#itemId").val(),
				success : function (res) {
					var html="";
					var cnt = 0;
					for(cnt ; cnt < res.itemReviewList.length;cnt++){
						
						html += '<tr><td class="title question"><span>'+res.itemReviewList[cnt].itemNm+'</span><a href="#link">'+res.itemReviewList[cnt].title+'</a></td>';
						html += '<td class="question"><ul><li><span>만족도</span>&nbsp;&nbsp;&nbsp;'+res.itemReviewList[cnt].score+'</li></ul></td>';
						html += '<td class="question"><ul><li>'+res.itemReviewList[cnt].nickNm+'</li><li><span>'+res.itemReviewList[cnt].createTime+'</span></li></ul></td></tr>';
						html += '<tr style="display:none;"><td colspan="3" class="ask"><p>'+res.itemReviewList[cnt].contentsBr+'</p></td></tr>';
						
					}
				
					if(cnt!= 0){
						$(".reviewBody").html(html);
					}
					
					html ="";
					
					var prevPageNo = currentPageNo-1;
					var nextPageNo = currentPageNo+1;
					
					if(prevPageNo ==0){
						prevPageNo = 1;
					}
					
					if(nextPageNo > res.pageInfo.totalPageCount){
						nextPageNo = res.pageInfo.totalPageCount;
					}
					
					
					html ='<div class="paging">';
					
					html += '<span class="pre">';
					html += '<a class="select_off" href="#none;" onclick=fnGoPageAjaxReview(\"tmp\",'+prevPageNo+',\"currentPageNo\") title="'+prevPageNo+'페이지"><img src="/images/shop/goods_pag_prev.gif" alt="이전페이지"></a>';
					html += '</span>&nbsp;';
					
					for(var i =res.pageInfo.firstPageNoOnPageList; i <= res.pageInfo.lastPageNoOnPageList;  i++ ){
						
						if(i>1){
							html+='&nbsp;&nbsp;&nbsp;';
						}
						
						if(i == currentPageNo){
							html +='<strong class="select_on" title="${'+i+'}페이지">'+i+'</strong>';
						}else{
							html += '<a  href="#none;" onclick=fnGoPageAjaxReview(\"tmp\",'+i+',\"currentPageNo\") title="'+i+'페이지">'+i+'</a>';
						}
						
					}
					
					html += '&nbsp;<span class="nex">';
					html += '<a class="select_off" href="#none;"  onclick= fnGoPageAjaxReview(\"tmp\",'+nextPageNo+',\"currentPageNo\")  title="'+ nextPageNo +'페이지"><img src="/images/shop/goods_pag_next.gif" alt="다음페이지" /></a>';
					html += '</span>';	
					html += '<p></p></div>';
					
					
					if(cnt!= 0){
						$(".fnGoPageAjaxReview").html(html);
						itemReviewTable();
					}
					
				}
			};
			jqUtils.ajax(config);
			
	}
	
	
	//상세페이지 내 Q&A
	function itemAskTable(){
		var $faq = $('#faq2 tbody');
		$faq.children('tr:odd').hide();
		$faq.find('.question a').click(function(){
			var $thisAnswer = $(this).closest('tr').next();
			if($thisAnswer.is(':hidden')){
				var secretYn = $(this).attr('secretYn');
				var writeId = $(this).attr('writeId');
				
				if (!commonUtils.isEmpty(secretYn) && !commonUtils.isEmpty(writeId) && secretYn === '1' && (loginUser.loginYn === 'N' || writeId !== loginUser.membId)) {
					alert("비공개 글은 작성자만 확인할 수 있습니다.");
					return false;
				}
				
				$faq.children('tr:odd').hide();
				$thisAnswer.show();
			}else{
				$thisAnswer.hide();
			}
			return false;
		});
	}
	
	//상세페이지 내 Review
	function itemReviewTable(){
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
	}
	/**
	 * 장바구니 넣기 공통 (멀티와 멀티아닌게 같음)<br/>
	 * 
	 * 상품 목록(/cate/cateItemList.do), 상품 상세페이지(/item/itemView.do)에서<br/>
	 * 장바구니추가후 장바구니에 쇼핑item을 그려주고 오늘본상품의 장바구니 갯수를 update한다.
	 * @param res
	 */
	function addCartCallback(res){
		var result = res;
		var tmp='';
		var cartList =result.cartList;
		
		
		// 오늘본상품 목록의 장바구니 count를 갱신
		$('.today_items_body #todayItemsMyCartCount').html(cartList.length);
		
		if(cartList.length >0){
			var totalCnt = 0;
			var totalPrice = 0;
			var deliveryCharge = 0;
			
			$("#easy_cart_items").empty();
			for(var i = 0 ; i < result.cartList.length;i++){

				var webPrice = 0;

				if($.number(cartList[i].promPrice)==0){
					webPrice = cartList[i].normalPrice;
				}else{
					webPrice = cartList[i].promPrice;
				}
				
				if(i<5){
					tmp +='<li class="cartContentBox show">';
					
				}else{
					tmp +='<li class="cartContentBox hidden">';
				}
				
				tmp +='<div class="easy_cart_goods"><div class="photo">'+'<a href="'+ shopUrl +'/item/itemView.do?itemId=' + cartList[i].itemId +'">'+'<img src="'+ imgServerUrl + '/' + cartList[i].image02 + '" width="80" height="80" class="border_gray" alt="" onerror="fn_ChangeImage(this, \'list\');" /></a></div>';
				
				if(cartList[i].webItemNm.length > 16){
					tmp +='<div class="title"><span>'+(cartList[i].webItemNm).substr(0,13)+'...</span></div>';
				}else{
					tmp +='<div class="title"><span>'+cartList[i].webItemNm+'</span></div>';
				}
				
				tmp +='<div class="price"><strong>'+$.number(webPrice)+'</strong></div>';
				tmp +='<div class="sel">';
				tmp +='<input type="checkbox" name="easy_cart_check" cateCnt="'+cartList[i].cateCnt+'" itemSts ="'+cartList[i].itemSts+'"  value="'+cartList[i].itemId+'" />&nbsp;';
				tmp +='<span class="easy_cart_check_quantity">'+$.number(cartList[i].qty)+'</span>';
				if(cartList[i].unitNm =='' || cartList[i].unitNm ==null){
					tmp +='개';
				}else{
					tmp += cartList[i].unitNm;
				}
					
				tmp +='</div> </div>';
				
				totalCnt += parseInt(cartList[i].qty);
				totalPrice += parseInt(parseInt(webPrice) * parseInt(cartList[i].qty));
				
			}
			
			$("#easy_cart_items").append(tmp);
//			$("#cart_quantity_value").html($.number(totalCnt)+"개");
			$("#cart_order_price_value").html($.number(totalPrice)+"원");
			if(totalPrice < sessionScope.deliveryFeeAddAmt){ // 
				deliveryCharge=sessionScope.deliveryFee;
			}
			
			$("#cart_add_price_value").html($.number(deliveryCharge)+"원");
			$("#cartPriceTotal").html($.number(parseInt(deliveryCharge) + parseInt(totalPrice))+"원");
		}
		
		$('.open_cart').trigger("click");
		
	}
	
	/**
	 * 장바구니 삭제시 ajax콜백.<br/>
	 * 
	 * 장바구니 선택, 전체삭제후 화면을 update하는 공통 콜백이다.
	 * @param res
	 */
	function delCartCallback(res){
		var result = res;
		var tmp='';
		var cartList =result.cartList;
		
		
		// 오늘본상품 목록의 장바구니 count를 갱신
		$('.today_items_body #todayItemsMyCartCount').html(cartList.length);
		
		if(cartList.length >0){
			var totalCnt = 0;
			var totalPrice = 0;
			var deliveryCharge = 0;
			
			$("#easy_cart_items").empty();
			for(var i = 0 ; i < result.cartList.length;i++){

				var webPrice = 0;

				if($.number(cartList[i].promPrice)==0){
					webPrice = cartList[i].normalPrice;
				}else{
					webPrice = cartList[i].promPrice;
				}
				
				if(i<5){
					tmp +='<li class="cartContentBox show">';
					
				}else{
					tmp +='<li class="cartContentBox hidden">';
				}
				tmp +='<div class="easy_cart_goods"><div class="photo">'+'<a href="'+ shopUrl +'/item/itemView.do?itemId=' + cartList[i].itemId +'">'+'<img src="'+ imgServerUrl + '/' + cartList[i].image02 + '" width="80" height="80" class="border_gray" alt="" onerror="fn_ChangeImage(this, \'list\');" /></a></div>';
				
				if(cartList[i].webItemNm.length > 16){
					tmp +='<div class="title"><span>'+(cartList[i].webItemNm).substr(0,13)+'...</span></div>';
				}else{
					tmp +='<div class="title"><span>'+cartList[i].webItemNm+'</span></div>';
				}
				
				tmp +='<div class="price"><strong>'+$.number(webPrice)+'</strong></div>';
				tmp +='<div class="sel">';
				tmp +='<input type="checkbox" name="easy_cart_check" cateCnt="'+cartList[i].cateCnt+'" itemSts ="'+cartList[i].itemSts+'"  value="'+cartList[i].itemId+'" />&nbsp;';
				tmp +='<span class="easy_cart_check_quantity">'+$.number(cartList[i].qty)+'</span>';
				if(cartList[i].unitNm =='' || cartList[i].unitNm ==null){
					tmp +='개';
				}else{
					tmp += cartList[i].unitNm;
				}
					
				tmp +='</div> </div>';
				
				totalCnt += parseInt(cartList[i].qty);
				totalPrice += parseInt(parseInt(webPrice) * parseInt(cartList[i].qty));
				
			}
			
			$("#easy_cart_items").append(tmp);
//			$("#cart_quantity_value").html($.number(totalCnt)+"개");
			$("#cart_order_price_value").html($.number(totalPrice)+"원");
			if(totalPrice < sessionScope.deliveryFeeAddAmt){ // 
				deliveryCharge=sessionScope.deliveryFee;
			}
			
			$("#cart_add_price_value").html($.number(deliveryCharge)+"원");
			$("#cartPriceTotal").html($.number(parseInt(deliveryCharge) + parseInt(totalPrice))+"원");
		} else {
			$('#easy_cart_items').html('<div class="empty_data">장바구니에 담긴 상품이 없습니다.</div>');
//			$("#cart_quantity_value").html("0개");
			$("#cart_order_price_value").html("0원");
			$("#cart_add_price_value").html("0원");
			$("#cartPriceTotal").html("0원");
			$('.close_cart').trigger("click");
		}
	}
	
//////////////주소검색 팝업 시작 //////////////
	   /**
	    * 주소, 우편번호 검색 팝업띄우기.
	    * <pre>
	    * fnZipcodePopup('memberReceiver'); // 회원가입/수정 - 배송지정보
	    * fnZipcodePopup('memberCompany');  // 회원가입/수정 - 기업 정보
	    * fnZipcodePopup('orderOrderer');   // 주문결제 - 주문자
	    * fnZipcodePopup('orderReceiver');  // 주문결제 - 배송지
	    * fnZipcodePopup('findStore');  // 매장찾기 - 매장정보
	    * </pre>
		*/
		function fnZipcodePopup(opener) {
			var prefix = '';
			if(window.location.protocol==='https:') {
				commonUtils.openPopup(sslShopUrl+"/common/zipcode/zipcodePopup.do?callback=fnZipcodeCallback&opener=" + opener, "zipcode", 850, 700, "yes");
			} else {
				commonUtils.openPopup(shopUrl+"/common/zipcode/zipcodePopup.do?callback=fnZipcodeCallback&opener=" + opener, "zipcode", 850, 700, "yes");
			}
		}
		
		/**
		 * 우편번호검색 팝업에서 주소 선택시 부모창으로 콜백.
		 * 
		 * @param zipcodeRes  - 우편번호 주소정보
		 * <pre>                    
		 * // 지번주소 콜백정보
		 * {
		 *     addr1: "서울특별시 양천구 신정4동", // (시/도 + 군/구 + 동명)
		 *     state: "서울특별시", // 시/도
		 *     city: "양천구",      // 군/구
		 *     dong: "신정4동",     // 도로명주소의 경우 도로명, 지번주소의경우 동명
		 *     zipCd: "158-074",   // 우편번호
		 *     zipId: "158074001", // 우편번호 코드
		 *     bldg:"",            // 건물명
		 *     dong:"" ,           // 동명
		 *     bunji:""            // 번지
		 * }
		 *                      
		 * // 도로명주소 콜백정보
		 * {
		 *     addr1: "서울특별시 강남구 남부순환로351길 4", // (시/도 + 군/구 + 도로명 + 건물본번 + 건물부번)
		 *     state: "서울특별시",
		 *     city: "강남구",
		 *     dongNm: "도곡동",
		 *     bldgDetail: "",
		 *     bldgN1: "4",
		 *     bldgN2: "0",
		 *     bldgNm: "",
		 *     bldgNo: "1168011800109570000000992",
		 *     roadNm: "남부순환로351길",
		 *     roadNo: "116804166089",
		 *     town: "",
		 *     zipCd: "135-860",
		 *     zipId: "135860001"
		 * }
		 * </pre> 
		 * @param deliveryRes - 배송지점정보
		 * <pre>
		 * {
		 *     bizNm: "개발용 [본사용]",  // 배송지점명
		 *     bizTelNo: "02-1111-2222", // 배송지점 전화번호
		 *     bizFaxNo: "02-3333-4444", // 배송지점 팩스번호
		 *     addonsFee: 0              // 추가배송비
		 * }
		 * </pre>
		 * @param type        - road : 도로명주소, jibun : 지번주소
		 * @param opener      - 우편번호 조회 팝업을 부른 부모창의 타입 
		 */
		function fnZipcodeCallback(zipcodeRes, deliveryRes, type, opener) {
			var zipId = zipcodeRes.zipId;
			var zipCd = zipcodeRes.zipCd;
			var arrZipCd = zipCd.split('-');
			var zipCd1 = arrZipCd[0];
			var zipCd2 = arrZipCd[1];
			var state = zipcodeRes.state;
			var city  = zipcodeRes.city;
			var zipNm = zipcodeRes.zipNm;
			var addr1 = zipcodeRes.addr1;
			var addr2 = '';
			var dong  = '';
			
			if(type === 'road') { // 도로명
				dong  = zipcodeRes.roadNm;
				addr2 = zipcodeRes.bldgDetail;
			} else {              // 지번
				dong  = zipcodeRes.dong;
				addr2 = zipcodeRes.bldg;
			}
			
			// 이 공통 함수를 쓰는 화면별로 나눠서 처리
			switch (opener) {
				// 회원가입/수정 - 배송지정보
				case 'memberReceiver':
					$('#zipId').val(zipId);
					$('#zipCd').val(zipCd);
					$('#zipCd1').val(zipCd1);
					$('#zipCd2').val(zipCd2);
					$('#state').val(state);
					$('#city' ).val(city);
					$('#addr1').val(addr1);
					$('#addr2').val(addr2);
					$('#dong' ).val(dong);
					
					// 배송될 매장정보 show
					var html  = '매 장 명 : ' + deliveryRes.bizNm    + '<br />';
						html += '전화번호 : ' + deliveryRes.bizTelNo + '<br />';
						html += '팩스번호 : ' + deliveryRes.bizFaxNo;
					//$('#delivery_info').show();
					//$('#delivery_store_info').html(html);
					break;
					
				// 회원가입/수정 - 기업 정보
				case 'memberCompany':
					$('#bizZipCd').val(zipCd);
					$('#bizZipCd1').val(zipCd1);
					$('#bizZipCd2').val(zipCd2);
					$('#bizState').val(state);
					$('#bizCity' ).val(city);
					$('#bizAddr1').val(addr1);
					$('#bizAddr2').val(addr2);
					$('#bizDong' ).val(dong);
					$('#bizZipId' ).val(zipId);
					break;
					
				// 주문결제 - 주문자
				case 'orderOrderer':
					$('#membZipId').val(zipId);
					$('#membZipCd').val(zipCd);
					$('#membState').val(state);
					$('#membCity' ).val(city);
					$('#membAddr1').val(addr1);
					$('#membAddr2').val(addr2);
					$('#membDong' ).val(dong);
					$('#membWarehId' ).val(deliveryRes.warehId);
					$('#membOrderStoreId' ).val(deliveryRes.orderStoreId);
					addonsFee = deliveryRes.addonsFee;
					break;
				
				//팩스 주문서 다운로드
				case 'faxOrderSheet':
					var storeNm = deliveryRes.storeNm;
					storeNm = storeNm.replace(/(^\s*)|(\s*$)/gi, "");
					location.href="/uploadFile/faxDepot/사무용품신청서_"+ storeNm +".xls";

					break;
					
				// 주문결제 - 배송지
				case 'orderReceiver':
					$('#recvZipId').val(zipId);
					$('#recvZipCd').val(zipCd);
					$('#recvState').val(state);
					$('#recvCity' ).val(city);
					$('#recvAddr1').val(addr1);
					$('#recvAddr2').val(addr2);
					$('#recvDong' ).val(dong);
					$('#orderWarehId' ).val(deliveryRes.warehId);
					$('#orderStoreId' ).val(deliveryRes.orderStoreId);
					fnAddAddonsFee(deliveryRes.addonsFee,deliveryRes.orderStoreId);
					break;
					
				// 매장찾기
				case 'findStore':
					var str  = '<span class="info_txt block m_t10">고객님의 주소지는 ';
					    str += '<strong class="color_517"><a href="#link" style="color:#cc1517;" onclick="go_shop(\''+deliveryRes.orderStoreId+'\')">';
					    str += deliveryRes.bizNm + '</a>'+' ['+deliveryRes.bizTelNo+']';
					    str += "</strong> 에서 담당하고 있습니다</span>";
					    $("#custShop").html(str);
						$("#custShop1").html(str);
					break;
					
				// 영업사원 방문신청
				case 'ruquestSales':
					$('#zipId').val(zipId);
					$('#zipCd').val(zipCd);
					$('#state').val(state);
					$('#city' ).val(city);
					$('#addr1').val(addr1);
					$('#addr2').val(addr2);
					$('#dong' ).val(dong);
					$('#orderStoreId' ).val(deliveryRes.orderStoreId);
					break;
					
				// 카탈로그신청
				case 'catalog':
					$('#zipCd1').val(zipCd1);
					$('#zipCd2').val(zipCd2);
					$('#zipId').val(zipId);
					$('#zipCd').val(zipCd);
					$('#state').val(state);
					$('#city' ).val(city);
					$('#addr1').val(addr1);
					$('#addr2').val(addr2);
					$('#dong' ).val(dong);
					$('#orderStoreId' ).val(deliveryRes.orderStoreId);
					break;
					
				// 영업사원 방문신청 (리뉴얼)
				case 'requestSalesman':
					$('#zip1').val(zipCd1);
					$('#zip2').val(zipCd2);
					$('#zipId').val(zipId);
					$('#zipCd').val(zipCd);
					$('#addr1').val(addr1);
					$('#addr2').val(addr2);
					$('#zipNm').val(zipNm);
					$('#custShop').text(deliveryRes.bizNm);
					$('#bizTelNo').text(deliveryRes.bizTelNo);
					$('#orderStoreId').val(deliveryRes.orderStoreId);
					break;
					
				// 쿠폰/마일리지/상품권 신청 매장찾기
				case 'findStoreHmoney':
					$("#recvStore").val(deliveryRes.bizNm);
					$("#orderStoreId").val(deliveryRes.orderStoreId);
					break;
					
				default:
					break;
			}
		}
////////////주소검색 팝업 끝 //////////////
		

	/**
	 * 
	 * 통합검색 함수
	 * 
	 */
	function fnSearchItem(){
		var searchWord = $("#kw").val();
		searchWord = jQuery.trim(searchWord);
//		if(search_word_info ==searchWord || searchWord==""){
		if(searchWord==""){
			$("#kw").focus();
			alert("검색어를 입력하세요");
			return false;
		}else{
			var searchWordCh = jQuery.trim(searchWord);

			 $.blockUI({ 
				 message : '상품을 검색중입니다.' ,
				 css: { 
			            border: 'none', 
			            padding: '15px', 
			            backgroundColor: '#000', 
			            '-webkit-border-radius': '10px', 
			            '-moz-border-radius': '10px', 
			            opacity: .5, 
			            color: '#fff' 
			        },
				 overlayCSS: { backgroundColor: '' } }); 
			 
			location.href= shopUrl + "/main/searchItemList.do?kw="+encodeURIComponent(searchWordCh)+"&listSortNo=1";
			
			setTimeout($.unblockUI, 5000); 
//			$("#mainForm").attr("action","/main/searchItemList.do");
//			
//			$("#mainForm").submit();
		}
	}
	function fnSubSearchItem(){
		$("#mainForm").attr("action", shopUrl + "/main/searchItemList.do");
		$("#mainForm").submit();
	}
	
	/**
	 * BBS 키워드 항목에서 KeyDown 이벤트 처리
	 * 
	 * @param e
	 */
	function fnBbsKeywordKeyDown(e) {
		// 13 : Enter Key
		if (e.keyCode === 13) {
			fnBbsSearch();
		}
	}
	
	/**
	 * BBS 검색처리
	 * 현재 요청 uri를 담고 있는 reqUrl을 이용한다. (incResource.jspf에 선언된 변수)
	 * 
	 * @returns {Boolean}
	 */
	function fnBbsSearch() {
		var keyword = $('#keyword').val();
		
		if (keyword === undefined || keyword === null || keyword === '' || keyword.length <= 0) {
			alert("검색어를 입력하세요");
			return false;
		}
		
		location.href= shopUrl + reqUrl + "?keyword=" + encodeURIComponent(keyword);
	}
	
	//쿠키 관련 함수
	
	function setCookie( name, value, expiredays )
	{
	    var todayDate = new Date();
	    todayDate.setDate( todayDate.getDate() + expiredays );
	    document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
	}
	
	function getCookie( name ) 
	{ 
	    var nameOfCookie = name + "="; 
	    var x = 0; 
	    while ( x <= document.cookie.length ) 
	    { 
	        var y = (x+nameOfCookie.length); 
	        if ( document.cookie.substring( x, y ) == nameOfCookie ) 
	        { 
	            if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 ) 
	                endOfCookie = document.cookie.length;
	            return unescape( document.cookie.substring( y, endOfCookie ) ); 
	        } 
	        x = document.cookie.indexOf( " ", x ) + 1; 
	        if ( x == 0 ) 
	            break; 
	    } 
	    return ""; 
	}
	
	//메인에서 쓰는 스크립트
	
	function PBcheck(code){
		$("#pb_brand01").hide();
		$("#pb_brand02").hide();
		$("#pb_brand03").hide();
		$("#pb_brand04").hide();
		$("#pb_brand05").hide();		
		if(code == '1')	$("#pb_brand01").show();
		if(code == '2')	$("#pb_brand02").show();
		if(code == '3')	$("#pb_brand03").show();
		if(code == '4')	$("#pb_brand04").show();
		if(code == '5')	$("#pb_brand05").show();
		}

		function newBrand_type(code){
		$("#newBrand_type_1").hide();
		$("#newBrand_type_2").hide();
		$("#newBrand_type_3").hide();
		if(code == '1')	$("#newBrand_type_1").show();
		if(code == '2')	$("#newBrand_type_2").show();
		if(code == '3')	$("#newBrand_type_3").show();
		}

		
	//메인에서 쓰는 스크립트 끝

 
	function onlyNumber(event) {
	    var key = window.event ? event.keyCode : event.which;    

	    if ((event.shiftKey == false) && ((key  > 47 && key  < 58) || (key  > 95 && key  < 106)
	    || key  == 35 || key  == 36 || key  == 37 || key  == 39  // 방향키 좌우,home,end  
	    || key  == 8  || key  == 46 ) // del, back space
	    ) {
	        return true;
	    }else {
	        return false;
	    } 
	       
	} 
	
	function playFlash(filename,width,height,id,trans,lock) {
		document.write('<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="'+width+'" height="'+height+'" id="'+id+'" align="middle"><param name="allowScriptAccess" value="always" /><param name="movie" value="'+filename+'" /><param name="quality" value="high" /><param name="bgcolor" value="#ffffff" /><param name="wmode" value="'+trans+'" /><param name="menu" value="'+lock+'" /><embed src="'+filename+'" quality="high" bgcolor="#ffffff" width="'+width+'" height="'+height+'" name="'+id+'" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" /></object>')
	}
		
	function dataSync(){
		
		
		var config = {
			url : '/main/reInitData.do',
			data : '',
			success : function (res) {
				alert("데이터초기화 완료");
			}
		};
		jqUtils.ajax(config);
		
	} 
	
	function isNumber(v) {
	    var reg = /^[-+]?\d+$/;
	    return reg.test(v);
	}
	
	/**
	 * 로그인여부를 판단하여 로그인이 안되어있으면 <br/>
	 * 로그인팝업을 띄워서 로그인하게 하고<br/>
	 * 로그인되어있으면 지정된 callback을 실행한다. <br/>
	 * 
	 * 실행은 크게 3가지 방법이 있다.<br/><br/>
	 *  // type1. (로그인하고 페이지 이동없이 현재페이지 reload )
	 *  fnLoginPopup();
	 *  
	 *  // type2. (로그인후 사용자정의 function 호출. 페이지 reload 없음)
	 *  fnLoginPopup(function(){
	 *		jqUtils.ajax(config);
	 *  });
	 *  
	 *  // type3. (a link에 사용할때 쓰임)
	 *  < a href="#none;" onclick="fnLoginPopup('/mypage/mypage.do')">마이페이지< /a>
	 * 
	 * @param callback
	 * @param popupParam
	 * @param isAllChildPopupClose
	 */
	function fnLoginPopup(callback, popupParam, isAllChildPopupClose){
		var popupWidth = 950;
		var popupHeight = 600;
		var param = '';
		
		if (popupParam !== undefined && popupParam !== null && popupParam.length > 0) {
			if (popupParam.indexOf('?') < 0) {
				param = '?' + popupParam;
			} else if (popupParam.indexOf('?') == 0) {
				param = popupParam;
			} else {
				param = '';
			}
		}
		
		// isAllChildPopupClose가 true면 현재 열려 있는 모든 Child 팝업들을 닫아준다.
		if (!commonUtils.isEmpty(isAllChildPopupClose) && isAllChildPopupClose === true) {
			if (commonUtils.isEmpty(param)) {
				param = "?isAllChildPopupClose=true";
			} else {
				param += "&isAllChildPopupClose=true";
			}
			
			if (callback !== undefined && callback !== true && !jQuery.isFunction(callback)) {
				param += "&moveUrl=" + callback;
			}
		}
		
		if(callback === undefined) {
			popupLoginCallbackFunction = function () {
				location.reload(true);
			};
			commonUtils.openPopup('/login/popupLogin.do' + param, 'loginPopup', popupWidth, popupHeight);
			
		} else if(callback === true) { // callback이 true라면 fromMyCart를 true로 
			var topParent = fnGetTopParent(window);
//			popupLoginCallbackFunction = function () {
//				fnGetTopParent(window, true);
//				topParent.window.location.href = sslShopUrl + '/order/orderList.do';
//			};
			popupLoginCallbackFunction = null;	// 로그인 팝업창의 fnGoOrderList를 실행한다. (post방식으로 itemId를 가져가서 form을 실행해야 하므로)
			
			if(loginUser.loginYn === 'N') {
				commonUtils.openPopup('/login/popupLogin.do' + param+'&fromMyCart=true', 'loginPopup', popupWidth, popupHeight);
			} else {
				popupLoginCallbackFunction();
			}
	    } else if(jQuery.isFunction(callback)) { // callback파라미터가 function타입일경우 로그인 성공하면 그 function을 실행한다.
			popupLoginCallbackFunction = callback;
			if(loginUser.loginYn === 'N') {
				commonUtils.openPopup('/login/popupLogin.do' + param, 'loginPopup', popupWidth, popupHeight);
			} else {
				popupLoginCallbackFunction();
			}
		} else { // callback파라미터가 function이 아니라면 callback파라미터에는 http://xxx.co.kr과같은 url이 들어와야한다.
//			alert(loginUser.loginYn);
			if(loginUser.loginYn === 'N') {
				popupLoginCallbackFunction = function () {
					location.href = callback;
//				for(var property in callback) {
//					$form.attr(property, callback[property]);
//				}
//				$form.submit();
				};
				commonUtils.openPopup('/login/popupLogin.do' + param, 'loginPopup', popupWidth, popupHeight);
			} else {
				if (!commonUtils.isEmpty(isAllChildPopupClose) && isAllChildPopupClose === true) {
					var topParentWindow = fnGetTopParent(window);
					topParentWindow.location.href = callback;
					window.close();
//					location.href = callback;
				} else {
					location.href = callback;
				}
			}
		}
	}
	
	/**
	 * 현재창의 최상위 부모 구하기
	 * 
	 * @param windowObj
	 * @param isChildClose
	 */
	function fnGetTopParent(windowObj, isChildClose){
		if(windowObj !== undefined) {
			var windowOpener = windowObj['opener']; // 현재창의 부모가 있다면
			if(windowOpener) {
				if(isChildClose) {
					windowObj.close();
				}
				// 로그인창의 부모의 부모창이 있다면
				return fnGetTopParent(windowOpener, isChildClose);
			} else { // 재귀호출이 끝나고 최종 부모창을 찾을경우 이곳으로
				return windowObj;
			}
		}
	}
	
	
//	/**
//	 * 로그인 팝업 호출
//	 * @param callback 로그인 성공 후 실행할 콜백함수
//	 */
//	function fnLoginPopup(callback) {
//		var callbackFunction;
//		if (callback == null || !callback || callback === '') {
//			callbackFunction = 'fnLoginCallback';
//		} else {
//			callbackFunction = callback;
//		}
//		var url;
//		//if (window.location.protocol === 'https:') {
//		//	url = sslShopUrl+"/login/popupLogin.do";
//		//} else {
//		//	url = shopUrl+"/login/popupLogin.do";
//		//}
//		url = sslShopUrl+"/login/popupLogin.do?callback=" + callbackFunction;
//		
//		commonUtils.openPopup(url, "zipcode", 860, 470, "yes");
//	}
//	
//	/**
//	 * 로그인 성공 후 현재 페이지를 Reload
//	 */
//	function fnLoginCallback() {
//		// 현재 페이지를 재호출하는 방법
//		// history.go(0); - 캐시에서 우선 찾음
//		// window.location.reload(); -  캐쉬에서 우선 검색하고 없으면 서버에서 재호출함
//		// window.location.reload(true); - 서버에서 무조건 재호출
//		
//		// 로그인 성공 후 현재 페이지를 Reload
//		location.reload(true);
//	}
	
	/**
	 * orderType에 따른 itemId 파라미터 취득
	 * orderType에 따라서 itemId 개수 만큼 아래의 예와 같은 형식으로 파라미터를 만들어 준다.
	 * ex) &itemId=11111&itemId=22222&itemId=33333
	 * orderType은 전체상품구매(all), 선택상품구매(checked), 상품 하나 구매(one)가 있다.
	 * 
	 * @param orderType
	 */
	function fnGetItemIdParams(orderType) {
		var itemIdParams = '';
		
		var checkedItemId = $('input[name=itemId]:checked');
		
		switch (orderType) {
			// 전체상품구매
			case 'all':
				$(".itemId").each(function(){
					itemIdParams += ('&itemId=' + $(this).val());
				});
				break;
			// 선택상품구매
			case 'checked':
			// 상품 하나 구매
			case 'one':
				for (var i = 0; i < checkedItemId.length; i++) {
					itemIdParams += ('&itemId=' + $(checkedItemId[i]).val());
				}
				break;
			default:
				break;
		}
		
		return itemIdParams;
	}
	
	/**
	 * itemSts에 따른 Item상태를 취득
	 * 
	 * @param itemSts
	 * @param cateCnt
	 * @returns Item상태
	 */
	function fnGetItemState(itemSts, cateCnt) {
		switch (itemSts) {
			// [판매불가]
			case '2':
				return '[판매불가]';
				break;
			// [단종]
			case '3':
				return '[단종]';
				break;
			// [품절]
			case '4':
				return '[일시품절]';
				break;
				// [품절]
			case '5':
				return '[장기품절]';
				break;
			default:
				if (!commonUtils.isEmpty(cateCnt) && cateCnt < 1) {
					return '[삭제된상품]';
				}
				return '';
				break;
		}
	}
	
	/**
	 * itemSts에 따라 부수적으로 필요한 링크를 취득
	 * 예를 들어 품절일 경우 [대체상품보기]와 같은 메시지에 링크를 걸어준다.
	 * ex) <a href="#none;" onclick="fnReplacePopup('100106E2040M1000043')"><span style="color:red;">[대체상품보기]</span></a>&nbsp;
	 * 
	 * 사용예)
	 * <script type="text/javascript">
	 * 	document.write(fnGetLinkByItemSts('${itemList.itemSts}', '<c:out value="${itemList.itemId}"/>', '&nbsp;'));
	 * </script>
	 * 
	 * @param itemSts itemSts값
	 * @param itemId 링크를 걸기위해 필요한 itemId
	 * @param lastAddTag 링크 마지막에 추가적으로 붙일 태그 (&nbsp; 혹은 <br/> 등등)
	 * @returns {String}
	 */
	function fnGetLinkByItemSts(itemSts, itemId, lastAddTag) {
		var linkHtml = '';
		var lastTag = '';
		
		if (commonUtils.isEmpty(lastAddTag)) {
			lastTag = '<br/>';
		} else {
			lastTag = lastAddTag;
		}
		
		switch (itemSts) {
		// [판매불가]
		case '2':
			linkHtml = '';
			break;
		// [단종]
		case '3':
			linkHtml = '';
			break;
		// [품절]
		case '4':
//			linkHtml = '<a href="#none;" onclick="fnReplacePopup(\'' + itemId + '\')"><span style="color:red;">[대체상품보기]</span></a>' + lastTag;
			linkHtml = '';
			break;
		case '5':
//			linkHtml = '<a href="#none;" onclick="fnReplacePopup(\'' + itemId + '\')"><span style="color:red;">[대체상품보기]</span></a>' + lastTag;
			linkHtml = '';
			break;
		default:
			linkHtml = '';
			break;
		}
		
		return linkHtml;
	}
	
	/**
	 * paymentGb에 따른 paymentGb명칭 취득
	 * 
	 * @param paymentGb
	 * @returns {String}
	 */
	function fnGetPaymentGbName(paymentGb) {
		switch (paymentGb) {
			// 월결
			case '0000':
				return '월결';
				break;
			// 전액 포인트 결제
			case '0600':
				return '전액 포인트 결제';
				break;
			// 현금
			case '0100':
				return '현금';
				break;
			// 가상계좌(에스크로)
			case '3120':
				return '가상계좌(에스크로)';
				break;
			// 실시간 계좌 이체(에스크로)
			case '3130':
				return '실시간 계좌 이체(에스크로)';
				break;
			// 카드결제(에스크로)
			case '3200':
				return '카드결제(에스크로)';
				break;
			// 무통장 입금
			case '0110':
				return '무통장 입금';
				break;
			// 가상 계좌
			case '0120':
				return '가상 계좌';
				break;
			// 실시간 계좌 이체
			case '0130':
				return '실시간 계좌 이체';
				break;
			// 카드결제
			case '0200':
				return '카드결제';
				break;
			// 휴대폰 결제
			case '0300':
				return '휴대폰 결제';
				break;
			// 수령후 현금 결제
			case '5010':
				return '수령후 현금 결제';
				break;
			// 수령후 카드 결제
			case '5020':
				return '수령후 카드 결제';
				break;
			// 신용거래
			case '5030':
				return '신용거래';
				break;
			// 수령후 무통장 입금
			case '5040':
				return '수령후 무통장 입금';
				break;
			//관리자 카드결제(수기결제)	
			case '5090':
				return '관리자 수기결제';
				break;
			default:
				return '';
				break;
		}
	}
	
	/**
	 * stsCd에 따른 stsCd명칭 취득
	 * 
	 * @param stsCd
	 * @returns {String}
	 */
	function fnGetStsCdName(stsCd) {
		switch (stsCd) {
			// 주문대기
			case '0000':
				return '주문대기';
				break;
			// 주문대기
			case '0010':
				return '주문대기';
				break;
			// 취소요청
			case '0030':
				return '취소요청';
				break;
			// 취소완료
			case '0040':
				return '취소완료';
				break;
			// 입금대기
			case '0100':
				return '입금대기';
				break;
			// 배송대기
			case '0190':
				return '배송대기';
				break;
			// 상품준비중
			case '0200':
				return '상품준비중';
				break;
			// 부분배송
			case '0400':
				return '부분배송';
				break;
			// 배송중
			case '0500':
				return '배송중';
				break;
			// 배송완료
			case '0600':
				return '배송완료';
				break;
			// 구매확정
			case '0700':
				return '구매확정';
				break;
			// 반품요청
			case '3030':
				return '반품요청';
				break;
			// 반품취소
			case '3033':
				return '반품취소';
				break;
			// 반품거절
			case '3035':
				return '반품거절';
				break;
			// 회수대기
			case '3200':
				return '회수대기';
				break;
			// 부분회수
			case '3400':
				return '부분회수';
				break;
			// 반품완료
			case '3500':
				return '반품완료';
				break;
			// 반품완료
			case '3600':
				return '반품완료';
				break;
			default:
				return '';
				break;
		}
	}
	
	/**
	 * 화면에 blockUI를 적용해 준다.
	 */
	function fnBlockUi() {
		$.blockUI({
			css: {
				border: 'none',
				padding: '15px',
				backgroundColor: '#000',
				'-webkit-border-radius': '10px',
				'-moz-border-radius': '10px',
				'border-radius': '10px',
				opacity: .4,
				color: '#fff',
				width:'370px'
			},
			overlayCSS: { opacity: .0 }
		});
	}
	
	
	//대체상품보기 함수
	
	function fnReplacePopup(itemId){
		
		if(itemId=="" || itemId ==null){
			alert("대체상품이 존재하지 않습니다.");
			return false;
		}else{
		
			commonUtils.openPopup('/item/simpleItemPop.do?itemId='+itemId,'simple','1100','750');
		}
		
	}
	
	//koost 수집 스크립트 함수
	

	var k_view_array = new Array();				// 상품 상세보기 배열
	var k_buy_array = new Array();				// 상품 구매 배열
	var k_cart_array = new Array();				// 장바구니 배열
	
	function tracking(){
		if(null!=k_view_array&&k_view_array.length>0)
			for(var r=0,a=k_view_array.length;a>r;r++)
				AdlibTrk.sendView(k_view_array[r]);
		if(null!=k_buy_array&&k_buy_array.length>0)
			for(var r=0,a=k_buy_array.length;a>r;r++)
				AdlibTrk.sendBuy(k_buy_array[r]);
		if(null!=k_cart_array&&k_cart_array.length>0)
			for(var r=0,a=k_cart_array.length;a>r;r++)
				AdlibTrk.sendCart(k_cart_array[r])
	}
	
	function setParam(r,a,e,_,t,i,n,y,k,l,o,u,c){
		var s="N",f=document.location.href.split("?");if(2==f.length){var h=f[1].indexOf("koost=");-1!=h&&(s=f[1].substring(h+6,h+7),s="y"!=s.toLowerCase()&&"n"!=s.toLowerCase()?"N":s.toUpperCase())}var p='{"site_id":"'+r+'",';p+='"p_no":"'+a+'","p_name":"'+e+'","p_recomm":"'+s+'","cate1":"'+_+'","cate2":"',p+=t+'","cate3":"'+i+'","shop_id":"'+n+'","price":"'+y+'","image_url":"'+k,p+='","ref1":"'+l+'","ref2":"'+o+'","platform":"'+u+'"}',"view"==c?k_view_array.push(p):"cart"==c?k_cart_array.push(p):"buy"==c&&k_buy_array.push(p)
	}
	
	
	function fnNaverCommonFnc(){
		if(typeof HL_GUL == 'undefined'){
			var HL_GUL = 'ngc20.nsm-corp.com';var HL_GPT='80'; var _AIMG = new Image(); var _bn=navigator.appName; var _PR = location.protocol=="https:"?"https://"+HL_GUL:"http://"+HL_GUL+":"+HL_GPT;if( _bn.indexOf("Netscape") > -1 || _bn=="Mozilla"){ setTimeout("_AIMG.src = _PR+'/?cookie';",1); } else{ _AIMG.src = _PR+'/?cookie'; };
			document.writeln("<scr"+"ipt language='javascript' src='/js/acecounter/acecounter_V70.js'></scr"+"ipt>");
		}
	}
	
	function fnReAdminOrder(){
		
		var params = '';
		jqUtils.ajax({
			url : '/login/adminLoginActionAgain.do',
			data : params,
			success : function (res) {
				location.href="/admin/adminOrder.do";
			}
		});
		
		
	}
	
	//다음 지도팝업
	function fnAdressPopup(opener) {
	    new daum.Postcode({
	        oncomplete: function(data) {
	            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
	
	            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
	            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
	            var addr1         = ''; // 최종 주소 변수
	            var addr2         = '';
	            var extraAddr = ''; // 조합형 주소 변수
	            var zipCd         = data.zonecode;	//새로운 zipCd 다섯자리
	            var state          = data.sido;			// 시
	            var city             = data.sigungu;		//군
	            var dong         = data.bname;  //동
	            var warehId          = sessionScope.storeId;
	            var orderStoreId = sessionScope.storeId;	
	            var addonsFee   = 0;
	            var zipNm			= state + ' ' + city + ' ' + dong;
	            var storeNm			= sessionScope.shopNm;
	            var bizTelNo = '';
	            // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
	            if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
	                addr1 = data.roadAddress;
	
	            } else { // 사용자가 지번 주소를 선택했을 경우(J)
	                addr1 = data.jibunAddress;
	            }
	            dong = jQuery.trim(addr1.replace(data.sido|| '' , ''));
	            dong = jQuery.trim(dong.replace(data.sigungu|| '' , ''));
	            addr1 = (data.sido      || '') + ' ' + (data.sigungu || '') + ' ' + (dong || '');
	            // 사용자가 선택한 주소가 도로명 타입일때 조합한다.
//	            if(data.userSelectedType === 'R'){
//	                //법정동명이 있을 경우 추가한다.
//	                if(data.bname !== ''){
//	                    extraAddr += data.bname;
//	                }
//	                // 건물명이 있을 경우 추가한다.
//	                if(data.buildingName !== ''){
//	                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
//	                }
//	                // 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
//	                addr1 += (extraAddr !== '' ? ' ('+ extraAddr +')' : '');
//	            }
	            addr2 =  data.buildingName;
	            if(sessionScope.businessAreaGb == "1"){
	            	jqUtils.ajax({
				         url : '/common/zipcode/getDeliveryInfo.do',
				         data : 'zipId='+zipCd,
				         async: false,
				         success : function (res) {
				        	    // 배송권역이 잡혀있을경우 해당 배송권역의 warehId와 orderStoreId, addonsFee를 다시 셋팅해줌
				        	 	if(res.deliveryInfo.warehId != "" && res.deliveryInfo.warehId != null){
				        	 		warehId        = res.deliveryInfo.warehId;
				        	 	}
				        	 	if(res.deliveryInfo.orderStoreId != "" && res.deliveryInfo.orderStoreId != null){
				        	 		orderStoreId = res.deliveryInfo.orderStoreId;
				        	 	}
				        	 	if(res.deliveryInfo.addonsFee != "" && res.deliveryInfo.addonsFee != null){
				        	 		addonsFee    = res.deliveryInfo.addonsFee;
				        	 	}
				        	 	if(res.deliveryInfo.storeNm != "" && res.deliveryInfo.storeNm != null){
				        	 		storeNm    = res.deliveryInfo.storeNm;
				        	 	}
				        	 	if(res.deliveryInfo.bizTelNo != "" && res.deliveryInfo.bizTelNo != null){
				        	 		bizTelNo    = res.deliveryInfo.bizTelNo;
				        	 	}
				        	 	
				         }
				     });
	            }
	            
	            // 우편번호와 주소 정보를 해당 필드에 넣는다.
	            switch (opener) {
					// 회원가입/수정 - 배송지정보
					case 'memberReceiver':
						$('#zipId').val(zipCd);
						$('#zipCd').val(zipCd);
						$('#state').val(state);
						$('#city' ).val(city);
						$('#addr1').val(addr1);
						$('#addr2').val(addr2);
						$('#dong' ).val(dong);
						
						break;
						
					// 회원가입/수정 - 기업 정보
					case 'memberCompany':
						$('#bizZipCd').val(zipCd);
						$('#bizState').val(state);
						$('#bizCity' ).val(city);
						$('#bizAddr1').val(addr1);
						$('#bizAddr2').val(addr2);
						$('#bizDong' ).val(dong);
						$('#bizZipId' ).val(zipCd);
						break;
						
					// 주문결제 - 주문자
					case 'orderOrderer':
						$('#membZipId').val(zipCd);
						$('#membZipCd').val(zipCd);
						$('#membState').val(state);
						$('#membCity' ).val(city);
						$('#membAddr1').val(addr1);
						$('#membAddr2').val(addr2);
						$('#membDong' ).val(dong);
						$('#membWarehId' ).val(warehId);
						$('#membOrderStoreId' ).val(orderStoreId);
//						addonsFee = addonsFee;
						fnOrderAddrUpd(addonsFee);
						break;
						
					// 주문결제 - 배송지
					case 'orderReceiver':
						$('#recvZipId').val(zipCd);
						$('#recvZipCd').val(zipCd);
						$('#recvState').val(state);
						$('#recvCity' ).val(city);
						$('#recvAddr1').val(addr1);
						$('#recvAddr2').val(addr2);
						$('#recvDong' ).val(dong);
						$('#orderWarehId' ).val(warehId);
						$('#orderStoreId' ).val(orderStoreId);
						fnAddAddonsFee(addonsFee,orderStoreId);
						break;
						
					// 영업사원 방문신청
					case 'ruquestSales':
						$('#zipId').val(zipCd);
						$('#zipCd').val(zipCd);
						$('#state').val(state);
						$('#city' ).val(city);
						$('#addr1').val(addr1);
						$('#addr2').val(addr2);
						$('#dong' ).val(dong);
						$('#orderStoreId' ).val(orderStoreId);
						break;
						
					// 카탈로그신청
					case 'catalog':
						$('#zipId').val(zipCd);
						$('#zipCd').val(zipCd);
						$('#state').val(state);
						$('#city' ).val(city);
						$('#addr1').val(addr1);
						$('#addr2').val(addr2);
						$('#dong' ).val(dong);
						$('#orderStoreId' ).val(orderStoreId);
						break;
						
					// 영업사원 방문신청 (리뉴얼)
					case 'requestSalesman':
						$('#zipId').val(zipCd);
						$('#zipCd').val(zipCd);
						$('#addr1').val(addr1);
						$('#addr2').val(addr2);
						$('#zipNm').val(zipNm);
//						$('#custShop').text(deliveryRes.bizNm);		후에 쓰면 재정의 함
//						$('#bizTelNo').text(deliveryRes.bizTelNo);
						$('#orderStoreId').val(orderStoreId);
						break;
						
					// 문화상품권신청
					case 'requestHmoney':
						$('#zipId').val(zipCd);
						$('#zipCd').val(zipCd);
						$('#state').val(state);
						$('#city' ).val(city);
						$('#addr1').val(addr1);
						$('#addr2').val(addr2);
						$('#dong' ).val(dong);
						$('#orderStoreId').val(orderStoreId);
						break;
						
					// 쿠폰/마일리지/상품권 신청 매장찾기
					case 'findStoreHmoney':
						$("#recvStore").val(storeNm);
						$("#recvOrderStoreId").val(orderStoreId);
						break;
						
					// 매장찾기
					case 'findStore':
						var str  = '<span class="info_txt block m_t10">고객님의 주소지는 ';
						    str += '<strong class="color_517"><a href="#link" style="color:#cc1517;" onclick="go_shop(\''+orderStoreId+'\')">';
						    str += storeNm + '</a>'+' ['+bizTelNo+']';
						    str += "</strong> 에서 담당하고 있습니다</span>";
						    $("#custShop").html(str);
							$("#custShop1").html(str);
						break;
						
					//팩스 주문서 다운로드
					case 'faxOrderSheet':
						storeNm = storeNm.replace(/(^\s*)|(\s*$)/gi, "");
						//location.href="/uploadFile/faxOrder/사무용품신청서_"+ storeNm +".xls";
						location.href="https://fs.arumnet.com/image/N2030ICUMT/fax/사무용품신청서_"+ storeNm +".xls";

						break;
					
					case 'admissionAddr':
						
						$('#zipCd_').val(zipCd)
						$('#addr1_').val(addr1);
						$('#addr2_').val(addr2);
	
						break;
						
					default:
						break;
				}
	            
	            // 커서를 상세주소 필드로 이동한다.
//	            $('#addr2').focus();
	        }
	    }).open();
	}
	
	
	function fnPassFilter(loginPw,passwordFilter,loginId,membNm){
		
		var preStr = "비밀번호는 ";
		if(passwordFilter==1){
			if(loginPw.length < 4){
				alert(preStr+"4자리 이상만 가능합니다.");
				return false;
			}else{
				return true;
			}
			
		}else if(passwordFilter==3){
			
			if(loginPw.length >7){
				if (loginPw.match(/([a-zA-Z])/) && loginPw.match(/([0-9])/)){
					return true;
				}else{
					
					alert(preStr+"영문+숫자 가 조합되야 합니다.");
				}
			}else{
				alert(preStr+"8자리 이상만 가능합니다.");
			}
			return false;
			
		}else if(passwordFilter==6){
			
			if(loginPw.length >9){
				if (loginPw.match(/([a-zA-Z])/) && loginPw.match(/([0-9])/)  ){
					
					 var stringRegx = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi ; 
					  
					 if(stringRegx.test(loginPw)) {
						 
						 return true;
					  
					 }else{
						 alert(preStr+"특수문자를 포함해야 합니다. ");
					 }
				}else{
					alert(preStr+"영문 및 숫자, 문자가 호함되야 합니다. ");
				}
			}else{
				alert(preStr+"최소 10자 이상이어야 합니다.");
			}
			return false;
			
			
		}else if(passwordFilter==9){
			
			if(loginPw.length >9){
				if (loginPw.match(/([a-zA-Z])/) && loginPw.match(/([0-9])/)  ){
					
					 var stringRegx = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi ; 
					  
					 if(stringRegx.test(loginPw)) {
						 
						 if(loginPw.indexOf(loginId) == -1  && loginPw.indexOf(membNm) == -1 ){
							 
							 return true;
						 }else{
							 alert("아이디와 이름은 비밀번호로 사용 할 수 없습니다.");
						 }
					  
					 }else{
						 alert(preStr+"특수문자를 포함해야 합니다. ");
					 }
				}else{
					alert(preStr+"영문 및 숫자, 문자가 호함되야 합니다. ");
				}
			}else{
				
				alert(preStr+"최소 10자 이상이어야 합니다.");
				
			}
			return false;
			
		}
	}
	
	
	jQuery(function($){

		// Input Clear
		var i_text = $('.value_txt').prev('input[type=text],input[type=password],textarea');
		i_text
		.focus(function(){
			$(this).next('.value_txt').css('visibility','hidden');
		})
		.blur(function(){
			if($(this).val() == ''){
				$(this).next('.value_txt').css('visibility','visible');
			} else {
				$(this).next('.value_txt').css('visibility','hidden');
			}
		})
		.change(function(){
			if($(this).val() == ''){
				$(this).next('.value_txt').css('visibility','visible');
			} else {
				$(this).next('.value_txt').css('visibility','hidden');
			}
		})
		.blur();
	});