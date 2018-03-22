var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var asteroids = [];
var fire = [];
var timer = 0;
var ship = {x:280, y:500};
asteroids.push({posX:(Math.random()*549), posY:(Math.random()*2 +2), speedX:1, speedY:(Math.random()*2 +2),coll:false});

var bg = new Image();
bg.src = 'img/bg.jpg';

var aster = new Image();
aster.src = 'img/meteor2.png';

var shipimg = new Image();
shipimg.src = 'img/ship.png';

var fireimg = new Image();
fireimg.src = 'img/fire.png';

bg.onload = function(){
	gameLoop();
}

canvas.addEventListener("mousemove", function(event){
	ship.x = event.offsetX -50;
	ship.y = event.offsetY -25;
	console.log(5);
})

function gameLoop(){
	update();
	render();
	requestAnimationFrame(gameLoop);
}

function update(){
	timer++;
	if(timer%10 == 0){
		asteroids.push({posX:(Math.random()*549), posY:-50, speedX:(Math.random()*2 -1), speedY:(Math.random()*2 +2),coll:false});
	}
	if (timer%20 == 0){
		fire.push({x:ship.x+35,y:ship.y-20,speedY:3,speedX:-0.5});
		fire.push({x:ship.x+37,y:ship.y-20,speedY:3,speedX:0});
		fire.push({x:ship.x+39,y:ship.y-20,speedY:3,speedX:0.5});
	}

	for(i in asteroids){
		asteroids[i].posY+= asteroids[i].speedY;
		asteroids[i].posX+= asteroids[i].speedX;

		if(asteroids[i].posX >550 || asteroids[i].posX<0){
			asteroids[i].speedX *= -1;
		}
		if(asteroids[i].posY > 630){
			asteroids.splice(i,1);
		}
		for(j in fire){
			if(Math.abs(asteroids[i].posX +25 - fire[j].x-15)<50 && Math.abs(asteroids[i].posY - fire[j].y)<25){
				asteroids[i].coll = true;
				fire.splice(j,1);
				break;
			}
		}
		if(asteroids[i].coll === true){
			asteroids.splice(i,1);
		}
	}
	for (i in fire){
		fire[i].y -= fire[i].speedY;
		fire[i].x +=fire[i].speedX;
		if(fire[i].y < -15){
			fire.splice(i,1);
		}
	}
}

function render(){
	ctx.drawImage(bg,0,0,600,600);
	ctx.drawImage(shipimg,ship.x,ship.y,100,50);
	for(i in asteroids){
		ctx.drawImage(aster,asteroids[i].posX,asteroids[i].posY,50,50);
	}
	for (i in fire){
		ctx.drawImage(fireimg,fire[i].x,fire[i].y,30,30);
	}	
}