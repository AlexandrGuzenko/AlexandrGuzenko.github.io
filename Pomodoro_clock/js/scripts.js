var fill = document.getElementById('fill');
var rest = document.getElementById('rest');
var work = document.getElementById('work');
var timer = document.getElementById('timer');
var workTime = 3;
var restTime = 5;
rest.innerHTML = restTime;
work.innerHTML = workTime;
var session = false;
var active = false;
var breakSession = false;
var isBreak = false;
var interval = 0;
var seconds = workTime*60;
var secondsRest = restTime*60;
function getPercent(cur,tot){
	return Math.ceil((cur/tot)*10000)/100;
}
function convertToMinSec(num){
	let min = Math.floor(num/60);
	let sec;
	if (num%60 < 10){
		sec = '0' + num%60;
	}
	else{
		sec = num%60;
	}
	var minSec = min +':'+sec;
	return minSec;
}
timer.innerHTML =  convertToMinSec(workTime*60) ;




document.getElementById('active').onclick = function(){
	(active==false) ? active = true : active = false;
	(session==false && breakSession==false && isBreak==false) ? session = true : session = false;
	(session==false && breakSession==false && isBreak == true) ? breakSession = true : breakSession = false;
	workSess();
	breakSess();
	}
document.getElementById('min-rest').onclick = function(){
	if(active == false){
		restTime--;
		if (restTime < 1){
		restTime = 1;
		}
	}
	rest.innerHTML = restTime;
}
document.getElementById('max-rest').onclick = function(){
	if(active == false){
		restTime++;
		rest.innerHTML = restTime;
	}
}
document.getElementById('min-work').onclick = function(){
	if (active == false){
		workTime--;
		seconds = workTime*60;
		timer.innerHTML =  convertToMinSec(workTime*60) ;
		if (workTime < 1){
			workTime = 1;
			seconds = workTime*60;
			timer.innerHTML =  convertToMinSec(workTime*60) ;
		}
	}
	work.innerHTML = workTime;
	
	
}
document.getElementById('max-work').onclick = function(){
	if (active == false){
		workTime++;
		seconds = workTime*60;
		timer.innerHTML =  convertToMinSec(workTime*60) ;
	}
	work.innerHTML = workTime;
}

function workSess(){
	if(session){
		document.getElementById('active').style.boxShadow = '0 0 5px 2px green';
		document.getElementById('timer-name').innerHTML = 'Session';
		interval = setInterval(function(){
			seconds--;
			if(seconds<=0){
				session = false;
				breakSession = true;
				clearInterval(interval);
				breakSess();
			}
			timer.innerHTML =  convertToMinSec(seconds) ;
			fill.style.height = getPercent((workTime*60-seconds),workTime*60)+ '%';
			fill.style.backgroundColor = 'green';
		},1000);
	}
	else {
		clearInterval(interval);
	}
}
function breakSess(){
	if (secondsRest == 0){
		secondsRest = restTime*60;
	}
	if(breakSession){
		document.getElementById('active').style.boxShadow = '0 0 5px 2px red';
		isBreak = true;
		document.getElementById('timer-name').innerHTML = 'Break';
		interval = setInterval(function(){
			secondsRest--;
			if(secondsRest==0){
				isBreak = false;
				breakSession = false;
				session = true;
				seconds = workTime*60;
				clearInterval(interval);
				workSess();
			}
			timer.innerHTML =  convertToMinSec(secondsRest) ;
			fill.style.height = getPercent((restTime*60-secondsRest),restTime*60) + '%';
			fill.style.backgroundColor = 'red';
		},1000);
	}
}



