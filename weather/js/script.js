$(document).ready(function(){


	

	$.get(
		"http://api.openweathermap.org/data/2.5/weather",
		{
			"id": "491422",
			"appid":"c836388686456c0ee398d13e347b9905"
		},
		function (data){
			console.log(data);
		}


		);
})