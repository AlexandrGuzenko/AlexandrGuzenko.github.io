function getRandomInt(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var number = getRandomInt(0, 5);
var prevNum;

function getQuote(){
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
    $("article").eq(number).animate({opacity:1}, 1600);
	}	
}
$(document).ready(getQuote);
$("button").click(getQuote);