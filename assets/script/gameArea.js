import nameGameAreaItem from "./helpers/mapGameAreiaItem";

// let userData = JSON.parse(cc.sys.localStorage.getItem('userData'));

let gameAreaObject = {

        rocks:{arr:[]},
        transporterShips:{arr:[]},
        waterMills:{arr:[]},
        woodFences:{arr:[]},
        magicTriangles:{arr:[]},
        tideIslands:{arr:[]},
        cargoShipsProcessions:{arr:[]},
        fortSingles:{arr:[]},

        stars:{arr:[]},
        key:{position:[]},
        gate:{position:[]},

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
                if(nameItem === nameGameAreaItem.rock){
                    gameAreaObject.rocks.arr.push({x:item.x,y:item.y})
                }
                else if(nameItem === nameGameAreaItem.transporterShip){
                    gameAreaObject.transporterShips.arr.push({x:item.x,y:item.y})
                }
                else if(nameItem === nameGameAreaItem.waterMill){
                    gameAreaObject.waterMills.arr.push({x:item.x,y:item.y})
                }
                else if(nameItem === nameGameAreaItem.woodFence){
                    gameAreaObject.woodFences.arr.push({x:item.x,y:item.y})
                }
                else if(nameItem === nameGameAreaItem.magicTriangle){
                    gameAreaObject.magicTriangles.arr.push({x:item.x,y:item.y})
                }
                else if(nameItem === nameGameAreaItem.tideIsland){
                    gameAreaObject.tideIslands.arr.push({x:item.x,y:item.y})
                }
                else if(nameItem === nameGameAreaItem.cargoShipsProcession){
                    gameAreaObject.cargoShipsProcessions.arr.push({x:item.x,y:item.y})
                }
                else if(nameItem === nameGameAreaItem.fortSingle){
                    gameAreaObject.fortSingles.arr.push({x:item.x,y:item.y})
                }

                else if(nameItem === nameGameAreaItem.star){
                    gameAreaObject.stars.arr.push({x:item.x,y:item.y})
                }
                else if(nameItem === nameGameAreaItem.key){
                    gameAreaObject.key.position.push({x:item.x,y:item.y})
                }
                else if(nameItem === nameGameAreaItem.gate){
                    gameAreaObject.gate.position.push({x:item.x,y:item.y})
                }
        }
        userData.gameAreaObject = gameAreaObject
        cc.sys.localStorage.setItem('userData', JSON.stringify(userData));
    },

    start () {

    },

    // update (dt) {},
});

// cc.sys.localStorage.setItem('userData', JSON.stringify(userData));