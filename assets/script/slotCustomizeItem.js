

cc.Class({
    extends: cc.Component,

    properties: {

        type_1 : {
            default : null,
            type : cc.SpriteFrame,
        },
        type_2 : {
            default : null,
            type : cc.SpriteFrame,
        },
        type_7 : {
            default : null,
            type : cc.SpriteFrame,
        },
        type_8 : {
            default : null,
            type : cc.SpriteFrame,
        },
        type_9 : {
            default : null,
            type : cc.SpriteFrame,
        },
        type_10 : {
            default : null,
            type : cc.SpriteFrame,
        },
        type_12 : {
            default : null,
            type : cc.SpriteFrame,
        },
        type_13 : {
            default : null,
            type : cc.SpriteFrame,
        },
        imgAssetsItem : {
            default : null,
            type : cc.Sprite,
        },
        _userId : {
            default : null,
        }
    },


    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchItemStart, this);
    },

    onTouchItemStart(){
        let cloneMechanic = new cc.Event.EventCustom('TouchCustomizeItem', true);
        cloneMechanic.setUserData({id : this._userId});
        cc.systemEvent.dispatchEvent(cloneMechanic);
        cc.log(`slotCustomizeItem ${this._userId}`)
    },

    init(id){
        this.imgAssetsItem.spriteFrame = this[`type_${id}`];
        this._userId = id;
    },

    start (){

    },

    // update (dt) {},
});
