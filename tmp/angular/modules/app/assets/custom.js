//http://jqbook.narod.ru/jquery/Effects.htm

$(document).ready(function(){

		if(typeof(sessionStorage[window.location.href])=="undefined"){ //hor menu anim if page not visited
			$("li:first-child").fadeTo("fast",1, function () {
				$(this).next().fadeTo("fast",1,arguments.callee); 
			}); 
			sessionStorage[window.location.href]=1; 
		} else {													//not animation if visited more than one times
			$("li").animate({opacity:'1'},1);
		}
		
		if (typeof(sessionStorage.selected_hormenu)=="undefined") {sessionStorage.selected_hormenu="Technology";}//default menu
		var name_="li"+" "+"#"+sessionStorage.selected_hormenu;//mark menu
		$(name_).css('border-bottom-style','solid');
		$(name_).css('border-bottom-width','4px');
		$(name_).css('border-bottom-color','#a7dbd8');

		$("li.hor").click(function() {sessionStorage.selected_hormenu=this.id;}); //save name of visited page
		
		

		$("li.portfolio").fadeTo("slow",1);

		$(".logo").fadeTo("slow",1); 
		$(".divider").fadeTo("slow",1);
		
		$(".nav li a").mouseover(function(){
			$(this).fadeTo("fast",0.2);
		});
		$(".nav li a").mouseout(function(){
			$(this).fadeTo("fast",1);
		});

		
	//gallery animation
		$(".photo a span").mouseover(function(){
			$(this).fadeTo("fast",0.5);
		});
		$(".photo a span").mouseout(function(){
			$(this).fadeTo("fast",1);
		});
		  
		$(".photo a span img").mouseover(function(){
			$(this).fadeTo("slow",0.2);
		});
		$(".photo a span img").mouseout(function(){
			$(this).fadeTo("slow",1);
		});
		
	//gallery resize
		function divresize(block, headerHeight, footerHeight) {
			var	width_of_pic=190;
			var windowWidth = $(window).width(); //определяем ширину окна браузера
			//var blockWidth = $(block).width(); //определяем ширину окна браузера
			var num_of_block=Math.floor(windowWidth/width_of_pic);
			var gallery_width=num_of_block*width_of_pic;
			var left_offset=(windowWidth-gallery_width)/2;
			$(block).css('margin-left', left_offset); 
		}
		divresize('.gallery', 100, 100); //вызываем функцию изменения размера блока
		$(window).bind("resize", function(){ //при изменении размера окна вызываем функцию
			divresize('.gallery', 100, 100); 
		});
		
});
