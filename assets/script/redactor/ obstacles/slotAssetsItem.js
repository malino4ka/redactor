import baseComponent from "../../helpers/baseComponent";


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
        _a: {
            default: null,
        }
    },


    onLoad() {
        // this._globalVariable.counrStars = 0;
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchItemStart, this);
    },

    init(id, name, score, health) {
        this.imgAssetsItem.spriteFrame = this[name];
        this._assetsId = id;
        this._assetsName = name;
        this._assetsScore = score;
        this._assetsHealth = health;
    },

    onTouchItemStart() {

        if (this._assetsName === "key") {
            if (this._globalVariable.getKeyCount() > 0) {
                return false;
            }
            this.onCloneMechanic();
            this._globalVariable.addKeyCount();
        }

        if (this._assetsName === "gate") {
            if (this._globalVariable.getGateCount() > 0) {
                return false;
            }
            this.onCloneMechanic();
            this._globalVariable.addGateCount();
        }

        if (this._assetsName === "star") {
            if (this._globalVariable.getStarsCount() >= 3) {
                return false;
            }
            this.onCloneMechanic();
            this._globalVariable.starsCountIncrement();
        }
    },

    onCloneMechanic() {
        let cloneMechanic = new cc.Event.EventCustom('TouchAssetsItem', true);
        cloneMechanic.setUserData({ id: this._assetsId, name: this._assetsName, score: this._assetsScore, health: this._assetsHealth });
        cc.systemEvent.dispatchEvent(cloneMechanic);
    },


    start() {

    },

    // update (dt) {},
});
