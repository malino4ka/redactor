

cc.Class({
    extends: cc.Component,

    properties: {
    	testItemValue : {
            default : null,
            type : cc.Label,
        },
    },

    onLoad () {
    	let b = [1,2,3]
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
        eventTestItem.setUserData({value : this.testItemValue.string});
        cc.systemEvent.dispatchEvent(eventTestItem);
    },

    initTest(id){
        this.testItemValue.string = id;
    },

    start () {

    },

    // update (dt) {},
});
