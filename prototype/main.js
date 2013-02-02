

// makes it so any element that has an "href" attribute becomes a link on click
$(document).click(function(eve){
	var cur = $(eve.target);
	while(cur.prop("tagName") != "BODY"){ // traverse parent elements
		var destination = cur.attr("href");
		if(destination) {
			window.location = destination;
			return;
		}
		cur = cur.parent(); //intended element was likely a few elements up
	}
});