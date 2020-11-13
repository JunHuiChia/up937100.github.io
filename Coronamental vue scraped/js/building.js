class Building{

    constructor(props){
        this.name = props.name;
        this.cost = props.cost;
        this.multi = props.multi;
        this.level = props.level;
    }

    get canBuy(){
        return this.cost <= player.currency.cells;
    }

    buy() {
        if (!this.canBuy) return;
        player.currency.cells -= this.cost;
        this.cost *= 1 + (this.level+1)*0.25;
        this.level += 1;
    }

    infectPerSecond() {
        let ret = this.level * this.multi;
        return ret;
    }


}

function getRow(type){
    switch(type){
        case "flies":
        return 1;

        case "hands":
        return 2;

        case "mask":
        return 3;
    }
}

const building_names = ["flies","hands","mask"];

function generateBuildingName(type){
    switch(type){
        case "flies":
        return building_names[0];

        case "hands":
        return building_names[1];

        case "mask":
        return building_names[2];    
    }
}

function createBuilding(level, type){
    let row = getRow(type);

    const g = {
        name: "flies",
        cost: Math.pow(10, level * (row +1)),
        multi: 1,
        level: 1
    };

    return new Building(g);
}
