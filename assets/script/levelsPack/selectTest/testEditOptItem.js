

cc.Class({
    extends: cc.Component,

    properties: {

        testEditOptName: {
            default: null,
            type: cc.Label,
        },

        _testEditID: {
            default : null,
        },
    },


    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchEditOptItem, this);
    },

    initFlag(flag){
        if(flag){
            this.node.resumeSystemEvents();
        }
        else{
            this.node.pauseSystemEvents();
        }
    },

    onTouchEditOptItem(e){
        let eventTestItem = new cc.Event.EventCustom('eventTestItem', true);
        eventTestItem.setUserData({name : this.testEditOptName.string, id: this._testEditID});
        cc.systemEvent.dispatchEvent(eventTestItem);
    },

    initEditTest(name,id){
        this.testEditOptName.string = name;
        this._testEditID = id;
    },

    start () {

    },

    // update (dt) {},
});
