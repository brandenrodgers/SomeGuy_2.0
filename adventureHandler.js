//Path Variables
path_act_timer = 30;  //To Sleep() for the path activity screen to be read
path_act_helper = 1;  //To help decide what path activity happens (so it runs only once)
path_act_chooser = 0; //To determine what activity happens on the path

fight_timer = 125;    //Main fight method timer
fight_atk_timer = 30; 
pre_fight_timer = 50;
broken_weapon_timer = 50;
post_fight_timer = 50;
enemy_move_helper = 1;  //To help decide the enemy move(so it runs only once)
player_move = null;  //attack/trick/defend
enemy_move = null    //attack/trick/defend

var enemy_moves = ["attack", "trick", "defend"];
var current_enemy = wolf; //Current enemy being fought (initialized to wolf)

/////////////////// ADVENTURE ////////////////////////////////////////
function adventure(){
	//locate main canvas in document and clear
	var main_canvas = document.getElementById("main_screen");
	var context = main_canvas.getContext("2d");
	context.clearRect(0,0,500,500);

	//Draw main background
	var adventure_screen1 = new Image();
	adventure_screen1.src = "screens/adventure_screen.png";
	context.drawImage(adventure_screen1,0,0);

	context.font = "15px Georgia";
	context.fillText("Health: " + player.health + "/" + max_health, 10, 410);
	context.fillText("Water: " + player.water, 10, 430);
	context.fillText("Weapon", 417, 405);
	context.fillText(player.weapon.name, 420, 427);

	//Check if water is empty
	if (player.water < 0){
		player.health = 0;
	}
}


//Just for displaying what happened
function path_activity(){

	//So the player dies right away
	if (player.water == 0){
		player.health = 0;
	}

	//To determine what happens on the path
	if (path_act_helper == 1){
		path_act_chooser = Math.floor((Math.random() * 6) + 1);
		path_act_helper -= 1;
	}

	//locate main canvas in document and clear
	var main_canvas = document.getElementById("main_screen");
	var context = main_canvas.getContext("2d");
	context.clearRect(0,0,500,500);

	//Draw main background
	var path_activity1 = new Image();
	path_activity1.src = "screens/path_activity_screen.png";
	context.drawImage(path_activity1,0,0);

	context.font = "25px Papyrus";
	
	//To display what happnes on the path
	if (path_act_chooser <= 3){
	context.fillText("The trail continues", 146, 254);
	}
	else if (path_act_chooser > 3){
	context.fillText("You've been attacked!", 146, 254);
	}

	//Perform these once the path activity screen is done being displayed
	path_act_timer -= 1;
	if (path_act_timer <= 0){
		player.water -= 1;
		//path continues
		if (path_act_chooser <= 3){
			current_screen = "adventure";
		}
		//player is attacked
		else if (path_act_chooser > 3){
			current_screen = "pre_fight";
			current_enemy = enemies[path_act_chooser - 4];
		}
		// reset timers
		path_act_timer = 30;
		path_act_helper = 1;
	}
}

//////////////////// FIGHT ///////////////////////////////////////
function pre_fight(){
	//locate main canvas in document and clear
	var main_canvas = document.getElementById("main_screen");
	var context = main_canvas.getContext("2d");
	context.clearRect(0,0,500,500);

	//Draw main background
	var fight_screen1 = new Image();
	fight_screen1.src = "screens/pre_fight_screen.png";
	context.drawImage(fight_screen1,0,0);

	context.font = "50px Papyrus";
	context.fillText(current_enemy.name, 200, 250);

	pre_fight_timer -= 1;
	if (pre_fight_timer <= 0){
		current_screen = "fight"
		pre_fight_timer = 50;
	}
}

function fight(){
	
	if (current_enemy.health <= 0){
		//Reset enemy health
		enemies[path_act_chooser - 4].health = health_reset[path_act_chooser - 4]; 
		addItem(current_enemy.item)
		current_screen = "post_fight";
	}

	//To determine the enemy move
	if (enemy_move_helper == 1){
		enemy_move = enemy_moves[Math.floor((Math.random()*3))];
		enemy_move_helper -= 1;
	}

	//Pre-fight pause
	fight_timer -= 1;
	if (fight_timer > 60){
		//locate main canvas in document and clear
		var main_canvas = document.getElementById("main_screen");
		var context = main_canvas.getContext("2d");
		context.clearRect(0,0,500,500);

		//Draw main background
		var fight_screen1 = new Image();
		fight_screen1.src = "screens/fight_screen.png";
		context.drawImage(fight_screen1,0,0);

		context.font = "30px Papyrus";
		context.fillText(player.name, 15, 120);
		context.fillText(player.health, 32, 207);
		context.fillText(current_enemy.name, 400, 120);
		context.fillText(current_enemy.health, 425, 207);

		context.font = "25px Papyrus";
		context.fillText("Enemy move:", 140, 260);
	}
	else if (fight_timer > 0){
		//locate main canvas in document and clear
		var main_canvas = document.getElementById("main_screen");
		var context = main_canvas.getContext("2d");
		context.clearRect(0,0,500,500);

		//Draw main background
		var fight_screen1 = new Image();
		fight_screen1.src = "screens/fight_screen.png";
		context.drawImage(fight_screen1,0,0);

		context.font = "30px Papyrus";
		context.fillText(player.name, 15, 120);
		context.fillText(player.health, 32, 207);
		context.fillText(current_enemy.name, 400, 120);
		context.fillText(current_enemy.health, 425, 207);
		
		//To show selected player move
		if (player_move != null){
			context.fillStyle = "yellow";
			if (player_move == "attack"){
				context.fillText("*", 295, 120);
			}
			if (player_move == "trick"){
				context.fillText("*", 295, 170);
			}
			if (player_move == "defend"){
				context.fillText("*", 295, 220);
			}
		}

		context.fillStyle = "black";
		context.font = "25px Papyrus";
		context.fillText("Enemy move: " + enemy_move, 140, 260);
		context.fillText(Math.floor(fight_timer/10).toString(), 243, 303);
	}
	else {
		current_screen = "fight_attack";
		fight_timer = 125;
		enemy_move_helper = 1;
	}
}


function fight_attack(){
	//locate main canvas in document and clear
	var main_canvas = document.getElementById("main_screen");
	var context = main_canvas.getContext("2d");
	context.clearRect(0,0,500,500);

	//Draw main background
	var fight_screen1 = new Image();
	fight_screen1.src = "screens/fight_screen.png";
	context.drawImage(fight_screen1,0,0);

	context.font = "30px Papyrus";
	context.fillText(player.name, 15, 120);
	context.fillText(player.health, 32, 207);
	context.fillText(current_enemy.name, 400, 120);
	context.fillText(current_enemy.health, 425, 207);

	//Display attack choices
	context.font = "40px Papyrus";
	if (player_move != null){
		context.fillText(player_move, 70, 400);
		context.fillText(enemy_move, 350, 400);
	}
	else{
		context.fillText("Too slow!", 70, 400);
		context.fillText(enemy_move, 350, 400);
	}
	
	fight_atk_timer -= 1;
	if (fight_atk_timer <= 0){
		//Deal Damage
		//Both attack
		if (player_move == "attack" && enemy_move == "attack"){
			current_enemy.health -= player.weapon.damage;
			player.health -= current_enemy.damage;
			player.weapon.cond -= 1;
		}
		//Both Trick
		else if (player_move == "trick" && enemy_move == "trick"){
			current_enemy.health -= (player.weapon.damage / 2);
			player.health -= (current_enemy.damage / 2);
			player.weapon.cond -= 1;
		}
		//Both Defend
		else if (player_move == "defend" && enemy_move == "defend"){
			current_enemy.health - 0;
			player.health - 0;
		}
		//Player attack
		//Enemy trick
		else if (player_move == "attack" && enemy_move == "trick"){
			current_enemy.health -= player.weapon.damage;
			player.weapon.cond -= 1;
		}
		//Player attack
		//Enemy defend
		else if (player_move == "attack" && enemy_move == "defend"){
			player.health -= (player.weapon.damage / 2);
			player.weapon.cond -= 1;
		}
		//Player Trick
		//Enemy attack
		else if (player_move == "trick" && enemy_move == "attack"){
			player.health -= current_enemy.damage;
		}
		//Player Trick
		//Enemy Defend
		else if (player_move == "trick" && enemy_move == "defend"){
			current_enemy.health -= player.weapon.damage;
			player.weapon.cond -= 1;
		}
		//Player Defend
		//Enemy Attack
		else if (player_move == "defend" && enemy_move == "attack"){
			current_enemy.health -= (current_enemy.damage / 2);
		}
		//Player Defend
		//Enemy Trick
		else if (player_move == "defend" && enemy_move == "trick"){
			player.health -= current_enemy.damage;
		}
		else {
			player.health -= current_enemy.damage;
		}

		if (player.weapon.cond <= 0){
			current_screen = "broken_weapon"
		}
		else {
			current_screen = "fight"
		}

		fight_atk_timer = 30;
		player_move = null;
	}
}


function broken_weapon(){
	//locate main canvas in document and clear
	var main_canvas = document.getElementById("main_screen");
	var context = main_canvas.getContext("2d");
	context.clearRect(0,0,500,500);

	//Draw main background
	var fight_screen1 = new Image();
	fight_screen1.src = "screens/post_fight_screen.png";
	context.drawImage(fight_screen1,0,0);

	context.font = "25px Papyrus";
	context.fillText("Your " + player.weapon.name + " broke!", 110, 100);
	context.fillText("You picked up a stick", 130, 150);

	broken_weapon_timer -= 1;
	if (broken_weapon_timer <= 0){
		player.weapon.cond = player.weapon.maxCond  //reset condition
		removeWeapon(player.weapon);                //remove 1 from armory
		updateArmory();                             //check if 0q, then remove
		player.weapon = stick;
		player.weapon.cond = player.weapon.maxCond
		current_screen = "fight"
		broken_weapon_timer = 50;
	}
}


function post_fight(){
	//locate main canvas in document and clear
	var main_canvas = document.getElementById("main_screen");
	var context = main_canvas.getContext("2d");
	context.clearRect(0,0,500,500);

	//Draw main background
	var fight_screen2 = new Image();
	fight_screen2.src = "screens/post_fight_screen.png";
	context.drawImage(fight_screen2,0,0);

	context.font = "30px Papyrus";
	context.fillText("You win!", 180, 100);
	context.fillText("Obtained: " + current_enemy.item.name, 150, 150);

	post_fight_timer -= 1;
	if (post_fight_timer <= 0){
		current_screen = "adventure";
		post_fight_timer = 50;
	}
}



