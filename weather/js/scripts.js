var latitude;
var longitude;


//API Key = c836388686456c0ee398d13e347b9905



$(document).ready(function(){
	if (navigator.geolocation) {

  navigator.geolocation.getCurrentPosition(function(position) {
  	latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    $("#coord").html("Широта: " + Math.round((latitude)*10000)/10000 + "<br>Долгота: "
     + Math.round((longitude)*10000)/10000);


    $("#user-city").text(ymaps.geolocation.city);


    //https://openweathermap.org/img/w/50n.png
    

    var API = 
    "https://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="
    +longitude+"&appid=c836388686456c0ee398d13e347b9905";

	$.getJSON(API,function(data){
    $("#degrees").html(Math.round(data.main.temp-273) + " &#176C");
    $("#icon").html('<img src="https://openweathermap.org/img/w/'+data.weather[0].icon+'.png">')
    $("#humidity").html("Влажность: "+ data.main.humidity+"%");
    $("#pressure").html("Давление:"+data.main.pressure+"кПа");
    $("#wind").html("Скорость ветра: "+ data.wind.speed+"м/с");
      var sec = data.sys.sunrise;
      var date = new Date(sec * 1000);
      var timestr = date.toLocaleTimeString();
    $("#sunrise").html("Рассвет: " + timestr);
      sec = data.sys.sunset;
      date = new Date(sec*1000);
      timestr = date.toLocaleTimeString();
    $("#sunset").html("Закат: "+ timestr);
    $("body").css("display","block");
    $(".btn").click(function(){
      $(this).next(".more-info").toggle();
    });
})
});
}
});