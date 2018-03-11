var currentScr = document.getElementById('current');
var historyScr = document.getElementById('history');
var button = document.getElementsByTagName('button');

function add (first,second){
	return Number(first) + Number(second);
}
function deduct(first,second){
	return first - second;
}
function devide(first,second){
	return (Math.ceil((first / second)*10000)/10000);
}
function multiply(first,second){
	return first * second;
}
for (let i = 0; i<button.length;i++){
	button[i].onclick = function(){

	currentScr.innerHTML += button[i].value;
	if(currentScr.innerHTML.split('')[0] == 0 && currentScr.innerHTML.split('')[1] != '.'){
		var oldInput = currentScr.innerHTML.split('');
		var shifted = oldInput.shift();
		var newInput = oldInput.join('');
		currentScr.innerHTML = newInput;
	}
	if (currentScr.innerHTML.split('')[0] == '+' || currentScr.innerHTML.split('')[0] == '-' || currentScr.innerHTML.split('')[0] == '*' || currentScr.innerHTML.split('')[0] == '/'){
		currentScr.innerHTML = 0;
	}
	if (currentScr.innerHTML.split('').length > 8){
		currentScr.innerHTML = 0;
		historyScr.innerHTML = 'Digit Limit';
	}
	if (button[i].value == 'ce'){
		currentScr.innerHTML = '0';
	}
	if (button[i].value == 'ac'){
		currentScr.innerHTML = '0';
		historyScr.innerHTML = '';
	}
	for (let j = 0; j<currentScr.innerHTML.split('').length;j++){
		if (currentScr.innerHTML.split('')[j] == '+' || currentScr.innerHTML.split('')[j] == '-' || currentScr.innerHTML.split('')[j] == '*' || currentScr.innerHTML.split('')[j] == '/'){
			if(currentScr.innerHTML.split('')[j-1] == '+' || currentScr.innerHTML.split('')[j-1] == '-' || currentScr.innerHTML.split('')[j-1] == '*' || currentScr.innerHTML.split('')[j-1] == '/'){
				var oldInput = currentScr.innerHTML.split('');
				var deleted = oldInput.splice(j-1,1);
				var newInput = oldInput.join('');
				currentScr.innerHTML = newInput;
			}
		}
	}

	if (button[i].value == '='){
		var oldInput = currentScr.innerHTML.split('');
		var number = [];
		var newArr = [];
		var index = 0;

		//тут я привожу инпут к читаемому виду для математических операций (["99", "+", "66", "="])
		for (let j = 0; j<oldInput.length;j++){
			if (oldInput[j] == '+' || oldInput[j] == '-' || oldInput[j] == '/' || oldInput[j] == '*' || oldInput[j] == '='){
				number = '';	
				for (let jj = index; jj < j;jj++){
					number += Number(oldInput[jj]);
				}
				index = j +1;
				newArr.push(number);
				newArr.push(oldInput[j]);
			}
		}
		newArr.pop();
		function firstAns(arr){
			for( let j = 0; j<arr.length;j++){
				if (arr[j] == '/'){
					arr.splice(j-1,3,devide(arr[j-1],arr[j+1]));
					firstAns(arr);
					break;
				}
				if (arr[j] == '*'){
					arr.splice(j-1,3,multiply(arr[j-1],arr[j+1]));
					firstAns(arr);
					break;
				}
			}
			return  arr
		}
		function secondAns(arr){
			for( let j = 0; j<arr.length;j++){
				if (arr[j] == '+'){
					arr.splice(j-1,3,add(arr[j-1],arr[j+1]));
					secondAns(arr);
					break;
				}
				if (arr[j] == '-'){
					arr.splice(j-1,3,deduct(arr[j-1],arr[j+1]));
					secondAns(arr);
					break;
				}
			}
			return  arr
		}

		newArr = firstAns(newArr);
		newArr = secondAns(newArr);
		console.log(newArr);
		currentScr.innerHTML = newArr;
		historyScr.innerHTML = newArr;
	}
	
	};
}