$(document).ready(function(){
	var articleList = document.getElementById('articleList');
	var div  = document.createElement('div');
	var isntFirst = false;

	$('#search-btn').click(function(){
		if($('#search-text').val() === ''){
			alert("напишите название статьи");
		}
		else{
		var searchText = $('#search-text').val();
		}
		if (isntFirst) {
			var ner = articleList.getElementsByTagName('div');
			articleList.removeChild(ner[0]);
			console.log(ner);
		}		
		var div  = document.createElement('div');
		articleList.appendChild(div);
		$.ajax({
			type: 'GET',
			dataType: 'json',
			acync: true,
			url: 'https://ru.wikipedia.org/w/api.php?action=opensearch&search=' + searchText + '&callback=?',
			success: function (data){
				console.log(data);
				isntFirst = true;
				for (var i = 0; i<data[1].length;i++){
					var article = document.createElement('div');
					article.className = 'col-10';
					article.id = 'article';
					article.innerHTML = '<a href="' +data[3][i]+ ' "target="_blank"> <h3>' +data[1][i]+
					 '</h3> <p>' +data[2][i]+ '</p></a>';
					div.appendChild(article);
				}
			},
			error: function(err){
				alert('Ошибочка вышла:)')
			}
		});
		
	});
});
