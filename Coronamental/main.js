var player ={
    prestigeLevel: 0,
    currencies: {
        dna: 0.0,
        cell: 0.0
    },  //currency
    clickPower: 1

};

var items = {
    flies: {
        id: "flies",
        name: "Flies",
        amount: 0,
        cost: 10,
        level: 1,
        income: 1,
    },
    hands: {
        id: "hands",
        name: "Dirty Hands",
        amount: 0,
        cost: 200,
        level: 1,
        income: 10,
    }
};

function initialize() {


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
            $("#" + val +"Amt").html(player.currencies[val]);
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
        $("#" + val +"Amount").html("Amount: " + items[val].amount);
        $("#" + val +"Cost").html("Cost: " + items[val].cost);
        $("#" + val +"Level").html("Level: " + items[val].level);
    }
}


function clickItem(val){
    for (var item in items){
        $("." + item + "Container").click(buyItem(val));
    }
}

function buyItem(val){
    if(player.currencies.dna >= items[val].cost){
        player.currencies.dna -= items[val].cost;
        items[val].cost += (items[val].amount + 1) * 1.25;
        items[val].amount += 1;
    }
}





window.setInterval(function(){
    updateCurrencyUI();
    updateItemsUI();
},50);

window.setInterval(function(){
    updateCurrencyUI();
    updateItemsUI();
},500);