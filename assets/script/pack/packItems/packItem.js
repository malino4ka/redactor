import baseComponent from "../../helpers/baseComponent";

cc.Class({
    extends: baseComponent,

    properties: {

        packImg_0: {
            default: null,
            type: cc.SpriteFrame,
        },

        packImg_1: {
            default: null,
            type: cc.SpriteFrame,
        },

        packImg_2: {
            default: null,
            type: cc.SpriteFrame,
        },

        packImg_3: {
            default: null,
            type: cc.SpriteFrame,
        },


        packImg: {
            default: null,
            type: cc.Sprite,
        },

        packName: {
            default: null,
            type: cc.Label,
        },

        _packId: {
            default: null,
        },
   
    },


    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onSceneLaunched, this)
    },

    initPack(id, name){
        this.packImg.spriteFrame = this[`packImg_${id}`];
        this.packName = name;
        this._packId = id;
    },

    onSceneLaunched(){
        this._globalVariable.setPackageName(this.packName);
        this._globalVariable.setPackageId(this._packId);
        cc.director.loadScene("levelsPack");
    },

    start () {

    },

    // update (dt) {},
});
