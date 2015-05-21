
// Create the hashmap
var armory = {};
//Weapon list array (for easier selection)
var wList = [];

//Takes in a weapon
//Adds it to the armory if it doesn't exist
//increments it's count if it does exist 
function addWeapon(w){

	if (w.name in armory){
    	armory[w.name].weapon.wquantity += 1;
	}
	else {
		w.wquantity = 1;  //Make sure quantity is 1
		armory[w.name] = { weapon: w }
	}
}

//Removes given weapon from Armory
function removeWeapon(w){

	if (w.name in armory){
    	armory[w.name].weapon.wquantity -= 1;
	}

}

//Removes given weapon from Armory
function updateArmory(){

	for (var x in armory){
		if (armory[x].weapon.wquantity <= 0){
			delete armory[x];
		}
	}
}

//To equip a weapon based off of the current selection
function equipWeapon(selection){
	player.weapon = armory[wList[selection]].weapon;
}


function weaponDisplay(selection){
		//locate main canvas in document and clear
	var main_canvas = document.getElementById("main_screen");
	var context = main_canvas.getContext("2d");
	context.clearRect(0,0,500,500);

	//Draw main background
	var weapon_menu1 = new Image();
	weapon_menu1.src = "screens/weapon_screen.png";
	context.drawImage(weapon_menu1,0,0);

	//Draw weapon image
	var weapon_image = new Image();
	weapon_image.src = armory[wList[selection]].weapon.image;
	context.drawImage(weapon_image,295,150);

	context.font = "35px Papyrus";
	context.fillText(armory[wList[selection]].weapon.name, (240 - (armory[wList[selection]].weapon.name.length * 8)), 45);
	context.fillText(armory[wList[selection]].weapon.damage, 133, 150);
	context.fillText(armory[wList[selection]].weapon.cond + "/" + armory[wList[selection]].weapon.maxCond, 100, 273);
	context.fillText(armory[wList[selection]].weapon.wquantity, 140, 385);
}

function armoryHandler(selection){
	//locate main canvas in document and clear
	var main_canvas = document.getElementById("main_screen");
	var context = main_canvas.getContext("2d");
	context.clearRect(0,0,500,500);

	//Draw main background
	var armory_menu1 = new Image();
	armory_menu1.src = "screens/armory_screen.png";
	context.drawImage(armory_menu1,0,0);

	context.font = "30px Papyrus";

	wList = [];
	for (var x in armory) { 
		wList.push(x); 
	}

	//If user clicks a specific weapon
	if (selection != null){
		if (selection <= wList.length-1){
			current_screen = "weapon_display";
		}
	}

	//To display all weapons 
	var yPlace = 110
	var y2Place = 110
	for (var x in wList){
		if (x < 7){
			context.fillText(wList[x], 25, yPlace);
			yPlace += 50;
		} else {
			context.fillText(wList[x], 275, y2Place);
			y2Place += 50;
		}
	}
}


