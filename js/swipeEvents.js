$("body").swipe( {
    swipe:function(event, direction, distance, duration, fingerCount) {
       if ($(window).width() < 1400)
			$("body").swipe("disable");
       switch (direction)
       {
       	case "up":
       		swipeUpFct();
       	break;
       	case "down":
       		swipeDownFct();
       	break;
       	case "right":
       		swipeRightFct();
       	break;
       	case "left":
       		swipeLeftFct();
       	default:
       	break;
       }
     }
 });

 function swipeUpFct() { 	
	$('html, body').animate({scrollTop: $(window).scrollTop() + 600}, 1000);
 }

 function swipeDownFct() {
 	$('html, body').animate({scrollTop: $(window).scrollTop() - 600}, 1000);
 }

 function swipeRightFct() {
 	if (app.iterators.swipe < 7) app.iterators.swipe++;
 	else app.iterators.swipe = 0;
 	if (app.iterators.swipe != 0)
 		$filterAllMode = false;
 	else
 	{
 		$filterAllMode = true;
 	}
 	$("#options .option-set li:eq(" + app.iterators.swipe.toString() +") a").trigger("click");
 }

function swipeLeftFct() {
	if (app.iterators.swipe > 0) app.iterators.swipe--;
	else app.iterators.swipe = 7;
	if (app.iterators.swipe != 0)
 		$filterAllMode = false;
 	else
 	{
 		$filterAllMode = true;
 	}
	$("#options .option-set li:eq(" + app.iterators.swipe.toString() + ") a").trigger("click");
 }