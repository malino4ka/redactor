

cc.Class({
    extends: cc.Component,

    properties: {
    	packajeItemValue : {
            default : null,
            type : cc.Label,
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
    	let eventPackajeItem = new cc.Event.EventCustom('eventPackajeItem', true);
        eventPackajeItem.setUserData({value : this.packajeItemValue.string});
        cc.systemEvent.dispatchEvent(eventPackajeItem);
    },

    initPackaje(id){
    	this.packajeItemValue.string = id;
    },

    start () {

    },

    // update (dt) {},
});
