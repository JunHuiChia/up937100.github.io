var cells = 0;
var building_multiplier = [1,5,25];
var upgrade_click = 1;
var building_flies = 0;
var building_hands = 0;
var building_mask = 0;


function infectClick(number){
	cells = cells + number;
	document.getElementById('cells_amount').innerHTML = cells;
};

function cellsPerSecond(){
	var cps = 0;
	cps = cps + building_flies*building_multiplier[0] + building_hands*building_multiplier[1] + building_mask*building_multiplier[2];
	document.getElementById('cps').innerHTML = cps;
};

function buyUpgradeClick(){
	var upgrade_click_cost = Math.floor(50 * Math.pow(1.75,upgrade_click-1));
	if (cells >= upgrade_click_cost) {
		upgrade_click = upgrade_click + 1;
		cells = cells - upgrade_click_cost;
		document.getElementById('upgrade_click_amount').innerHTML = upgrade_click;
		document.getElementById('cells_amount').innerHTML = cells;
	};
	var nextCost = Math.floor(50 * Math.pow(1.75,upgrade_click-1));
	document.getElementById('upgrade_click_cost').innerHTML = nextCost;
	//document.getElementById('infectButton').setAttribute('onclick','infectClick(upgrade_click)');

};

function buyBuildingFlies(){
	var building_flies_cost = Math.floor(10 * Math.pow(1.1,building_flies));   //cost of this fly building
	if (cells >= building_flies_cost){																				//checks if they have enough cells to buy
		building_flies = building_flies + 1;																		//adds 1 to building
		cells = cells - building_flies_cost;
		document.getElementById('building_flies_amount').innerHTML = building_flies;  //updates the amount of building html
		document.getElementById('cells_amount').innerHTML = cells;										//updates the cell amount on html
	};
	var nextCost = Math.floor(10 * Math.pow(1.1,building_flies));
	document.getElementById('building_flies_cost').innerHTML = nextCost;
};

function buyBuildingHands(){
	var building_hands_cost = Math.floor(150 * Math.pow(1.15,building_hands));
	if (cells >= building_hands_cost){
		building_hands = building_hands + 1;
		cells = cells - building_hands_cost;
		document.getElementById('building_hands_amount').innerHTML = building_hands;
		document.getElementById('cells_amount').innerHTML = cells;
	};
	var nextCost = Math.floor(150 * Math.pow(1.15,building_hands));
	document.getElementById('building_hands_cost').innerHTML = nextCost;
};

function buyBuildingMask(){
	var building_mask_cost = Math.floor(1500 * Math.pow(1.2,building_mask));
	if (cells >= building_mask_cost){
		building_mask = building_mask + 1;
		cells = cells - building_mask_cost;
		document.getElementById('building_mask_amount').innerHTML = building_mask;
		document.getElementById('cells_amount').innerHTML = cells;
	};
	var nextCost = Math.floor(1500 * Math.pow(1.2,building_mask));
	document.getElementById('building_mask_cost').innerHTML = nextCost;
};

function guessNumber(){
	var userGuess = document.getElementById('userGuess').value;
	var correctNum = Math.floor(Math.random() * 11);
	if(cells >= 10){
		cells = Math.floor(cells * 0.9);
		if (userGuess == correctNum){
			cells = cells * 2;
			document.getElementById('guessStatus').innerHTML = "Win! Cells doubled."
		}
		else{
			document.getElementById('guessStatus').innerHTML = "Lost! 10% of cells gone."
		}
	}
	else{
		document.getElementById('guessStatus').innerHTML = "You need 10 or more cells."
	}
}




window.setInterval(function(){
	infectClick(building_flies*building_multiplier[0]);
	infectClick(building_hands*building_multiplier[1]);
	infectClick(building_mask*building_multiplier[2]);
	cellsPerSecond();
}, 1000);
