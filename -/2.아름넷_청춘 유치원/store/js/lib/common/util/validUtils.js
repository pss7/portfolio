/**
 * 유효성체크 유틸 모음
 */
var validUtils = validUtils || {};


(function (window, context) {
	
	/**
	 * jQuery alias 
	 */
	//jQuery.noConflict();
	var jq = jQuery;
	
	jQuery.extend(jQuery.validator.messages, {
		required: "반드시 입력해야 합니다.",
		remote: "수정 바랍니다.",
		email: "이메일 주소를 올바로 입력하세요.",
		url: "URL을 올바로 입력하세요.",
		date: "날짜가 잘못 입력됐습니다.",
		dateISO: "ISO 형식에 맞는 날짜로 입력하세요.",
		number: "숫자만 입력하세요.",
		digits: "숫자(digits)만 입력하세요.",
		creditcard: "올바른 신용카드 번호를 입력하세요.",
		equalTo: "값이 서로 다릅니다.",
		accept: "승낙해 주세요.",
		maxlength: jQuery.validator.format("{0}글자 이상은 입력할 수 없습니다."),
		minlength: jQuery.validator.format("적어도 {0}글자는 입력해야 합니다."),
		rangelength: jQuery.validator.format("{0}글자 이상 {1}글자 이하로 입력해 주세요."),
		range: jQuery.validator.format("{0}에서 {1} 사이의 값을 입력하세요."),
		max: jQuery.validator.format("{0} 이하로 입력해 주세요."),
		min: jQuery.validator.format("{0} 이상으로 입력해 주세요.")
	});
	
	// 정규식 패턴
	var PATTERN_COMP_NUM= "^[\\d]{10}$";
	var PATTERN_TEL     = "[\\d]{2,4}\\-[\\d]{3,4}\\-[\\d]{4}";
	// From http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#e-mail-state-%28type=email%29
	var PATTERN_EMAIL   = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$";
	var PATTERN_ZIPCODE = "[\\d]{3}-?[\\d]{3}";
	var PATTERN_ZIPCODE1 = "[\\d]{3}";
	//var PATTERN_ALPHA   = /[A-Za-z]/g;
	var PATTERN_NOT_ALPHA   = /[^A-Za-z]/g;
	//var PATTERN_NUMERIC = /[0-9]/g;
	var PATTERN_NOT_NUMERIC = /[^0-9]/g;
	//var PATTERN_KOREAN = /[가-힣ㄱ-ㅎㅏ-ㅣ\x20]/g;
	var PATTERN_NOT_KOREAN = /[^가-힣ㄱ-ㅎㅏ-ㅣ\x20]/g;
	var PATTERN_NOT_ALPHA_NUMERIC = /[^0-9A-Za-z]/g;
	
	var MESSAGE_VALID_CHK_CONFIRM           = "[{0}] 확인해 주십시오.";
	var MESSAGE_VALID_CHK_NOTBLANK          = "[{0}] 입력해 주십시오.";
	var MESSAGE_VALID_CHK_MINMAX_MIN        = "[{0}] 최소 길이는 {1}byte 입니다.(한글 3byte)";
	var MESSAGE_VALID_CHK_MINMAX_MAX        = "[{0}] 최대 길이는 {1}byte 입니다.(한글 3byte)";
	var MESSAGE_VALID_CHK_NUMERIC           = "[{0}] 숫자만 입력해 주십시오.";
	var MESSAGE_VALID_CHK_ALPHA             = "[{0}] 영문만 입력해 주십시오.";
	var MESSAGE_VALID_CHK_ALPHANUMERIC      = "[{0}] 영문 또는 숫자만 입력해 주십시오.";
	var MESSAGE_VALID_CHK_NUMERIC_FIND      = "[{0}] 숫자를 포함해서 입력해 주십시오.";
	var MESSAGE_VALID_CHK_ALPHA_FIND        = "[{0}] 영문을 포함해서 입력해 주십시오.";
	var MESSAGE_VALID_CHK_ALPHANUMERIC_FIND = "[{0}] 영문 또는 숫자를 포함해서 입력해 주십시오.";
	var MESSAGE_VALID_CHK_KOREAN            = "[{0}] 한글만 입력해 주십시오.";
	var MESSAGE_VALID_CHK_PATTERN           = "[{0}] 형식에 맞게 입력해 주십시오.";

	/**
	 * input에 mask에 해당하는형식으로 입력받을수있게 한다.
	 * <pre>
	 *     validUtils.mask('#bizNo', '999-99-99999');
	 * </pre>
	 */
	context.mask = function (selector, mask) {
		$(selector).mask(mask);
	};
	
	/**
	 * 정규식에 해당하는것을 제외한것만 입력허용.
	 * <pre>
	 *     // bizNm id를 갖고있는 input에 한글이 아닌것들은 입력을 받지않음 
	 *     validUtils.regExp('#bizNm', /[^가-힣ㄱ-ㅎㅏ-ㅣ\x20]/g);
	 * </pre>
	 */
	context.regExp = function (selector, regExp) {
		$(document).on('keyup keydown blur', selector, function(eventObject){
			var value = $(this).val();
			if( regExp.test(value) ) {
				$(this).val(value.replace(regExp,''));
			}
		});
	};
	
	/**
	 * 숫자만 입력
	 * <pre>
	 *     validUtils.onlyNumeric('#bizNm');
	 * </pre>
	 */
	context.onlyNumeric = function (selector) {
		$(document).on('keyup keydown blur', selector, function(eventObject){
			var value = $(this).val();
			if( PATTERN_NOT_NUMERIC.test(value)) {
				$(this).val(value.replace(PATTERN_NOT_NUMERIC,''));
			}
		});
	};
	
	/**
	 * 한글만 입력
	 * <pre>
	 *     validUtils.onlyKorean('#bizNm');
	 * </pre>
	 */
	context.onlyKorean = function (selector) {
		$(document).on('keyup keydown blur', selector, function(eventObject){
			var value = $(this).val();
			if( PATTERN_NOT_KOREAN.test(value)) {
				$(this).val(value.replace(PATTERN_NOT_KOREAN,''));
			}
		});
	};
	
	/**
	 * 영문만 입력
	 * <pre>
	 *     validUtils.onlyAlpha('#bizNm');
	 * </pre>
	 */
	context.onlyAlpha = function (selector) {
		$(document).on('keyup keydown blur', selector, function(eventObject){
			var value = $(this).val();
			if( PATTERN_NOT_ALPHA.test(value)) {
				$(this).val(value.replace(PATTERN_NOT_ALPHA,''));
			}
		});
	};
	
	/**
	 * 영문 + 숫자만 입력
	 * <pre>
	 *     validUtils.onlyAlphaNumeric('#bizNm');
	 * </pre>
	 */
	context.onlyAlphaNumeric = function (selector) {
		$(document).on('keyup keydown blur', selector, function(eventObject){
			var value = $(this).val();
			if( PATTERN_NOT_ALPHA_NUMERIC.test(value)) {
				$(this).val(value.replace(PATTERN_NOT_ALPHA_NUMERIC,''));
			}
		});
	};
	
	/**
	 * jquery validate 플러그인을 이용한 form의 입력값들의 유효성 체크.
	 * <pre>
	 *     validUtils.formValidate({
	 *         alertMode : true,        // 유효성 통과하지않으면 메시지를 alert으로 띄운다.
     *         form  : memberForm,      // 유효성 검사할 form의 객체
     *         rules : {
     *         
     *             // 로그인 정보
     *             loginId : { minlength:4, maxlength:100, fieldName:'회원 ID' },
     *             loginPw : { minlength:4, maxlength:12, fieldName:'비밀번호', regExp: /^.*(?=.{4,12})(?=.*[0-9])(?=.*[a-zA-Z]).*$/ }, //<== regExp는 허용할 입력양식 지정
     *             loginPw2 : { minlength:4, maxlength:12, equalTo : '#loginPw', fieldName:'비밀번호 확인', regExp:/^.*(?=.{4,12})(?=.*[0-9])(?=.*[a-zA-Z]).*$/ },
     *  
     *             // 기업 정보
     *             bizNm : { minlength:1, maxlength:100, fieldName:'업체명' },
     *             bizNo : { chkCompNum:true, fieldName:'사업자등록번호' },
     *             bizCond : { minlength:1, maxlength:100, fieldName:'업태' },
     *             bizTypes : { minlength:1, maxlength:100, fieldName:'업종' },
     *             bizOwner : { minlength:1, maxlength:100, fieldName:'대표자 성명' },
     *             bizTelNo : { chkTel:true, fieldName:'대표전화' },
     *             bizZipCd : { chkZipCode:true, fieldName:'사업장 주소지 우편번호' },
     * 		
     *             // 담당자 정보
     *             membNm : {minlength:1, maxlength:50, fieldName:'이름'},
     *             telHp : {chkTel:true, fieldName:'핸드폰번호'},
     *             email : {chkEmail:true, fieldName:'E-mail'},
     * 
     *             // 배송지 정보
     *             zipCd : { chkZipCode:true, fieldName:'배송지 우편번호' }
     *         }
     *     });
	 * </pre>
	 */
	context.formValidate = function (config) {
		var isAlertMode = config.alertMode;
		var form = config.form;
		var validateConfig = {};
		validateConfig.rules = config.rules;
		validateConfig.messages = {};
		validateConfig.ignore = [];
		if(isAlertMode) {
			// jquery.validate 설정
			$.validator.setDefaults({
				onkeyup:false,
				onclick:false,
				onfocusout:false,
				showErrors:function(errorMap, errorList){
					if(this.numberOfInvalids()) { // 에러가 있을 때만..
						alert(errorList[0].message);
						$(errorList[0].element).focus();
						form.validate().cancelSubmit = true;
						//var caption = $(errorList[0].element).attr('caption') || $(errorList[0].element).attr('name');
//		 				alert('[' + caption + ']' + errorList[0].message);
					}
					return false;
				}
			});
		}
//		
		// jquery.validate에 custom 기능 추가 (전화번호 정규식)
		$.validator.addMethod('chkTel', function(value, element){
			if(new RegExp(PATTERN_TEL).test(value)) {
				return true;
			} else {
				return false;
			}
		}, '');
//		
		$.validator.addMethod('chkZipCode', function(value, element){
			if(new RegExp(PATTERN_ZIPCODE).test(value)) {
				return true;
			} else {
				return false;
			}
//		}, $.validator.messages.chkZipCode);
		}, '');
		
		// 우편번호 앞3자리, 또는 뒤3자리의 숫자 체크
		$.validator.addMethod('chkZipCode1', function(value, element){
			if(new RegExp(PATTERN_ZIPCODE1).test(value)) {
				return true;
			} else {
				return false;
			}
//		}, $.validator.messages.chkZipCode1);
		}, '');
//		
		$.validator.addMethod('chkCompNum', function(value, element){
			if( commonUtils.checkBizNo(value) ) {
				return true;
			} else {
				return false;
			}
		}, '');
//		
		// jquery.validate에 custom 기능 추가 (이메일 정규식)
		$.validator.addMethod('chkEmail', function(value, element){
			if(new RegExp(PATTERN_EMAIL).test(value)) {
				return true;
			} else {
				return false;
			}
		}, '');
		// 정규식
		$.validator.addMethod("regExp", function(value, element, regexpr) {
			var isPass = regexpr.test(value);
		    return isPass;
		}, '');
		// (override)최대길이체크
		$.validator.addMethod("maxlength", function(value, element, maxlength) {
			var koreanByteLength = 3; // 한글한자의 byte 길이
			var byteLength = commonUtils.chkByte(value, koreanByteLength);
			if(byteLength > maxlength) {
				return false;
			} else {
				return true;
			}
		}, '');
		// (override)최소길이체크
		$.validator.addMethod("minlength", function(value, element, minlength) {
			var koreanByteLength = 3; // 한글한자의 byte 길이
			var byteLength = commonUtils.chkByte(value, koreanByteLength);
			if(byteLength < minlength) {
				return false;
			} else {
				return true;
			}
		}, '');
		
		// 개발자가 지정한 rules속성의 각 속성별로 메시지를 생성
		for(var ruleName in validateConfig.rules) {
			
			if( validateConfig.rules[ruleName].required != false){
				validateConfig.rules[ruleName].required = true;
			}
			validateConfig.messages[ruleName] = {};
			for(var ruleAttr in validateConfig.rules[ruleName]) {
				var fieldName = validateConfig.rules[ruleName].fieldName;
				var message = '';
				var ruleAttrValue = validateConfig.rules[ruleName][ruleAttr];
				if(ruleAttr === 'required') {
					message = MESSAGE_VALID_CHK_NOTBLANK.replace('{0}', fieldName);
				} else if (ruleAttr === 'minlength') {
					message = MESSAGE_VALID_CHK_MINMAX_MIN.replace('{0}', fieldName).replace('{1}', ruleAttrValue);
				} else if (ruleAttr === 'maxlength') {
					message = MESSAGE_VALID_CHK_MINMAX_MAX.replace('{0}', fieldName).replace('{1}', ruleAttrValue);
				} else if (ruleAttr === 'equalTo') {
					message = MESSAGE_VALID_CHK_CONFIRM.replace('{0}', fieldName);
				} else if (ruleAttr === 'chkCompNum') {
					message = MESSAGE_VALID_CHK_PATTERN.replace('{0}', fieldName);
				} else if (ruleAttr === 'chkEmail') {
					message = MESSAGE_VALID_CHK_PATTERN.replace('{0}', fieldName);
				} else if (ruleAttr === 'chkTel') {
					message = MESSAGE_VALID_CHK_PATTERN.replace('{0}', fieldName);
				} else if (ruleAttr === 'chkZipCode') {
					message = MESSAGE_VALID_CHK_PATTERN.replace('{0}', fieldName);
				} else if (ruleAttr === 'regExp') {
					message = MESSAGE_VALID_CHK_PATTERN.replace('{0}', fieldName);
				}
				
				if(message !== '') { // 메시지가 있는경우만 생성된 메시지를 messages속성에 옮긴다.
					validateConfig.messages[ruleName][ruleAttr] = message;
				}
			}
		} // end for
		
		// rule에서 fieldName제거 (안지우면 에러남)
		for(var ruleName in validateConfig.rules) {
			delete validateConfig.rules[ruleName].fieldName;
		} // end for
		
//		console.log(validateConfig);
		form.validate(validateConfig);
	};
	
	/**
	 * 유효성체크가 걸려있는 form을 다른 페이지로의 이동을 목적으로 submit할때 사용.
	 */
	context.disabled = function(form) {
	   form.validate().cancelSubmit = true;
	};
	
})(window, validUtils);