

cc.Class({
    extends: cc.Component,

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
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchItemStart, this)
    },

    initPack(id, name){
        this.packImg.spriteFrame = this[`packImg_${id}`];
        this.packName = name;
        this._packId = id;
    },

    onTouchItemStart(){
        cc.director.loadScene("levelsPack",this.onSceneLaunched);
    },

    onSceneLaunched(){
        let togglePacks = new cc.Event.EventCustom('togglePacks', true);
        togglePacks.setUserData({id : this._packId ,name : this.packName});
        cc.systemEvent.dispatchEvent(togglePacks);
    },

    start () {

    },

    // update (dt) {},
});
