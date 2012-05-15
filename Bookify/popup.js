
$(document).ready(function(){

	$('.pop').click(function(){  //when clicked get the height and width and set the pupup div to that size.
		var target = $(this).attr('data');
		
		var h = $('target').css('height');
		var w = $('.twoThirds').css('width');		//$(this).css('width');		
		var winHeight = $(window).height();
		$('.modal').css({'height': winHeight + 'px', 'width': '563px', 'display': 'block', 'top': '75px', 'opacity' : '1'}); //show the modal div
		var theHtml = '';
		var close ='';// '<div class="closeModal" style="position:absolute; cursor:pointer; right:15px; top:10px;">[x] Close</div>'; 
		if($(this).hasClass('tableOfContents')){
			var theID = $('#tableOfContents').html();
			$('.modal').css('width', '445px');
			$('.modalContents').css('width', '415px');
			$('.modalContents').html(close + theID); //else set element contents as modal contents
		}else{
			$('.modalContents').css('width', '533px');
			var theID = close + '<br /><br />' + $('.'+ $(this).attr('id')).attr('name') + '<br /><br /><span style="font-size:13px">' + $('.'+ $(this).attr('id')+'T').html() + '</span>';
			$('.modalContents').html(theID); //else set element contents as modal contents
			if($(window).height()<$('.modalContents').height()+15){
				$('.scrollableCopy').css('height', '75px !important');
			}
		}
		
		$('.modal').css({'left': $(document).width()/2-$('.modal').width()/2}); //center modal
		$('.bgFade').css({'display' : 'block', 'height' : $(document).height()});
		$('.close').click(function(){closeModel();});
	});
	
	$('.bgFade').click(function(){closeModel();});
	$('.closeModal').live('click', function(){closeModel();});
	
	function closeModel(){ //close modal
			$('.modal').hide();
			$('.bgFade').css({'height': '0px', 'display' : 'none'});
			$('.modalContents').html('');
	}
		
		
});