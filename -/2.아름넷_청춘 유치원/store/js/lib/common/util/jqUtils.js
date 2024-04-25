/**
 * jQuery관련 유틸 클래스
 */
var jqUtils = jqUtils || {};


(function (window, context) {
	
	/**
	 * jQuery alias 
	 */
	//jQuery.noConflict();
	var jq = jQuery;
		
	/**
	 * 이벤트발생후 ajax통신<br/><br/>
	 * 이벤트 발생후 곧바로 ajax통신하는 간단한 방식에 사용.
	 * 
	 * <pre>
	 *     jqUtils.eventAjax('click', '#btn1', {
	 *         url : '/test/ajax/getList.do', (필수)
	 *         init : function(call){ // ajax통신 직전 실행되는 메서드 (옵션)
     *             alert('확인을 누르면 ajax통신 시작.');
     *             call(); // call()을 해야 ajax통신이 시작된다.
     *         },
     *         success : function (res) {
     *             console.debug(res);
     *             alert(JSON.stringify(res));
     *         }, 
     *         error : function (res) {
     *         }
     *     });
     * </pre>
     *   
     * @param {String} eventType - 이벤트이름(click, change...)
     * @param {String} selector - jquery 셀렉터
     * @param {Object} config - ajax 통신을 하기위한 config
	 */
	context.eventAjax = function (eventType, selector,  config) {
		jq(document).on(eventType, selector, function(eventObject){
			if(jq.isFunction(config.init)){
				config.init(function(){
					jqUtils.ajax(config);
				});
			} else {
				jqUtils.ajax(config);
			}
		});
	};

	
	/**
	 * ajax통신<br/><br/>
	 * 기본값들이 설정되어있으므로 필수 설정값만 입력하면 된다.<br/>
	 * ajax통신 실패시에는 자동으로 alert을 띄워준다<br/>
	 * 내부에서 설정되는 default값은 아래와 같다.<br/><br/>
	 * type : 'get',      // (get or post)<br/>
	 * dataType : 'json', // (받고자하는 데이터 타입 json or xml or html)<br/>
	 * async : true       // 통신방식 (true:비동기, false:동기)
	 * 
	 * <pre>
	 *     jqUtils.ajax({
     *         url : '/test/ajax/getHtml.do',
     *         data : 'param1=1&param1=2&param2=abcd',
     *         success : function (res) {
     *             console.debug(res);
     *         }, 
     *         error : function (res) {
     *         }
     *     });
     *     
     *     // mask 씌우기
     *     jqUtils.ajax({
     *         url : '/test/ajax/getHtml.do',
     *         data : 'param1=1&param1=2&param2=abcd',
     *         mask : {
	 *	           autoClose:true, // 자동으로 ajax통신 끝나면 mask 닫기
	 *	           message : '<span style="font-size:15px;">&nbsp;주문 결제중 ...< /span>'
	 *	       },
     *         success : function (res) {
     *             console.debug(res);
     *         }, 
     *         error : function (res) {
     *         }
     *     });
     * </pre>
     * 
     * @param {Object} config - ajax 통신을 하기위한 config
	 */
	context.ajax = function (config) {
		
		// ajax요청하기위한 기본 설정
		var defaultConfig = {
	 	   type: "post", //get, post 방식
	 	   //contentType: 'application/json', // 내가 보내는 data parameter가 어떤 type인지 명시
	 	   //data: 'param1=aaa&param1=bbb', //넘길 파라미터
	 	   dataType: 'json',  // (받고자하는 data type)
           async: true,       // true:비동기, false:동기
           alert: true,
           blockUI : {
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
    		   overlayCSS: { 
    			   opacity: .1
    		   },
    		   loadImage : '/images/loading/ajax-loader1.gif',
    		   message : undefined,
    		   autoClose:true
           }
	 	};
		
		// 개발자가 요청한 config와 기본 ajax를 병합
		jQuery.extend(defaultConfig, config);
		
		// mask가 사용으로 되어있으면 셋팅
		if(jQuery.type(config.mask) === "object") {
			
			try {
				jQuery.extend(defaultConfig.blockUI.css, config.mask.css);
				jQuery.extend(defaultConfig.blockUI.overlayCSS, config.mask.overlayCSS);
				if(config.mask.message) {
					defaultConfig.blockUI.message = config.mask.message;
				}
				if(config.mask.loadImage) {
					defaultConfig.blockUI.loadImage = config.mask.loadImage;
				}
				if(config.mask.autoClose!==undefined) {
					defaultConfig.blockUI.autoClose = config.mask.autoClose;
				}
				
				if(defaultConfig.blockUI.loadImage) {
					defaultConfig.blockUI.message = '<img src="'+ defaultConfig.blockUI.loadImage +'" />' + defaultConfig.mask.message;
				}
				$.blockUI(defaultConfig.blockUI); 
			} catch (e) {
			}
		} else if(config.mask === false) {
			// 아무것도 안한다.
		} else if(config.mask === undefined) {
			// config.mask를 아예 설정하지 않았다면 모든 ajax요청은 화면에 투명 block을 한다.
			try {
				$.blockUI({
					css: { opacity: .0 },
					overlayCSS: { opacity: .0 }
				}); 
			} catch (e) {
			}
		}
		
		defaultConfig.success = function (res) {
			if(defaultConfig.blockUI.autoClose) {
				try {
					$.unblockUI(); // jquery mask(block) 플러그인 해제
				} catch(e) {
				}
			}
			
			// http상태코드가 200이지만 exception이 true라면 이것은 error쪽으로 callback해준다. 
			if(res.exception) {
				try {
					$.unblockUI(); // jquery mask(block) 플러그인 해제
				} catch(e) {
				}
				
				if(defaultConfig.alert) {
					alert(res.message);
				}
				if(jQuery.isFunction(config.error)) {
					config.error(res);
				}
				return false;
			}
			
			if(jQuery.isFunction(config.success)) {
				config.success(res);
			}
		};
		
		// 에러시 alert을 기본적으로 띄워주고 원래 호출했던 지점으로 callback해준다.
		defaultConfig.error = function (res) {
			try {
				$.unblockUI(); // jquery mask(block) 플러그인 해제
			} catch(e) {
			}
			console.error(res);
			if(res.status === 404) {
				if(defaultConfig.alert) {
					alert('페이지를 찾을수 없습니다.');
				}
			} else if (res.status === 0) {
				if(defaultConfig.alert) {
					alert('다시 접속해 주십시오.');
				}
			} else {
				if(defaultConfig.alert) {
					alert('서버에서 장애가 발생했습니다.(webserver)');
				}
			}
//			else if (res.status === 500) {
//				var resParse = jQuery.parseJSON(res.responseText);
//				alert(resParse.message);
//			} 
			if(jQuery.isFunction(config.error)) {
				config.error(res);
			}
		};
		
		// ajax 호출
		jQuery.ajax(defaultConfig);
	};
	
	context.ajaxForm = function (config) {
		var form = config.form;
		if(form === undefined) {
			alert('not config form');
			return false;
		} else if( typeof form === 'string') {
			form = $(form);
		}
		
		// ajax요청하기위한 기본 설정
		var defaultConfig = {
			dataType : 'text',
			
			alert: true,
            blockUI : {
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
    		   overlayCSS: { 
    			   opacity: .1
    		   },
    		   loadImage : '/images/loading/ajax-loader2.gif',
    		   message : undefined,
    		   autoClose:true
            } 
		};
		
		// 개발자가 요청한 config와 기본 ajax를 병합
		jQuery.extend(defaultConfig, config);
		
		defaultConfig.beforeSubmit = function () {
			// 개발자가 셋팅한 beforeSubmit를 먼저 실행
			config.beforeSubmit();
			
			// mask가 사용으로 되어있으면 셋팅
			if(jQuery.type(config.mask) === "object") {
				
				try {
					jQuery.extend(defaultConfig.blockUI.css, config.mask.css);
					jQuery.extend(defaultConfig.blockUI.overlayCSS, config.mask.overlayCSS);
					if(config.mask.message) {
						defaultConfig.blockUI.message = config.mask.message;
					}
					if(config.mask.loadImage) {
						defaultConfig.blockUI.loadImage = config.mask.loadImage;
					}
					if(config.mask.autoClose!==undefined) {
						defaultConfig.blockUI.autoClose = config.mask.autoClose;
					}
					
					if(defaultConfig.blockUI.loadImage) {
						defaultConfig.blockUI.message = '<img src="'+ defaultConfig.blockUI.loadImage +'" />' + defaultConfig.mask.message;
					}
					$.blockUI(defaultConfig.blockUI); 
				} catch(e) {
				}
			} else if(config.mask === false) {
				// 아무것도 안한다.
			} else if(config.mask === undefined) {
				// config.mask를 아예 설정하지 않았다면 모든 ajax요청은 화면에 투명 block을 한다.
				try {
					$.blockUI({
						css: { opacity: .0 },
						overlayCSS: { opacity: .0 }
					}); 
				} catch(e) {
				}
			}
			
		};
		
		defaultConfig.success = function (res) {
			if(defaultConfig.dataType ==='text'){
				res = $.parseJSON(res);
			}
			
			if(defaultConfig.blockUI.autoClose) {
				try {
					$.unblockUI(); // jquery mask(block) 플러그인 해제
				} catch(e) {
				}
			}
			
			// http상태코드가 200이지만 exception이 true라면 이것은 error쪽으로 callback해준다. 
			if(res.exception) {
				try {
					$.unblockUI(); // jquery mask(block) 플러그인 해제
				} catch(e) {
				}
				if(defaultConfig.alert) {
					alert(res.message);
				}
				if(jQuery.isFunction(config.error)) {
					config.error(res);
				}
				return false;
			}
			
			if(jQuery.isFunction(config.success)) {
				config.success(res);
			}
		};
		
		defaultConfig.error = function (res) {
//			if(defaultConfig.dataType ==='text'){
//				res = $.parseJSON(res);
//			}
			
			try {
				$.unblockUI(); // jquery mask(block) 플러그인 해제
			} catch(e) {
			}
			console.error(res);
			if(res.status === 404) {
				if(defaultConfig.alert) {
					alert('페이지를 찾을수 없습니다.');
				}
			} else if (res.status === 0) {
				if(defaultConfig.alert) {
					alert('다시 접속해 주십시오.');
				}
//			} else if (res.status === 500) {
//				var resParse = jQuery.parseJSON(res.responseText);
//				if(defaultConfig.alert) {
//					alert(resParse.message);
//				}
			} else {
				if(defaultConfig.alert) {
					alert('서버에서 장애가 발생했습니다.(webserver)');
				}
			}
			
			if(jQuery.isFunction(config.error)) {
				config.error(res);
			}
		};
		
		form.ajaxForm(defaultConfig);
	};
	
	/**
	 * ajax통신2<br/><br/>
	 * jqUtils.ajax메서드와 비슷하지만 config객체를 파라미터로 받는게 아니라<br/>
	 * 하나하나 argument를 넘기게 되어있다.
	 * 
	 * <pre>
	 *     jqUtils.ajax2(
     *         '/test/ajax/getHtml.do',
     *         null,
     *         function (res) {
     *             console.debug(res);
     *         }, 
     *         function (res) {
     *         }
     *     );
     * </pre>
     * 
     * @param {String} url - 요청 URL
     * @param {String} data - 파라미터 (예 : 'param1=1&param1=2&param2=abcd')
     * @param {Function} success - 성공시 콜백함수
     * @param {Function} error - 실패시 콜백함수
     * @param {String} type - 요청방식(get, post)
     * @param {String} dataType - 받고자하는 데이터 타입(json, xml, html)
     * @param {Boolean} async - 통신방식 (true:비동기, false:동기)
	 */
	context.ajax2 = function (url, data, success, error, type, dataType, async) {
		var config = {
			url : url
		};
		
		if(data) {
			config.data = data;
		}
		if(jq.isFunction(success)) {
			config.success = success;
		}
		if(jq.isFunction(error)) {
			config.error = error;
		}
		if(type) {
			config.type = type;
		}
		if(dataType) {
			config.dataType = dataType;
		}
		if(async) {
			config.async = async;
		}

		context.ajax(config);
	},
	
	/**
	 * 이벤트 등록<br/><br/>
	 * 
	 * jquery버전업이 되면서 여러가지 방식의 이벤트 등록법이 생겼고<br/>
	 * 몇가지 방법은 deprecated되거나 완전 제거가 되었다<br/>
	 * 이런 여러가지 이벤트 등록방법을 하나로 통일하고<br/>
	 * 추후 더 좋은 방법의 이벤트 등록법이 생겨난다면<br/>
	 * 쉽게 일괄적용을 하기위해 이 메서드를 만들었다.<br/>
	 * $(document).ready... 가 안되어있어도 동작 한다.
	 * 
	 * <pre>
	 *     jqUtils.event('click', '#btn3', function(eventObject){
	 *     
	 *     });
	 * </pre>
	 * 
     * @param {String} eventType - 이벤트이름(click, change...)
     * @param {String} selector - jquery 셀렉터
     * @param {Function} callback - 이벤트가 발생했을때의 콜백 함수 
	 */
	context.event = function (eventType, selector, callback) {
		jq(document).on(eventType, selector, function(eventObject){
			if(jq.isFunction(callback)){
				callback(eventObject);
			}
		});
	};
	
	context.load = function (selector, url, param, callback) {
		// ajax요청하기위한 기본 설정
		
		var config = {
		   url : url,
	 	   type: "post", //get, post 방식
	 	   //contentType: 'application/json', // 내가 보내는 data parameter가 어떤 type인지 명시
	 	   data: param, //넘길 파라미터
	 	   dataType: 'html',  // (받고자하는 data type)
           async: true,       // true:비동기, false:동기
           success : function (res) {
				$(selector).html(res);
				if(jq.isFunction(callback)){
					callback({"success":true, "message":"성공"});
				}
           },
           error : function (res) { // null pointer와 같은 예외시 이곳으로 callback
				var resObj = jQuery.parseJSON(res);
				if( ! resObj.success) {
					alert(resObj.message);
					console.error(resObj.message);
				}
				if(jq.isFunction(callback)){
					callback(resObj);
				}
           }
	 	};
		
		context.ajax(config);
		
	};
	
})(window, jqUtils);