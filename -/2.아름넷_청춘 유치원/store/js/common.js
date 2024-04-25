function slide(){
    var li_sel = $("#mainVisual .mainVisual-slider .mask > ul > li").length;
	$("#mainVisual .mainVisual-slider .mask > ul").slick({
        vertical:true,
		infinite:true,
		autoplay:true,
		autoplaySpeed:2000,
        speed:1000,
		arrows:true,
		dots:false,
		prevArrow:"#mainVisual .btnPrev",
		nextArrow:"#mainVisual .btnNext",
	})
	$("#mainVisual .mask02 > ul")
		.on('init', function(event, slick) {
 			$('#mainVisual .mask02 > ul .slick-slide.slick-current').addClass('active');
 		})
		.slick({
			slidesToShow:li_sel,
			slidesToScroll:li_sel,
			speed:0,
			dots: false,
			arrows:false,
			focusOnSelect: false,
			infinite: false,
		})
	$('#mainVisual .mainVisual-slider .mask > ul').on('afterChange', function(event, slick, currentSlide) {
		$('#mainVisual .mask02 > ul').slick('slickGoTo', currentSlide);
		var currrentNavSlideElem = '#mainVisual .mask02 > ul .slick-slide[data-slick-index="' + currentSlide + '"]';
		$('#mainVisual .mask02 > ul .slick-slide.active').removeClass('active');
		$(currrentNavSlideElem).addClass('active');
	 });

	 $('#mainVisual .mask02 > ul').on('click', '.slick-slide', function(event) {
		event.preventDefault();
		var goToSingleSlide = $(this).data('slick-index');
		$('#mainVisual .mainVisual-slider .mask > ul').slick('slickGoTo', goToSingleSlide);
	 });
	 
	//2021-12-13 추가
		var li_sel2 = $(".prd-tab-contents > ol > li").length;

		$('.prd-tab-contents > ol').slick({
		  dots: false,
		  arrows: false,
		  speed: 500,
		  slidesToShow: 1,
		  slidesToScroll: 1,
		  autoplay: true,
		  autoplaySpeed: 2000,
		});

		$(".conBox02 .prd-tab ul")
			.on('init', function(event, slick) {
				$('.conBox02 .prd-tab ul .slick-slide.slick-current').addClass('active');
			})
			.slick({
				slidesToShow:li_sel2,
				slidesToScroll:li_sel2,
				speed:0,
				dots: false,
				arrows:false,
				focusOnSelect: false,
				infinite: false,
		})

		$(".conBox02 .prd-tab ul li a").on("click",function(e){
			var slideNo2 = $('.conBox02 .prd-tab ul li a').index(this);
			$('.prd-tab-contents > ol').slick('slickGoTo', slideNo2);							
		});

		$('.prd-tab-contents > ol').on('afterChange', function(event, slick, currentSlide) {
			$('.conBox02 .prd-tab ul').slick('slickGoTo', currentSlide);
			var currrentNavSlideElem2 = '.conBox02 .prd-tab ul .slick-slide[data-slick-index="' + currentSlide + '"]';
			$('.conBox02 .prd-tab ul .slick-slide.on').removeClass('on');
			$(currrentNavSlideElem2).addClass('on');
		 });

		 $('.conBox02 .prd-tab ul').on('click', '.slick-slide', function(event) {
			event.preventDefault();
			var goToSingleSlide2 = $(this).data('slick-index');
			$('.prd-tab-contents > ol').slick('slickGoTo', goToSingleSlide2);
		 });

		 
}
function tab(){
	var tab = $("[data-tab]")
	var tabContents = $("[data-tab-contents]")
		tabContents.children("ul").children("li").hide();
		tabContents.children("ul").children("li").eq(0).show();
	tab.find("ul li").on("click",function(){
		var sel = $(this).index();
		$(this).siblings("li").removeClass("on");
		$(this).addClass("on");
		tabContents.children("ul").children("li").hide();
		tabContents.children("ul").children("li").eq(sel).show();
		return false;
	})
}
function headerScroll(){
	$(window).on("scroll",function(){
		var st = $(window).scrollTop();
		if (st > 168){ /* 2021-08-27 수정 */
			$("#header").addClass("scroll");
		} else {
			$("#header").removeClass("scroll");
		}
	})
	$(window).trigger("scroll");
}
function category(){
	var isState = "open";
	$("#header .btnAllMenu").on("mouseenter",function(){
		$(".all-category").show();
	})
    /* 2021-08-26 추가 */
    $("#header .auto").on("mouseleave",function(){
		$(".all-category").hide();
	})
    // --------------------------------
    $("#gnb .gnbList > li").on("mouseenter",function(){
        $(this).find(".slide-wrap").css({display:"block"})
        $(".all-category").hide();
    })
    $("#gnb .gnbList > li").on("mouseleave",function(){
        $(this).find(".slide-wrap").css({display:"none"})
    })
    $(".slide-wrap .btn-close").on("click",function(){
        $(this).closest(".slide-wrap").css({display:"none"})
        isState = "open";
        return false;
    })
}
function sideMenu(){
	$(window).on("scroll",function(){
		var st = $(window).scrollTop();
		if($("#mainPageCheck").val() == "Y"){
			if (st > 673){/* 2021-08-27 수정 */
				$("#sideMenu").addClass("fix");
			} else {
				$("#sideMenu").removeClass("fix");
			}
		}
	})
	$(window).trigger("scroll");
	var state = "open";
	$("#sideMenu .btnClose").on("click",function(){
		$("#sideMenu").css({display:"none"})
        isState = "close";
		return false;
	})
}
function recent(){
	var state2 = "close";
	$("#sideMenu .quickMenu .btn").on("click",function(){
		if (state2 == "close"){
			$(this).addClass("open");
			$(".prd-recent").stop().animate({height:359},400,"easeInQuint");
			state2 = "open";
		} else {
			$(this).removeClass("open");
			$(".prd-recent").stop().animate({height:0},400,"easeInQuint");
			state2 = "close"
		}
		return false;
		
	})
	var recent = new Swiper (".prd-recent .mask",{
		infinite:false,
		direction:"vertical",
		slidesPerView:2,
		prevButton:".prd-recent .btnPrev",
		nextButton:".prd-recent .btnNext",
	})
    $(".btn-scroll").on("click",function(e){
		TweenMax.to($("html,body"),1,{scrollTop:0,ease:Expo.easeOut})
		return false;
	})
}
function left_banner(){
	$(window).on("scroll",function(){
		var st = $(window).scrollTop();
		if($("#mainPageCheck").val() == "Y"){
			if (st > 673){/* 2021-08-27 수정 */
				$("#left-banner").addClass("fix");
			} else {
				$("#left-banner").removeClass("fix");
			}
		}
	})
	$(window).trigger("scroll");
}

//2021-09-01 추가
function depth03_pop(){
	$("#header .btnAllMenu").on("mouseenter",function(){
		$(".all-category02").show();
	})
	
	 $("#header .auto").on("mouseleave",function(){
		$(".all-category02").hide();
	})
    // --------------------------------
    $("#gnb .gnbList > li").on("mouseenter",function(){
        $(".all-category02").hide();
    })
	$("#header .auto").on("mouseleave",function(){
		$(".all-category02").hide();
		$(".all-category02 td > ul > li").removeClass("on");
		$(".all-category02 .depth03-pop")
			.css({display:"none"})
			.find("ul li").remove();
	})
	$(".all-category02 td > ul > li, all-category02 .depth03-pop").on("mouseover",function(){
		var position_y = $(this).position().top -15;
		var position_x = $(this).position().left + 190;
		var this_li = $(this).find(".depth03 li");
		$(".all-category02 td > ul > li").removeClass("on");
		$(this).addClass("on");
		
		if(this_li.length >= 1){
			$(".all-category02 .depth03-pop").css({
				display:"block",
				top:position_y,
				left:position_x
			})
			$(".all-category02 .depth03-pop").find("ul li").remove();
			$(".all-category02 .depth03-pop").find("ul").append(this_li.clone());
		} else {
			$(".all-category02 .depth03-pop")
				.css({display:"none"})
				.find("ul li").remove();
		}
	})
	$(".all-category02 .depth03-pop").on("mouseleave",function(){
		$(".all-category02 td > ul > li").removeClass("on");
		$(".all-category02 .depth03-pop")
			.css({display:"none"})
			.find("ul li").remove();
	})
	$("#header .auto").on("click",function(){
		$(".all-category02 td > ul > li").removeClass("on");
		$(".all-category02 .depth03-pop")
			.css({display:"none"})
			.find("ul li").remove();
	})
	$(".all-category02 .btn-close").on("click",function(){
		$(".all-category02").hide();
		$(".all-category02 td > ul > li").removeClass("on");
		$(".all-category02 .depth03-pop")
			.css({display:"none"})
			.find("ul li").remove();
		return false;
	})
}
//2021-09-01 추가 -----------------------------------------
function init(){
	$(document).ready(function(e){
		slide();
		tab();
		headerScroll();
		category();
		recent();
		sideMenu();
		left_banner();
		depth03_pop();//2021-09-01 추가
	})
}
init();