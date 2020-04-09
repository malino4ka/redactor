
cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad () {
        this.node.on('click', this.onClickSave, this);
    },

    onClickSave(){
        let eventClickSave = new cc.Event.EventCustom('eventClickSave', true);
        cc.systemEvent.dispatchEvent(eventClickSave);
    },

    start () {

    },

    // update (dt) {},
});
