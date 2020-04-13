cc.Class({
    extends: cc.Component,

    properties: {
        tutorialItemValue : {
            default : null,
            type : cc.Label,
        },
        _tutorialId:{
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
        let eventTutorialItem = new cc.Event.EventCustom('eventTutorialItem', true);
        eventTutorialItem.setUserData({value : this.tutorialItemValue.string, id: this._tutorialId});
        cc.systemEvent.dispatchEvent(eventTutorialItem);
    },

    initTutorial(name, id){
        this.tutorialItemValue.string = name;
        this._tutorialId = id
    },

    start () {

    },

    // update (dt) {},
});