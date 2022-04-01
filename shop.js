//storefront and item js
//adam garcia
var itemRef = "item.html";
var buttonRef = "location.href=\'"+itemRef+"\'";

async function getOneItem(){
	var temp = {itm: sessionStorage.getItem("item")};
	const response = await fetch('/oneItem', {
        method: 'post',
        body:    JSON.stringify(temp),
        headers: { 'Content-Type': 'application/json' },
    });
	const data = await response.json();

	document.getElementById("itemImg").src = data.image;
	document.getElementById("itemName").innerHTML = data.item;
	document.getElementById("itemPrice").innerHTML = data.price;
	document.getElementById("itemDesc").innerHTML = data.desc;
}

async function getAllData(){
	const response = await fetch('/allItems');
	const data = await response.json();
	const grid = document.getElementById("grid");
	for (itm of data){
		var div = document.createElement("div");
		div.className = "item";
		div.id = itm.item;
		div.onclick=function() {storage(this.id)};
		var a1 = document.createElement("a");
		a1.href = itemRef;
		var img = document.createElement("img");
		img.src = itm.image;
		a1.append(img);
		var a2 = document.createElement("a");
		a2.href = itemRef;
		a2.innerHTML = itm.item;
		var p = document.createElement("p");
		p.innerHTML = itm.desc;
		var frm = document.createElement("form");
		frm.action=itemRef;
		var btn = document.createElement("input");
		btn.value = "View Product";
		btn.type = "submit";
		frm.append(btn);
		div.append(a1, a2, p, frm);
		var btn2 = document.createElement("button");
		btn2.onclick = "";
		grid.append(div);
	}
}

function storage(id) {
	sessionStorage.setItem("item", id);
}

function displayItem() {
	var ind = sessionStorage.getItem("item");
	document.getElementById("itemImg").src = ind.image;
	document.getElementById("itemName").innerHTML = ind.item;
	document.getElementById("itemPrice").innerHTML = ind.price;
	document.getElementById("itemDesc").innerHTML = ind.desc;
}