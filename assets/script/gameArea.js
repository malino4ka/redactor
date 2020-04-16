import nameGameAreaItem from "./helpers/mapGameAreiaItem";


let levelInfo = {
    items:{

    },
}


cc.Class({
    extends: cc.Component,

    properties: {
        _randomArray: {
            default: {},
        },
    },


    onLoad () {

        cc.systemEvent.on("eventClickSave",this.onGameAreaItemsSave, this);
    },

    initRandom(event){
        let a = event.getUserData();
        let randomArray = a.response.obstacles.random;
        this._randomArray = randomArray;
    },


    onGameAreaItemsSave(){
        let userData = JSON.parse(cc.sys.localStorage.getItem('userData'));
        let gameAreaChildren = this.node.children;
        for(let index in gameAreaChildren){
            let item = gameAreaChildren[index];
            let nameItem = item.getComponent('gameAreaItem').getItemName();
            cc.log(nameItem)
            if(typeof levelInfo.items[nameItem] === 'undefined'){
                levelInfo.items[nameItem] = {arr:[]};
            }
            levelInfo.items[nameItem].arr.push({x:item.x,y:item.y});
        }
        cc.log(levelInfo)
        userData.levelInfo= levelInfo;
        cc.sys.localStorage.setItem('userData', JSON.stringify(userData));
    },

    start () {

    },

    // update (dt) {},
});

