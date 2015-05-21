
// Create the hashmap
var inventory = {};
//Item list array (for easier selection)
var iList = [];

//Takes in a Item
//Adds it to the inventory if it doesn't exist
//increments it's count if it does exist 
function addItem(i){

	if (i.name in inventory){
    	inventory[i.name].Item.quantity += 1;
	}
	else {
		i.quantity = 1;  //Make sure quantity is 1
		inventory[i.name] = { Item: i }
	}
}

//Removes given Item from inventory
function removeItem(i){

	if (i.name in inventory){
    	inventory[i.name].Item.quantity -= 1;
	}

}

//Removes given Item from inventory
function updateinventory(){

	for (var x in inventory){
		if (inventory[x].Item.quantity <= 0){
			delete inventory[x];
		}
	}
}


function inventoryHandler(){
	//locate main canvas in document and clear
	var main_canvas = document.getElementById("main_screen");
	var context = main_canvas.getContext("2d");
	context.clearRect(0,0,500,500);

	//Draw main background
	var inventory_menu1 = new Image();
	inventory_menu1.src = "screens/inventory_screen.png";
	context.drawImage(inventory_menu1,0,0);

	context.font = "30px Papyrus";

	iList = [];
	for (var x in inventory) { 
		iList.push(x); 
	}

	//To display all Items 
	var yPlace = 110
	var y2Place = 110
	for (var x in iList){
		if (x < 7){
			context.fillText(iList[x] + "     x" + inventory[iList[x]].Item.quantity, 25, yPlace);
			yPlace += 50;
		} else {
			context.fillText(iList[x] + "     x" + inventory[iList[x]].Item.quantity, 275, y2Place);
			y2Place += 50;
		}
	}
}


