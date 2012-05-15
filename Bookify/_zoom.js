function checkForPan(){

	if(b.book.width()>win.width()||b.book.height()>win.height()){
		book.draggable();
		if($.browser.msie)
			book.css({'cursor' : 'all-scroll'});				
		else
			book.css({'cursor' : 'url(img/hand.gif), auto'});				
	}else{
		book.css({'cursor' : 'auto'});				
		book.draggable('destroy');
	}
		
	book.css({'top' : '0px', 'bottom' : '0px', 'left' : '', 'right' : ''});				
	win.scrollTop(0);
	win.scrollLeft(0);
	// Reset arrows
	positionArrows();
	// Reset pg nums
	$('.pageNum').width(b.width*b.zoom-60);
}		



//ZOOM RELATED FUNCTIONS 

// call on load and on window resize
function autosize () {
	var w = win.width();
	var h = win.height();
	
	if(w<847||h<603){
		zoomBy(.5);
	}else if(w<1116||h<788){
		zoomBy(.75);
	}else{
		zoomBy(1);
	}
	
}

// zoom by a generic 'in' or 'out'
function zoomInOut (dir) {

	var z = 0;
	
	// Based on the current zoom lever, zoom to appropriate next step
	if(dir==='out'){
	
		if(b.zoom===2){
			z = 1;
		}else if(b.zoom===1){
			z = .75;
		}else if(b.zoom===.75){
			z = .5;
		}else{
			z = b.zoom;
		}
		
	}else if(dir ==='in'){
	
		if(b.zoom===.5){
			z = .75;
		}else if(b.zoom===.75){
			z = 1;
		}else if(b.zoom===1){
			z = 2;
		}else{
			z = b.zoom;
		}
		
	}
	
	zoomBy(z);
	
}
	
// zoom book by ratio
function zoomBy (r) {

	var style = $('.bookyStylesheet');
	var nav = $('.navStuff');
	
	if(r===b.zoom){
		// Its the same zoom level, do nothing
	}else{
	
		// need to re-center book if its zooming out
		if(r<b.zoom){
			book.css({'margin-left' : 'auto','margin-right' : 'auto','margin-top' : '0', 'margin':'0 auto', 'top' : '0px'});
		}
		
		// determine with stylesheet to use
		if(r===.5){
			style.attr('href', 'original_style_50_percent.css');
			nav.css({'margin-left':'-315px', 'width': '628px'});	
		}else if(r===.75){
			style.attr('href', 'original_style_75_percent.css');
			nav.css({'margin-left':'-445px', 'width': '891px'});
		}else if(r===1){
			style.attr('href', 'original_style.css');
			book.css({'margin-left' : 'auto','margin-right' : 'auto','margin-top' : '0', 'margin':'0 auto'});
		}else if(r===2){
			style.attr('href', 'original_style_plus_one.css');
		}
		
		// reset shadow, set zoom level, bookify, and hide shadow (it would show if caught mid animation)
		$('.shadow').remove();
		b.zoom = r;
		b.bookify();
		$('.shadow').hide();
		
	}
	
	checkForPan();
}

// Recenter Arrows, called in zoom function and on window resize
function positionArrows(){

	if(b.book.width()>win.width()){
		$('.navArrows').css({'width': win.width(), 'left':'0px'});
	}else{
		var arrows = $('.navArrows');
		arrows.css({'width': b.book.width()+70});
		arrows.css({'left': win.width()/2-$('.navArrows').width()/2});
		arrows.css({'height': b.book.height()});
	}		
	book.css('top', '0px');
}