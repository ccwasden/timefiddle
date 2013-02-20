$(function(e){

});

function eventIsActive(event) {

	$(".event").each(function(i, obj){

		$(obj).removeClass("active");

	});

	$(event).addClass("active");

}