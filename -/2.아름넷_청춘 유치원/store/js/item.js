/*
 * 
 * 현재 대부분의 스크립트가 php에서 그대로 넘어온 것임, 추후다 바뀔것이고 그때그떄 수정중
 * 
 * 
 */

jq(document).ready(function() {
	validUtils.onlyNumeric('.itemCount');
	// 상품수량 잘못 입력 방지 스크립트 시작
	$(".itemCount").blur(function() {
		var unitEa = $(this).attr("unitEa");
		var qty = $(this).val();
		
		if (!isNumber(unitEa) || unitEa < 1) {
			unitEa = 1;
		}
				
		if (qty == "0" || qty == "") {
			alert("주문수량을 1개 이상 입력해 주세요");
			$(this).val(unitEa);
			return false;
		}
		
		if (!isNumber(qty)) {
			alert("숫자를 입력하세요.");
			$(this).val(unitEa);
			$(this).focus();
			return false;
		}
		
		if ((qty % unitEa) != 0) {
			alert("해당 상품은 " + unitEa + "단위로 주문이 가능합니다.");
			$(this).val(parseInt(qty / unitEa) * unitEa);
			$(this).focus();
			return false;
		}
	});
	// 상품수량 잘못 입력 방지 스크립트 끝
	
	//================================================= 장바구니 시작 =================================================//
	/**
	 * 장바구니 추가 - 개별 (단품 1개)
	 * 
	 */
	jq(".addcart_span").click(function() {
		// itemSts에 따른 Item상태를 취득
		var itemState = fnGetItemState($(this).attr("itemSts"));
		// itemState에 값이 존재할 경우 주문 불가
		// 2 : [판매불가], 3 : [단종], 4 : [품절]
		if (!commonUtils.isEmpty(itemState)) {
			alert(itemState + " 상품은 장바구니에 담을 수 없습니다.");
			return false;
		}
		
		var limitYn = $(this).attr("limitYn");
		
		if(limitYn == 1 ){
			
			var limitQty = parseInt($(this).attr("limitQty"));
			var orderQty = parseInt($(this).attr("orderQty"));
			var curQty= parseInt($(this).parent().parent().parent().find(".itemCount").val());
			
			orderQty = orderQty + curQty;
			
			if(limitQty < orderQty){
				
				alert("한정수량을 초과하여 상품을 주문할 수 없습니다.");
				return false;
			}
		}
		
		var qty = 1;
		var listType = $("#listType").val();
		var unitEa = $(this).attr("unitEa");
		
		if (!isNumber(unitEa)) {
			unitEa = 1;
		} else {
			unitEa = parseInt(unitEa);
		}
		
//		if (listType =="list") {
//			qty = $(this).parent().parent().parent().find(".itemCount").val();
//		} else {
//			qty = unitEa;
//		}
		qty = $(this).parent().parent().parent().find(".itemCount").val();
		if (qty == "0" || qty == "") {
			alert("주문수량을 1개 이상 입력해 주세요");
			$(this).parent().parent().parent().find(".itemCount").val(unitEa);
			return false;
		}
		
		var param = "qty=" + qty + "&itemId=" + $(this).attr("itemId");
		var config = {
				url : '/cart/addCart.do',
				data : param,
				success : function (res) {
					// specialCategory에 해당하는 경우에는 장바구니에 추가하지 못하도록 막는다.
					if (res.specialCategoryYN === 'Y') {
						alert("장바구니에 담을 수 없는 상품입니다.");
						return false;
					}
					
					if (confirm("정상적으로 담겼습니다.\n\n지금 확인해보시겠습니까?")) {
						location.href = shopUrl + "/cart/myCart.do";
					}else{
						addCartCallback(res);
					}
				}
			};
		jqUtils.ajax(config);
		
	});
	
	/**
	 * 장바구니 추가 - 선택 (멀티 다수)
	 * 
	 */
	jq(".btn_cart").click(function() {
		var n = jq("input.itemId:checked").length;
		
		if (n == 0) {
			alert('하나이상 체크하여 주십시요.');
			return false;
		}
		
		var listType = $("#listType").val();
		var param = "";
		var flag = true;
		$(".itemId").each(function() {
			if ($(this).is(":checked")) {
				// itemSts에 따른 Item상태를 취득
				var itemState = fnGetItemState($(this).attr("itemSts"));
				// itemState에 값이 존재할 경우 주문 불가
				// 2 : [판매불가], 3 : [단종], 4 : [품절]
				if (!commonUtils.isEmpty(itemState)) {
					alert(itemState + " 상품은 주문할 수 없습니다.");
					flag = false;
					return false;
				}
				
				var limitYn = $(this).attr("limitYn");
				
				if(limitYn == 1 ){
					
					var limitQty = parseInt($(this).attr("limitQty"));
					var orderQty = parseInt($(this).attr("orderQty"));
					var curQty= parseInt($(this).parent().parent().find(".itemCount").val());
					
					orderQty = orderQty + curQty;
					
					if(limitQty < orderQty){
						
						alert("한정수량을 초과하여 상품을 주문할 수 없습니다.");
						flag = false;
						return false;
					}
				}
				
				
				param += "&itemId=" + $(this).val();
				
				var qty = 1;
				var unitEa = $(this).attr("unitEa");
				
				if (!isNumber(unitEa)) {
					unitEa = 1;
				} else {
					unitEa = parseInt(unitEa);
				}
				
//				if (listType == "list") {
//					qty = $(this).parent().parent().find(".itemCount").val();
//					
//				}else{
//					qty = unitEa;
//				}
				qty = $(this).parent().parent().find(".itemCount").val();
				
				param += "&qty=" + qty;
			}
		});
		
		if (!flag) {
			return false;
		}
		
		var config = {
			url : '/cart/addMultiCart.do',
			data : param,
			success : function (res) {
				// specialCategory에 해당하는 경우에는 장바구니에 추가하지 못하도록 막는다.
				if (res.specialCategoryYN === 'Y') {
					alert("장바구니에 담을 수 없는 상품이 존재합니다.");
					return false;
				}
				
				
				if (confirm("정상적으로 담겼습니다.\n\n지금 확인해보시겠습니까?")) {
					location.href = shopUrl + "/cart/myCart.do";
				}else{
					addCartCallback(res);
					
				}
			}
		};
		jqUtils.ajax(config);
	});
	//================================================= 장바구니 끝 =================================================//
	
// kdarkdev
/* 인증상품 체크(카테고리 리스트 - 체크박스)  */
//	jq(".checkId").click(function() {
//		var idx = jq(".checkId").index(this);	
//		
//		// 인증상품 체크
//		var auth_sale_yn = jq('#auth_sale_yn').val();
//		var auth_cust_yn = jq('#auth_cust_yn').val();
//		var admin_yn = jq('#admin_yn').val();
//		var auth_item_yn = jq("input[name$='auth_item_yn[]']:eq("+idx+")").val();
//		var section_price_yn = jq("input[name$='section_price_yn[]']:eq("+idx+")").val();
//		
//		if ('Y' == section_price_yn) {
//			alert('본 상품은 상세페이지로 이동하여\n\n구매수량별 가격을  확인후 주문하여 주시기 바랍니다.');
//			return false;
//		}		
//		if ('' == auth_cust_yn) {
//			auth_cust_yn = 'N';
//		}	
//		
//		var auth = Auth_sale_check(auth_sale_yn, auth_cust_yn, auth_item_yn, admin_yn);
//		if (!auth && 'no_check' != auth) {
//			return false;
//		}
//	});
	
	//================================================= 찜하기 시작 =================================================//
	/**
	 * 찜하기 추가 - 개별 (단품 1개)
	 * 
	 */
	jq(".bookmark").click(function() {
		if (loginUser.loginYn == "N") {
			alert("로그인후 이용이 가능합니다.");
			return false;
		}
		
		commonUtils.openPopup("/board/choiceWishCateTag.do?multy=0&itemId="+ $(this).attr("itemId"), "choiceWishTag", 535, 200, "yes");
		
		/*
		var param = "itemId=" + $(this).attr("itemId") + "&";
		
		var config = {
				url : '/board/addWishlist.do',
				data : param,
				success : function (res) {
					if (confirm("관심상품이 등록되었습니다.\n\n지금 확인해보시겠습니까?")) {
						fnGoWishlist($("#itemId").val());
					}
				}
			};
		jqUtils.ajax(config);
		*/
		
	});
	
	/**
	 * 찜하기 추가 - 선택 (멀티 다수)
	 * 
	 */
	jq(".bookmark_multi").click(function() {
		if (loginUser.loginYn == "N") {
			alert("로그인후 이용이 가능합니다.");
			return false;
		}
		
		var n = jq("input.itemId:checked").length;
		if (n == 0) {
			alert('하나이상 체크하여 주십시요.');
			return false;
		}
		
		var param = "multy=1";
		var tmp = "";
		$(".itemId").each(function() {
			if ($(this).is(":checked")) {
				tmp += $(this).val() + ",";
			}
		});
		param += "&itemId="+tmp
		
		commonUtils.openPopup("/board/choiceWishCateTag.do?"+param, "choiceWishTag2", 535, 200, "yes");
		
		/*
		var param = "";
		$(".itemId").each(function() {
			if ($(this).is(":checked")) {
				param += "&itemId=" + $(this).val();
			}
		});
		
		var config = {
				url : '/board/addWishlistMulti.do',
				data : param,
				success : function (res) {
					if (confirm("관심상품이 등록되었습니다.\n\n지금 확인해보시겠습니까?")) {
						fnGoWishlist($("#itemId").val());
					}
				}
			};
		jqUtils.ajax(config);
		*/
	});
	
	/**
	 * 찜하기 추가 - 선택 (멀티 다수)
	 * 
	 */
	jq(".bookmark_multi2").click(function() {
		if (loginUser.loginYn == "N") {
			alert("로그인후 이용이 가능합니다.");
			return false;
		}
		
		var n = jq(".itemId").length;
		if (n == 0) {
			alert('하나이상 체크하여 주십시요.');
			return false;
		}
		
		var param = "multy=1";
		var tmp = "";
		$(".itemId").each(function() {
			tmp += $(this).val() + ",";
		});
		param += "&itemId="+tmp
		
		commonUtils.openPopup("/board/choiceWishCateTag.do?"+param, "choiceWishTag2", 535, 200, "yes");
	});
	//================================================= 찜하기 끝 =================================================//
	
	/* 개별 관심상품 */
	jq(".addbookmark_span").click(function() {
		var idx = jq(".addbookmark_span").index(this);
		
		// 인증상품 체크
		var auth_sale_yn = jq('#auth_sale_yn').val();
		var auth_cust_yn = jq('#auth_cust_yn').val();
		var admin_yn = jq('#admin_yn').val();
		var auth_item_yn = jq("input[name$='auth_item_yn[]']:eq("+idx+")").val();
		if ('' == auth_cust_yn) {
			auth_cust_yn = 'N';
		}
		
		var auth = Auth_sale_check(auth_sale_yn, auth_cust_yn, auth_item_yn, admin_yn);		
		if (!auth && 'no_check' != auth) {
			return false;
		}
		
		// 모든 체크박스를 푼다.
		jq("input.checkId:checked").attr("checked", "");
		
		// 선택한 체크박스만 체크한다.					
		jq("input.checkId:checkbox:eq("+idx+")").attr("checked", "checked");
		
		jq('#form_item').attr('target','wishlist_process_iframe');
		jq('#form_item').attr('action','/category/bookmark_create');
		jq("#form_item").submit();				
	});	
	
	/* 선택 관심상품 */		
	jq(".btn_wish").click(function() {
		if ( jq("#login_yn").val() == 'Y' ){
			var n = jq("input.checkId:checked").length;
			if ( n == 0 ) {
				alert('하나이상 체크하여 주십시요.');
				return false;
			} else {
				jq('#form_item').attr('target','wishlist_process_iframe');
				jq('#form_item').attr('action','/wishlist/create');
				jq("#form_item").submit();					
			}
		} else {
			alert('로그인후 이용하여 주세요.');
		}
	});
	
	/* 상품비교 버튼 클릭시 상품체크후 팝업으로 상세정보를 보여준다. */
	// kdarkdev	
//	jq(".btn_compare").click(function () {
//				
//		var chk_cnt = jq("input[name$='checkId[]']:checked").length;
//		var chk_item_id = '';
//		
//		if (chk_cnt < 2){
//			alert ("2개 이상 상품을 선택하셔야 상품비교가 가능 합니다.");
//			return false;
//		}
//		
//		if (chk_cnt > 3){
//			alert ("상품비교는 최대 3개까지 가능 합니다.");
//			return false;
//		}			
//				
//		for ( var i=0; i<(jq("input[name$='item_id[]']").length); i++ ) {
//			if ( jq("input[name$='checkId[]']:eq("+i+"):checked").length == 1 ) {
//				chk_item_id += jq("input[name$='item_id[]']:eq("+i+")").val()+":";
//			}
//		}
//		
//		makeWin('/item/compare/' + chk_item_id,'compare','796','476');		
//	});
	
    // 한정수량 체크
	// kdarkdev
//    jq('.quantity_chk').keyup( function() {
//		var idx = jq(".quantity_chk").index(this);		
//		var limit_item_yn = jq("input[name$='limit_item_yn[]']:eq(" + idx + ")").val();
//		var quantity = jq(this).val();
//		var remain_sale_quantity = jq("input[name$='remain_sale_quantity[]']:eq(" + idx + ")").val();
//		if ('Y' == limit_item_yn) {
//	
//			if (parseInt(remain_sale_quantity) < parseInt(quantity)) {
//				alert('남은 한정수량을 초과 하셨습니다.');
//				jq(this).val(1);
//				return false;
//			}
//		}
//    });    
});


// kdarkdev
//function fn_single_item_cart(item_id, price, web_cate_tree_id, sale_store_id) {
//	jq('#item_id').val(item_id);
//	jq('#price').val(price);
//	jq('#web_cate_tree_id').val(web_cate_tree_id);
//	jq('#sale_store_id').val(sale_store_id);
//	jq('#form_single').submit();
//}