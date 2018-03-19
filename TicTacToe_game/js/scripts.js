var allblock = document.getElementsByClassName('block');
var game = document.getElementById('game');
var xOrO = document.getElementById('o-or-x');
var choosePlayer = document.getElementById('choose-player');
var menu = document.getElementById('menu');
var turnOne = document.getElementById('turn-1');
var turnTwo = document.getElementById('turn-2');
var win = document.getElementById('win');
var countMove = 0;
var AIMove = 0;
var firCount = 0;
var secCount = 0;
var move = 0;
var opacity = 1;
var opacityM = 0;
var opacityWin = 0;
var flag = true;
var isWorking = false;
var onePlayer = false;
var chooseX = false;
var posF = 0;
var posS = 0;

function firTurn(){
	let start = Date.now();
	let timer = setInterval(function(){
		var timePassed = Date.now() - start;
		if(timePassed > 500 ){
			clearInterval(timer);
			return;
		}
		posF = raise(turnOne,posF);
		posS = letDown(turnTwo,posS);
	},7);
}
function secTurn(){
	let start = Date.now();
	let timer = setInterval(function(){
		var timePassed = Date.now() - start;
		if(timePassed > 500 ){
			clearInterval(timer);
			return;
		}
		posS = raise(turnTwo,posS);
		posF = letDown(turnOne,posF);
	},7);
}
function raise(obj,pos){
	pos += 1.4;
	if(pos >50){
		
		pos = 50;
	}
	obj.style.top = '-'+ pos +'px';
	return pos;
}
function letDown(obj,pos){
	pos -=1.4;
	if(pos < 0){
		pos = 0;
	}
	obj.style.top = '-'+ pos +'px';
	return pos;
}
function clearGame(){
	for(let i = 0; i<9;i++){
		allblock[i].innerHTML = '';
		allblock[i].style.backgroundColor = 'rgba(0,0,0,0)';
	}
}
function drawMenu(){
	menu.style.display = 'flex';
	opacityM += 0.02;
	if (opacityM >1){
		opacityM = 1;
	}
	menu.style.opacity = opacityM;
}
function clearMenu(){
	opacityM -= 0.04;
	if (opacityM <=0){
		opacityM = 0;
		menu.style.display = 'none';
	}
	menu.style.opacity = opacityM;
}
function draw(nextObj){
	nextObj.style.display = 'block';
	opacity += 0.03;
	if(opacity>1){
		opacity =1;
		isWorking = false;
		return;
	}
	nextObj.style.opacity = opacity;
}
function clear(obj,next){
	if (flag){
		isWorking = true;
		opacity -= 0.04;
		if (opacity <=0){
			opacity = 0;
			obj.style.display= 'none';
			draw(next);
			flag = false;
			return;
		}
		obj.style.opacity = opacity;
	}
	else{
		draw(next);
	}
}
function drawWin(){
	win.style.display = 'block';
	opacityWin += 0.03;
	if(opacityWin > 0.85){
		opacityWin = 0.85;
	}
	win.style.opacity = opacityWin;

}
function clearWin(){
	opacityWin -= 0.03;
	if(opacityWin <=0){
		opacityWin = 0;
		win.style.display = 'none';
		for(let i = 0; i<9;i++){
			allblock[i].innerHTML = '';
			allblock[i].style.color = 'rgba(255,255,255,1)';
		}
		return;
	}
	for (let i = 0; i<9;i++){
		allblock[i].style.backgroundColor = 'rgba(0,0,0,'+opacityWin+')';
		allblock[i].style.color = 'rgba(255,255,255,'+opacityWin+')';
	}
	win.style.opacity = opacityWin;
}
function markWin(fir,sec,thi){
	allblock[fir].style.backgroundColor='red';
	allblock[sec].style.backgroundColor='red';
	allblock[thi].style.backgroundColor='red';
}
function checkWin(letter){
	if(allblock[0].innerHTML == letter && allblock[1].innerHTML == letter && allblock[2].innerHTML == letter){
		markWin(0,1,2);
		return true;
	} 
	if(allblock[3].innerHTML == letter && allblock[4].innerHTML == letter && allblock[5].innerHTML == letter){
		markWin(3,4,5);
		return true;
	}
	if(allblock[6].innerHTML == letter && allblock[7].innerHTML == letter && allblock[8].innerHTML == letter){
		markWin(6,7,8);
		return true;
	}
	if(allblock[0].innerHTML == letter && allblock[3].innerHTML == letter && allblock[6].innerHTML == letter){
		markWin(0,3,6);
		return true;
	}
	if(allblock[1].innerHTML == letter && allblock[4].innerHTML == letter && allblock[7].innerHTML == letter){
		markWin(1,4,7);
		return true;
	}
	if(allblock[2].innerHTML == letter && allblock[5].innerHTML == letter && allblock[8].innerHTML == letter){
		markWin(2,5,8);
		return true;
	}
	if(allblock[0].innerHTML == letter && allblock[4].innerHTML == letter && allblock[8].innerHTML == letter){
		markWin(0,4,8);
		return true;
	}
	if(allblock[2].innerHTML == letter && allblock[4].innerHTML == letter && allblock[6].innerHTML == letter){
		markWin(2,4,6);
		return true;
	}
}


function clearIntervalWin(){
	opacityWin = 0.85;
	let start = Date.now();
	let timer = setInterval(function(){
		var timePassed = Date.now() - start;
		if(timePassed > 500 ) {
			clearInterval(timer);
			(move%2 == 0)?firTurn():secTurn();
			return;
		}
		clearWin();
		posS = letDown(turnTwo,posS);
		posF = letDown(turnOne,posF);
	},10)
}
function drowIntervalWin(){
	let start = Date.now();
	let timer = setInterval(function(){
		var timePassed = Date.now() - start;
		if(timePassed > 500 ) {
			clearInterval(timer);
			setTimeout(clearIntervalWin,1500);
			return;
		}
		drawWin();
	},10)
}
function getButtons(){
	for (let i = 0; i< allblock.length;i++){
		allblock[i].onclick = function(event){
			if (move%2 == 0 && event.target.innerHTML == ""){
				event.target.innerHTML = 'x';
				move++;
				if(checkWin('x')){
					if(onePlayer && !chooseX){
						win.innerHTML = 'Computer win!';
						secCount++;
						document.getElementById('count-two').innerHTML = secCount;
					}
					else if (!onePlayer && chooseX){
						win.innerHTML = 'Player 1 win!';
						firCount++;
						document.getElementById('count-one').innerHTML = firCount;
					}
					else if(!onePlayer && !chooseX){
						win.innerHTML = 'Player 2 win!';
						secCount++;
						document.getElementById('count-two').innerHTML = secCount;
					}
					setTimeout(drowIntervalWin,1500);
					win.style.display = 'block';
					win.style.opacity = opacityWin;
				}
				firTurn();

			}
			else if (move%2 == 1 && event.target.innerHTML == ""){
				event.target.innerHTML = 'o';
				move++;
				if(checkWin('o')){
					if( onePlayer && chooseX ){
						win.innerHTML = 'You lose :)';
						secCount++;
						document.getElementById('count-two').innerHTML = secCount;
					}
					else if (!onePlayer && chooseX){
						win.innerHTML = 'Player 2 win!';
						secCount++;
						document.getElementById('count-two').innerHTML = secCount;
					}
					else if(!onePlayer && !chooseX){
						win.innerHTML = 'Player 1 win!';
						firCount++;
						document.getElementById('count-one').innerHTML = firCount;
					}
					setTimeout(drowIntervalWin,1500);
					win.style.display = 'block';
					win.style.opacity = opacityWin;
				}
				secTurn();
			}
			for (let j = 0; j<9;j++){
				if(allblock[j].innerHTML == ""){
					return;
				}
				else if(j == 8){
					win.innerHTML = 'It was a draw..';
					setTimeout(drowIntervalWin,1500);
					win.style.display = 'block';
					win.style.opacity = opacityWin;
				}
			}
		}
	}
}

document.getElementById('back').onclick = function() {
	if (isWorking == false){
		let start = Date.now();
		let timer = setInterval(function(){
			var timePassed = Date.now() - start;
			if(timePassed > 1500 || (opacity == 1 && flag == false)){
				flag = true;
				clearInterval(timer);
				return;
			}
			clear(xOrO,choosePlayer);
		},20)
	}
};
document.getElementById('one-player').onclick = function() {
	turnOne.innerHTML = 'Your move';
	turnTwo.innerHTML = 'computer&#39;s move';
//	win.innerHTML = 'It was a draw..'
	onePlayer = true;
	document.getElementById('computer').innerHTML = 'Computer';
	document.getElementsByClassName('choose-player-h')[1].innerHTML  = 'Would you like to be X or O?';
	if (isWorking == false){
		let start = Date.now();
		let timer = setInterval(function(){
			var timePassed = Date.now() - start;
			if(timePassed > 1500 || (opacity == 1 && flag == false) ) {
				flag = true;
				clearInterval(timer);
				return;
			}
			clear(choosePlayer,xOrO);
			AIGetButton ();
		},20)
	}
};
document.getElementById('two-player').onclick = function() {
	turnOne.innerHTML = 'Go player 1';
	turnTwo.innerHTML = 'Go player 2';
	onePlayer = false;
	document.getElementById('computer').innerHTML = 'Player 2';
	document.getElementsByClassName('choose-player-h')[1].innerHTML  = 'Player 1 : Would you like X or O?';
	if (isWorking == false){
		let start = Date.now();
		let timer = setInterval(function(){
			var timePassed = Date.now() - start;
			if(timePassed > 1500 || (opacity == 1 && flag == false)){
				flag = true;
				clearInterval(timer);
				return;
			}
			clear(choosePlayer,xOrO);
		},20)
	}
};
document.getElementById('x-player').onclick = function() {
	move = 0;
	chooseX = true;
	if (isWorking == false){
		let start = Date.now();
		let timer = setInterval(function(){
			var timePassed = Date.now() - start;
			if(timePassed > 1500 || (opacity == 1 && flag == false) ) {
				flag = true;
				clearInterval(timer);
				firTurn();
				return;
			}
			clear(xOrO,game);
			drawMenu();
		},20)
	}
};
document.getElementById('o-player').onclick = function() {
	move = 1;
	if (isWorking == false){
		let start = Date.now();
		let timer = setInterval(function(){
			var timePassed = Date.now() - start;
			if(timePassed > 1500 || (opacity == 1 && flag == false) ) {
				flag = true;
				clearInterval(timer);
				firTurn();
				return;
			}
			clear(xOrO,game);
			drawMenu();
		},20)
	}
};
document.getElementById('reset').onclick = function() {
	if (isWorking == false){
		let start = Date.now();
		let timer = setInterval(function(){
			var timePassed = Date.now() - start;
			if(timePassed > 1500 || (opacity == 1 && flag == false) ) {
				flag = true;
				clearInterval(timer);
				clearGame();
				return;
			}
			clear(game,choosePlayer);
			posS = letDown(turnTwo,posS);
			posF = letDown(turnOne,posF);
			win.style.display = 'none';
			opacityWin = 0;
			secCount = 0;
			firCount = 0;
			document.getElementById('count-one').innerHTML = firCount;
			document.getElementById('count-two').innerHTML = secCount;
			clearMenu();
			getButtons();
		},20)
	}
};
getButtons();


/* 
------------------------------------------------------------ А вот тут начинается самое мясо:)------------------------------------------------------------------------
 */




function checkAIWin(){
if(checkWin('o')){
	if(chooseX){
		win.innerHTML = 'You lose :)';
		secCount++;
		document.getElementById('count-two').innerHTML = secCount;
	}
	else if (!chooseX){
		win.innerHTML = 'You win!';
		firCount++;
		document.getElementById('count-one').innerHTML = firCount;
	}
	setTimeout(drowIntervalWin,1500);
	win.style.display = 'block';
	win.style.opacity = opacityWin;
	return true;
}
if(checkWin('x')){
	if(!chooseX){
		win.innerHTML = 'You lose :)';
		secCount++;
		document.getElementById('count-two').innerHTML = secCount;
	}
	else if (chooseX){
		win.innerHTML = 'You win!';
		firCount++;
		document.getElementById('count-one').innerHTML = firCount;
	}
	setTimeout(drowIntervalWin,1500);
	win.style.display = 'block';
	win.style.opacity = opacityWin;
	return true;
}
}
 function AIGetButton (){
 	for (let i = 0; i< allblock.length;i++){
		allblock[i].onclick = function(event){
			
			if(chooseX && event.target.innerHTML == ''){
				event.target.innerHTML = 'x';
			}
			else if(!chooseX && event.target.innerHTML == ''){
				event.target.innerHTML = 'o';
			}
			if(checkAIWin()){
				return;
			}
			AIEasy();
			secTurn();
			
		}
	}
 }

 function getRandomInt(){
 	countMove++;
 	if (countMove >150){
 		return false;
 	}
 	var num = Math.floor(Math.random() * 9);
 	if(allblock[num].innerHTML == '') { return num} else{
 		return getRandomInt();
 	} 
}


 function AIEasy(){
 	win.style.display = 'block';
 	win.style.opacity = 0;
 	countMove = 0;
 	AIMove = getRandomInt();
 	if(AIMove === false){
 		win.innerHTML = 'It was a draw..';
		setTimeout(drowIntervalWin,1500);
		win.style.display = 'block';
		win.style.opacity = opacityWin;
		return;
 	}
 	if(chooseX){
		setTimeout(function(){
 			allblock[AIMove].innerHTML = 'o';
 			win.style.display = 'none';
 			firTurn();
 			if(checkAIWin()){
				return;
			}
 		},700);
 	}
 	else{
		setTimeout(function(){
 			allblock[AIMove].innerHTML = 'x';
 			win.style.display = 'none';
 			firTurn();
 			if(checkAIWin()){
				return;
			}
 		},700);
 	}
 }