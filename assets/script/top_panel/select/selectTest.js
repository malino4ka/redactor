import baseComponent from "../../helpers/baseComponent";

cc.Class({
    extends: baseComponent,

    properties: {

    /*======== Prefab ==========*/

        testSelectItem : {
            default : null,
            type : cc.Prefab,
        },

    /*======== Select ==========*/   

        testName : {
            default : null,
            type : cc.Label,
        },

    /*======== Options ==========*/   

        testOptions : {
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
        _testId: {
            default : null,
        },

    },


    onLoad () {

        this.node.on(cc.Node.EventType.TOUCH_START, this.onShowOptions, this);
        cc.systemEvent.on("eventTestItem",this.onTouchTestItem, this);
        cc.systemEvent.on("eventClickSave",this.onEventClickSave, this);

        cc.systemEvent.on(this._mapEvents.REDACTOR_GAME_AREA_INIT_RESPONSE,this.initTest, this);
    },

    initTest(event){
        let a = event.getUserData();
        let testArray = a.response.testVersions;
        for(let i = 0; i < testArray.length; i++){
            let item = cc.instantiate(this.testSelectItem);
            item.getComponent('testOptItem').initTest(testArray[i].name ,testArray[i].id);
            this._optArray.push(item.getComponent('testOptItem'));
            this.testOptions.node.addChild(item);
            
        }
    },

    onTouchTestItem(e){
        let value = e.getUserData().value;
        let id = e.getUserData().id;
        this.testName.string = value;
        this._optValueStorage = value;
        this._testId = id;
    },

    onEventClickSave(e){
        let userData = JSON.parse(cc.sys.localStorage.getItem('userData'));
        userData.settings.test = {name: this._optValueStorage, id: this._testId};;
        cc.sys.localStorage.setItem('userData', JSON.stringify(userData));
    },

    onShowOptions(arg){
        for(let i in this._optArray){
            this._optArray[i].init(this._optionsFlag);
        }
        if(this._optionsFlag == true){
            this.testOptions.node.opacity = 255;
            this._optionsFlag = false;
            return;
        }
        else if(this._optionsFlag == false){
            this.testOptions.node.opacity = 0;
            this._optionsFlag = true;
            return;
        }
    },

    start () {

    },

    // update (dt) {},
});
