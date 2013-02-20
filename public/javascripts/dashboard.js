$(function(e){

});

function eventIsActive(event) {

	$(".event").each(function(i, obj){

		$(obj).removeClass("active");

	});

	console.log($(event));

	$(event).addClass("active");

}