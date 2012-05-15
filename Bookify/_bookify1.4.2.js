var Booky = (function ($){

	var Booky = {
	
		// Properties
		book : undefined,
		pages : 0,
		pageCount : 0,
		curr : 1,
		forw : 2,
		prev : 1,
		pageNum : 1,
		width : 955,
		height : 650,
		hashNum : 1,
		autoPlay : false,
		delay : 3000,
		rotate : false,
		hover : false, 
		duration : 500,
		zoom: 1,
		turning : false,
		
				
		
		// Methods
		
		//  Render book
		
		bookify : function(){
			w = Booky.width*Booky.zoom;
			h = Booky.height*Booky.zoom;
			Booky.book.css('width', w+'px');
			Booky.book.css('height', h+'px');
			$('.bookTOC').css('width', 	w-60);
	
			Booky.initShadow();
			for(var i=Booky.pages.length;i>=0;i--){
				var newID = 'p'+i;
				var j = $(Booky.pages[i-1]);
				j.attr('id',newID);
				
				// Stack pages correctly
				j.css({'height' : h+'px', 'width' : w+'px', 'position' : 'absolute', 'z-index' : Booky.pages.length-i}); 
			}
			
			Booky.updateOrder();
			
		},    // end bookify
		
		
		// Turns to a page
		turnTo : function(target){
		 if($('#p3').hasClass('curr')&&target==='next'){
			Booky.duration = 3000;
		 }else{
			Booky.duration = 500;
		 }
			$('.inactive').css('width', '0px');
			w= Booky.width*Booky.zoom;
			// Determine Target
			var t;
			if(target == 'prev'){
				t=Booky.pageNum-1;
			}else if(target == 'next'){
				t=Booky.pageNum+1;
			}else if(target.length<3){
				t = parseInt(target);
				}
			
			// If user goes back in book
			if(t<Booky.pageNum&&t>0){
			Booky.pages.children().css('float', 'right');
			
				back.removeClass('back');
				$('#p'+t).attr('class', 'page back');
				back = $('.back');
				Booky.shadow('b');
				back.stop(false,true);
				back.animate({width:w},Booky.duration, function(){
					Booky.pages.children().css('float', '');
					Booky.pageNum = t;
					Booky.updateOrder();
				});
			// if user goes forward in book
			}else if(t>Booky.pageNum){
				if(t==Booky.pages.length+1){
				}else if($('#p'+t).hasClass('forw')){
					var val=t-1;
					
					Booky.shadow('f');
					
					$('#p'+val).stop(false,true);
					$('#p'+val).animate({width:0},Booky.duration, function(){
						Booky.pageNum = t;
						Booky.updateOrder();
					});
				
					}			
				else{
					forw.css('width', '0px');
					forw.removeClass('forw');
					$('#p'+t).addClass('forw');
					forw = $('.forw');
					forw.removeClass('inactive');
					forw.css('width',w);
					var val=t-1;
				
					Booky.shadow('f');
					$(curr).stop(false, true);
					$(curr).animate({width:0},Booky.duration, function(){
						Booky.pageNum = t;
						Booky.updateOrder();
					});
					
				}
			}
		},    // end nextPage
		
		// Set Up Methods
		
		updateOrder : function(){
	
			var targPg = 'p'+Booky.pageNum;
			var prevPg = 'p'+(Booky.pageNum-1);
			var nextPg = 'p'+(Booky.pageNum+1);
			w= Booky.width*Booky.zoom;
			for(var i=Booky.pages.length;i>=0;i--){
				var affectedID = 'p'+i;
				if(i<Booky.pageNum-1){
					var j = $('#'+affectedID);
					j.css('width','0px');
					j.attr('class','inactive-viewed page');
					j.removeClass('inactive');
				}else if(i>Booky.pageNum+1){
					var j = $('#'+affectedID);
					j.css('width', w+'px');
					j.attr('class','inactive page');	
					j.removeClass('inactive-viewed');
				}
			}
			
			$('#'+targPg).attr('class', 'page curr');
			$('#'+nextPg).attr('class','page forw');
			$('#'+prevPg).attr('class','page back');
			$('.curr, .forw, .back').css('display','block');
			curr = $('.curr');
			forw = $('.forw');
			back = $('.back');
			curr.css('width',w+'px');
			forw.css('width', w+'px');
			back.css('width','0px');
	
			if(Booky.book.width()>$(window).width()){
				$('.navArrows').css({'width': $(window).width(), 'left':'0px'});
				
				
			}else{
				$('.navArrows').css({'width': Booky.book.width()+70});
				$('.navArrows').css({'left': $(document).width()/2-$('.navArrows').width()/2});
				$('.right-arrow, .left-arrow').css({'height': Booky.book.height()});
				
			}
			$('.shadow').css('display', 'none');
			positionArrows();
		},  // end updateOrder
		
		initShadow : function(){
			theBook = Booky.book;
			theBook.prepend('<div class="shadow"><div class="shadowL"><div class="gradient" /></div><div class="shadowC" /><div class="shadowR"><div class="gradient" /></div></div>');
			$('.shadow')
				.css('margin-right','-200px')
				.css('right','0px');
				
			bH = Booky.height*Booky.zoom;
			$('.shadowL').css('height',bH+'px');
			$('.shadowR').css('height',bH+'px');
			$('.shadowL').css('opacity','0');
			$('.shadowR').css('opacity','0');
		},   // end initShadow
		
		shadow : function(dir){
			var z1 = 1000*Booky.zoom;
			var z2 = 600*Booky.zoom;
			var z3 = 200*Booky.zoom;			
			var z4 = 400;
			var z5 = 200*Booky.zoom+((Booky.zoom-1)*200);
			
			var s = $('.shadow');
			var sL = $('.shadowL');
			var sR = $('.shadowR');
			var sC = $('.shadowC');
			
			var w = Booky.width*Booky.zoom;
				sL.stop();
				sR.stop();
				sC.stop();
				s.stop();
				$('.curr').stop();
			if(Booky.turning==false){
				s.css({'margin-left' : '', 'margin-right' : '', 'left' : '', 'right' : '', 'display' : 'block'});
			}
			
			
			if(dir=='f'){	
			
				negativeMargin = 0-z5;
				if(Booky.turning==false){
					sL.css('opacity','0');
					sR.css('opacity','.25');
					sC.css('width','0px');
				}
				
				if(Booky.zoom==.5){
				
					if(Booky.turning===false){
						s.css({'margin-right' : '-200px', 'right' : '0px', 'width' :'400px'});
					}
					Booky.turning=false;
					s.animate({right: 375, 
						width:850}, 
						Booky.duration);
				}else if(Booky.zoom==.75){
				w = Booky.width*Booky.zoom+100;
					if(Booky.turning===false){
						s.css({'margin-right' : '-200px', 'right' : '0px', 'width' : z4+ 'px'});
					}
					Booky.turning=false;
					s.animate({right: w -100, 
						width:850}, 
						Booky.duration);
				}else{
					if(Booky.turning===false){
					s.css({'margin-right' : negativeMargin +'px', 'right' : '0px', 'width' : z4+ 'px'});
					}
				Booky.turning=false;
					s.animate({right: w , 
						width:1000*Booky.zoom}, 
						Booky.duration);
				}

				sL.animate({opacity:1},(Booky.duration));
				sR.animate({opacity:.75},(Booky.duration),function(){
					sR.animate({opacity:0},200,function(){
						s.css('width', z4+'px');
						sC.css('width','0px');
						s.css('display', 'none');
						
					});
				});
				sC.animate({width:z2+'px'},(Booky.duration));
				
			}else if(dir=='b'){
			s.css({'margin-left' : '', 'margin-right' : '', 'left' : '', 'right' : '', 'display' : 'block'});
			negativeMargin = 0-z5;
			
			sC.css('width', z2 + 'px');
			sR.css('opacity','0');
			sL.css('opacity','1');
			
			if(Booky.zoom==.5){
				s.css({width: 850, right:375, marginRight : '-200px'});
		
				s.animate({right:0-100,width:400},Booky.duration);
			}else if(Booky.zoom==.75){
				s.css({width: 850, right:w-100, marginRight : '-200px'});
		
				s.animate({right:0-100,width:z4},Booky.duration);
			}else{
				s.css({width: z1, right:w, marginRight : negativeMargin});
		
				s.animate({right:0,width:z4},Booky.duration);
			}
			sC.animate({width:0},(Booky.duration));
			s.animate({right:0,width:z4},Booky.duration);
			sR.animate({opacity:.5},(Booky.duration));
			sL.animate({opacity:0},(Booky.duration),function(){
				s.css('display', 'none');
				turning=false;
			});
			
		
			}
		},  // end shadow
		
		shadowHint : function(){
			if(Booky.pageNum!=5){
				var z1 = 1000*Booky.zoom;
				var z2 = 600*Booky.zoom;
				var z3 = 200*Booky.zoom;			
				var z4 = 400;
				var z5 = 200*Booky.zoom+((Booky.zoom-1)*200);
				
				var s = $('.shadow');
				var sL = $('.shadowL');
				var sR = $('.shadowR');
				var sC = $('.shadowC');
				
				var w = Booky.width*Booky.zoom;
					sL.stop();
					sR.stop();
					sC.stop();
					s.stop();
					$('.curr').stop();
				s.css({'margin-left' : '', 'margin-right' : '', 'left' : '', 'right' : '', 'display' : 'block'});
				
			
				negativeMargin = 0-z5;
				sL.css('opacity','0');
				sR.css('opacity','.25');
				sC.css('width','0px');
				
				if(Booky.zoom==.5){
				w = Booky.width*Booky.zoom+100;
					s.css({'margin-right' : '-200px', 'right' : '0px', 'width' : z4+ 'px'});
					
					s.animate({right: 100, 
						width:500}, 
						250);
				}else if(Booky.zoom==.75){
				w = Booky.width*Booky.zoom+100;
					s.css({'margin-right' : '-200px', 'right' : '0px', 'width' : z4+ 'px'});
					
					s.animate({right: 100, 
						width:500}, 
						250);
				}else{
				
					s.css({'margin-right' : negativeMargin +'px', 'right' : '0px', 'width' : z4+ 'px'});
					s.animate({right: 100, 
						width:500}, 
						250);
				}

				sL.animate({opacity:.25},250);
				sR.animate({opacity:.75},250);
			
				sC.animate({width:100},250);
				$('.curr').animate({width:$('.curr').width()-100},250);
				
			}
		},  // end shadow hint
		
		hideShadowHint : function(){
			var z1 = 1000*Booky.zoom;
			var z2 = 600*Booky.zoom;
			var z3 = 200*Booky.zoom;			
			var z4 = 400;
			var z5 = 200*Booky.zoom+((Booky.zoom-1)*200);
			
			var s = $('.shadow');
			var sL = $('.shadowL');
			var sR = $('.shadowR');
			var sC = $('.shadowC');
			
			var w = Booky.width*Booky.zoom;
				sL.stop();
				sR.stop();
				sC.stop();
				s.stop();
				$('.curr').stop();
			if(Booky.zoom==.75){
			w = Booky.width*Booky.zoom+100;

				s.animate({right: 0, 
					width:400}, 
					250);
			}else{
			
				s.animate({right: 0, 
					width:400}, 
					250);
			}

			sL.animate({opacity:0},250);
			sR.animate({opacity:.75},250);
		
			sC.animate({width:0},250);
			$('.curr').animate({width:$('#book').width()},250, function(){
				s.css('display', 'none');
			});
			
		}  // end shadow hint
		
	}
	
	// The Constructor
	return function(args){
		// check if args is empty, if not, modify Booky here
		Booky.book = (args.book != null) ? args.book : alert('you must input an item to bookify.'); ;
		Booky.pages = (args.pages != null) ? args.pages : Booky.book.children();
		Booky.pageCount = (args.pageCount != null) ? args.pageCount : Booky.book.children().count;
		Booky.width = (args.width != null) ? args.width : Booky.width ;
		Booky.height = (args.height != null) ? args.height : Booky.height ;
		Booky.autoPlay = (args.autoPlay != null) ? args.autoPlay : Booky.autoPlay ;
		Booky.delay = (args.delay != null) ? args.delay : Booky.delay ;
		Booky.rotate = (args.rotate != null) ? args.rotate : Booky.rotate ;
		Booky.hover = (args.hover != null) ? args.hover : Booky.hover ;
		Booky.duration = (args.duration != null) ? args.duration : Booky.duration ;		
		Booky.zoom = (args.zoom != null) ? args.zoom : Booky.zoom ;		
		
		return Booky;
	}
	
})(jQuery);


