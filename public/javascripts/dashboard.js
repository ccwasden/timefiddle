$(document).ready(function(){

	var events = $(".event");
	$(events[0]).addClass("active");
	
});


///Angular Controller for Dashboard///
function DashboardCtrl($scope) {

	$scope.events = [
		{
			eventID:"0", 
			name:"Birthday Party", 
			description: "Hey everyone, we need to get together for John’s 28th birthday. We want everyone there, so I made a Fiddle. Please respond soon, so we can get everything ready.",
			dateCreated:"Wed Feb 20th", 
			attendees:"12", 
			responses: "6"
		},
		{
			eventID:"1", 
			name:"TimeFiddle Meeting",
			description:"Let's get together for TimeFiddle meeting this week", 
			dateCreated:"Thu Feb 28th", 
			attendees:"6", 
			responses: "3"
		},
		{
			eventID:"2", 
			name:"Date Night", 
			description:"Hey babe, when do you want to do date night?",
			dateCreated:"Thu Feb 28th", 
			attendees:"8", 
			responses: "6"
		}
	];

	$scope.currentEvent = $scope.events[0];

	$scope.eventIsActive = function($event) {

		$(".event").each(function(i, event){
			$(event).removeClass("active");
		});
		$("#event"+$event.eventID).addClass("active");

		$scope.currentEvent = $event;

	}

	$scope.logCurrentEvent = function() {
		console.log($scope.currentEvent);
	}





}

