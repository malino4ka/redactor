import baseComponent from "./helpers/baseComponent";


cc.Class({
    extends: baseComponent,

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
        },

        _assetsScore: {
            default: null,
        },
        _assetsHealth: {
            default: null,
        },
    },


    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchItemStart, this);
        cc.systemEvent.on("CloseItem", this.oncloseItem, this);
    },

    init(id, name, score, health) {
        this.imgAssetsItem.spriteFrame = this[name];
        this._assetsId = id;
        this._assetsName = name;
        this._assetsScore = score;
        this._assetsHealth = health;
    },

    onTouchItemStart() {
        cc.log(this._assetsName);
        if (this._assetsName === "key") {
            if (this._globalVariable.getKeyCount() === 0) {
                this.onCloneMechanic();
                this._globalVariable.setKeyCount(1);
                this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchItemStart, this);
            }
            else if (this._globalVariable.getKeyCount() === 1) {
                this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchItemStart, this);
            }
        }

        if (this._assetsName === "gate") {
            if (this._globalVariable.getGateCount() === 0) {
                this.onCloneMechanic();
                this._globalVariable.setGateCount(1);
                this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchItemStart, this);
            }
            else if (this._globalVariable.getGateCount() === 1) {
                this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchItemStart, this);
            }
        }

        if (this._assetsName === "star") {
            cc.log(this._globalVariable.getStarsCount())
            if (this._globalVariable.getStarsCount() < 3) {
                this._globalVariable.setStarsCount(1);
                this.onCloneMechanic();
            }
            else if (this._globalVariable.getStarsCount() >= 3) {
                this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchItemStart, this);
            }
        }
    },

    onCloneMechanic() {
        let cloneMechanic = new cc.Event.EventCustom('TouchAssetsItem', true);
        cloneMechanic.setUserData({ id: this._assetsId, name: this._assetsName, score: this._assetsScore, health: this._assetsHealth });
        cc.systemEvent.dispatchEvent(cloneMechanic);
    },

    oncloseItem() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchItemStart, this);
    },
    start() {

    },

    // update (dt) {},
});
