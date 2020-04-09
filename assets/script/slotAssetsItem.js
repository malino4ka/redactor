

cc.Class({
    extends: cc.Component,

    properties: {

        type_4 : {
            default : null,
            type : cc.SpriteFrame,
        },
        type_5 : {
            default : null,
            type : cc.SpriteFrame,
        },
        type_6 : {
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
        let cloneMechanic = new cc.Event.EventCustom('TouchAssetsItem', true);
        cloneMechanic.setUserData({id : this._userId});
        cc.systemEvent.dispatchEvent(cloneMechanic);
    },

    init(id){
        this.imgAssetsItem.spriteFrame = this[`type_${id}`];
        this._userId = id;
    },

    start () {

    },

    // update (dt) {},
});
