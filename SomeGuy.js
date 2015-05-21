//SomeGuy Adventure
//By Branden Rodgers

//VARIABLES
GameSpeed = 50;

player_selection = null;      //For inventory and other selections
current_screen = "home";   //To decide which screen/menu to display

//Player Variabled
max_health = 30;          //Total player health
max_water = 5;            //Total player water

//for delaying sleep screen
sleep_timer = 30;


//////////////// LOAD IMAGES //////////////////////////////////
//Load screens
if (document.images)
{
	var img = new Array();
	img[0] = new Image();
	img[0].src = 'screens/main_menu.png';
	img[1] = new Image();
	img[1].src = 'screens/adventure_screen.png';
	img[2] = new Image();
	img[2].src = 'screens/path_activity_screen.png';
	img[3] = new Image();
	img[3].src = 'screens/fight_screen.png';
	img[4] = new Image();
	img[4].src = 'screens/sleep_screen.png';
	img[5] = new Image();
	img[5].src = 'screens/armory_screen.png';
	img[6] = new Image();
	img[6].src = 'screens/weapon_screen.png';
}

//Load weapon images
if (document.images)
{
	var weapon_img = new Array();
	img[0] = new Image();
	img[0].src = 'weapon_images/stick.png';
}

//////////////////// OBJECTS ///////////////////////////////
function guy(name, weapon, health, gold, water, level){
	this.name = name;
	this.weapon = weapon;
	this.health = health;
	this.gold = gold;
	this.water = water;
	this.level = level;
}

function enemy(name, health, damage, item){
	this.name = name;
	this.health = health;
	this.damage = damage;
	this.item = item;
}


function weapon(name, damage, cond, maxCond, wquantity, image){
	this.name = name;
	this.damage = damage;
	this.cond = cond;
	this.maxCond = maxCond;
	this.wquantity = wquantity;
	this.image = image;
}


function item(name, price, quantity){
	this.name = name;
	this.price = price;
	this.quantity = quantity;
}

//////////////////// WEAPONS //////////////////////////////

//Weapom images
var stick_image = 'weapon_images/stick.png';
var wspear_image = 'weapon_images/wood_spear.png';
var wsword_image = 'weapon_images/wood_sword.png';
var wclub_image = 'weapon_images/wood_club.png';

var isword_image = 'weapon_images/iron_sword.png';

//name, damage, condition, max condition, quantity
var stick = new weapon("stick", 5, 10, 10, 1, stick_image);

var wsword = new weapon("wood sword", 10, 20, 20, 1, wsword_image);
var isword = new weapon("iron sword", 25, 40, 40, 1, isword_image);

var wclub = new weapon("wood club", 7, 30, 30, 1, wclub_image);
var iclub = new weapon("iron club", 15, 50, 50, 1, wclub_image);

var waxe = new weapon("wood axe", 10, 25, 25, 1, wclub_image);
var iaxe = new weapon("iron axe", 20, 40, 40, 1, wclub_image);

var wspear = new weapon("wood spear", 13, 15, 15, 1, wspear_image);
var ispear = new weapon("iron spear", 30, 25, 25, 1, wspear_image);

/////////////////// ITEMS  ////////////////////////////////

//name, price, quantity
var pelt = new item("pelt", 5, 1);
var claw = new item("claw", 2, 1);
var pelt5 = new item("pelt", 5, 5);


/////////////////// ENEMIES ////////////////////////////////

//name, health, damage, item     
var wolf = new enemy("wolf", 10, 10, pelt);
var boar = new enemy("boar", 15, 5, claw);
var bear = new enemy("bear", 25, 10, pelt5);

var enemies = [wolf, boar, bear]; //Array of all enemies

//All enemy Health (for health reset)
//wolf, boar, bear
health_reset = [10, 15, 25]

////////////////// TEMP PLAYER /////////////////////////////
//name, weapon, health, gold, water, level
var player = new guy("buttFace", stick, 30, 10, 5, 1);

////////////////// KEY LISTENERS ////////////////////////////

//Menu selections
function clickListener(event) {
    var canvas = document.getElementById("main_screen");
	
	var xPos = event.x;
	var yPos = event.y;
    //xPos -= canvas.offsetLeft;
	//yPos -= canvas.offsetTop;
		//Menu Options
    
    //Home Screen Navigation
    if (current_screen == "home"){
    	//To Adventure
    	if (xPos >= 20 && xPos <= 250 && yPos >= 230 && yPos <= 300) {
    		current_screen = "adventure";
    	}
    	else if (xPos >= 250 && xPos <= 500 && yPos >= 230 && yPos <= 300) {
    		current_screen = "sleep";
    	}
    	else if (xPos >= 20 && xPos <= 250 && yPos >= 300 && yPos <= 370) {
    		current_screen = "armory";
    	}
    	else if (xPos >= 250 && xPos <= 500 && yPos >= 300 && yPos <= 370) {
    		current_screen = "inventory";
    	}
    }
    //Adventure Screen Navigation
    else if (current_screen == "adventure"){
    	//To Go Home
    	if (xPos >= 15 && xPos <= 140 && yPos >= 440 && yPos <= 495) {
    		current_screen = "home";
    	}
    	//To Go Left
    	else if (xPos >= 15 && xPos <= 130 && yPos >= 210 && yPos <= 365) {
    		current_screen = "path";
    	}
    }
    //Armory Screen Navigation
    else if (current_screen == "armory"){
    	//To Go Home
    	if (xPos >= 200 && xPos <= 315 && yPos >= 455 && yPos <= 495) {
    		current_screen = "home";
    	}
    	//Selecting the first weapon (array[0])
    	else if (xPos >= 0 && xPos <= 260 && yPos >= 85 && yPos <= 135) {
    		player_selection = 0;
    	}
    	//Selecting the second weapon (array[1])
    	else if (xPos >= 0 && xPos <= 260 && yPos >= 135 && yPos <= 185) {
    		player_selection = 1;
    	}
    	//Selecting the third weapon (array[2])
    	else if (xPos >= 0 && xPos <= 260 && yPos >= 185 && yPos <= 235) {
    		player_selection = 2;
    	}
    	//Selecting the fourth weapon (array[3])
    	else if (xPos >= 0 && xPos <= 260 && yPos >= 235 && yPos <= 285) {
    		player_selection = 3;
    	}
    	//Selecting the fifth weapon (array[4])
    	else if (xPos >= 0 && xPos <= 260 && yPos >= 285 && yPos <= 335) {
    		player_selection = 4;
    	}
    	//Selecting the sixth weapon (array[5])
    	else if (xPos >= 0 && xPos <= 260 && yPos >= 335 && yPos <= 385) {
    		player_selection = 5;
    	}
    	//Selecting the seventh weapon (array[6])
    	else if (xPos >= 0 && xPos <= 260 && yPos >= 385 && yPos <= 435) {
    		player_selection = 6;
    	}
    	//Selecting the eigth weapon (array[7])
    	else if (xPos >= 260 && xPos <= 500 && yPos >= 85 && yPos <= 135) {
    		player_selection = 7;
    	}
    	//Selecting the ninth weapon (array[8])
    	else if (xPos >= 260 && xPos <= 500 && yPos >= 135 && yPos <= 185) {
    		player_selection = 8;
    	}
    	//Selecting the tenth weapon (array[9])
    	else if (xPos >= 260 && xPos <= 500 && yPos >= 185 && yPos <= 235) {
    		player_selection = 9;
    	}
    	//Selectig the eleventh weapon (array[10])
    	else if (xPos >= 260 && xPos <= 500 && yPos >= 235 && yPos <= 285) {
    		player_selection = 10;
    	}
    	//Selectig the twelveth weapon (array[11])
    	else if (xPos >= 260 && xPos <= 500 && yPos >= 285 && yPos <= 335) {
    		player_selection = 11;
    	}
    	//Selectig the thirteenth weapon (array[12])
    	else if (xPos >= 260 && xPos <= 500 && yPos >= 335 && yPos <= 385) {
    		player_selection = 12;
    	}
    	//Selectig the fourteenth weapon (array[13])
    	else if (xPos >= 260 && xPos <= 500 && yPos >= 385 && yPos <= 435) {
    		player_selection = 13;
    	}
    }
    //Inventory Screen Navigation
    else if (current_screen == "inventory"){
    	//To Go Home
    	if (xPos >= 200 && xPos <= 315 && yPos >= 455 && yPos <= 495) {
    		current_screen = "home";
    	}
    }
    //Weapon Display Screen Navigation
    else if (current_screen == "weapon_display"){
    	//To Go back to armory
    	if (xPos >= 30 && xPos <= 132 && yPos >= 455 && yPos <= 495) {
    		player_selection = null;
    		current_screen = "armory";
    	}
    	//To equip the current weapon
    	if (xPos >= 350 && xPos <= 426 && yPos >= 425 && yPos <= 455) {
    		player.weapon = armory[wList[player_selection]].weapon;
    	}
    }
    //Fight Display Screen Navigation
    else if (current_screen == "fight" && fight_timer < 50){
    	//To Attack
    	if (xPos >= 195 && xPos <= 325 && yPos >= 100 && yPos <= 140) {
    		player_move = "attack";
    	}
    	//To Trick
    	if (xPos >= 195 && xPos <= 325 && yPos >= 150 && yPos <= 190) {
    		player_move = "trick";
    	}
    	//To Defend
    	if (xPos >= 195 && xPos <= 325 && yPos >= 200 && yPos <= 240) {
    		player_move = "defend";
    	}
    }
}

//Not used right now, but just in case
function keyListener(e) {
    if(!e)
	{
		e = window.event;
	}
    var ypos;
	if(e.keyCode == 49)
	{
		yPos = 1;
	}		
	else if(e.keyCode == 50)
	{
		yPos = 1;
	}
	else if(e.keyCode == 51)
	{
		yPos = 1;
	}
	else if(e.keyCode == 52)
	{
		yPos = 1;
	}

}

///////////////// GAME MENU HANDLER /////////////////////////////
function game_handler(){
	if (current_screen == "home"){
		home();
	}
	else if (current_screen == "adventure"){
		adventure();
	}
	else if (current_screen == "path"){
		path_activity();
	}
	else if (current_screen == "sleep"){
		sleep();
	}
	else if (current_screen == "pre_fight"){
		pre_fight();
	}
	else if (current_screen == "fight"){
		fight();
	}
	else if (current_screen == "post_fight"){
		post_fight();
	}
	else if (current_screen == "fight_attack"){
		fight_attack();
	}
	else if (current_screen == "broken_weapon"){
		broken_weapon();
	}
	else if (current_screen == "armory"){
		armoryHandler(player_selection);
	}
	else if (current_screen == "weapon_display"){
		weaponDisplay(player_selection);
	}
	else if (current_screen == "inventory"){
		inventoryHandler();
	}
}

////////////////// HOME MENU ///////////////////////////////////
function home(){
	
	//Refill water when at home
	player.water = max_water;

	//locate main canvas in document and clear
	var main_canvas = document.getElementById("main_screen");
	var context = main_canvas.getContext("2d");
	context.clearRect(0,0,500,500);

	//Draw main background
	var main_menu1 = new Image();
	main_menu1.src = "screens/main_menu.png";
	context.drawImage(main_menu1,0,0);

	context.font = "30px Papyrus";
	context.fillText(player.name, (240 - (player.name.length * 6)), 103);
	context.fillText(player.level, 245, 190);
	context.font = "30px Copperplate";
	context.fillText(player.health + " / " + max_health, 55, 195);
	context.fillText(player.gold, 375, 195);
	

	//Menu Options
	context.font = "40px Papyrus";
	context.fillText("Adventure", 30, 265);
	context.fillText("Sleep", 310, 265);
	context.fillText("Armory", 50, 335);
	context.fillText("Inventory", 290, 335);
}


/////////////////// SLEEP ////////////////////////////////////////
function sleep(){
	//locate main canvas in document and clear
	var main_canvas = document.getElementById("main_screen");
	var context = main_canvas.getContext("2d");
	context.clearRect(0,0,500,500);

	//Draw main background
	var sleep_screen1 = new Image();
	sleep_screen1.src = "screens/sleep_screen.png";
	context.drawImage(sleep_screen1,0,0);

	context.font = "30px Papyrus";
	context.fillText("You wake up feeling rejuvinated", 40, 150);

	sleep_timer -= 1;
	if (sleep_timer <= 0){
		current_screen = "home";
		player.health = max_health;
		sleep_timer = 30;
	}
}

///////////////// STEP AND GAME INIT /////////////////////////////
//Calls draw function
//Checks game end condition
//Waits for next step
function step()
{
	game_handler();   //Draw to screen and update status
	
	if(player.health <= 0)
	{
		//locate main canvas in document and clear
		var main_canvas = document.getElementById("main_screen");
		var context = main_canvas.getContext("2d");
		context.clearRect(0,0,500,500);
		context.font = "50px Georgia";
		context.fillText("You Died", 220, 250);
	}
	else
	{
		wait_for_step();
	}

}

//Timer til next draw
function wait_for_step()
{
	setTimeout('step()', GameSpeed);  //Wait (int) GameSpeed, call step()
}

//Main
function game()
{
	//Hide start button once clicked
	document.getElementById("button").style.visibility = 'hidden';
	
	//Add event listeners to get clicks and button presses
	document.getElementById("main_screen").addEventListener("mousedown", clickListener, false);
	document.onkeydown = keyListener;

	//Initialize player with inputted name
	pname1 = document.getElementById("the-textbox").value;
	pname = pname1[0].toUpperCase() + pname1.substring(1, pname1.length);
	document.getElementById("the-textbox").value = "Goodluck, " + pname;
	player.name = pname;

	//Adding to Armory for testing
	addWeapon(stick);
	
	addWeapon(wsword);
	addWeapon(wsword);
	addWeapon(isword);
	
	addWeapon(wclub);
	addWeapon(iclub);

	addWeapon(waxe);
	addWeapon(iaxe);

	addWeapon(ispear);
	addWeapon(ispear);

	//Adding to inventory for testing
	addItem(pelt);
	addItem(claw);

	//Start wait-for-step cycle (run game)
	wait_for_step();
}