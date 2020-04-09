

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
        imgRandomItem : {
            default : null,
            type : cc.Sprite,
        },
        _userId : {
            default : null,
        }

    },


    onLoad () {
    },

    onTouchItemStart(){

    },

    init(id){
        this.imgRandomItem.spriteFrame = this[`type_${id}`];
    },

    start () {

    },

    // update (dt) {},s
});
