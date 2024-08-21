/*******************************************************************************
 *  ui.extention.js
 *  @Author : 박순길
 *  @Description	: UI 처리를 위한 Extention 모음
 ******************************************************************************/

// Dom Cache for Browser Performance
if(typeof($html) == 'undefined') var $html = $($('html')[0]);
if(typeof($window) == 'undefined') var $window = $($(window)[0]);
if(typeof($document) == 'undefined') var $document = $($(document.body)[0]);
if(typeof($aside) == 'undefined') var $aside = $($('div.aside')[0]);
if(typeof($body) == 'undefined') var $body = $($('#body')[0]);
if(typeof(_bodyClass) == 'undefined') var _bodyClass = $('body').eq(0).attr('class');

// Console-polyfill. MIT license. Make it safe to do console.log() always.
(function(con){ var method; var dummy = function() {}; var methods = ('assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn,memory').split(','); while (method = methods.pop()) { con[method] = con[method] || dummy; } })(window.console = window.console || {});

// $.browser.mobile, http://detectmobilebrowser.com
(function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);

(function($) {

	$.extend($.expr[':'],{

		block: function(el, i, m) { // $('div:block');
			return $(el).css('display') === 'block';
		},

        css: function(el, i, m) { // $('div:css(display, inline-block)');
            var _key = m[3];
            if(!_key) return false;
            _key = _key.replace(" ", "").split(',');
            return $(el).css(_key[0]) === _key[1];
        },

		width: function(el, i, m) { // $('div:width(>200)'); $('div:width(<300):width(>100)');
            var $this = $(el), _key = m[3];
			if(!_key||!(/^(<|>)\d+$/).test(_key)) return false;
			return _key.substr(0,1) === '>' ? $this.width() > _key.substr(1) : $this.width() < _key.substr(1);
		},

		data: function(el, i, m) { // $('div:data(map)');
			var $el = $(el), element = $el.get(0), _key;
			if(!m[3]) {
				for (var x in element) { if((/jQuery\d+/).test(x)) { return true; } }
			} else {
				_key = m[3].split('=');
				if (_key[1]) {
					if((/^\/.+\/([mig]+)?$/).test(_key[1])) {
						return (new RegExp(
							_key[1].substr(1,_key[1].lastIndexOf('/')-1),
							_key[1].substr(_key[1].lastIndexOf('/')+1))
						).test($el.data(_key[0]));
					} else {
						return $el.data(_key[0]) == _key[1];
					}
				} else {
					if($el.data(_key[0])) {
						return true;
					} else {
						$el.removeData(_key[0]);
						return false;
					}
				}
			}
			return false;
		},

        inView: function(el) { // $('div:inView');
            var $el = $(el), _jqWinHeight = $(window).height();
            var _scrollTop = (document.documentElement.scrollTop || document.body.scrollTop),
                _offsetTop = $el.offset().top,
                _winHeight = (window.innerHeight && window.innerHeight < _jqWinHeight) ? window.innerHeight : _jqWinHeight;
            return _offsetTop > _scrollTop && ($el.height() + _offsetTop) < (_scrollTop + _winHeight);
        }
	});

	// jQuery('div').eachQ(function(i){ this.attr('id', 'd' + i).css('color', 'red'); });
	$.fn.eachQ = (function(){
		var jq = $([1]);
		return function(c) {
			var i = -1, el, len = this.length;
			try {
				while (
					++i < len &&
					(el = jq[0] = this[i]) &&
					c.call(jq, i, el) !== false
				);
			} catch(e){
				delete jq[0];
				throw e;
			}
			delete jq[0];
			return this;
		};
	}());

	// img.imgToggle(); img.imgToggle({ oldSrc: '_off', newSrc: '_on' });
	$.fn.imgToggle = function(settings) {
		var config = { oldSrc : '_off', newSrc : '_on' };
		if (settings) $.extend(config, settings);
		$.each(this, function(){
			var $this = $(this);
			var $src = $this.attr('src');
			if($src) $this.attr('src', $src.replace(config.oldSrc, config.newSrc));
		});
	};

	// $('img[src*="_off"]').imgHover(); img.imgHover({ oldSrc: '_off', newSrc: '_on' });
	$.fn.imgHover = function(settings) {
		var config = { oldSrc : '_off', newSrc : '_on' };
		if (settings) $.extend(config, settings);
			$.eachQ(this, function(){
				var $this = $(this);
				$this.on('mouseenter',function() {
					var $src = $this.attr('src');
					if ($src && $src.match(config.oldSrc)) {
					$this.attr('src', $src.replace(config.oldSrc, config.newSrc)).on('mouseleave',function() {
						$this.attr('src', $src.replace(config.newSrc, config.oldSrc));
					});
				}
			});
		});
	};

	$.fn.extend({

		dataVal: function(el, _default){ // 커스텀 데이터 값 얻기, 없을 땐 두번째 값으로 리턴 var a = dataVal('fx','fadeIn') || var a = ( $this.data('item') ) ? $this.data('item') : 1
			var _value = this.data(el);
			if (_value === undefined) _value = _default;
			return _value;
		},

        active: function() {
			return this.addClass('active');
        },

        deactive: function() {
            return this.removeClass('active');
        },

		clicked: function() {
			return this.bind('click', function() {
				$(this).addClass('clicked');
			});
		},

		unclicked: function() {
			return this.removeClass('clicked').unbind('click');
		},

		oneClick: function() {
			return this.bind('click', function() {
				$(this).addClass('clicked').attr('disabled','true');
			}).removeClass('clicked').removeAttr('disabled');
		},

		hideAria: function() { // aria hidden true
			return this.attr('hidden','hidden').attr('aria-hidden','true');
		},

		showAria: function() { // aria hidden false
			return this.removeAttr('hidden').attr('aria-hidden','false');
		},

		jsNthChild: function() { // nth-child polyfills.
			$(this).eachQ(function(){
				var $this = $(this),
					$node;
				var _child = $this.dataVal('child','5n+1'),
					_tree = $this.dataVal('tree','children'),
					_className = $this.dataVal('className','first-child'),
					_tagName = $this.get(0).tagName.toLowerCase();
				if (_tagName == 'ul') _tagName = 'li';
				if (_tagName == 'table') _tagName = 'tr';
				if (_tree !== 'find'){
					$node = $this.children(_tagName +':nth-child('+_child+')');
				} else {
					$node = $this.find(_tagName +':nth-child('+_child+')');
				}
				$node.addClass('first-child');
			});
		},

		jsGridPaper: function(){ // 빈 셀 채우기
			$(this).eachQ(function(){
				var $this = $(this),
					$li = $this.children('li');
				var _total = $li.length;
				if(!$this.data('child')) return false;
				var _col = $this.data('child').toString().substring(0,1),
					_row = Math.ceil(_total/_col),
					_empty  = (_row * _col) - _total;
				var i = 0;
				for (i; i < _empty; i++) $this.append('<li class="empty" aria-hidden="true">&nbsp;</li>');
			});
		},
		
		jsRowSpan: function() { // td[rowspan] polyfills.
			$(this).eachQ(function(){
				var $this = $(this);
				$this.find('td[rowspan]').addClass('rowspan');
			});
		},

		center: function(_position){ // 화면 중앙에 위치 시키기
			var $this = $(this);
			var _marginTop = Math.abs((($window.height() - $this.outerHeight()) / 2)),
				_marginLeft = Math.abs((($window.width() - $this.outerWidth()) / 2));

			$this.css('visibility','visible');

			if (_position == 'fixed') {
				$this.css({
					'position': 'fixed',
					'top': _marginTop - 50,
					'left': _marginLeft,
					'opacity': 0
				}).animate({
					'top': _marginTop,
					'opacity': 1
				});
			} else {
				$this.css({
					'position': 'absolute',
					'top': _marginTop + $window.scrollTop() - 50,
					'left': _marginLeft,
					'opacity': 0
				}).animate({
					'top': _marginTop + $window.scrollTop(),
					'opacity': 1
				});
			}

			$this.attr('tabindex', 0).show().focus();

		}, // center

		jsAutocomplete: function(){ // 자동완성
			$(this).eachQ(function () {
				var $field = $(this),
					$select = $field.siblings('ul').eq(0),
					$option = $select.find('li');
			
				var _width = $field.outerWidth(),
					_total = $option.length,
					_index = 0,
					_isFirstFocus = true,
					_activeField = false,
					_activeOption = false;
			
				var len = $option.length,
					i = 0;
				for (i; i < len; i++) {
					e = $option[i];
					var _text = $(e).text();
					$(e).empty().html('<a href="javascript:;">' + _text + '</a>');
				}
				$field.on({
					keypress: function () {
						_isFirstFocus = true;
						checkcheck();
					},
					focusin: function () {
						_activeField = true;
						checkcheck();
					},
					focusout: function () {
						_activeField = false;
						setTimeout(function () {
							checkcheck();
						}, 300);
					}
				});
				$field.siblings('input').on('focus', function(){
					_isFirstFocus = true;
					_activeField = false;
					_activeOption = false;
				});
				$option.children('a').on({
					focusin: function () {
						_activeOption = true;
						checkcheck();
					},
					focusout: function () {
						_activeOption = false;
						setTimeout(function () {
							checkcheck();
						}, 300);
					}
				});
				$option.children('a').on({
					click: function (e) {
						e.preventDefault();
						$field.val($(this).text());
						_isFirstFocus = false;
						_activeField = false;
						_activeOption = false;
						checkcheck();
						$field.focus();
					}
				});		
				$(document).on('keydown', function (e) {
					if (_activeOption === true) { // 옵션에 포커스
						if (e.keyCode == 40 || e.keyCode == 9) {
							e.preventDefault();
							_index++;
						} else if (e.keyCode == 38) {
							e.preventDefault();
							_index--;
						}
						if ($option.eq(_index).length > 0 && _index > -1) {
							$option.eq(_index).children('a').focus();
						} else {
							_activeOption = false;
							_isFirstFocus = false;
							hideFulldown();
							$field.focus();
							_index = 0;
						}
					} else if (_activeField === true && _activeOption === false) { // 필드에 포커스
						if (e.keyCode == 40) {
							e.preventDefault();
							_activeOption = true;
							$option.eq(0).find('a').focus();
						}
					}
				});
				var checkcheck = function () {
					if (_activeField === true && _isFirstFocus === true) {
						showFulldown();
					} else if (_activeField === false && _activeOption === false) {
						setTimeout(function () {
							hideFulldown();
						}, 300);
					}
				};
				var showFulldown = function () {
					_index = 0;
					var _left = $field.offset().left,
						_top = $field.offset().top + $field.outerHeight();
					$select.addClass('js-autocomplete').css({
						'min-width': _width,
						'top': _top,
						'left': _left
					}).showAria().fadeIn('fast');
				};
				var hideFulldown = function () {
					if (_activeOption === false) {
						$select.hideAria().fadeOut('fast');
					}
				};
			});
		},

		jsSpinner: function(){ // Spinner 만들기

			$(this).attr('autocomplete','off').eachQ(function(){

				var _strMinus = '<a href="javascript:;" class="ir spinner minus"><em>값 줄이기</em></a>',
					_strPlus = '<a href="javascript:;" class="ir spinner plus"><em>값 늘이기</em></a>';

				var $this = $(this),
					$btnMinus = $this.siblings('.minus'),
					$btnPlus = $this.siblings('.plus');

				var _min = parseFloat($this.attr('min')),
					_max = parseFloat($this.attr('max')),
					_disabledClass = 'spinner-disabled';

				if(!$btnMinus.length){ $btnMinus = $(_strMinus); $this.before($btnMinus); }
				if(!$btnPlus.length){ $btnPlus = $(_strPlus); $this.after($btnPlus); }

				$this.on('blur', function(e){
					var _val = $this.val();

					$this.siblings('a.spinner').removeClass(_disabledClass);

					if(_val >= _max) {
						$btnPlus.addClass(_disabledClass);
					} else if(_val <= _min) {
						$btnMinus.addClass(_disabledClass);
					}

//					if(_val > _max){
//						alert('최고치 '+ _max +' 을(를) 초과했습니다.');
//						$this.val(_max);
//						setTimeout(function(){ $this.focus(); }, 100);
//					} else if(_val < _min){
//						alert('최저치 '+ _min +' 을(를) 초과했습니다.');
//						$this.val(_min);
//						setTimeout(function(){ $this.focus(); }, 100);
//					}

				});

				$btnMinus.on('click', function(e){
					e.preventDefault();
					_result = parseFloat($this.val())-1;
					if (_result >= _min) $this.val(_result);
					$this.trigger('blur');
				});

				$btnPlus.on('click', function(e){
					e.preventDefault();
					_result = parseFloat($this.val())+1;
					if (_result <= _max) $this.val(_result);
					$this.trigger('blur');
				});

				$this.trigger('blur');

			});

		}, // jsSpinner

		jsCarousel: function(){ // 회전목마

			$(this).eachQ(function(){

				var $this = $(this),
					$wrapper = $this.find('.carousel-wrapper').eq(0),
					$carousel = $this.find('.carousel').eq(0),
					$li = $carousel.children('.article'),
					$nav = $($this.dataVal('nav',null));

				var _item = $this.dataVal('item','1'), // 출력할 아이템 갯수
					_title = $this.dataVal('title',''),
					_direction = $this.dataVal('direction','left'),
					_pagerPosition = $this.dataVal('pager-position','down'), // 페이저 위치
					_fx = $this.dataVal('fx','uncover-fade'), // fx 효과, uncover-fade, crossfade 등
					_length = $li.length,
					_totalPage = Math.ceil(_length/_item),
					_width = $li.eq(0).innerWidth(),
					_height = $li.eq(0).innerHeight();

				var _isHover = false,
					_isPlaying = true,
					_divX = 1, // 방향계산 나눗셈 적용 키
					_divY = 1;

				var $pager = $('<div class="carousel-pager"><div class="core"><span class="pager"><strong>1</strong>&nbsp;/&nbsp;'+ _totalPage +'<span class="semantic">&nbsp;번 슬라이드</span></span><span class="nav"><a href="javascript:;" class="ir ico-prev prev"><em>'+ _title  +' 슬라이드 이전</em></a><a href="javascript:;" class="ir ico-play play"><em>'+ _title  +' 슬라이드 멈춤</em></a><a href="javascript:;" class="ir ico-next next"><em>'+ _title  +' 슬라이드 다음</em></a></span></div></div>'),
					$playBtn = $pager.find('a.play').eq(0),
					$progressbar = $('<div class="progressbar"><span class="core"></span></div>');

				// if( _direction == 'up'){ _divY = _item; } else { _divX = _item; } // 크기 재구성
				// $li.width(parseFloat(_width / _divX));
				// $li.height(parseFloat(_height /_divY));

				if($this.data('paginate') !== false){
					var _isPaginate = true;
					var $paginate = $('<div class="core"></div>');
					var l = 0;
					for (l; l < _totalPage; l++) {
						$paginate.append('<a href="javascript:;" data-order='+l+'><span class="left"></span><span class="right"></span><span class="semantic">'+ (l+1) +'번 슬라이드</span></a>');
					}
					var $paginateAnchor = $paginate.find('a');
					$paginateAnchor.eq(0).active().addClass('first-child').append('<em class="semantic current">&nbsp;-&nbsp;현재 위치</em>');
				}

				$carousel.carouFredSel({
					items		: _item,
					direction   : _direction,
					onCreate	: function(data){

						// carousel 크기 재설정
						if (_fx == 'uncover-fade') {
							$carousel.width(_width).height(_height);
						} else {
							$carousel.width(_width).height(_height);
						}

						$progressbar.appendTo($wrapper);

						if(_pagerPosition == 'up'){
							$pager.insertBefore($wrapper);
						} else {
							$pager.insertAfter($wrapper);
						}

                        $pager.find('a.prev').eq(0).on('click', function(e) { e.preventDefault(); $carousel.trigger('prevPage'); }); // 이전 다음 재생 버튼
                        $pager.find('a.next').eq(0).on('click', function(e) { e.preventDefault(); $carousel.trigger('nextPage'); });
                        $pager.find('a.play').eq(0).on('click', function(e) {
							e.preventDefault();
							if(_isPlaying === true){
								$carousel.trigger('pause');
								$(this).addClass('pause');
								$playBtn.html('<em>재생</em>');
								_isPlaying = false;
							} else {
								$carousel.trigger('resume');
								$(this).removeClass('pause');
								$playBtn.html('<em>멈춤</em>');
								_isPlaying = true;
							}
						});
						if($this.data('pause') !== true) { $pager.find('a.play').eq(0).hide(); }
						if($this.data('pager') !== true) { $pager.find('span.pager').eq(0).hide(); }
						if($this.data('autoplay') === false) {
							$pager.find('a.play').eq(0).trigger('click','auto'); // 자동실행멈춤
							$pager.find('a.play').remove();
						}
						if(_isPaginate === true){
							$paginate.insertAfter($wrapper).wrap('<div class="carousel-paginate"></div>');
							$paginateAnchor.on('click', function(e){ e.preventDefault(); $carousel.trigger('slideToPage', $(this).data('order')); });
						}
						if($nav.length > 0){
							$nav.find('a').on('click', function(e){ e.preventDefault();
							var temp = $(this).parent().index();
							$carousel.trigger('slideToPage', temp);
							});
						}
						if($this.data('progressbar') !== true) $progressbar.eq(0).hide();

						$carousel.on('focusin mouseenter', function(){
							$carousel.trigger('pause');
							_isHover = true;
						}).on('focusout mouseleave', function(){
							_isHover = false;
							if(_isPlaying === true) $carousel.trigger('resume');
						});

					},
					scroll		: {
						fx				: _fx, // none, crossfade, uncover-fade
						easing			: 'easeInOutQuart',
						duration		: 300,
						timeoutDuration	: 4000,
						onBefore		: function(data) {
							$(this).trigger("currentPage", function(page) {
								$pager.find('span.pager').eq(0).html('<strong>' + (page+1) + '</strong>&nbsp;/&nbsp;' + _totalPage +'<span class="semantic">&nbsp;번 슬라이드</span>');
								if(_isPaginate === true){
									var $currentAnchor = $paginateAnchor.eq(page);
									$currentAnchor.active().find('span.left').eq(0).animate({ width: 20 }).parent().append('<em class="semantic current">&nbsp;-&nbsp;현재 위치</em>');
									$currentAnchor.siblings().deactive().find('span.left').animate({ width: 5 });
									$paginateAnchor.find('em.current').remove();
								}
								if($nav.length > 0){
									var temp = page;
									$nav.find('li').eq(temp).addClass('active').siblings().removeClass('active');
									$nav.find('.current').remove();
									$nav.find('li:eq('+temp+') a').append('<span class="semantic current">&nbsp;-&nbsp;현재 위치</span>');
								}
							});
						}
					},
					auto		: {
						progress	: {
							bar		: $progressbar.find('span.core').eq(0),
							updater	: function(percentage) { $(this).width(percentage+'%'); }
						}
					},
					// auto		: false,
					circular	: true,
					cookie		: false
				}, {
					wrapper	: { classname : 'carousel-inner' }
				});

			});

		}, // jsCarousel

		jsCarousel2: function(){ // 회전목마

			$(this).eachQ(function(){

				var $this = $(this),
					$wrapper = $this.find('.carousel-wrapper').eq(0),
					$carousel = $this.find('.carousel ul').eq(0),
					$li = $carousel.find('li'),
					$nav = $($this.dataVal('nav',null));

				var _item = $this.dataVal('item','1'), // 출력할 아이템 갯수
					_title = $this.dataVal('title',''),
					_direction = $this.dataVal('direction','left'),
					_pagerPosition = $this.dataVal('pager-position','down'), // 페이저 위치
					_fx = $this.dataVal('fx','uncover-fade'), // fx 효과, uncover-fade, crossfade 등
					_length = $li.length,
					_totalPage = Math.ceil(_length/_item),
					_width = $wrapper.innerWidth,
					_height = $li.eq(0).parent().innerHeight();
			
				var _isHover = false,
					_isPlaying = true,
					_divX = 1, // 방향계산 나눗셈 적용 키
					_divY = 1;

				var $pager = $('<div class="carousel-pager"><div class="core"><span class="pager"><strong>1</strong>&nbsp;/&nbsp;'+ _totalPage +'<span class="semantic">&nbsp;번 슬라이드</span></span><span class="nav"><a href="javascript:;" class="ir ico-prev prev"><em>'+ _title  +' 슬라이드 이전</em></a><a href="#pause" class="play"><span>'+ _title  +' 슬라이드 멈춤</span></a><a href="javascript:;" class="ir ico-next next"><em>'+ _title  +' 슬라이드 다음 </em></a></span></div></div>'),
					$playBtn = $pager.find('a.play').eq(0),
					$progressbar = $('<div class="progressbar"><span class="core"></span></div>');

				if( _direction == 'up'){ _divY = _item; } else { _divX = _item; } // 크기 재구성
				$li.width(parseFloat(_width / _divX));
				// $li.height(parseFloat(_height /_divY));

				if($this.data('paginate') !== false){
					var _isPaginate = true;
					var $paginate = $('<div class="core"></div>');
					var l = 0;
					for (l; l < _totalPage; l++) {
						$paginate.append('<a href="javascript:;" data-order='+l+'><span class="left"></span><span class="right"></span><span class="semantic">'+ (l+1) +'번 슬라이드</span></a>');
					}
					var $paginateAnchor = $paginate.find('a');
					$paginateAnchor.eq(0).active().addClass('first-child').append('<em class="semantic current">&nbsp;-&nbsp;현재 위치</em>');
				}

				$carousel.carouFredSel({
					items		: _item,
					direction   : _direction,
					onCreate	: function(data){

						// carousel 크기 재설정
						if (_fx == 'uncover-fade') {
							// $carousel.width(_width).height(_height);
						} else {
							// $carousel.width(_width).height(_height);
						}

						$progressbar.appendTo($wrapper);

						if(_pagerPosition == 'up'){
							$pager.insertBefore($wrapper);
						} else {
							$pager.insertAfter($wrapper);
						}

                        $pager.find('a.prev').eq(0).on('click', function(e) { e.preventDefault(); $carousel.trigger('prevPage'); }); // 이전 다음 재생 버튼
                        $pager.find('a.next').eq(0).on('click', function(e) { e.preventDefault(); $carousel.trigger('nextPage'); });
                        $pager.find('a.play').eq(0).on('click', function(e) {
							e.preventDefault();
							if(_isPlaying === true){
								$carousel.trigger('pause');
								$playBtn.html('<span>재생</span>');
								_isPlaying = false;
							} else {
								$carousel.trigger('resume');
								$playBtn.html('<span>멈춤</span>');
								_isPlaying = true;
							}
						});
						if($this.data('pause') !== true) { $pager.find('a.play').eq(0).hide(); }
						if($this.data('pager') !== true) { $pager.find('span.pager').eq(0).hide(); }
						if($this.data('autoplay') === false) {
							$pager.find('a.play').eq(0).trigger('click','auto'); // 자동실행멈춤
							$pager.find('a.play').eq(0).remove();
						}
						if(_isPaginate === true){
							$paginate.insertAfter($wrapper).wrap('<div class="carousel-paginate"></div>');
							$paginateAnchor.on('click', function(e){ e.preventDefault(); $carousel.trigger('slideToPage', $(this).data('order')); });
						}
						if($nav.length > 0){
							$nav.find('a').on('click', function(e){ e.preventDefault(); $carousel.trigger('slideToPage', $(this).parent().index()); });
						}
						if($this.data('progressbar') !== true) $progressbar.eq(0).hide();

						$carousel.on('focusin mouseenter', function(){
							$carousel.trigger('pause');
							_isHover = true;
						}).on('focusout mouseleave', function(){
							_isHover = false;
							if(_isPlaying === true) $carousel.trigger('resume');
						});

					},
					scroll		: {
						fx				: _fx, // none, crossfade, uncover-fade
						easing			: 'easeInOutQuart',
						duration		: 300,
						timeoutDuration	: 4000,
						onBefore		: function(data) {
							$(this).trigger("currentPage", function(page) {
								$pager.find('span.pager').eq(0).html('<strong>' + (page+1) + '</strong>&nbsp;/&nbsp;' + _totalPage +'<span class="semantic">&nbsp;번 슬라이드</span>');
								if(_isPaginate === true){
									var $currentAnchor = $paginateAnchor.eq(page);
									$currentAnchor.active().find('span.left').eq(0).animate({ width: 20 }).parent().append('<em class="semantic current">&nbsp;-&nbsp;현재 위치</em>');
									$currentAnchor.siblings().deactive().find('span.left').animate({ width: 5 });
									$paginateAnchor.find('em.current').remove();
								}
								if($nav.length > 0){
									$nav.find('li').eq(page).addClass('active').siblings().removeClass('active');
									$nav.find('.semantic').remove();
									$nav.find('li:eq('+page+') a').append('<span class="semantic">&nbsp;-&nbsp;현재 위치</span>');
								}
							});
						}
					},
					auto		: {
						progress	: {
							bar		: $progressbar.find('span.core').eq(0),
							updater	: function(percentage) { $(this).width(percentage+'%'); }
						}
					},
					// auto		: false,
					circular	: true,
					cookie		: false
				}, {
					wrapper	: { classname : 'carousel-inner' }
				});

			});

		}, // jsCarousel


		jsTab: function(){ // 탭

			$(this).eachQ(function(){ // tab 생성

				var $this = $(this),
					$tab = $this.find('a.tab'),
					$contents = $this.find('.contents');

				var _fx = $this.dataVal('fx','fadeIn'),
					_more = $this.dataVal('more',false),
					_length = $this.find('ul').eq(0).children('li').length,
					_margin = 0;

				if(_more === true){ // more 버튼
					$tab.eachQ(function(){
						var $this = $(this);
						var _moreBtn = '<a href="'+ $this.attr('rel') +'" class="more"><span class="semantic">'+ $this.text()+'&nbsp;</span><span>더 보기</span></a>';
						$this.parents('li').eq(0).append($(_moreBtn));
					});
				}

				if($this.data('fluid') !== false){ // 꽉찬 탭
					var _wrapWidth = $this.width(),
						_width = parseInt(_wrapWidth/_length, 10); // 개별 너비

					_margin = _wrapWidth-(_width*_length); // 여분 마진

					var len = $tab.length, i = 0;
					for (i; i < len; i++) {
						e = $tab[i];
						if(i === 0){ // 첫번째
							$(e).width(_width+_margin);
						} else { // 그외
							$(e).width(_width);
							$(e).css('left', (_width * i)+_margin);
						}
					}
				} else { // 꽉차지 않은 탭
					var len2 = $tab.length, k = 0;
					for (k; k < len2; k++) {
						e = $tab[k];
						$(e).css('left', _margin);
						_margin = _margin + $(e).innerWidth();
					}
				}

				$contents.css('paddingTop', $tab.eq(0).outerHeight());

				$tab.on('click focusin', function(e){ // 이벤트 핸들링
					e.preventDefault();
					// e.stopPropagation();
					var $currentTab = $(this),
						$currentContents = $currentTab.parent().next();
					$currentTab.parents('li').eq(0).active().siblings().deactive().find('.contents').hide();
					$tab.find('span.current').remove();
					$currentTab.append('<span class="semantic current">&nbsp;-&nbsp;현재 위치</span>');
					if(_fx=='slideDown'){
						$currentContents.slideDown();
					} else {
						$currentContents.show();
					}
					if(_more===true){ // 더 보기
						$tab.parents('li').eq(0).find('a.more').hide();
						$currentContents.next().show();
					}
				}).eq(0).trigger('click','auto');
			});

		}, // jsTab

		jsTabOnBefore: function(){ // jsTabOnBefore
			var $semantic = '<span class="semantic current">&nbsp;-&nbsp;현재 위치</span>';
			$(this).eachQ(function(){
				var $wrapper = $(this);
				$wrapper.find('li.active a span').append($semantic);
				$wrapper.find('a').on('click', function(e){
					$wrapper.find('span.current').remove();
					$(this).parent('li').addClass('active').siblings().removeClass('active');
					$(this).find('span').append($semantic);
					initTitle();
				});
			});
		}, // jsTabOnBefore

		jsTabContents: function(){ // 컨텐츠형 탭

			$(this).eachQ(function(idx){

				var $this = $(this);

				var $wrapper = $(this).find('ul.core').eq(0),
					$tab = $wrapper.find('a.tab'),
					$li = $wrapper.find('li'),
					$contents = $wrapper.find('.contents');

				var _height = 0,
					_isHover = false,
					_isPlay = true,
					_isAutoplay = $(this).dataVal('autoplay', false);

				$tab.eachQ(function(){
					$(this).css('top',_height);
					_height += $(this).outerHeight();
				});

				$wrapper.height(_height).on('focusin mouseenter', function(){
					_isHover = true;
				}).on('focusout mouseleave', function(){
					_isHover = false;
				});

				$tab.on('click focusin', function(e){
					e.preventDefault();
					var $this = $(this);
					$tab.find('span.current').remove();
					$this.parents('li').active().find('a').eq(0).append('<span class="semantic current">&nbsp;-&nbsp;현재 위치</span>');
					$this.parents('li').find('div:eq(0)').fadeIn('fast');
					$this.parents('li').siblings().deactive().find('.contents').hide();
				}).eq(0).trigger('click','auto');

				if(_isAutoplay){
					var $playBtn = $('<a href="javascript:;" class=ir "pause"><em>멈춤</em></a>');
					$playBtn.insertBefore($wrapper).wrap('<div class="contents-pager" />');
					$playBtn.on('click', function(e){
						if(_isPlay === true){
							_isPlay = false;
							$playBtn.find('span').eq(0).text('재생');
						} else {
							_isPlay = true;
							$playBtn.find('span').eq(0).text('멈춤');
						}
					});
					var tabTimer = setTimeout(function tabAutoplay() {
                        var $currentLi = $wrapper.find('li.active').eq(0);
                        if($li.length-1 == $currentLi.index() && _isHover !== true && _isPlay === true){
                            $li.eq(0).find('a').eq(0).trigger('click','auto');
						} else if (_isHover !== true && _isPlay === true) {
                            $currentLi.next().find('a').eq(0).trigger('click','auto');
						}
                        setTimeout(tabAutoplay, 2000);
					}, 2000);
				}
			});

		}, // jsTabContents

		jsCollapse: function(){ // 토글 목록

			$(this).eachQ(function(){ // collapse 생성

				var $wrapper = $(this),
					$li = $wrapper.find('ul').eq(0).children('li'),
					$tab = $li.find('a.tab');
				var _toggle = $wrapper.dataVal('toggle',false);
					_isFirst = true;

				$tab.on('click', function(e){ // collapse tab 생성
					e.preventDefault();
					var $currentTab = $(this);
					var $currentDiv = $currentTab.parents('li').find('div').eq(0);
					if($currentDiv.is(':animated')) return false; // 이벤트 중첩 방지
					$tab.parents('li').deactive();
					$tab.find('span.current').remove();
					$currentTab.parents('li').siblings().children('div').slideUp();
					if(_toggle === true){
						if($currentDiv.is(':hidden') || _isFirst === true ){
							$currentDiv.slideDown().parent().active();
							$currentTab.append('<span class="semantic current">&nbsp;-&nbsp;현재 위치</span>');
						} else {
							$current.slideUp();
						}
					} else {
						$currentDiv.slideDown().parent().active();
						$currentTab.append('<span class="semantic current">&nbsp;-&nbsp;현재 위치</span>');
					}
					_isFirst = false;
				}).eq(0).trigger('click','auto');

				$tab.on('focusin', function(){
					if($(this).parents('li').find('div').eq(0).is(':hidden')) $(this).trigger('click','auto');
				});

			});

		}, // jsCollapse

		jsJumpmenuToggle: function(){ // 레이어 팝업
			$(this).eachQ(function(){
				var $this = $(this);
				var $button = $this.siblings('.button');
				$button.hide();
				$this.on('focus', function(){
					$button.hide();
					$this.next().css('display','inline-block');
				});
			});
		}, // jsJumpmenuToggle

		jsPopup: function(){ // 레이어 팝업
			$(this).on('click', function (e) {
				e.preventDefault();
				var $this = $(this), // 변수 선언 및 Custom Data 받아오기
					width = $this.dataVal('width', '600'), // $this.data('width') ? $this.data('width') : 600,
					height = $this.dataVal('height', '400'),
					url = $this.dataVal('rel', null),
					type = $this.dataVal('type', null),
					title = $this.dataVal('title', '팝업'),
					strScript = $this.dataVal('strScript', 'hello');
				popup(this.hash, this, width, height, url, type, title, strScript);
			});
		}, // jsPopup

		jsLayer: function(){ // 소규모 레이어 팝업
			$(this).on('click', function(e){
				e.preventDefault();
				var $this = $(this);
				var _href = $this.attr('href'),
					_focus = $this;
					_width = $this.dataVal('width', '600'),
					_height = $this.dataVal('height', '400'),
					_top = $this.offset().top + $this.outerHeight(),
					_left = $this.offset().left,
					_scroll = ($this.data('scroll') === true) ? 'yes' : 'no';
				layer(_href, _focus, _width, _top, _left, _height, _scroll);
			});
		}, // jsLayer

		jsTooltip: function(){ // jsTooltip
			var $tooltip = $('<div id="tooltip"></div');
			if($('#tooltip').length < 1){
				$tooltip.appendTo($(document.body)).hide();
			}
			$(this).on('mouseenter focusin', function(e){
				e.preventDefault();
				var $this = $(this),
					_text = $this.dataVal('tooltip', '툴팁 내용'),
					_top = $this.offset().top + $this.outerHeight() + 10,
					_left = $this.offset().left + 5;
				if (_text == '' || _text == ' ') return false;
				_text = _text.split('\\n').join('<br />');
				$tooltip.html(_text).css({
					'display': 'none',
					'top': _top,
					'left': _left
				}).dequeue().delay(200).fadeIn(300);
			});
			$(this).on('mouseout focusout', function(e){
				e.preventDefault();
				$tooltip.fadeOut('fast');
			});
		}, // jsTooltip

		jsModal: function(){ // 일반 팝업
			$(this).on('click', function(e){
				e.preventDefault();
				var $this = $(this);
				if (!$this.data('isClicked')) { // interval
					var _href = $this.attr('href'),
						_width = $this.dataVal('width', '600'),
						_height = $this.dataVal('height', '400'),
						_scroll = ($this.data('scroll') === true) ? 'yes' : 'no';
					$this.data('isClicked', true);
					modal(_href, _width, _height, _scroll);
					setTimeout(function() {
                        $this.removeData('isClicked');
					}, 1000);
				}
			}).attr('title', '새 창 열림');
		}, // jsModal

		jsAlert: function(){ // 경고후 초점 복귀
			var $this = $(this);
			$this.on('click', function(e){
				e.preventDefault();
				var _message = $this.data('message');
                if (_message) {
                    alert(_message);
                } else {
                    alert('출력할 메시지가 없습니다.');
                }
				$this.focus();
			}).attr('title', '새 창 열림');
		}, // jsAlert

		jsJumpmenu: function(){ // Jumpmenu
			$(this).on('click', function(e){ // FamilySites
				e.preventDefault();
				var $select = $(this.hash).eq(0),
					$selected = $select.find(':selected').eq(0);
				var _val = $selected.attr('value') ? $selected.attr('value') : null,
					_text = $selected.text() ? $selected.text() : null,
					_popup = $(this).dataVal('popup', false);
				if(_val === null || _val == _text){
					alert('이동할 항목을 선택해주세요.');
				} else if ( _popup === true ){
					window.open(_val);
				} else {
					location.href = _val;
				}
				$select.focus().find('option').eq(0).attr('selected','selected');
			});
		}, // Jumpmenu

		jsNavActive: function(text){
			text = (text == '주문결제내역 - 상세정보') ? '주문결제내역' : text;
			var $this = $(this);
			var $active = $this.find('a span:contains("'+text+'")').parent().parent();
			$active.addClass('active');
			if($active.is('.d2')) $active.parent().parent().addClass('active');
		},

		jsRowOdd: function(){
			$(this).find('th.code:odd, td.code:odd').eachQ(function(){
				var $table = $(this).parents('table');
				var _index = $(this).parent().index() + 1;
				var _temp = $(this).attr('rowspan') ? $(this).attr('rowspan') : 1;
				var i = 0;
				for (i; i < _temp; i++) {
                    $table.find('tr').eq(_index + i).addClass('odd');
                }
			});
		},

		jsSummary: function(){
			$(this).eachQ(function(){
				var $this = $(this),
					$th = $this.find('th > span');
				var _summary = '',
					_caption = $(this).find('caption').text();
				var i = 0,
					len = $th.length;
				if (len === 0) return false;
				for (i; i < len; i++) {
					_summary += $th.eq(i).text();
					if(len-i > 1) _summary += ', ';
				}
				$this.attr('summary', _summary + '(으)로 구성된 ' + _caption + ' 테이블 입니다.');
			});
		},
		
		jsGetSemanticText: function(){ // 대상 객체에서 text 끌어오기
			$(this).eachQ(function(){
				var $this = $(this);
				var _target = $(this).dataVal('target','');
				if(_target !== ''){
					$this.text($(_target).text());
				} else {
					$this.text('{data-target 속성이 필요합니다.}');
				}
			});
		},
		
		jsClickableIE: function(){
			if($('html').eq(0).attr('class').match('lteie7')){ // ie 구버전일 경우
				$(this).on('click', function(e){
					e.preventDefault();
					var $obj = $(this).parents('a');
					var _click = $obj.attr('onclick'),
						_href = $obj.attr('href'),
						_class = $obj.attr('class'),
						_target = $obj.attr('target');
					if(_href == 'javascript:;' || _click !== undefined){
						$obj.trigger('click');
					} else if(_target == '_blank'){
						window.open(_href);
						return false;
					} else {
						$(window.location).attr('href',_href);
					}
				});
			}
		},
		
		jsCheckAll: function(){ // 모두 선택, 선택 해제 : check, uncheck, toggle
			$(this).on('click', function(e){
				var $this = $(this),
					$group = $('input[name="'+ $(this).data('name') +'"]');
				var _type = $this.dataVal('type','check'),
					_tag = 'a',
					_thisChecked = false;
				if ($this.get(0).tagName.toLowerCase() == 'input') {
					if ( $this.attr('checked') == 'checked' ){
						$group.attr('checked','checked');
					} else {
						$group.removeAttr('checked');
					}
				} else {
					e.preventDefault();
					if(_type == 'toggle'){ // 토글 기능 활성화 시
						if(checkGroup($group, 'checked') === true){
							$group.removeAttr('checked');
						} else {
							$group.attr('checked','checked');
						}
					} else if (_type == 'uncheck') {
						$group.removeAttr('checked');
					} else {
						$group.attr('checked','checked');
					}
				}
			});
		} // 모두 선택, 선택 해제

	}); // extend

})(jQuery);

var _agent;

// Browser Detect
var browserDetect = function() {
	_agent = (navigator.userAgent||navigator.vendor||window.opera);
	var _userAgent = _agent.toLowerCase();
	var _is = function(t) { return _userAgent.indexOf(t) > -1; };
	var browserClass = {
		"android" : "mobile android",
		"blackberry" : "mobile blackberry",
		"windows phone" : "mobile windows",
		"iphone" : "mobile iphone",
		"ipad" : "mobile ipad",
		"ipod" : "mobile ipod",
		"msie 7"  : "ie ie7",
		"msie 8"  : "ie ie8",
		"msie 9"  : "ie ie9",
		"msie 10" : "ie10",
		"chrome"  : "chrome",
		"webkit"  : "webkit",
		"safari"  : "safari",
		"firefox" : "firefox"
	};
	for (var b in browserClass) {
		if (_is(b)) {
			$('html').addClass(browserClass[b]);
			// document.title = _agent;
			break;
		}
	}
};

browserDetect();

var _isOverlay = false;
var overlay  = function(todo){
	var $overlay = $('<div class="overlay" aria-hidden="true"></div>');
	var $el = $('div.overlay');
	switch(todo){
		case 'remove':
			$el.animate({ opacity: 0 }, 500, function(){
				$el.remove();
				_isOverlay = false;
				return 'off';
			});
			break;
		default:
			// overlay 생성
			var _overlayHeight = Math.max($window.height(), $document.height());
			if(_isOverlay !== true && $el.length <= 0) {
				_isOverlay = true;
				$overlay.css({
					'position': 'absolute',
					'z-index': '110',
					'top': '0',
					'left': '0',
					'right': '0',
					'bottom': '0',
					'width': '100%',
					'height': _overlayHeight,
					'opacity': '0',
					'background': '#000',
					'cursor': 'default'
				}).appendTo($(document.body)).animate({
					opacity: 0.5
				}, 500, function(){
					return 'on';
				});
			}
			break;
	}
};

var waiting = function(todo){
	var $message = $('<div class="waiting"><div class="inner"><p>잠시만 기다려주십시요.<br />지금 처리 중입니다.</p><span class="animation"></span></span></div>');
	var $el = $('div.waiting');
	switch(todo){
		case 'off':
			overlay('remove');
			$el.remove();
			break;
		default:
			overlay('append');
			if($el.length <= 0){
				var tt = setTimeout(function(){
					$message.appendTo($document).show();
					clearTimeout(tt);
				}, 200);
			}
			break;
	}
};

// 접근성 개선 레이어 팝업
var popup = function (layer, focus, width, height, url, type, title, strScript) {

	var popupVar = [];
		popupVar[0] = (layer) ? layer : null,
		popupVar[1] = (width) ? parseInt(width, 10) : 400,
		popupVar[2] = (height) ? parseInt(height, 10) : 300,
		popupVar[3] = (url) ? url : null,
		popupVar[4] = (type) ? type : null,
		popupVar[5] = (title) ? title : '우편번호 찾기',
		popupVar[6] = (strScript) ? strScript : 'hello';

	// focus element 감지
	var $focus = $(focus);
	if($focus.length != 1){ console.log('focus 객체 없음'); return false; }

	overlay('append'); // overlay 생성

	// popup 생성
	var $popup = $(popupVar[0]);
	if($popup.length < 1 || popupVar[0] == '#dynamic'){ // #dynamic 일 경우 삭제 후 재생성
		$popup.remove();
		$popup = $('<div class="modal modal-container dynamic" aria-hidden="true" hidden="hidden"><div class="modal-wrapper"><div class="modal-title"><h3 class="title"><span>' + popupVar[5] +'</span></h3></div><div class="modal-inner"><div class="modal-padding">&nbsp;</div></div><a href="javascript:;" class="close"><span class="core">닫기</span></a></div></div>');
		$popup.attr('id', popupVar[0].replace('#','')).insertAfter($focus);
	} else { // static
		var $temp = $popup.clone();
		$popup.remove();
		$popup = $temp;
		$popup.insertAfter($focus).removeClass('dynamic');
	}

	// 닫기버튼 semantic 처리 및 초점이동
	var $btnClose = $popup.find('a.close').eq(0);
	if($btnClose.find('span.semantic').length < 1){ // semantic 처리
		$btnClose.prepend('<span class="semantic">'+$popup.find('.title').eq(0).text()+'&nbsp;팝업&nbsp;</span>');
	}

	$btnClose.one('click', function(e){ // 닫기 후 초점이동
		e.preventDefault();
		$popup.css('visibility', 'hidden').removeAttr('tabindex').hideAria().hide();

		overlay('remove'); // overlay 제거

		$focus.focus();
	});

	$document.keydown(function(e){
		if(e.keyCode != 27) return true;
		if($btnClose){
			$btnClose.trigger('click','auto');
		}
	});

	// 임시 감추기
	$popup.addClass('js-popup-container').showAria().css({
		'z-index': '200',
		'visibility': 'hidden',
		'width': popupVar[1],
		'height': popupVar[2]
	}).find('.modal-inner').css('height','100');
	$popup.center();

	var _innerHeight = $popup.innerHeight() - $popup.find('.modal-title').eq(0).height() - 10;

	$popup.find('.modal-inner').height(_innerHeight);

	// 다음 iframe, ajax
	if(popupVar[4] !== null){

		var $contents = $popup.find('.modal-padding').eq(0);

		if(popupVar[4] == 'iframe'){ // iframe
			$contents.css('padding','0').html('<iframe src="'+ popupVar[3] +'" class="iframe" title="'+ popupVar[5] +' 프레임"></iframe>');
			$contents.find('iframe').eq(0).height(_innerHeight);
		} else if (popupVar[4]=='ajax') { // ajax
			$.ajax({
				type: 'GET',
				url: popupVar[3],
				cache: false,
				success: function(html){
					setTimeout(function(){
						$inner.append(html);
					}, 1000);
				}
			});
		} else if (popupVar[4]=='script') { // script
			$contents.html(strTemp);
		}

	}

	// 초점 이동 반복을 위한 처리
	if($popup.find('a.focus-repeater').length < 1){
		$popup.append('<a href="#' + $popup.attr('id') + '" class="semantic focus-repeater">현재 팝업 처음으로 초점이동</a>');
	}
	$popup.find('a.focus-repeater').on('focusin', function(){
		$popup.attr('tabindex', 0).focus();
	});

};

// popup Submit 성공시 호출되는 함수
var popupSubmitClose = function(el){
	setTimeout(function(){
		$(el).parents('.popup-container').find('a.close').trigger('click','auto');
	}, 100);
};

var layer = function(_href, _focus, _width, _top, _left, _height, _scroll){

	// var '<div class="layer-container"></div>';

	var $layer = $(_href).eq(0),
		$focus = _focus;

	if ($layer.length > 1) return false;

	$('div.layer-container').fadeOut('fast');

	if(!$layer.is('.layer-container')){
		var $layerTitle = $layer.find('.title').eq(0),
			$titleClone = $layerTitle.clone();
		$layerTitle.remove();
		var _strHtml = $layer.html();
		var _contentsHtml = '<div class="layer-wrapper"><div class="layer-title"></div><div class="layer-inner card-list"><div class="layer-padding scroll"></div></div><a href="javascript:;" class="close"><span>닫기</span></a></div>';

		$layer.empty().addClass('layer-container').html(_contentsHtml);
		$layer.find('.layer-title').append($titleClone);
		$layer.find('.layer-padding').html(_strHtml);
		$layer.find('a.close span').html($titleClone.text() + '레이어 닫기');
	}

	if($(document.body).attr('class').match('modal') && _left >= 400) _left = _left - (_width/2) + 22; // 팝업 창일때 위치 보정
	$layer.filter(':hidden').css({
		'width': _width,
		'height': _height,
		'top': _top - 5,
		'left': _left + 5
	}).show('fast').attr('tabindex','0').focus();

	$layer.find('a.close').one('click', function(e){
		e.preventDefault();
		$(this).parent().parent().fadeOut('fast');
		$focus.focus();
	});

};

// 모달 관련 함수
var modal = function(_href, _width, _height, _scroll){
	if (!_scroll) _scroll = 'no';
	var _left = parseInt((screen.width - _width) / 2, 10),
		_top = parseInt((screen.height - _height) / 2, 10) - 100;
	// var modalWin =  window.open(_href, 'popup', 'width='+ _width +', height='+ _height +', scrollbars='+ _scroll +', toolbar=no, menubar=no, location=no, resizable=true, status=yes');
	var _name = 'popup' + _left;
	var modalWin =  window.open(_href, _name, 'top='+ _top +', left='+ _left +', width='+ _width +', height='+ _height +', scrollbars='+ _scroll +', toolbar=no, menubar=no, location=no, resizable=false, status=yes');
	modalWin.focus();
};

// 엘리먼트 그룹이 exist, visible, hidden, checked, unchecked, deactive 인지 체크하는 함수
var checkGroup = function(group, key){
	var _returenVar = true;
	switch(key) {
		case 'visible':
			group.eachQ(function(){ if($(this).is(':visible') !== true) _returenVar = false; });
			break;
		case 'hidden':
			group.eachQ(function(){ if($(this).is(':hidden') !== true) _returenVar = false; });
			break;
		case 'checked':
			group.eachQ(function(){ if($(this).attr('checked') !== 'checked') _returenVar = false; });
			break;
		case 'unchecked':
			group.eachQ(function(){ if($(this).attr('checked') == 'checked') _returenVar = false; });
			break;
		case 'deactive':
			group.eachQ(function(){ if($(this).is('.active') === true) _returenVar = false; });
			break;
		default:
			group.eachQ(function(){ if($(this).length < 1) _returenVar = false; });
			break;
	}
	return _returenVar;
};

var clickableIe7 = function(){
	// empty
};

var focusToHash = function(){ // focus to hash element 
	var hash = document.URL.substr(document.URL.indexOf('#')+1) 
	if(hash !== undefined && $('#'+hash).length > 0){
		var $el = $('#'+hash).eq(0);
		var _top = $el.offset().top;
		$('html, body').animate({ scrollTop: _top}, 0);
		$el.attr('tabindex','0').focus();
	}
}

// 타이틀 처리
var initTitle = function(){

	var _lt = ' < ';
	var _titleDoc = '파스퇴르몰';
	var _elText = '';
	var _titleText = '';
	var _useTab = true; // 탭 사용함
	var $activeTab = $('div.body .js-tab-onbefore:eq(0) li.active').clone(); // 탭이 있을때
	if ($activeTab.length > 0){ // 탭
		$activeTab.find('.current').remove();
		_tabText = $activeTab.text() + _lt;
	}

	// 타이틀 객체
	var $title = $('div.body:eq(0) .title').eq(0);

	if($title.length < 0) {
		// 팝업일 경우
		$title = $('div.modal-title:eq(0) .title').eq(0);
	}

	_elText = $title.text(); // 마크업의 제목
	
	// 특수 상황시
	if($('.page-category div.aside .title').length > 0){ // 대 카테고리일때
		_elText = $('div.aside .title').eq(0).text();
		if($('.page-category .title-tab').length > 0){ // 상품 리스트일때
			_elText = $('.page-category .title-tab').text() + _lt + _elText;
		}
	} else if($('.page-detail div.title-product .title').length > 0){ // 상품상세일때
		_useTab = false;
	} else if($('.page-order div.title-step .title span').length > 0){ // 장바구니일때
		_elText = $('.page-order div.title-step .title span').text();
	} else if($('.page-member div.mypage-nav .title').length > 0){ // 마이페이지일때
		$('ul.js-nav-active').jsNavActive(_elText); // 네비게이션
		_elText = _elText + _lt + '마이페이지';
		if($('.submain').length > 0){  // 마이페이지 메인일때
			_elText = '마이페이지';
		}
	}
	_titleText = _elText; // 선 가공

	// 레이아웃별 교체

	// 변수
	var _dataTitle = $title.dataVal('title',''); // 대체, 추가 텍스트
	var _dataType = $title.dataVal('type','replace'); // 대체, 추가 타입

	// data, tab 순 가공
	if (_dataTitle !== '' && _dataType == 'replace') { // 대체
		_titleText = _dataTitle;
	} else if (_dataTitle !== '' && _dataType == 'append'){ // 추가
		_titleText = _dataTitle + _lt + _elText;
	} else if ($activeTab.length > 0 && _useTab === true){ // 탭
		_titleText = _tabText + _elText;
	}

	_titleText = _titleText + _lt + _titleDoc;

	if($('.page-main').length > 0) _titleText = _titleDoc; // 메인일때

	// 입히기
	document.title = _titleText;

};


$(function(){

	var _htmlClass = $('html').eq(0).attr('class');
	var _isLteIe7 = false;
	if(_htmlClass.match('lteie7')) _isLteIe7 = true;

	$('.js-nth-child', document).jsNthChild(); // nth-child
	$('.brand-search ul.js-nth-child, div.body div.thumblist ul.js-nth-child, #usermenu div.thumblist ul.js-nth-child', document).jsGridPaper(); // grid paper

	// $('div.tab-e ul.js-nth-child', document).jsGridPaper();
	// $('div.tab-e ul.js-nth-child', document).find('li.empty').empty().append('<span>&nbsp;</span>');
	
	$('table.js-rowspan', document).jsRowSpan(); // rowspan addClass

	if(_isLteIe7 === true){ // ie 구버전일 경우
		// 마지막 라인 없애기 
		$('table.table-grid tbody td:last-child').addClass('last-child');
		$('a:not(.js-modal) span.thumb img').jsClickableIE(); // ie7 thumbnail disable click bug fix
	}
	
	$('div.js-carousel', document).jsCarousel(); // Carousel
	$('div.js-carousel-item', document).jsCarousel2(); // Carousel
	$('div.js-tab', document).jsTab(); // Tab
	$('div.js-tab-contents', document).jsTabContents(); // TabContents
	$('div.js-collapse', document).jsCollapse(); // Collapse

	$('input.js-autocomplete', document).jsAutocomplete(); // Autocomplete
	$('input.js-spinner', document).jsSpinner(); // Spinner
	$('ul.js-tab-onbefore', document).jsTabOnBefore(); // TabOnBefore
	$('a.js-modal', document).jsModal(); // Modal
	$('a.js-layer', document).jsLayer(); // Layer
	$('a.js-popup', document).jsPopup(); // Popup
	$('a.js-alert', document).jsAlert(); // Alert
	$('a.js-jumpmenu', document).jsJumpmenu(); // Jumpmenu
	$('#breadcrumb select, #familySite', document).jsJumpmenuToggle(); // Jumpmenu Toggle
	$('.js-checkall', document).jsCheckAll(); // CheckAll
	$('.js-tooltip', document).jsTooltip(); // Layer

	$('table.js-rowodd').jsRowOdd(); // Row Odd
	$('div.body:eq(0) table.js-summary', document).jsSummary(); // Table Summary Add-on

	initTitle();
	// focusToHash(); // focus to hash element
	
});