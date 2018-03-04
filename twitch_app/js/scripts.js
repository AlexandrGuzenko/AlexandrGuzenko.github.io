var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
var parent = document.getElementById('channels');
function makeUrl(type,channel){
	return 'https://wind-bow.gomix.me/twitch-api/' + type + '/' + channel + '?callback=?';
}
function showOnline(){
		var online = document.getElementsByClassName('online');
		var offline = document.getElementsByClassName('offline');
		for(let i = offline.length-1; i>=0;i-- ){
			offline[i].classList.add('hide');
		}
		for(let i = online.length-1; i>=0;i-- ){
			online[i].classList.remove('hide');
		}

	}

	function showOffline(){
		var online = document.getElementsByClassName('online');
		var offline = document.getElementsByClassName('offline');
		for(let i = online.length-1; i>=0;i-- ){
			online[i].classList.add('hide');
		}
		for(let i = offline.length-1; i>=0;i-- ){
			offline[i].classList.remove('hide');
		}
		
	}

	function showAll(){
		var online = document.getElementsByClassName('online');
		var offline = document.getElementsByClassName('offline');
		for(let i = offline.length-1; i>=0;i-- ){
			offline[i].classList.remove('hide');
		}
		for(let i = online.length-1; i>=0;i-- ){
			online[i].classList.remove('hide');
		}
		
	}
$(document).ready(function(){
	for (let i = 0; i < channels.length; i++){
		$.getJSON(makeUrl('channels',channels[i]), function(data){
			$.getJSON(makeUrl('streams',data.name), function(trip){
				if (trip.stream != null || trip.stream != undefined){
					var div = document.createElement('div');
		div.innerHTML = '<div class="row channel online"> <div class="col-2" id="logo"><img src="'+data.logo
		+'"></div> <div class="col-10 col-sm-3">' 
		+ data.display_name + '</div> <div class="col d-none d-sm-block online">'+ trip.stream.channel.status +'</div></div>';
		parent.appendChild(div);
				}
				else{
					var div = document.createElement('div');
		div.innerHTML = '<div class="row channel offline"> <div class="col-2" id="logo"><img src="'+data.logo+'"></div> <div class="col-10 col-sm-3">' 
		+ data.display_name + '</div> <div class="col d-none d-sm-block">offline</div></div>';
		parent.appendChild(div);
				}
			})
		})	
	};
	
});