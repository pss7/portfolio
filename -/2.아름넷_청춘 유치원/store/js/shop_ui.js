jQuery(function($){

	// clientWidth
	clientWidth ={clientW:function(){
		var winW = $(window).width();
//			if(winW > 1280){
//				$('body').removeClass('basic');
//				$('body').removeClass('small');
//			}else if(winW == 1280){
//				$('body').removeClass('small').addClass('basic');
//			}else{
//				$('body').removeClass('basic').addClass('small');
//			}
		}
	};

	// Snb Type
	snb = {
		depth:function(){
			var list = $('.left_cate li');
			var menuLenA = $(".snb_tplA .left_cate > li").length;
			var menuLenB = $(".snb_tplB .left_cate > li").length;
			var menuLenG = $(".snb_tplG .left_cate > li").length;

			if(menuLenA < 14){
				$(".snb_tplA .btnMore").css("display","none");
				$(".snb_tplA .snb_inner").css("height","297");
			}
			if(menuLenB < 16){
				$(".snb_tplB .btnMore").css("display","none");
				$(".snb_tplB .snb_inner").css("height","384");
			}
			if(menuLenG < 14){
				$(".snb_tplG .btnMore").css("display","none");
				$(".snb_tplG .snb_inner").css("height","307");
			}

    		var schlist = $('.s_section .left_cate');
    		if(schlist.hasClass('close')){
    			var leng = $(schlist).children('li').length;
    			if(leng < 11){
    				$('#cate_more').hide();
    			}
    			var overleng = $('.s_section .left_cate>li:gt(9)');
    			overleng.hide();

    			$('#cate_more').on("click", function(e){
    				$('#cate_more').toggleClass('open');
    				overleng.toggle();

    				if($('#cate_more').hasClass('open')){
    					$(this).html('<span>-</span> 닫기');
    				}else{
    					$(this).html('<span>+</span> 더보기');
    				}
					e.preventDefault();
    			});
		    }

		    //defalut snb
			function reset() {
		        $(".left_cate>li").removeClass("on, selected");
		    }
		    $(".left_cate>li").on('mouseenter', function(){
			    	reset();
		    		$(this).parents('.snb_inner').removeClass('box').addClass('boxOver');
		    		$(this).addClass("on");
		    		$(this).find('.btn_close').on('click', function(e){
    	    			$(this).parents('.s_depth').addClass('hide');
    	    			e.preventDefault();
    	    		});
		    	}).on('mouseleave', function(){
		    		$(this).find('.s_depth').removeClass('hide');
		    		$(this).parents('.snb_inner').removeClass('boxOver').addClass('box');
		    		$(this).removeClass("on");
		    });

		    $(".left_cate>li a").focusin(function(){
		        reset();
		        $(this).parents(".left_cate li").addClass("on");
		        $(this).parents('.snb_inner').removeClass('box').addClass('boxOver');
		    });

		    //전체카테고리
    		$('.btn_all_cate').on('click', function(e){
        		$('.all_menu').toggleClass('show');
        		$('.fds_all').toggleClass('show'); //fds
        		if($(this).parents('body').hasClass('fds')){
        			$(this).find('span').toggleClass('on');
        		}
        		e.preventDefault();
        	});

        	$('.btn_all_cate').on('mouseleave', function(){
			    $('.all_menu').removeClass('show');
			});

    		$('.all_menu').on('mouseenter', function(){
			    	$(this).addClass('show');
			    }).on('mouseleave', function(){
			    	$(this).removeClass('show');
			});
			/*$('.fds_all').on('mouseenter', function(){
			    	$(this).addClass('show');
			    }).on('mouseleave', function(){
			    	$(this).removeClass('show');
			    	$('.btn_all_cate span').removeClass('on');
			});*/
		    $('.all_menu_close').on('click', function(e){
		    	$('.all_menu').removeClass('show');
		    	e.preventDefault();
		    });
		},
		//special
		smenu:function(){
		    Array.max = function( array ){
		        return Math.max.apply( Math, array );
		    };
		    var heights= $('.s_dep01').map(function() {
		        return $(this).height();
		    }).get();
		    $('.s_menu .s_dep01').css('height', Array.max(heights));

		    $('.s_menu').on('mouseenter', function(){
				$('.s_dep01').css('display', 'block')
			}).on('mouseleave', function(){
				$('.s_dep01').css('display', 'none')
			})

			$(".s_menu h3>a").focusin(function(){
		       $('.s_dep01').css('display', 'block')
		    });
		    $(".s_menu>li").on('mouseenter', function(){
			    	$(".left_cate>li").removeClass("on, selected");
		    		$(this).addClass("selected");
		    	}).on('mouseleave', function(){
		    		$(this).removeClass("selected");
		    });
		},
		//akplaza
		menuHover:function(){
			var g_liOut = true;
			var g_MenuOut = true;
			$(".m_akplaza").mouseenter(function() {
				$(".cate_more").css("display","block");
				if(g_MenuOut && g_liOut){
					$(".plazaSmenu").css("display","none");
					$(".cate_more .left_cate").find('li:eq(0)').addClass('on').find('.plazaSmenu').css("display","block");
				}
				g_MenuOut = false;
			}).mouseleave(function(){
				$(".cate_more").css("display","none");
				g_MenuOut = true;
			});

			$(".left_cate > li").mouseenter(function() {
				var liIndex = $(this).index();
				$(".plazaSmenu").css("display","none");
				$(".plazaSmenu:eq("+liIndex+")").css("display","block");
				g_liOut = false;
			}).mouseleave(function(){
				g_liOut = true;
			});
			$(".m_akplaza > a").focusin(function(){
				$(this).parent(".m_akplaza").mouseenter();
			});
			$(".left_cate > li > a").focusin(function() {
				$(this).parent('li').mouseenter();
			});
		},
	    bindHover:function() {
    	    $(".s_dep01>li").each(function() {
	        	if($(this).hasClass('selected')){
					$(this).parents('li').addClass("selected");
				};
	            $(this).on("mouseenter focusin", function(){
					    $(this).addClass("on");
					    $(this).parents('li').addClass("on");
					}).on("mouseleave focusout", function(){
					    $(this).removeClass("on");
					    $(this).parents('li').removeClass("on");
					});

	        	});
    	   	$(".s_depth li").each(function() {
	            $(this).on("mouseenter focusin", function(){
					    $(this).addClass("on");
					}).on("mouseleave focusout", function(){
					    $(this).removeClass("on");
					});

	        	});
    	   	$(".s_depth").each(function() {
    	   		$(this).find('ul:eq(-1)').css('border-right','0');
    	   	});
	    },
		treeNav:function() {
    		var tree = $('.tree');
		    var togglePlus = '<button type="button" class="toggle plus">+</button>';
		    var toggleMinus = '<button type="button" class="toggle minus">-</button>';
		    // defalt
		    tree.find('li>ul').css('display','none');
		    tree.find('ul>li:first-child').addClass('first');
		    tree.find('ul>li:last-child').addClass('last');
		    tree.find('li>ul:hidden').parent('li').prepend(togglePlus);
		    tree.find('li>ul:visible').parent('li').prepend(toggleMinus);

			$(".t_dep01>li").each(function() {
			    $(this).on("mouseover focusin", function(){
					    $(this).addClass("on");
					}).on("mouseout focusout", function(){
					    $(this).removeClass("on");
					});
			});
			// click cate
		    $('.tree>li>a').click(function(e){
				c = $(this);
				n = c.parent('li');
				cate = $(this).parent('li').siblings();

				n.toggleClass('open').find('.t_dep01').toggle();
				n.find('button').toggleClass('minus plus');
				cate.addClass('prev');
		        cate.removeClass('open');
		        cate.find('>ul').hide();
		        $('.prev .toggle').text('-').removeClass('minus').addClass('plus');
		        if(n.hasClass('open')){
		           n.find('.toggle').text('-').removeClass('plus').addClass('minus');
		        }
		        e.preventDefault();
		    });

		    // click toggle
		    $('.tree .toggle').click(function(e){
				t = $(this);
				tree = $(this).parent('li').siblings();
				t.toggleClass('minus plus').parent('li').find('.t_dep01').toggle();
				tree.addClass('prev');
		        tree.removeClass('open');
		        tree.removeClass('selected');
		        tree.find('>ul').hide();
		        $('.prev .toggle').text('-').removeClass('minus').addClass('plus');
		        t.parent('li').toggleClass('open');
		        if(t.parent('li').hasClass('open')){
		            t.text('-').removeClass('plus').addClass('minus');
		            t.parent('li').find('>ul').show();
		        } else {
		            e.preventDefault();
		        }
		    });
		},
		chaSnb:function() {
    		var cha = $('.snb_cha .leftMenu');
		    cha.find('li>ul').css('display','none');

			// click cate
		    $('.leftMenu>li a').mouseover(function(e){
				c = $(this);
				cate = $(this).parents('li').siblings();

				cate.addClass('prev');
		        cate.removeClass('open');
		        cate.find('ul').hide();
		        c.parents('li').addClass('open');
		        if(c.parents('li').hasClass('open')){
		            c.parents('li').find('ul').show();
		        }
		        e.preventDefault();
		    });
		}
	};
});


(function($){
	//ul>li toggle
	$.fn.over = function(){
		$(".over li, .bnr_list li").on("mouseenter focusin", function(){
			$(this).addClass("on");
		}).on("mouseleave focusout", function(){
			$(this).removeClass("on");
		});
	}
})(jQuery);


//location
function moveNaviHome(){
	location.href='http://www.akmall.com';
}

function execLocationNavi(){
	var selectBoxId1 = -1;
	var selectBoxId2 = -1;
	var $location = $(".location");

	if(!$location.length){
		return false;
	}

	$location.find("> li > ul").each(function(i){
		var len;
		var max = 0;
		$(this).find(">li").each(function(j){
			len = $(this).find("a").html().length;

			if(len > max){
				max = len;
			}else{
				len = max;
			}
		})
	});

	$location.find(".selBtn01 a").unbind("click").bind("click", function(e){
		e.preventDefault();

		$(this).parent().next().slideToggle(100, function(){
			isRun = false;
		});

	});

	$location.find(".selBtn02 a").unbind("click").bind("click", function(e){
		e.preventDefault();
		$(this).parent().next().slideToggle(100, function(){
			isRun = false;
		});
	});

	$location.find(".selBtn03 a").unbind("click").bind("click", function(e){
		e.preventDefault();
		$(this).parent().next().slideToggle(100, function(){
			isRun = false;
		});
	});

	$location.find("> li").unbind("mouseleave").bind("mouseleave", function(e){
		$(".selLayer").slideUp(100, function(){
			isRun = false;
		});
	});

	$location.find("ul:last li:last").focusout(function(){
		$(".selLayer").slideUp(100, function(){
			isRun = false;
		});
	});
}

$(document).ready(function(){
    clientWidth.clientW();
	$(window).resize(function () {
		clientWidth.clientW();
	});
	execLocationNavi();
	snb.depth();
	snb.bindHover();
	snb.treeNav();
	snb.chaSnb();
	snb.menuHover();
	snb.smenu();
//    $(".over").over();

    if ($(".quick_left").length > 0){
        $('.quick_left').quickScroll();
    }
    if ($(".skyscrapper").length > 0){
        $('.skyscrapper').quickScroll();
    }
    if ($(".quick_right").length > 0){
        $('.quick_right').quickScroll();
    }
    if ($(".visualBnList").length > 0){
        $(".visualBnList").rollCaptoin();
    }
    if ($(".simplebuy").length > 0){
        $(".simplebuy").simplebuy();
    }
    if ($(".cart_sub").length > 0){
        $('.cart_sub').cartSub();
    }
});


$(document).ready(function(){

		$('#cartOpen_tit img').click( function() {
			var cart_class = $('#cartOpen_tit img').hasClass('open_cart');
			if (cart_class) {
				$('.cartView').animate({ height: 'toggle' }, 500, function() {
					$('#cartOpen_tit img').attr('src', './images/common/title_cart_close.gif');
					$('#cartOpen_tit img').removeClass('open_cart').addClass('close_cart');
				});
			} else {
				$('.cartView').hide();
				$('#cartOpen_tit img').attr('src', './images/common/title_cart_open.gif');
				$('#cartOpen_tit img').removeClass('close_cart').addClass('open_cart');
			}
		});
		// 왼쪽 이동
		$('.left_move').click( function() {
			var show_count = $('.show').length;
			var first_show_index = $('.cartContentBox').index($('.show').eq(0));
			var last_show_index = first_show_index+4;
			if (0 < first_show_index) {
				first_show_index = first_show_index - 1;
				$('.cartContentBox:eq(' + last_show_index + ')').hide().removeClass('show').addClass('hidden');			
				$('.cartContentBox:eq(' + first_show_index + ')').show().removeClass('hidden').addClass('show');
			}		
		});	
		
		// 오른쪽 이동
		$('.right_move').click( function() {
			var show_count = $('.show').length;
			var first_show_index = $('.cartContentBox').index($('.show').eq(0));
			var last_show_index = first_show_index + 5;
			if (1 < show_count) {
				$('.cartContentBox:eq(' + first_show_index + ')').hide().removeClass('show').addClass('hidden');
				$('.cartContentBox:eq(' + last_show_index + ')').show().removeClass('hidden').addClass('show');
			}		
		});
		
		$(window).scroll(function(){
			var scroll_Now = $(window).scrollTop();
			var scroll_header = $('#header').height();
			if (scroll_header <= scroll_Now)
			{
				$('.wing_banners').addClass('Q_menu_position_type1').removeClass('Q_menu_position_type2');
			}else {
				$('.wing_banners').addClass('Q_menu_position_type2').removeClass('Q_menu_position_type1');
			}
		});

	});
