var cells = 0;
var fly_building = 0;


function infectClick(number){
	cells = cells + number;
	document.getElementById('cells_amount').innerHTML = cells;
};

function buyBuildingFly(){
	var fly_building_cost = Math.floor(10 * Math.pow(1.1,fly_building));   //cost of this fly building
	if (cells >= fly_building_cost){
		fly_building = fly_building + 1;
		cells = cells - fly_building_cost;
		document.getElementById('building_fly_amount').innerHTML = fly_building;
		document.getElementById('cells_amount').innerHTML = cells;
	};
	var nextCost = Math.floor(10 * Math.pow(1.1,fly_building));
	document.getElementById('building_fly_cost').innerHTML = nextCost;
};


window.setInterval(function(){
	infectClick(fly_building);
}, 1000);