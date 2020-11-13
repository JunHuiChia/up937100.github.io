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
        name: "Dirty Hands",
        amount: 0,
        cost: 200,
        upg_cost: 6,
        level: 1,
        income: 10,
    },
    food: {
        id: "food",
        name: "Infected Food",
        amount: 0,
        cost: 750,
        upg_cost: 22,
        level: 1,
        income: 25,
    },
    air: {
        id: "air",
        name: "Air droplets",
        amount: 0,
        cost: 2000,
        upg_cost: 60,
        level: 1,
        income: 100,
    },
    person: {
        id: "person",
        name: "Infected Person",
        amount: 0,
        cost: 7500,
        upg_cost: 225,
        level: 1,
        income: 250,
    },
    mask: {
        id: "mask",
        name: "No Masks",
        amount: 0,
        cost: 20000,
        upg_cost: 600,
        level: 1,
        income: 500,
    },
    kiss: {
        id: "kiss",
        name: "Kisses",
        amount: 0,
        cost: 50000,
        upg_cost: 1500,
        level: 1,
        income: 1000,
    },
    faeces: {
        id: "faeces",
        name: "Transfer of Faecal matter",
        amount: 0,
        cost: 125000,
        upg_cost: 3750,
        level: 1,
        income: 1750,
    },
    blood: {
        id: "blood",
        name: "Infected blood transfer",
        amount: 0,
        cost: 300000,
        upg_cost: 9000,
        level: 1,
        income: 5000,
    },
    water: {
        id: "water",
        name: "Contaminated Water",
        amount: 0,
        cost: 750000,
        upg_cost: 22500,
        level: 1,
        income: 10000,
    },
    pathogen: {
        id: "pathogen",
        name: "Deadly pathogens",
        amount: 0,
        cost: 1500000,
        upg_cost: 45000,
        level: 1,
        income: 20000,
    },
    biowep: {
        id: "biowep",
        name: "Powerful Bio-Chemical Weapons",
        amount: 0,
        cost: 5000000,
        upg_cost: 150000,
        level: 1,
        income: 400000,
    },
    biobomb: {
        id: "biobomb",
        name: "Powerful Bio-Chemical Nuclear Bomb",
        amount: 0,
        cost: 25000000,
        upg_cost: 750000,
        level: 1,
        income: 1000000,
    },

};

function initialize() {
    load();
    updateAll();

}

function format(amount){
    let power = Math.floor(Math.log10(amount));
    let mantissa = amount / Math.pow(10,power);
    if(power < 3) return amount.toFixed(0);
    return mantissa.toFixed(2) + "e" + power;
}


function calcTotalPS(){
    var totalPS = 0;
    for(var item in items){
        totalPS += (items[item].income * items[item].amount * items[item].level);
    }
    return format(totalPS);
}

function calcCurrPS(itemVal){
    var itemPS = (items[itemVal].income * items[itemVal].amount * items[itemVal].level);
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
        console.log("test");
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

function updateDnaPS(){
    $("#dnaPS").html(calcTotalPS()+" DNA/s");
}

function clickItem(val){
    var currItem;
    for (var item in items){
        currItem = item;
    }
    $("." + currItem + "Container").click(buyItem(val));
}

function buyItem(val){
    if(player.currencies.dna >= items[val].cost){
        player.currencies.dna -= items[val].cost;
        items[val].cost = (items[val].cost * 1.1) + ((items[val].amount*0.25)+1);
        items[val].amount += 1;
        console.log("cost" + items[val].cost);
    }
}

function clickUpgrade(val){
    var currItem;
    for (var item in items){
        currItem = item;
    }
    $("." + currItem + "UpgContainer").click(buyUpgrade(val));
}

function buyUpgrade(val){
    if(player.currencies.cell >= items[val].upg_cost){
        player.currencies.cell -= items[val].upg_cost;
        items[val].cost = (items[val].upg_cost * 1.05) + ((items[val].level-1)*0.2);
        items[val].level += 1;
        console.log("cost" + items[val].upg_cost);
    }
}

function itemGain(){
    for(var item in items){
        player.currencies.dna += (items[item].income * items[item].amount * items[item].level);
    }
}

function save(){
    localStorage.setItem("playerData", JSON.stringify(player));
    localStorage.setItem("itemData", JSON.stringify(items));
    $('.toast').toast("show");
    console.log("saved");
}

function load(){
    $.extend(player, JSON.parse(localStorage.getItem("playerData")));
    $.extend(items, JSON.parse(localStorage.getItem("itemData")));
}

function updateAll(){
    updateCurrencyUI();
    updateItemsUI();
    updateDnaPS();
    updateUpgradeUI();
}

function gameLoop(){
    var gameTick = player.gameTick;

    window.setInterval(function(){
        itemGain();
        calcTotalPS();
    },gameTick);

    window.setInterval(function(){
        updateAll();
    },50);
    //Game updates UI every 50ms.

    window.setInterval(function(){
        //save();
    },20000);
    //Save game every 20 seconds
}

gameLoop();
