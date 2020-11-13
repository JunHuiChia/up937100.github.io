Vue.component('building', {
    props: {
        building: Building
    },
    data: function(){
        return{
            
        };
        
    },
    methods: {
        format(amount){
            return format(amount);
        }
    },
    template: 
    `<div>
        <h4>{{building.name}}</h4>
        <span class="building_level"> Level {{ format(building.level)}} </span>
        <span class="building_cost">Cost {{ format(building.cost)}}</span>
        <button @click="building.buy()">Buy</button>
    </div>`


});
