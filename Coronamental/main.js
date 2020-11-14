var player ={
    prestigeLevel: 0,
    currencies: {
        dna: 0.0,
        cell: 0.0
    },  //currency
    clickPower: 1,
    gameTick: 1000,

};

var items = {
    flies: {
        id: "flies",
        name: "Flies",
        amount: 0,
        cost: 10,
        upg_cost: 1,
        level: 1,
        income: 1,
    },
    hands: {
        id: "hands",
        name: "Dirty hands",
        amount: 0,
        cost: 250,
        upg_cost: 10,
        level: 1,
        income: 10,
    },
    food: {
        id: "food",
        name: "Infected food",
        amount: 0,
        cost: 1500,
        upg_cost: 60,
        level: 1,
        income: 25,
    },
    air: {
        id: "air",
        name: "Air droplets",
        amount: 0,
        cost: 7500,
        upg_cost: 250,
        level: 1,
        income: 100,
    },
    person: {
        id: "person",
        name: "Infected person",
        amount: 0,
        cost: 25000,
        upg_cost: 1000,
        level: 1,
        income: 250,
    },
    mask: {
        id: "mask",
        name: "No masks",
        amount: 0,
        cost: 60000,
        upg_cost: 2000,
        level: 1,
        income: 500,
    },
    kiss: {
        id: "kiss",
        name: "Kisses",
        amount: 0,
        cost: 1000000,
        upg_cost: 30000,
        level: 1,
        income: 1000,
    },
    faeces: {
        id: "faeces",
        name: "Transfer of faecal matter",
        amount: 0,
        cost: 3250000,
        upg_cost: 60500,
        level: 1,
        income: 1750,
    },
    blood: {
        id: "blood",
        name: "Infected blood transfer",
        amount: 0,
        cost: 12500000,
        upg_cost: 125000,
        level: 1,
        income: 5000,
    },
    water: {
        id: "water",
        name: "Contaminated water",
        amount: 0,
        cost: 7500000,
        upg_cost: 40000,
        level: 1,
        income: 10000,
    },
    pathogen: {
        id: "pathogen",
        name: "Deadly pathogens",
        amount: 0,
        cost: 15000000,
        upg_cost: 100000,
        level: 1,
        income: 20000,
    },
    biowep: {
        id: "biowep",
        name: "Powerful Bio-Chemical Weapons",
        amount: 0,
        cost: 100000000,
        upg_cost: 800000,
        level: 1,
        income: 400000,
    },
    biobomb: {
        id: "biobomb",
        name: "Powerful Bio-Chemical Nuclear Bomb",
        amount: 0,
        cost: 25000000000,
        upg_cost: 160000000,
        level: 1,
        income: 1000000,
    },
    gas: {
        id: "gas",
        name: "Covid19 world gas",
        amount: 0,
        cost: 50000000000,
        upg_cost: 2000000000,
        level: 1,
        income: 10000000,
    },
    ender: {
        id: "ender",
        name: "Ender of World - Corona Virus!",
        amount: 0,
        cost: 500000000000,
        upg_cost: 500000000000,
        level: 1,
        income: 700000000,
    },
};

var cellItems = {
    fuse1: {
        id: "fuse1",
        name: "Cell Fuse I",
        amount: 0,
        cost: 50000,
        upg_cost: 500000,
        level: 1,
        income: 1,
    },
    fuse2: {
        id: "fuse2",
        name: "Cell Fuse II",
        amount: 0,
        cost: 25000000,
        upg_cost: 250000000,
        level: 1,
        income: 100,
    },
};

function initialize() {
    load();
    updateAll();

}

function format(amount){
    let power = Math.floor(Math.log10(amount));
    let mantissa = amount / Math.pow(10,power);
    if(power < 5) return amount.toFixed(0);
    return mantissa.toFixed(2) + "e" + power;
}


function calcTotalDnaPS(){
    var TotalDnaPS = 0;
    for(var item in items){
        TotalDnaPS += (items[item].income * items[item].amount * items[item].level);
    }
    return format(TotalDnaPS);
}

function calcTotalCellPS(){
    var TotalCellPS = 0;
    for(var item in cellItems){
        TotalCellPS += (cellItems[item].income * cellItems[item].amount * cellItems[item].level);
    }
    return format(TotalCellPS);
}

function calcCurrPS(itemVal){
    var itemPS = (items[itemVal].income * items[itemVal].amount * items[itemVal].level);
    return format(itemPS);
}

function calcCurrCellPS(itemVal){
    var itemPS = (cellItems[itemVal].income * cellItems[itemVal].amount * cellItems[itemVal].level);
    return format(itemPS);
}



function addCurrency(val,id) {
    var currency;
    switch (id){
        case 'dna': player.currencies.dna += val; break;
        case 'cell': 
        if(player.currencies.dna >= 100){player.currencies.dna -= 100;player.currencies.cell += val;}
        else(console.log("Error, not enough dna"));
        break;
    }
    currency += val;
    return val;
}

function clickCurrency(id) {
    addCurrency(player.clickPower,id);
}

function updateCurrencyUI() {
        for (var val in player.currencies){
            $("#" + val +"Amt").html(format(player.currencies[val]));
        }
        if (player.currencies.dna >= 100){
            $("#cellClick").removeClass("disabled");
        }
        else{
            $("#cellClick").addClass("disabled");
        }
}

function updateItemsUI() {
    for (var val in items){
        if(player.currencies.dna >= items[val].cost){
        $("." + val+"Container").css({color: 'green'});
        }
        else{
            $("." + val + "Container").css({color: 'red'});
        }
        
        $("#" + val +"Name").html(items[val].name);
        $("#" + val +"Amount").html("Amount: " + format(items[val].amount));
        $("#" + val +"Cost").html("Cost: " + format(items[val].cost) + " DNA");
        $("#" + val +"DnaPS").html(calcCurrPS(val) + " DNA/s");

    }
}

function updateCellItemsUI() {
    for (var val in cellItems){
        if(player.currencies.dna >= cellItems[val].cost){
        $("." + val+"CellContainer").css({color: 'green'});
        }
        else{
            $("." + val + "CellContainer").css({color: 'red'});
        }
        $("#" + val +"CellName").html(cellItems[val].name);
        $("#" + val +"CellAmount").html("Amount: " + format(cellItems[val].amount));
        $("#" + val +"CellCost").html("Cost: " + format(cellItems[val].cost) + " DNA");
        $("#" + val +"CellPS").html(calcCurrCellPS(val) + " Cell/s");

    }
}

function updateUpgradeUI() {
    for (var val in items){
        if(player.currencies.cell >= items[val].upg_cost){
        $("." + val+"UpgContainer").css({color: 'green'});
        }
        else{
            $("." + val + "UpgContainer").css({color: 'red'});
        }
        $("#" + val +"NameUpg").html(items[val].name + " Upgrade");
        $("#" + val +"LevelUpg").html("Level: " + format(items[val].level));
        $("#" + val +"CostUpg").html("Cost: " + format(items[val].upg_cost) + " Cells");

    }
}

function updateCellUpgradeUI() {
    for (var val in cellItems){
        if(player.currencies.cell >= cellItems[val].upg_cost){
        $("." + val+"CellUpgContainer").css({color: 'green'});
        }
        else{
            $("." + val + "CellUpgContainer").css({color: 'red'});
        }
        $("#" + val +"CellNameUpg").html(cellItems[val].name + " Upgrade");
        $("#" + val +"CellLevelUpg").html("Level: " + format(cellItems[val].level));
        $("#" + val +"CellCostUpg").html("Cost: " + format(cellItems[val].upg_cost) + " Cells");

    }
}

function updateDnaPS(){
    $("#dnaPS").html(calcTotalDnaPS()+" DNA/s");
    $("#cellPS").html(calcTotalCellPS()+" Cell/s");
}

function clickItem(val){
    var currItem;
    for (var item in items){
        currItem = item;
    }
    $("." + currItem + "Container").click(buyItem(val));
}

function clickCellItem(val){
    var currCellItem;
    for (var cellItem in cellItems){
        currCellItem = cellItem;
    }
    $("."+ currCellItem + "Container").click(buyCellItem(val));
}

function buyItem(val){
    if(player.currencies.dna >= items[val].cost){
        player.currencies.dna -= items[val].cost;
        items[val].cost = Math.round((items[val].cost * 1.2) + ((items[val].amount*0.3)+1));
        items[val].amount += 1;
    }
}

function buyCellItem(val){
    if(player.currencies.dna >= cellItems[val].cost){
        player.currencies.dna -= cellItems[val].cost;
        cellItems[val].cost = Math.round((cellItems[val].cost * 1.3) + ((cellItems[val].amount*0.4)+1));
        cellItems[val].amount += 1;
    }
}

function clickUpgrade(val){
    var currItem;
    for (var item in items){
        currItem = item;
    }
    $("." + currItem + "UpgContainer").click(buyUpgrade(val));
}

function clickCellUpgrade(val){
    var currCellItem;
    for (var item in cellItems){
        currCellItem = item;
    }
    $("." + currCellItem + "CellUpgContainer").click(buyCellUpgrade(val));
}

function buyUpgrade(val){
    if(player.currencies.cell >= items[val].upg_cost){
        player.currencies.cell -= items[val].upg_cost;
        items[val].upg_cost = Math.round((items[val].upg_cost * 1.5) + ((items[val].level-1)*0.4));
        items[val].level += 1;
    }
}

function buyCellUpgrade(val){
    if(player.currencies.cell >= cellItems[val].upg_cost){
        player.currencies.cell -= cellItems[val].upg_cost;
        cellItems[val].upg_cost = Math.round((cellItems[val].upg_cost * 1.75) + ((cellItems[val].level-1)*0.4));
        cellItems[val].level += 1;
    }
}

function itemGain(){
    for(var item in items){
        player.currencies.dna += (items[item].income * items[item].amount * items[item].level);
    }
}

function cellItemGain(){
    for(var cell in cellItems){
        player.currencies.cell += (cellItems[cell].income * cellItems[cell].amount * cellItems[cell].level);
    }
}

function save(){
    localStorage.setItem("playerData", JSON.stringify(player));
    localStorage.setItem("itemData", JSON.stringify(items));
    localStorage.setItem("cellItemData", JSON.stringify(cellItems));
    $('.toast').toast("show");
    console.log("saved");
}

function load(){
    $.extend(player, JSON.parse(localStorage.getItem("playerData")));
    $.extend(items, JSON.parse(localStorage.getItem("itemData")));
    $.extend(cellItems, JSON.parse(localStorage.getItem("cellItemData")));
}

function deleteSave(){
    localStorage.removeItem("playerData");
    localStorage.removeItem("itemData");
    localStorage.removeItem("cellItemData");
    location.reload();
}

function exportSave(){
    var playerText = btoa(JSON.stringify(player));
    var itemText = btoa(JSON.stringify(items));
    var cellItemText = btoa(JSON.stringify(cellItems));

    $("#exportSaveContents1").toggle();
    $("#exportSaveContents2").toggle();
    $("#exportSaveContents3").toggle();
    $("#exportSaveText1").val(playerText);
    $("#exportSaveText2").val(itemText);
    $("#exportSaveText3").val(cellItemText);

}

function importSave(){
    alert("Warning: this will erase your current save!");
    try{
        var playerText = $("#importSaveText1").val();
        var itemText = $("#importSaveText2").val();
        var cellItemText = $("#importSaveText3").val();

        $.extend(player, JSON.parse(atob(playerText)));
        $.extend(items, JSON.parse(atob(itemText)));
        $.extend(cellItems, JSON.parse(atob(cellItemText)));
    }
    catch(e){
        alert("Invalid save files");
    }

    

    
}

function updateAll(){
    updateCurrencyUI();
    updateItemsUI();
    updateDnaPS();
    updateUpgradeUI();
    updateCellItemsUI();
    updateCellUpgradeUI();
}

function gameLoop(){
    var gameTick = player.gameTick;

    window.setInterval(function(){
        itemGain();
        cellItemGain();
        calcTotalDnaPS();
    },gameTick);

    window.setInterval(function(){
        updateAll();
    },50);
    //Game updates UI every 50ms.

    window.setInterval(function(){
        save();
    },20000);
    //Save game every 20 seconds
}

gameLoop();
