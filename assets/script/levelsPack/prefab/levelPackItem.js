import baseComponent from "../../helpers/baseComponent";

cc.Class({
    extends: baseComponent,

    properties: {

        levelImg: {
            default: null,
            type: cc.Sprite,
        },

        levelName: {
            default: null,
            type: cc.Label,
        },

        _packageId:{
            default: null,
        },

        _testVersionNumber:{
            default: null,
        },

    },



    onLoad (){
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchLevel, this);
    },

    initLevelItem(levelNumber,packageId,testVersionNumber){
        this.levelName.string = levelNumber;
        this._packageId = packageId;
        this._testVersionNumber = testVersionNumber;
    },

    onTouchLevel(){
        cc.log('work')
    },

    start () {

    },

    // update (dt) {},
});
