var cells = 0;
var building_multiplier = [1,10,50];
var upgrade_cost = [50,250,1000,2500]
var upgrade_click = 1;
var upgrade_flies = 1;
var upgrade_hands = 1;
var upgrade_mask = 1;
var building_flies = 0;
var building_hands = 0;
var building_mask = 0;
var cells_to_gamble = 0;


function infectClick(number){
	cells = cells + number;
	document.getElementById('cells_amount').innerHTML = cells;
};

function cellsPerSecond(){
	var cps = 0;
	cps = cps + (building_flies*building_multiplier[0]*upgrade_flies) + (building_hands*building_multiplier[1]*upgrade_hands) + (building_mask*building_multiplier[2]*upgrade_mask);
	document.getElementById('cps').innerHTML = cps;
};

function cpsUpdate(){
	var building_flies_cps = 0;
	var building_hands_cps = 0;
	var building_mask_cps = 0;
	building_flies_cps = building_flies*building_multiplier[0]*upgrade_flies;
	building_hands_cps = building_hands*building_multiplier[1]*upgrade_hands;
	building_mask_cps = building_mask*building_multiplier[2]*upgrade_mask;
	document.getElementById('building_flies_cps').innerHTML = building_flies_cps;
	document.getElementById('building_hands_cps').innerHTML = building_hands_cps;
	document.getElementById('building_mask_cps').innerHTML = building_mask_cps;
}

function buyUpgradeClick(){
	var upgrade_click_cost = Math.floor(upgrade_cost[0] * Math.pow(1.2,upgrade_click-1));
	if (cells >= upgrade_click_cost) {
		upgrade_click = upgrade_click + 1;
		cells = cells - upgrade_click_cost;
		document.getElementById('upgrade_click_amount').innerHTML = upgrade_click;
		document.getElementById('cells_amount').innerHTML = cells;
	};
	var nextCost = Math.floor(upgrade_cost[0] * Math.pow(1.2,upgrade_click-1));
	document.getElementById('upgrade_click_cost').innerHTML = nextCost;
	//document.getElementById('infectButton').setAttribute('onclick','infectClick(upgrade_click)');
};

function buyUpgradeFlies(){
	var upgrade_flies_cost = Math.floor(upgrade_cost[1] * Math.pow(1.3,upgrade_click-1));
	if (cells >= upgrade_flies_cost) {
		upgrade_flies = upgrade_flies + 1;
		cells = cells - upgrade_flies_cost;
		document.getElementById('upgrade_flies_amount').innerHTML = upgrade_flies;
		document.getElementById('cells_amount').innerHTML = cells;
	};

	var nextCost = Math.floor(250 * Math.pow(1.3,upgrade_flies-1));
	document.getElementById('upgrade_flies_cost').innerHTML = nextCost;
}

function buyUpgradeHands(){
	var upgrade_hands_cost = Math.floor(upgrade_cost[2] * Math.pow(1.3,upgrade_hands-1));
	if (cells >= upgrade_hands_cost) {
		upgrade_hands = upgrade_hands + 1;
		cells = cells - upgrade_hands_cost;
		document.getElementById('upgrade_hands_amount').innerHTML = upgrade_hands;
		document.getElementById('cells_amount').innerHTML = cells;
	};
	var nextCost = Math.floor(1000 * Math.pow(1.3,upgrade_hands-1));
	document.getElementById('upgrade_hands_cost').innerHTML = nextCost;
}

function buyUpgradeMask(){
	var upgrade_mask_cost = Math.floor(5000 * Math.pow(1.3,upgrade_mask-1));
	if (cells >= upgrade_mask_cost) {
		upgrade_mask = upgrade_mask + 1;
		cells = cells - upgrade_mask_cost;
		document.getElementById('upgrade_mask_amount').innerHTML = upgrade_mask;
		document.getElementById('cells_amount').innerHTML = cells;
	};
	var nextCost = Math.floor(2500 * Math.pow(1.3,upgrade_mask-1));
	document.getElementById('upgrade_mask_cost').innerHTML = nextCost;
}

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

function allOrNothingSlider(){
	var cell_amount = document.getElementById("sliderAllOrNothing");
	var output_amount = document.getElementById("allOrNothingPercent");
	var cells_to_gamble_1 = 0;
	cells_to_gamble_1 = cells_to_gamble;
	cells_to_gamble_1 = Math.floor(cells_to_gamble_1 +(cells/10)*(cell_amount.value));
	document.getElementById("allOrNothingValue").innerHTML = cells_to_gamble_1;
}

function allOrNothing(){

	var cells_to_gamble_1 = 0;
	cells_to_gamble_1 = cells_to_gamble;
	cells_to_gamble_1 = Math.floor(cells_to_gamble_1 +(cells/10)*(document.getElementById("sliderAllOrNothing").value));
	var win_lost = getRandomIntInclusive(1, 2);
	var win_lost_2 = getRandomIntInclusive(1, 2);
	if(cells >= 1){
		if(win_lost == win_lost_2){
			cells = cells + cells_to_gamble_1;
			document.getElementById("allOrNothingStatus").innerHTML = "WIN!!!";
		}
		else{
			cells = cells - cells_to_gamble_1;
			document.getElementById("allOrNothingStatus").innerHTML = "You suck and lost";
		}
	}
	else{
		document.getElementById("allOrNothingStatus").innerHTML = "Not enough cells!";
	}
}

function getRandomIntInclusive(min, max) {
  var min = Math.ceil(min);
  var max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}



function cheat(){
	cells = 500000;
}

window.setInterval(function(){
	infectClick(building_flies*building_multiplier[0]*upgrade_flies);
	infectClick(building_hands*building_multiplier[1]*upgrade_hands);
	infectClick(building_mask*building_multiplier[2]*upgrade_mask);
	cellsPerSecond();
	cpsUpdate()

}, 1000);

window.setInterval(function(){
	allOrNothingSlider()
}, 100);
