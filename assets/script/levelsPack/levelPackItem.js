

cc.Class({
    extends: cc.Component,

    properties: {

        levelImg: {
            default: null,
            type: cc.Sprite,
        },

        levelName: {
            default: null,
            type: cc.Label,
        }

    },



    onLoad () {

    },

    init(id,name){
        cc.log('work')
    },

    start () {

    },

    // update (dt) {},
});
