

cc.Class({
    extends: cc.Component,

    properties: {

        rock: {
            default: null,
            type: cc.SpriteFrame,
        },
        transporterShip: {
            default: null,
            type: cc.SpriteFrame,
        },
        waterMill: {
            default: null,
            type: cc.SpriteFrame,
        },
        woodFence: {
            default: null,
            type: cc.SpriteFrame,
        },
        magicTriangle: {
            default: null,
            type: cc.SpriteFrame,
        },
        tideIsland: {
            default: null,
            type: cc.SpriteFrame,
        },
        cargoShipsProcession: {
            default: null,
            type: cc.SpriteFrame,
        },
        fortSingle: {
            default: null,
            type: cc.SpriteFrame,
        },
        imgAssetsItem: {
            default: null,
            type: cc.Sprite,
        },
        _customizeId: {
            default: null,
        },
        _customizeName: {
            default: null,
        },
        _customizeScore: {
            default: null,
        },
        _customizeHealth: {
            default: null,
        },
    },


    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchItemStart, this);
    },

    onTouchItemStart() {
        let cloneMechanic = new cc.Event.EventCustom('TouchCustomizeItem', true);
        cloneMechanic.setUserData({ id: this._customizeId, name: this._customizeName, score: this._customizeScore, health: this._customizeHealth });
        cc.systemEvent.dispatchEvent(cloneMechanic);
    },

    init(id, name, score, health) {
        this.imgAssetsItem.spriteFrame = this[name];
        this._customizeId = id;
        this._customizeName = name;
        this._customizeScore = score;
        this._customizeHealth = health;
    },

    start() {

    },

    // update (dt) {},
});
