/**
 * 공통 유틸 클래스
 */
var commonUtils = commonUtils || {};
(function (window, context) {
	
	/**
	 * 팝업 띄우기
	 */
	context.openPopup = function (url, winname, width, height, scrolltype,xpo,ypo,alignGb){
	   var xposition=xpo, yposition=ypo;
	   
	   if (alignGb === undefined) {
		   alignGb = 0;
	   }
	   
	   if (alignGb==0){
		   xposition = (screen.width - width) / 2;
		   yposition = (screen.height - height) / 2;
		   
	   }
	   if(scrolltype === undefined) { 
		   scrolltype = 'no';
	   }
	   var args = "width=" + width + "," + "height=" + height + "," + "location=0," + "menubar=0," + "resizable=no,"
	         + "scrollbars=" + scrolltype + "," + "status=0," + "titlebar=0," + "toolbar=0," + "hotkeys=0,"
			 + "screenx=" + xposition + ","  //NN Only
			 + "screeny=" + yposition + ","  //NN Only
			 + "left=" + xposition + ","     //IE Only
			 + "top=" + yposition;           //IE Only

	   if(url.indexOf('?') > -1) {
		   var newWin=window.open(url+"&popupYn=Y",winname,args);
		   return newWin;
		  // newWin.focus();
	   } else {
		   var newWin=window.open(url+"?popupYn=Y",winname,args);
		   return newWin;
		   //newWin.focus();
	   }
	};
	
	/**
	 * 사업자 등록번호 체크
	 */
	context.checkBizNo = function (value) {
		var err = 0;
		var ERROR_MESSAGE = "사업자등록번호를 정확히 입력하여 주세요.";
		
		var business_number = value;	// 입력받은 사업자번호
		
		// 하이픈(-)이 없는 경우와 있는 경우 각각 10자리, 12자리 체크
		if (business_number.length != 10 && business_number.length != 12) {
			alert(ERROR_MESSAGE);
			return false;
		}
		
		// 하이픈(-)이 없는 10자리의 숫자만 입력받은 경우
		if (business_number.length == 10) {
			if (!context.isNaturalNumber(business_number)) {
				alert(ERROR_MESSAGE);
				return false;
			}
		}
		
		// 하이픈(-)이 있는 12자리의 사업자번호 형식인 경우
		if (business_number.length == 12) {
			var number1 = business_number.substr(0, 3);
			var hyphen1 = business_number.substr(3, 1);
			var number2 = business_number.substr(4, 2);
			var hyphen2 = business_number.substr(6, 1);
			var number3 = business_number.substr(7, 5);
			
			// 숫자만 있어야 될 위치에 숫자가 입력 되었는지 체크
			if (!context.isNaturalNumber(number1) || !context.isNaturalNumber(number2) || !context.isNaturalNumber(number3)) {
				alert(ERROR_MESSAGE);
				return false;
			}
			
			// 문자 하이픈(-)이 있어야 될 위치에 하이픈(-)이 정확하게 입력 되었는지 체크
			if (hyphen1 !== '-' || hyphen2 !== '-') {
				alert(ERROR_MESSAGE);
				return false;
			}
		}
		
		var fullcom = business_number.replace(/-/g,'');
		var hap = 0;
		var CC_j = 0;
		var cal_arr = new Array("1","3","7","1","3","7","1","3","5");
		var CC_ii;
		for (CC_ii = 0; CC_ii < 9; CC_ii++) {
			hap = hap + (parseInt(fullcom.charAt(CC_ii)) * parseInt(cal_arr[CC_j]));
			CC_j++;
		}

		hap = hap + parseInt((parseInt(fullcom.charAt(8))*5)/10);
		if ((10 - (hap % 10)) % 10 != parseInt(fullcom.charAt(9))) {
			err = 1;
		}
		
		if (err == 1) {
			return false;
		} else {
			return true;
		}
	};
	
	/**
	 * 브라우저의 시작페이지 등록.<br/>
	 * Internet Explorer10 이하에서만 지원된다.<br/>
	 * 
	 * <pre>
	 *     &lt;a href="#" onclick="commonUtils.setStartPage('http://www.alphaoffice.co.kr'); return false;" >&lt;img src="/skin/header/images/Hbtn_StartOffice.png" alt="오피스디포 시작페이지로" />&lt;/a>
	 * </pre>
	 * 
     * @param {String} url - 시작페이지에 등록할 url
     * 
	 */
	context.setStartPage = function (url) {
		var isIE = $.browser.msie || navigator.userAgent.match(/Trident.*rv\:11\./); // IE11까지 포함
		if(isIE) {
			try {
				document.body.style.behavior='url(#default#homepage)';
				document.body.setHomePage(url);
			} catch (e) {
				alert('IE11 이상에서는 지원하지 않습니다.');
			}
		} else {
			var url = '#default#homepage';
			if (window.sidebar && window.sidebar.addPanel){ // Firefox
				window.sidebar.addPanel("아름쇼핑몰", url,""); 
			}else if (navigator.appName=="Netscape") { 
				alert("확인을 누르신 후 , <Ctrl-D> 를 누르시면 북마크에 추가됩니다."); 
			} 
		}
	};
	
	/**
	 * 브라우저의 즐겨찾기에 추가.<br/>
	 * Internet Explorer에서만 지원 된다.<br/>
	 * 
	 * <pre>
	 *     &lt;a href="#" onclick="commonUtils.addFavorite('http://www.alphaoffice.co.kr', '사무,전산,생활 전문몰 오피스디포'); return false;">&lt;img src="/skin/header/images/Hbtn_bookmark.png" alt="즐겨찾기추가" />&lt;/a>&lt;/li>
	 * </pre>
	 * 
	 * @param {String} url - 즐겨찾기에 등록할 url
	 * @param {String} title - 즐겨찾기에 등록할 url의 title명
	 * 
	 */
	context.addFavorite = function () {
		var isIE = $.browser.msie || navigator.userAgent.match(/Trident.*rv\:11\./); // IE11까지 포함
		if(isIE) {
			window.external.AddFavorite("http://market.arument.com:8388", "킹오피스");
		} else {
			alert('즐겨찾기 추가는 IE에서만 가능 합니다.');
		}
	}; 
	
	var dateFormatRegex = /(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi;
	/**
	 * 자바스크립트 날짜포맷리턴.<br/>
	 * 첫번째 인자로는 yyMMdd와같은 날짜 포맷(필수)을,
	 * 두번째 인자로는 Date객체를(옵션) 넣어주면 20140403과같은 Date객체에 해당하는 날짜를 리턴. 
	 * 
	 * <pre>
	 *     commonUtils.formatDate('yyyy년 MM월 dd일 HH:mm:ss', new Date()); => '2014년 04월 03일 02:12:29'
	 *     commonUtils.formatDate('yyyy-MM-dd E');             => '2014-04-03 목요일'
	 *     commonUtils.formatDate('yyyy-MM-dd E a/p');         => '2014-04-03 목요일 오전'
	 * </pre>
	 * @param format - yyyyMMdd (날짜포맷) (필수)
	 * @param date - 자바스크립트 Date객체 (옵션: default 오늘날짜)
	 * @returns
	 */
	context.formatDate = function(format, date) {
	    if (!this.valueOf()) {
	    	return " ";
	    }
	    var browserLanguage = window.navigator.language;
	    var weekName = null;
	    if(browserLanguage === 'ko') {
	    	weekName = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']; 
	    } else {
	    	weekName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	    }
	    
	    var d = date===undefined?new Date():date;
	    return format.replace(dateFormatRegex, function($1) {
	        switch ($1) {
	            case 'yyyy': return d.getFullYear();
	            case 'yy': return (d.getFullYear() % 1000).zf(2);
	            case 'MM': return (d.getMonth() + 1).zf(2);
	            case 'dd': return d.getDate().zf(2);
	            case 'E': return weekName[d.getDay()];
	            case 'HH': return d.getHours().zf(2);
	            case 'hh': return ((h = d.getHours() % 12) ? h : 12).zf(2);
	            case 'mm': return d.getMinutes().zf(2);
	            case 'ss': return d.getSeconds().zf(2);
	            case 'a/p': 
	            	if(browserLanguage === 'ko') {
	            		return d.getHours() < 12 ? '오전' : '오후';
	            	} else {
	            		return d.getHours() < 12 ? 'AM' : 'PM';
	            	}
	            default: return $1;
	        }
	    });
	};
	// 이하 자바스크립트 네이티브 클래스의 prototype 확장
	String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
	String.prototype.zf = function(len){return '0'.string(len - this.length) + this;};
	Number.prototype.zf = function(len){return this.toString().zf(len);};
	// dateFormat관련 코드 끝

	/**
	 * 날짜계산.<br/>
	 * numberOfDays에 해당하는날만큼 더하거나 빼서 format형식으로 날짜를 리턴
	 * 
	 * <pre>
	 *	   // 오늘날짜가 2014년 04월 14일 일경우
	 *     commonUtils.calculateDate(5, 'yyyyMMdd');  // 20140419
     *     commonUtils.calculateDate(-5, 'yyyyMMdd'); // 20140409
	 * </pre>
	 * @param numberOfDays - 오늘날짜에서 더하거나뺄 일수 (필수)
	 * @param format - yyyyMMdd (날짜포맷) (필수)
	 * @returns
	 */
	context.calculateDate = function(numberOfDays, format) {
		var today = new Date();
		// 오늘로부터 일수 이전(음수값) 또는 이후의 ms
		var endTime = today.getTime() + (numberOfDays * 24  * 60 * 60 * 1000); 	
		var formattedEndDate = commonUtils.formatDate(format, new Date(endTime));
		return formattedEndDate;
	};
	
	/**
	 * 빈문자열 구분
	 */
	context.isEmpty = function(value) {
		if(value==='' || value===undefined || value === null) {
			return true;
		} else {
			false;
		}
	};
	
	/**
	 * 바이트 계산
	 */
	context.chkByte = function(value, koreanByteLength) {
		if(commonUtils.isEmpty(value)) {
			return 0;
		}
		if(koreanByteLength===undefined) {
			koreanByteLength = 3;
		}
		
	    var ls_str = value; 
	    var li_str_len = ls_str.length; //전체길이
	    //변수초기화
	    var i = 0;
	    var li_byte = 0;   //한글일경우 2, 그외글자는 1을 더함
	    var li_len = 0;    // substring하기 위해 사용
	    var ls_one_char = "";  //한글자씩 검사
	    var ls_str2 = "";      //글자수를 초과하면 제한한 글자전까지만 보여줌.
		for(i=0; i< li_str_len; i++) {
		    ls_one_char = ls_str.charAt(i);   //한글자 추출
		    if(escape(ls_one_char).length > 4){ 
		      li_byte += koreanByteLength;   //한글이면 2를 더한다
		    }else{
		      li_byte++;     //한글아니면 1을 다한다
		    }
		}
		return li_byte;
	};
	
	/**
	 * 이니시스 영수증 팝업.
	 * 이니시스 PG의 결제내역을 영수증으로 볼수있다.
	 * 
	 * <pre>
	 * commonUtils.openInicisReceipt('INIjspHPP_INIpayTest20140523040101376850');
	 * commonUtils.openInicisReceipt('INIjspCARDINIpayTest20140523210234145950');
	 * </pre>
	 * 
	 * @param tid - 거래아이디 (Transaction ID, 거래번호)
	 */
	context.openInicisReceipt = function (tid) {
		var receiptUrl = "https://iniweb.inicis.com/DefaultWebApp/mall/cr/cm/mCmReceipt_head.jsp?noTid=" + tid +"&noMethod=1";
		commonUtils.openPopup(receiptUrl, "inicisReceipt", 430, 700, 'yes', null, null, 0);
	};
	
	/**
	 * 입력받은 값이 자연수인지 여부
	 */
	context.isNaturalNumber = function(value) {
		// 빈 문자열인지 체크
		if (context.isEmpty(value)) {
			return false;
		}
		
		// 문자열 길이 체크
		if (value.length <= 0) {
			return false;
		}
		
		var flag = true;
		
		for (var i = 0; i < value.length; i++) {
			if (value.charAt(i) < '0' || value.charAt(i) > '9') {
				flag = false;
				break;
			}
		}
		
		return flag;
	};
	
	/**
	 * 입력받은 문자열이 null일 경우 default값으로 치환 시킨 문자열을 취득
	 * 
	 * @param str 입력받은 문자열
	 * @param defaultStr null일 경우 치환할 default 문자열
	 */
	context.getDefaultString = function(str, defaultStr) {
		return context.isEmpty(str) ? defaultStr : str;
	};
})(window, commonUtils);





function checkEmail(emailStr) {
    if (emailStr.length == 0) {
        return true;
    }
    var emailPat=/^(.+)@(.+)$/;
    var specialChars="\\(\\)<>@,;:\\\\\\\"\\.\\[\\]";
    var validChars="\[^\\s" + specialChars + "\]";
    var quotedUser="(\"[^\"]*\")";
    var ipDomainPat=/^(\d{1,3})[.](\d{1,3})[.](\d{1,3})[.](\d{1,3})$/;
    var atom=validChars + '+';
    var word="(" + atom + "|" + quotedUser + ")";
    var userPat=new RegExp("^" + word + "(\\." + word + ")*$");
    var domainPat=new RegExp("^" + atom + "(\\." + atom + ")*$");
    var matchArray=emailStr.match(emailPat);
    if (matchArray == null) {
        return false;
    }
    var user=matchArray[1];
    var domain=matchArray[2];
    if (user.match(userPat) == null) {
        return false;
    }
    var IPArray = domain.match(ipDomainPat);
    if (IPArray != null) {
        for (var i = 1; i <= 4; i++) {
           if (IPArray[i] > 255) {
              return false;
           }
        }
        return true;
    }
    var domainArray=domain.match(domainPat);
    if (domainArray == null) {
        return false;
    }
    var atomPat=new RegExp(atom,"g");
    var domArr=domain.match(atomPat);
    var len=domArr.length;
    if ((domArr[domArr.length-1].length < 2) ||
        (domArr[domArr.length-1].length > 3)) {
        return false;
    }
    if (len < 2) {
        return false;
    }
    return true;
 }

/**
 * window.console이 브라우저에 기능 없는경우 에러 방지
 */
if (! window.console) {
	window.console = {};
	window.console.debug = function() {};
	window.console.error = function() {};
	window.console.trace = function() {};
	window.console.log   = function() {};
}

/**
 * jQuery명을 단축
 */
var jq = jQuery;

