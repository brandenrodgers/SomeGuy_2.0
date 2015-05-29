
homex = 9;
homey = 17;

//Initialize untraveled map
map_blocks = [[false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
			  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
			  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
			  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
			  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
			  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
			  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
			  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
			  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
			  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
			  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
			  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
			  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
			  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
			  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
			  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
			  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
			  [false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false]]


//////////////////// MAP ///////////////////////////////////////

function landMap(){
	
	//locate main canvas in document and clear
	var main_canvas = document.getElementById("main_screen");
	var context = main_canvas.getContext("2d");
	context.clearRect(0,0,500,500);

	//Draw main background
	var map_screen1 = new Image();
	map_screen1.src = "screens/map_screen.png";
	context.drawImage(map_screen1,0,0);

	xPos = 0
	yPos = 0
	color = ""
	for (var row = 0; row < map_blocks.length; row++){
		for (var block = 0; block < map_blocks[row].length; block++){
			//Visual for Land Map
			if (map_blocks[row][block]){
				color = "#00B800"
			}
			else {
				color = "#B20000"
			}
			//Draw block
			context.beginPath();
			context.lineWidth="6";
			context.fillStyle=color;
			context.rect(xPos,yPos,25,25); 
			context.fill();
			//Draw border
			context.beginPath();
			context.lineWidth="2";
			context.strokeStyle="black";
			context.rect(xPos,yPos,25,25); 
			context.stroke();
			xPos += 25;	
		}
		xPos = 0;
		yPos += 25	
	}
	yPos = 0;
	context.fillStyle = "black";
}





