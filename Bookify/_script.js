//common vars
var win = $(window);
var book = $('#book');
var modal = $('.modal');

$(document).ready(function(){
	
	//after everything is loaded, remove the loading screen
	$(window).load(function() {
		positionArrows();
		$('.loading-screen').remove();
	});

	autosize();
	
	var winW = 0;
	var winH = 0;
	
	win.resize(function(){
	
		var difW = Math.abs(win.width()-winW);
		var difH = Math.abs(win.height()-winH);
		
		positionArrows();
		
		modal.css({ left : $(document).width()/2-modal.width()/2});   //center modal
		if(difW>50||difH>50){
			winW = win.width();
			winH = win.height();
			autosize();
		}			
	});

	// Activate panning on mouse move
	$('.checkForPan').click(function(){
		checkForPan();
	});
	
	// Pan the pages menu
	/*
	var marLeft = 0;
	var lastX = 0;
   pagesContainer.mousemove(function(e){
   		var differenceX = Math.abs(e.pageX-lastX);
		if(differenceX>6){
			lastX = e.pageX;
			var thumbsW = $('.thumbScroller').width();
			var windowW = win.width();
			var marLeft = 0;
			marLeft = ((thumbsW-windowW)*(e.pageX/windowW))-100;
			$('.thumbScroller').css({'margin-left' : '-' + marLeft + 'px'});
		}
   }); 
   */

   // Javascript styling
	$('.blueBG').parent().css('background-color', $('.blueBG').css('background-color'));
	$('.tealBG').parent().css('background-color', $('.tealBG').css('background-color'));
	$('.greenBG').parent().css('background-color', $('.greenBG').css('background-color'));
	$('#book ul').css('padding-left','15px');
	$('.bgFade').css({'height' : '0px', 'display' : 'none'});
	$('.navStuff').css('width', book.width());
	$('.navStuff').css({'margin-left':'-445px', 'width': '891px'});
	$('.bookTOC').css('width', 	$('.bookTOC').parent().width());
	

	// Responsive Hovers
	// Icons
	$('.icon').mouseover(function(){
		$(this).stop();
		$(this).css('margin-top','-2px');
	});
	$('.icon').mouseout(function(){
		$(this).stop();
		$(this).css('margin-top','0px');
	});
	
	var pagesContainer = $('.pagesContainer');
	
	// Pages Menu
	$('.pages, .pagesContainer').mouseover(function(){
		pagesContainer.css('display', 'block');
		pagesContainer.stop();
		pagesContainer.animate({'height':'150px'},250);
	
	});
	$('.pages, .pagesContainer').mouseout(function(){
		pagesContainer.stop();
		pagesContainer.animate({'height':'0px'},250, function(){
			pagesContainer.hide();
		});
	});
	
	// Page Arrows, Shadow Hint
	$('.right-arrow').mouseover(function(){		
		if(b.book.width()<win.width()&&b.book.height()<win.height()){
			b.shadowHint();
			b.turning=true;
		}
	});
	
	$('.right-arrow').mouseout(function(){
		if(b.turning==true&&b.zoom!=2&&win.height()>book.height()){
			b.hideShadowHint();
		}
		b.turning=false;
	});

});