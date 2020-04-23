

cc.Class({
    extends: cc.Component,

    properties: {
    	testItemValue : {
            default : null,
            type : cc.Label,
        },
        _testID: {
            default : null,
        },
    },

    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchItemStart, this);
    },

    init(flag){
        if(flag){
            this.node.resumeSystemEvents();
        }
        else{
            this.node.pauseSystemEvents();
        }
    },

    onTouchItemStart(e){
        let eventTestItem = new cc.Event.EventCustom('eventTestItem', true);
        eventTestItem.setUserData({value : this.testItemValue.string, id: this._testID});
        cc.systemEvent.dispatchEvent(eventTestItem);
    },

    initTest(name,id){
        this.testItemValue.string = name;
        this._testID = id;
    },

    start () {

    },

    // update (dt) {},
});
