
jQuery(function($) {
	// 넘버 부여 슬라이드
	function slideJo() {
		$(window).load(function() {
			//point plus 
			//$('.ppMbn .jo_sliderAct img').css({'height':'280px','width':'480px'});
		});
		
		var autoTime = 0, 
			eff		 = 'swing', 
			speed	 = 0, 
			i		 = 0;
		var sliderID;
		
		if ($('.sliderJHM').length) {
			for(i = 0; i < $('.sliderJHM').length ; ++ i ) {
				sliderID = $('.sliderJHM').eq(i).attr('id');
				sliderJHM(sliderID);
			}
		}
		
		function sliderJHM(sliderID) {
			var $sliderJHM =		$('#'+sliderID),
				$jo_control =		$sliderJHM.find('.jo_control'),
				$jo_num =			$sliderJHM.find('.jo_num'),
				$sliderjo_num = 	$jo_control.find('p'),
				$sliderCtr = 		$jo_control.find('div > a'),
				$jo_sliderBody = 	$sliderJHM.children('.jo_sliderBody'),
				$jo_sliderDiv = 	$jo_sliderBody.children('.jo_sliderDiv'),
				$jo_sliderAct = 	$jo_sliderDiv.children('.jo_sliderAct'),
				sliderW = 			$jo_sliderAct.width(),
				//sliderH = 			$jo_sliderAct.height(),
				sliderSum =			$jo_sliderDiv.length,
				$autoOn =			$jo_control.find('.autoOn'),
				sliderWplus = 		sliderW,
				sliderWmiuns = 		'-' + sliderW + 'px';
			
			var autoCtr			= null, 
				sliderNow		= 0, 
				clickA			= 0, 
				moveAc			= 0, 
				sliderBefore	= 0;
			
			var btnAltName;
			var $sH3 = $sliderJHM.children('h3');

			autoTime = 5000;
			$jo_num.show();
			$jo_control.show();
			$jo_sliderAct.hide();
			$sliderjo_num.find('span').text(sliderSum);
			$sliderjo_num.find('strong').text(sliderNow + 1);
			
			if (sliderID == 'mainCardMenu') {
				$jo_sliderDiv.eq(1).addClass('on').children('.jo_sliderAct').show();
			}else{
				$jo_sliderDiv.eq(0).addClass('on').children('.jo_sliderAct').show();
			}
			
			sliderNow =	$jo_sliderBody.children('.on').index();
			
			if ($sH3.size()) {
				($sH3.find('img').size()) ? btnAltName = $sliderJHM.children('h3').find('img').attr('alt') : btnAltName = $sliderJHM.children('h3').text();
			} else { 
				btnAltName = '';
			}

			$jo_control.find('.stop').text(btnAltName + ' 배너 정지');
			$jo_control.find('.play').text(btnAltName + ' 자동 롤링');
			$jo_control.find('.prev').text(btnAltName + ' 이전 보기');
			$jo_control.find('.next').text(btnAltName + ' 다음 보기');
						
			var autoOnSum = $jo_control.find('.autoOn').children('a').length;
			
//			if (autoOnSum == 3) {
//				$autoOn.css('width','46px');
//			} else if (autoOnSum == 2) {
//				$autoOn.css('width','31px');
//			}
			
			if (sliderSum > 1) {
				$(window).load(function() {
					$jo_control.show();
					$jo_num.show();
				});
			} else if (sliderSum == 1) {
				$jo_control.hide();
				$jo_num.hide();
				return;
			}
			
			function btnR() {
				var $btnR = $sliderJHM.find('.btnR');
					
				if (!$btnR.size()) {
					return;
				} else {
					var aLength = $jo_num.length,
						aT = 0,
						$btnNum = $btnR.find('.jo_num'),
						$btnSdiv = $btnR.find('.jo_sliderDiv'),
						bnW = $btnR.find('.jo_sliderAct').outerWidth(),
						$btnRPjocnt = $btnR.parent().find('.jo_control'),
						cntrSum = $btnRPjocnt.find('a').length,
						pR = parseInt($btnRPjocnt.css('right')),
						pL = parseInt($btnRPjocnt.css('left')),	
						mR = parseInt($btnNum.css('margin-right')),
						mL = parseInt($btnNum.css('margin-left')),	
						cntrW = ($btnRPjocnt.find('a').outerWidth()) * cntrSum;
				
					(!pR) ? pR = 0 : '';
					(!pL) ? pL = 0 : '';
					(!mR) ? mR = 0 : '';
					(!mL) ? mL = 0 : '';
					(!cntrW) ? cntrW = 0 : '';

					for(var r = 0; r < aLength; r++) {
						var aW = $btnR.find('.jo_num').eq(r).outerWidth();
						aT = aT + aW + mR + mL;
					}
					
					var aFirstML = bnW - (aT + cntrW + pR + mR - mL);
					
					$btnSdiv.eq(0).find('.jo_num').css('margin-left', aFirstML);
					$btnSdiv.eq(-1).find('.jo_num').css('margin-right','0');
				}

			}btnR();
		
			// jo_control
			$sliderCtr.on('click',function(e) {
				e.preventDefault();
				var $this =  $(this),
					$thisP = $this.parent(),
					clickBtn = $this.attr('class'),
					$sBodyOn = $jo_sliderBody.children('.on');
				
				switch(clickBtn){
					case "prev" :
						sliderNow = $sBodyOn.prev().index();
						moveAc = 'movePrev';
						sliderMv(sliderNow, moveAc);	
						break;
					case "next" :
						sliderNow = $sBodyOn.next().index();
						moveAc = 'moveNext';
						sliderMv(sliderNow, moveAc);
						break;
//					case "stop" :
//						$thisP.removeClass('autoOn').addClass('autoOff');
//						stopInt();
//						$this.attr('class','play').text(btnAltName + ' 자동 롤링');
//						break;
//					case "play" :
//						$thisP.addClass('autoOn').removeClass('autoOff');
//						playInt();
//						$this.attr('class','stop').text(btnAltName + ' 롤링 정지');
//						break;
					// no default:
				}
			});

			// A CLICK
			$jo_sliderDiv.children('a.jo_num').on('click',function(e) {
				e.preventDefault();
				sliderNow =	$jo_sliderBody.children('.on').index();
				clickA = $(this).closest('.jo_sliderDiv').index();
				if (sliderNow < clickA) {
					moveAc = 'moveNext';
					sliderMv(clickA, moveAc);
				} else if (sliderNow > clickA) {
					moveAc = 'movePrev';
					sliderMv(clickA, moveAc);
				}
			});
			
			// AUTO
			function playInt() {
				autoCtr = setInterval(function() {
					sliderNow =	$jo_sliderBody.children('.on').index() + 1;
					moveAc = 'moveNext';
					sliderMv(sliderNow, moveAc);
				},autoTime);
			}
			function stopInt() {
				clearInterval(autoCtr);
			}
			
			if ($autoOn.size()) {
				playInt();
			}
			// OVER STOP
			$sliderJHM.find('a').on('mouseover focus',function() {
				stopInt();
			}).on('mouseleave blur',function() {
				if ($jo_control.children('.autoOn').size()) {
					stopInt(); 
					playInt();
				} else if ($jo_control.children('.autoOff').size()) {
					stopInt();
				}
			});
			
			// ACTION SINGLE
			function sliderMv(clickA, moveAc) {
				sliderBefore =	$jo_sliderBody.children('.on').index();
				$jo_sliderDiv.removeClass('on');
				eff = 'swing';
				speed = 700;
				var actNum01 = 0,
					actNum02 = 0,
					actNum00 = 0;
				
				var $numB = $sliderjo_num.find('strong');
				
				if (moveAc == 'moveNext') {
					actNum00 = sliderWmiuns;
					actDef(actNum00);
					
					if (clickA == '-1') clickA = 0;
					sliderNow = clickA;
					if (sliderNow == sliderSum) {
						if ($sliderJHM.children('.fadeType').size()) {
							actNum01 = 0;
							actFade(actNum01);
						} else {
							actNum01 = 0;
							actNum02 = sliderWplus;
							actSlide(actNum01,actNum02);
						}
						$numB.text('1');
					} else {
						if ($sliderJHM.children('.fadeType').size()) {
							actNum01 = sliderNow;
							actFade(actNum01);
						} else {
							actNum01 = sliderNow;
							actNum02 = sliderWplus;
							actSlide(actNum01,actNum02);
						}
						$numB.text(sliderNow + 1);
					}
				} else if (moveAc == 'movePrev') {
					actNum00 = sliderWplus;
					actDef(actNum00);
					
					sliderNow = clickA + 1;
					if (sliderNow == 0) {
						if ($sliderJHM.children('.fadeType').size()) {
							actNum01 = sliderSum - 1;
							actFade(actNum01);
						} else {
							actNum01 = sliderSum - 1;
							actNum02 = sliderWmiuns;
							actSlide(actNum01,actNum02);
						}
						$numB.text(sliderSum);
					} else {
						if ($sliderJHM.children('.fadeType').size()) {
							actNum01 = sliderNow - 1;
							actFade(actNum01);
						} else {
							actNum01 = sliderNow - 1;
							actNum02 = sliderWmiuns;
							actSlide(actNum01,actNum02);
						}
						$numB.text(sliderNow);
					}
				}
				
				function actDef(actNum00){
					//var $this = $(this);
					var $sAct = $jo_sliderDiv.eq(sliderBefore).children('.jo_sliderAct');
					if ($sliderJHM.children('.fadeType').size()) {
						$sAct.show().stop().fadeOut(speed,function() {
							$sAct.hide();
						});	
					} else {
						$sAct.css('z-index','1').stop().animate({
							left : actNum00
						},speed, eff, function() {
							$sAct.hide();
						});	
					}
					// 2013main
					$jo_sliderDiv.eq(sliderBefore).children('.jo_sliderAct').find('.trBg').hide();
				}
				function actSlide(actNum01,actNum02){
					$jo_sliderDiv.eq(actNum01).addClass('on').children('.jo_sliderAct').css({
						left : actNum02
					}).show().stop().animate({
						left : 0 
					},speed, eff);
					
					// 2013main
					var actNum03 = null;
					if(actNum02 > 0){
						actNum03 = sliderWmiuns;
					} else {
						actNum03 = sliderWplus;
					}
					$imgSlider = $jo_sliderDiv.eq(actNum01).children('.jo_sliderAct').css('z-index','10');
					$imgSlider.find('.upImg').css('left',actNum02).show().stop().delay(200).animate({
						'left': 0 
					},speed, eff);
					$imgSlider.find('.downImg').css('left',actNum02).show().stop().delay(400).animate({
						'left': 0 
					},speed, eff);
					$imgSlider.find('.trBg').css('left',actNum03).show().stop().animate({
						'left': 0 
					},speed, eff);
				}
				function actFade(actNum01){
					$jo_sliderDiv.eq(actNum01).addClass('on').children('.jo_sliderAct').css({
						left: 0
					}).show().stop().hide().fadeIn(speed);
				}
			}
		}
		
	}slideJo();
});