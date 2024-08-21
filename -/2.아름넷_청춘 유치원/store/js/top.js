$(document).ready(function(e){
	var footerPos=$(".footer").outerHeight();
	var topMakeHtml='<a href="javascript:" id="btnTop"></a>';
	var w = $(window).width();
	
	$("body").append(topMakeHtml);
	$("#btnTop").css({
		position:"fixed",
		zIndex:99,
		bottom:footerPos-20,
		bottom:100
	})
	TweenMax.set($("#btnTop"),{autoAlpha:0});
	$("#btnTop").on("click",function(e){
		TweenMax.to($("html,body"),1,{scrollTop:0,ease:Expo.easeOut})
	})
	$(window).on("scroll",function(e){
		var st=$(this).scrollTop();
		if(st>100){
			TweenMax.to($("#btnTop"),0.5,{autoAlpha:1})
		} else {
			TweenMax.to($("#btnTop"),0.5,{autoAlpha:0})
		}
	})	
	
	$("#btnTop").on("mouseenter",function(){$(this).addClass("on");})
	$("#btnTop").on("mouseleave",function(){$(this).removeClass("on");})
})
