var arr = [], box, ei, ej;

//Загрузка вместе со страницей
window.onload = function () {
	box = document.getElementById("box");
	newGame();
	document.getElementById("reset").onclick = newGame;
}

//Нажатие на элемент
function cellClick(event) {
	var event = event || window.event,
		el = event.srcElement || event.target,
		i = el.id.charAt(0),
		j = el.id.charAt(2);
	if ((i == ei && Math.abs(j - ej) == 1) || (j == ej && Math.abs(i - ei) == 1)) {
		document.getElementById(ei + " " + ej).innerHTML = el.innerHTML;
		el.innerHTML = "";
		ei = i;
		ej = j;
		var q = true;
		for (i = 0; i < 4; ++i)
			for (j = 0; j < 4; ++j)
				if (i + j != 6 && document.getElementById(i + " " + j).innerHTML != i * 4 + j + 1) {
					q = false;
					break;
				}
		if (q) alert("Victory!");
	}
}


function newGame() {
	fetch('/Game', {
		method: 'POST',
		headers: {
			'Content-type': 'application/x-www-form-urlencoded'
		}
	}).then((res) => res.json())
		.then((obj) => {
			var table = document.createElement("table"),
				tbody = document.createElement("tbody");
			arr = obj.arr;
			ei = obj.ei;
			ej = obj.ej;
			table.appendChild(tbody);
			for (i = 0; i < 4; ++i) {
				var row = document.createElement("tr");
				for (j = 0; j < 4; ++j) {
					var cell = document.createElement("td");
					cell.id = i + " " + j;
					cell.onclick = cellClick;
					cell.innerHTML = arr[i][j];
					row.appendChild(cell);
				}
				tbody.appendChild(row);
			}
			if (box.childNodes.length == 1)
				box.removeChild(box.firstChild);
			box.appendChild(table);

		});
}


function table() {
	var table = document.createElement("table"),
		tbody = document.createElement("tbody");
	box.innerHTML = '';
	table.appendChild(tbody);
	for (i = 0; i < 4; ++i) {
		var row = document.createElement("tr");
		for (j = 0; j < 4; ++j) {
			var cell = document.createElement("td");
			cell.id = i + " " + j;
			cell.onclick = cellClick;
			cell.innerHTML = arr[i][j];
			row.appendChild(cell);
		}
		tbody.appendChild(row);
	}
	if (box.childNodes.length == 1)
		box.removeChild(box.firstChild);
	box.appendChild(table);
}