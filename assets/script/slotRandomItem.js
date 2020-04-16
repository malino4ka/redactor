import nameRandomItems from "./helpers/mapRandomItems";

// let userData = JSON.parse(cc.sys.localStorage.getItem('userData'));

// let randomItems = [
//         {hurricane:{active : false}},
//         {storm:{active : false}},
// ]

cc.Class({
    extends: cc.Component,

    properties: {
        type_3 : {
            default : null,
            type : cc.SpriteFrame,
        },
        type_11 : {
            default : null,
            type : cc.SpriteFrame,
        },

        toggleActive:{
            default : null,
            type : cc.Toggle,
        },

        imgRandomItem : {
            default : null,
            type : cc.Sprite,
        },
        _randomId: {
            default : null,
        },
        _randomName: {
            default : null,
        },

    },


    onLoad () {
        this.toggleActive.node.on('toggle', this.onTouchItemStart, this);
        cc.systemEvent.on("eventClickSave",this.onRandomItemsSave, this);
    },

    onTouchItemStart(){
        cc.log('work')
    },

    onRandomItemsSave(){
        let userData = JSON.parse(cc.sys.localStorage.getItem('userData'));
        let activeItem = this.toggleActive.isChecked;
        if(typeof userData.levelInfo.items.randomItems === 'undefined'){
            userData.levelInfo.items.randomItems = [
                // {hurricane:{active : false}},
                // {storm:{active : false}},
            ]
        }
        userData.levelInfo.items.randomItems.push({[this._randomName]:{active : activeItem}});
        cc.log(userData);
        cc.sys.localStorage.setItem('userData', JSON.stringify(userData));
    },


    init(id,name){
        this.imgRandomItem.spriteFrame = this[`type_${id}`];
        this._randomName = name;
        this._randomId = id;
    },

    start () {

    },

    // update (dt) {},s
});
