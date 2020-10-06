var cells = 0;
var upgrade_click = 1;
var building_flies = 0;
var building_hands = 0;


function infectClick(number){
	cells = cells + number;
	document.getElementById('cells_amount').innerHTML = cells;
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
	if (cells >= building_flies_cost){
		building_flies = building_flies + 1;
		cells = cells - building_flies_cost;
		document.getElementById('building_flies_amount').innerHTML = building_flies;
		document.getElementById('cells_amount').innerHTML = cells;
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
}


window.setInterval(function(){
	infectClick(building_flies);
	infectClick(building_hands*5);
}, 1000);

