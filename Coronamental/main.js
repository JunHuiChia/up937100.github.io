function initialize() {
	load();
	updateAll();
}

function format(amount) {
	let power = Math.floor(Math.log10(amount));
	let mantissa = amount / Math.pow(10, power);
	if (power < 5) return amount.toFixed(0);
	return mantissa.toFixed(2) + 'e' + power;
}

function calcTotalDnaPS() {
	var TotalDnaPS = 0;
	for (var item in items) {
		TotalDnaPS +=
			items[item].income *
			items[item].amount *
			items[item].level *
			(prestigeItems.itemMult.amount + 1);
	}
	let tickPS = prestigeItems.gameTick.tick / 1000;
	TotalDnaPS = TotalDnaPS / tickPS;

	return format(TotalDnaPS);
}

function calcTotalCellPS() {
	var TotalCellPS = 0;
	for (var item in cellItems) {
		TotalCellPS +=
			cellItems[item].income *
			cellItems[item].amount *
			cellItems[item].level *
			(prestigeItems.cellItemMult.amount + 1);
	}

	let tickPS = prestigeItems.gameTick.tick / 1000;
	TotalCellPS = TotalCellPS / tickPS;

	return format(TotalCellPS);
}

function calcCurrPS(itemVal) {
	var itemPS =
		items[itemVal].income *
		items[itemVal].amount *
		items[itemVal].level *
		(prestigeItems.itemMult.amount + 1);
	let tickPS = prestigeItems.gameTick.tick / 1000;
	itemPS = itemPS / tickPS;
	return format(itemPS);
}

function calcCurrCellPS(itemVal) {
	var itemPS =
		cellItems[itemVal].income *
		cellItems[itemVal].amount *
		cellItems[itemVal].level *
		(prestigeItems.cellItemMult.amount + 1);
	let tickPS = prestigeItems.gameTick.tick / 1000;
	itemPS = itemPS / tickPS;
	return format(itemPS);
}

function calcPrestigePoints() {
	if (
		player.currencies.cell * 100 + player.currencies.dna >
		20000 * player.prestigeLevel
	) {
		let totalPlayerCurrency =
			player.currencies.cell * 10 + player.currencies.dna;
		let pPointMult =
			(player.prestigeLevel / 2 + 1) *
			((prestigeItems.prestigeMult.amount + 1) * 2);
		let pPointCalc = Math.sqrt(Math.log(totalPlayerCurrency) * 5) * 3;
		let pPointToGain = pPointCalc * pPointMult;
		player.availablePPoint = pPointToGain;
	} else {
		player.availablePPoint = 0;
	}
}

function updateGameTick() {
	prestigeItems.gameTick.tick =
		prestigeItems.gameTick.tick / prestigeItems.gameTick.amount;
}

function updateCurrencyUI() {
	let item;
	if (prestigeItems.clickPower.amount == 0) {
		item = prestigeItems.clickPower.amount + 1;
	} else {
		item = prestigeItems.clickPower.amount * 5;
	}
	for (var val in player.currencies) {
		$('#' + val + 'Amt').html(format(player.currencies[val]));
	}
	if (player.currencies.dna >= 100 * item) {
		$('#cellClick').removeClass('disabled');
	} else {
		$('#cellClick').addClass('disabled');
	}
	$('#prestigePointAmt').html(format(player.prestigePoint));
}

function updateItemsUI() {
	for (var val in items) {
		if (player.currencies.dna >= items[val].cost) {
			$('.' + val + 'Container').css({ color: 'green' });
		} else {
			$('.' + val + 'Container').css({ color: 'red' });
		}

		$('#' + val + 'Name').html(items[val].name);
		$('#' + val + 'Amount').html('Amount: ' + format(items[val].amount));
		$('#' + val + 'Cost').html('Cost: ' + format(items[val].cost) + ' DNA');
		$('#' + val + 'DnaPS').html(calcCurrPS(val) + ' DNA/s');
	}
}

function updateCellItemsUI() {
	for (var val in cellItems) {
		if (player.currencies.dna >= cellItems[val].cost) {
			$('.' + val + 'CellContainer').css({ color: 'green' });
		} else {
			$('.' + val + 'CellContainer').css({ color: 'red' });
		}
		$('#' + val + 'CellName').html(cellItems[val].name);
		$('#' + val + 'CellAmount').html(
			'Amount: ' + format(cellItems[val].amount)
		);
		$('#' + val + 'CellCost').html(
			'Cost: ' + format(cellItems[val].cost) + ' DNA'
		);
		$('#' + val + 'CellPS').html(calcCurrCellPS(val) + ' Cell/s');
	}
}

function updateUpgradeUI() {
	for (var val in items) {
		if (player.currencies.cell >= items[val].upg_cost) {
			$('.' + val + 'UpgContainer').css({ color: 'green' });
		} else {
			$('.' + val + 'UpgContainer').css({ color: 'red' });
		}
		$('#' + val + 'NameUpg').html(items[val].name + ' Upgrade');
		$('#' + val + 'LevelUpg').html('Level: ' + format(items[val].level));
		$('#' + val + 'CostUpg').html(
			'Cost: ' + format(items[val].upg_cost) + ' Cells'
		);
	}
}

function updateCellUpgradeUI() {
	for (var val in cellItems) {
		if (player.currencies.cell >= cellItems[val].upg_cost) {
			$('.' + val + 'CellUpgContainer').css({ color: 'green' });
		} else {
			$('.' + val + 'CellUpgContainer').css({ color: 'red' });
		}
		$('#' + val + 'CellNameUpg').html(cellItems[val].name + ' Upgrade');
		$('#' + val + 'CellLevelUpg').html(
			'Level: ' + format(cellItems[val].level)
		);
		$('#' + val + 'CellCostUpg').html(
			'Cost: ' + format(cellItems[val].upg_cost) + ' Cells'
		);
	}
}

function updateDnaPS() {
	$('#dnaPS').html(calcTotalDnaPS() + ' DNA/s');
	$('#cellPS').html(calcTotalCellPS() + ' Cell/s');
}

function updatePrestige() {
	$('.prestigeLevel').html('Prestige Level: ' + player.prestigeLevel);
	$('.prestigeMult').html(
		'Prestige Multiplier: ' + prestigeItems.prestigeMult.amount * 100 + '%'
	);
	$('.availablePPoint').html(
		'Available Prestige Points: ' +
			format(Math.floor(player.availablePPoint))
	);
}

function updatePrestigeShop() {
	for (var val in prestigeItems) {
		if (player.prestigePoint >= prestigeItems[val].cost) {
			$('.' + val + 'Container').css({ color: 'green' });
		} else {
			$('.' + val + 'Container').css({ color: 'red' });
		}
		$('#' + val + 'Name').html(prestigeItems[val].name);
		$('#' + val + 'Info').html(prestigeItems[val].info);
		$('#' + val + 'Amt').html(
			'Bonus: +' + format(prestigeItems[val].amount * 100) + '%'
		);
		$('#' + val + 'Cost').html(
			'Cost: ' + format(prestigeItems[val].cost) + ' Prestige Points'
		);
		switch (val) {
			case 'clickPower':
				$('#' + val + 'Amt').html(
					'Bonus: +' + format(prestigeItems[val].amount * 500) + '%'
				);
				break;
			case 'gameTick':
				$('#' + val + 'Amt').html(
					'Game Tick: ' + format(prestigeItems[val].tick)
				);
				break;
		}
	}
}

function clickCurrency(id) {
	if (prestigeItems.clickPower.amount == 0) {
		addCurrency(prestigeItems.clickPower.amount + 1, id);
	} else {
		addCurrency(prestigeItems.clickPower.amount * 5, id);
	}
}

function clickItem(val) {
	var currItem;
	for (var item in items) {
		currItem = item;
	}
	$('.' + currItem + 'Container').click(buyItem(val));
}

function clickCellItem(val) {
	var currCellItem;
	for (var cellItem in cellItems) {
		currCellItem = cellItem;
	}
	$('.' + currCellItem + 'Container').click(buyCellItem(val));
}

function clickUpgrade(val) {
	var currItem;
	for (var item in items) {
		currItem = item;
	}
	$('.' + currItem + 'UpgContainer').click(buyUpgrade(val));
}

function clickCellUpgrade(val) {
	var currCellItem;
	for (var item in cellItems) {
		currCellItem = item;
	}
	$('.' + currCellItem + 'CellUpgContainer').click(buyCellUpgrade(val));
}

function clickPrestige() {
	if (player.availablePPoint < 3) {
		alert('You have no available prestige points to claim!');
	} else {
		var confirmation = confirm('Are you sure you want to prestige?');
		if (confirmation == true) {
			calcPrestigePoints();
			player.prestigeLevel += 1;
			player.prestigePoint += player.availablePPoint;
			reset();
		}
	}
}

function buyItem(val) {
	if (player.currencies.dna >= items[val].cost) {
		player.currencies.dna -= items[val].cost;
		items[val].cost = Math.round(
			items[val].cost * 1.2 + (items[val].amount * 0.3 + 1)
		);
		items[val].amount += 1;
	}
}

function buyCellItem(val) {
	if (player.currencies.dna >= cellItems[val].cost) {
		player.currencies.dna -= cellItems[val].cost;
		cellItems[val].cost = Math.round(
			cellItems[val].cost * 1.3 + (cellItems[val].amount * 0.4 + 1)
		);
		cellItems[val].amount += 1;
	}
}

function buyUpgrade(val) {
	if (player.currencies.cell >= items[val].upg_cost) {
		player.currencies.cell -= items[val].upg_cost;
		items[val].upg_cost = Math.round(
			items[val].upg_cost * 1.5 + (items[val].level - 1) * 0.4
		);
		items[val].level += 1;
	}
}

function buyCellUpgrade(val) {
	if (player.currencies.cell >= cellItems[val].upg_cost) {
		player.currencies.cell -= cellItems[val].upg_cost;
		cellItems[val].upg_cost = Math.round(
			cellItems[val].upg_cost * 1.75 + (cellItems[val].level - 1) * 0.4
		);
		cellItems[val].level += 1;
	}
}

function buyPrestige(val) {
	if (player.prestigePoint >= prestigeItems[val].cost) {
		if (val == 'gameTick') {
			player.prestigePoint -= prestigeItems[val].cost;
			prestigeItems[val].cost = prestigeItems[val].cost * 1.5;
			prestigeItems[val].amount += 0.1;
			updateGameTick();
		} else {
			player.prestigePoint -= prestigeItems[val].cost;
			prestigeItems[val].cost = prestigeItems[val].cost * 1.5;
			prestigeItems[val].amount += 1;
		}
	}
}

function addCurrency(val, id) {
	var currency;
	switch (id) {
		case 'dna':
			player.currencies.dna += val;
			break;
		case 'cell':
			if (player.currencies.dna >= 100 * val) {
				player.currencies.dna -= 100 * val;
				player.currencies.cell += val;
			}
			break;
	}
	//add click upgrade
	currency += val;
	return val;
}

function itemGain() {
	for (var item in items) {
		player.currencies.dna +=
			items[item].income *
			items[item].amount *
			items[item].level *
			((prestigeItems.itemMult.amount + 1) * 1.5);
	}
}

function cellItemGain() {
	for (var cell in cellItems) {
		player.currencies.cell +=
			cellItems[cell].income *
			cellItems[cell].amount *
			cellItems[cell].level *
			((prestigeItems.cellItemMult.amount + 1) * 1.5);
	}
}

function reset() {
	$.extend(true, player, resetPlayer);
	$.extend(true, items, resetItems);
	$.extend(true, cellItems, resetCellItems);
}

function save() {
	localStorage.setItem('playerData', JSON.stringify(player));
	localStorage.setItem('itemData', JSON.stringify(items));
	localStorage.setItem('cellItemData', JSON.stringify(cellItems));
	localStorage.setItem('prestigeItemsData', JSON.stringify(prestigeItems));
	$('.toast').toast('show');
	console.log('saved');
}

function load() {
	$.extend(player, JSON.parse(localStorage.getItem('playerData')));
	$.extend(items, JSON.parse(localStorage.getItem('itemData')));
	$.extend(cellItems, JSON.parse(localStorage.getItem('cellItemData')));
	$.extend(
		prestigeItems,
		JSON.parse(localStorage.getItem('prestigeItemsData'))
	);
}

function deleteSave() {
	localStorage.removeItem('playerData');
	localStorage.removeItem('itemData');
	localStorage.removeItem('cellItemData');
	localStorage.removeItem('prestigeItemsData');
	location.reload();
}

function exportSave() {
	var playerText = btoa(JSON.stringify(player));
	var itemText = btoa(JSON.stringify(items));
	var cellItemText = btoa(JSON.stringify(cellItems));
	var prestigeItemsText = btoa(JSON.stringify(prestigeItems));

	$('#exportSaveContents1').toggle();
	$('#exportSaveContents2').toggle();
	$('#exportSaveContents3').toggle();
	$('#exportSaveContents4').toggle();
	$('#exportSaveText1').val(playerText);
	$('#exportSaveText2').val(itemText);
	$('#exportSaveText3').val(cellItemText);
	$('#exportSaveText4').val(prestigeItemsText);
}

function importSave() {
	alert('Warning: this will erase your current save!');
	try {
		var playerText = $('#importSaveText1').val();
		var itemText = $('#importSaveText2').val();
		var cellItemText = $('#importSaveText3').val();
		var prestigeItemsText = $('#importSaveText4').val();

		$.extend(player, JSON.parse(atob(playerText)));
		$.extend(items, JSON.parse(atob(itemText)));
		$.extend(cellItems, JSON.parse(atob(cellItemText)));
		$.extend(prestigeItems, JSON.parse(atob(prestigeItemsText)));
	} catch (e) {
		alert('Invalid save files');
	}
}

function updateAll() {
	updateCurrencyUI();
	updateItemsUI();
	updateDnaPS();
	updateUpgradeUI();
	updateCellItemsUI();
	updateCellUpgradeUI();
	updatePrestige();
	updatePrestigeShop();
}

function gameLoop() {
	window.setInterval(function () {
		updateAll();
		calcPrestigePoints();
		calcTotalDnaPS();
	}, 50);
	//Game updates UI every 50ms.

	window.setInterval(function () {
		save();
	}, 20000);
	//Save game every 20 seconds
}

function gameLoop2() {
	console.log(prestigeItems.gameTick.tick);
	clearInterval(run);

	itemGain();
	cellItemGain();

	run = setInterval(gameLoop2, prestigeItems.gameTick.tick);
}

var run = setInterval(gameLoop2, prestigeItems.gameTick.tick);
gameLoop();
