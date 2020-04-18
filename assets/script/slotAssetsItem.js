

cc.Class({
    extends: cc.Component,

    properties: {

        star: {
            default: null,
            type: cc.SpriteFrame,
        },
        gate: {
            default: null,
            type: cc.SpriteFrame,
        },
        key: {
            default: null,
            type: cc.SpriteFrame,
        },
        imgAssetsItem: {
            default: null,
            type: cc.Sprite,
        },
        _assetsId: {
            default: null,
        },
        _assetsName: {
            default: null,
        }
    },


    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchItemStart, this);
    },

    onTouchItemStart() {
        let cloneMechanic = new cc.Event.EventCustom('TouchAssetsItem', true);
        cloneMechanic.setUserData({ id: this._assetsId, name: this._assetsName });
        cc.systemEvent.dispatchEvent(cloneMechanic);
    },

    init(id, name) {
        this.imgAssetsItem.spriteFrame = this[name];
        this._assetsId = id;
        this._assetsName = name;
    },

    start() {

    },

    // update (dt) {},
});
