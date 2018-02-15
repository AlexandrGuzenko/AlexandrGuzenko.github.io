function getRandomInt(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var colors = ['#16a085', '#27ae60', '#2c3e50', 
'#f39c12', '#e74c3c', '#9b59b6', '#FB6964', 
'#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];

var number = getRandomInt(0, 5);
var prevNum;
var prevCol;

function getQuote(){
	var color = Math.floor(Math.random() * colors.length);
	if (color == prevCol){
		color = Math.floor(Math.random() * colors.length);
	}
	prevCol = color;

	console.log(color);
	$("html body").animate({
        backgroundColor: colors[color],
        color: colors[color]
      }, 800);
      $(".button").animate({
        backgroundColor: colors[color]
      }, 800);


	$("article").eq(number).animate(
	{opacity:0}, 800,after);
	function after (){
		$("article").eq(number).css("display","none");

	number = getRandomInt(0, 5);
	if(number == prevNum){
		number = getRandomInt(0, 5);
	}
	prevNum = number;
	
	$("article").eq(number).css("opacity","0");
    $('article').eq(number).css('display','block');
    $("article").eq(number).animate({opacity:1}, 800);
	}	
}
$(document).ready(getQuote);
$("button").click(getQuote);