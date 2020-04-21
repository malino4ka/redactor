// import nameGameAreaItem from "./helpers/mapGameAreiaItem";
import baseComponent from "./helpers/baseComponent";



cc.Class({
    extends: baseComponent,


    properties: {
        _randomArray: {
            default: {},
        },
    },


    onLoad() {

        cc.systemEvent.on("eventClickSave", this.onGameAreaItemsSave, this);
    },

    initRandom(event) {
        let a = event.getUserData();
        let randomArray = a.response.obstacles.random;
        this._randomArray = randomArray;
    },

    onGameAreaItemsSave() {
        let userData = this._globalVariable.getUserData();
        if (typeof userData.levelInfo === "undefined") {
            userData.levelInfo = {
                items: {

                },
            }
        }
        let gameAreaChildren = this.node.children;
        cc.log('===========================')
        cc.log(gameAreaChildren);
        for (let index in gameAreaChildren) {
            let item = gameAreaChildren[index];
            let nameItem = item.getComponent('gameAreaItem').getItemName();
            let scoreItem = item.getComponent('gameAreaItem').getItemScore();
            let healthItem = item.getComponent('gameAreaItem').getItemHealth();
            if (typeof userData.levelInfo.items[nameItem] === 'undefined') {
                userData.levelInfo.items[nameItem] = { arr: [] };
            }
            if (item.angle === 0) {
                userData.levelInfo.items[nameItem].arr.push({ x: item.x, y: item.y, score: scoreItem, health: healthItem });
            }
            else {
                userData.levelInfo.items[nameItem].arr.push({ x: item.x, y: item.y, angle: item.angle, score: scoreItem, health: healthItem });
            }
        }

        this._globalVariable.setUserData(userData);
    },

    start() {

    },

    // update (dt) {},
});

