
function gameLoop(that){
    let diff = (Date.now() - that.player.lastUpdate)/1000;
    that.player.currency.cells += that.player.building[0].level * that.player.building[0].multi * diff;

    that.player.lastUpdate = Date.now();
}
