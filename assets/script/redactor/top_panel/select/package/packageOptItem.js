

cc.Class({
    extends: cc.Component,

    properties: {
    	packageItemValue : {
            default : null,
            type : cc.Label,
        },
        _packageId:{
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
    	let eventPackageItem = new cc.Event.EventCustom('eventPackageItem', true);
        eventPackageItem.setUserData({value : this.packageItemValue.string, id: this._packageId});
        cc.systemEvent.dispatchEvent(eventPackageItem);
    },

    initPackage(name, id){
    	this.packageItemValue.string = name;
        this._packageId = id
    },

    start () {

    },

    // update (dt) {},
});
