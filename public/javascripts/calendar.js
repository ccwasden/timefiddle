$(document).ready(function() {
	var monthNames = ["January","February","March","April","May","June",
				"July","August","September","October","November","December"]
		
	var today = Date.today().clearTime();
	var curDay = today.clone().moveToFirstDayOfMonth();
	
	if(curDay.getDay() > 0) {
		curDay.moveToDayOfWeek(0, -1);
	}
	var calendar = $('' +
		'<table>' +
		'	<thead>'+
		'		<tr>' +
		'			<th colspan="5" class="cal_title">&nbsp;</th>' +
		'			<th><</th><th>></th>' +
		'		</tr>'+
		'	</thead>'+
		'	<tbody>' +
		'	</tbody>'+
		'</table>');
	
	var monthName = monthNames[today.getMonth()];
	var year = today.getUTCFullYear();
	calendar.find('.cal_title').html(monthName + " " + year);
	
	for(var row = 0; row < 5; row++) {
		var tr = $('<tr>');
		for(var col = 0; col < 7; col++) {
			var td = $('<td>');
			td.html(curDay.getDate());
			if(curDay.isBefore(Date.today().clearTime())) {
				td.addClass('cal_prevDate cal_disabled');
			} else {
				td.addClass('cal_selectable');
			}
			tr.append(td);
			curDay.addDays(1);
		}
		calendar.find('tbody').append(tr);
	}
	$('.calendar').html(calendar);
	
	$('.calendar td:not(.cal_disabled)').click(function(obj) {
		if($(this).hasClass('cal_selected')) {
			$(this).removeClass('cal_selected');
		} else {
			$(this).addClass('cal_selected');
		}
	});
});