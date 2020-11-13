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
        level: 1,
        income: 1,
        tier: 1,
    },
    hands: {
        id: "hands",
        name: "Dirty Hands",
        amount: 0,
        cost: 200,
        level: 1,
        income: 10,
        tier: 2,
    },
    food: {
        id: "food",
        name: "Infected Food",
        amount: 0,
        cost: 750,
        level: 1,
        income: 25,
        tier: 3,
    },
};

function initialize() {


}

function format(amount){
    let power = Math.floor(Math.log10(amount));
    let mantissa = amount / Math.pow(10,power);
    if(power < 3) return amount.toFixed(0);
    return mantissa.toFixed(2) + "e" + power;
}


function calcDnaPS(){
    var totalPS = 0;
    for(var item in items){
        totalPS += (items[item].income * items[item].amount * items[item].level);
    }
    return totalPS;
}

function updateDnaPS(){
    $("#dnaPS").html(calcDnaPS()+" DNA/s");
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
        $("#" + val +"Cost").html("Cost: " + format(items[val].cost));
        $("#" + val +"Level").html("Level: " + format(items[val].level));
    }
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

function itemGain(){
    for(var item in items){
        player.currencies.dna += (items[item].income * items[item].amount * items[item].level);
    }
}



function updateAll(){
    updateCurrencyUI();
    updateItemsUI();
    updateDnaPS();
}

function gameLoop(){
    var gameTick = player.gameTick;

    window.setInterval(function(){
        itemGain();
        calcDnaPS();
    },gameTick);

    window.setInterval(function(){
        updateAll();
    },50);
    //Game updates UI every 50ms.
}

gameLoop();
