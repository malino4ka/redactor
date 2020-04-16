import baseComponent from "../../helpers/baseComponent";

cc.Class({
    extends: baseComponent,

    properties: {

        tutorialSelectItem : {
            default : null,
            type : cc.Prefab,
        },

    /*======== Select ==========*/   

        tutorialName : {
            default : null,
            type : cc.Label,
        },


    /*======== Options ==========*/   

        tutorialOptions : {
            default : null,
            type : cc.Layout,
        },
    

    /*======== helpers =========*/

        _optionsFlag: {
            default: true,
        },

        _optArray: {
            default : [],
        },
        _optValueStorage: {
            default : null,
        },
        _tutorialId: {
            default : null,
        },
    },



    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onShowOptions, this);
        cc.systemEvent.on("eventTutorialItem",this.onTouchTutorialItem, this);
        cc.systemEvent.on("eventClickSave",this.onEventClickSave, this);

        cc.systemEvent.on(this._mapEvents.REDACTOR_GAME_AREA_INIT_RESPONSE,this.initTutorial, this);
    },

    initTutorial(event){
        let a = event.getUserData();
        let tutorialArray = a.response.tutorials;
        cc.log(tutorialArray[1].name)
        for(let i = 0; i < tutorialArray.length; i++){
            let item = cc.instantiate(this.tutorialSelectItem);
            item.getComponent('tutorialOptItem').initTutorial(tutorialArray[i].name, tutorialArray[i].id);
            this._optArray.push(item.getComponent('tutorialOptItem'));
            this.tutorialOptions.node.addChild(item);
        }
    },

    onTouchTutorialItem(e){
        let value = e.getUserData().value;
        let id = e.getUserData().id;
        this.tutorialName.string = value;
        this._optValueStorage = value;
        this._tutorialId = id;

    },

    onEventClickSave(e){
        let userData = JSON.parse(cc.sys.localStorage.getItem('userData'));
        userData.levelInfo.settings.tutorialId = this._tutorialId
        cc.sys.localStorage.setItem('userData', JSON.stringify(userData));
    },

    /*==========================*/

    onShowOptions(){
        for(let i in this._optArray){
            this._optArray[i].init(this._optionsFlag);
        }
        if(this._optionsFlag == true){
            this.tutorialOptions.node.opacity = 255;
            this._optionsFlag = false;
            return;
        }
        else if(this._optionsFlag == false){
            this.tutorialOptions.node.opacity = 0;
            this._optionsFlag = true;
            return;
        }
    },

    start () {

    },

    // update (dt) {},
});
