
cc.Class({
    extends: cc.Component,

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

         optionTestValue : {
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
            default : {},
        },

    },


    onLoad () {
        let a = [1,2,3]
        this.initTest(a);
        this.node.on(cc.Node.EventType.TOUCH_START, this.onShowOptions, this);
        cc.systemEvent.on("eventTestItem",this.onTouchTestItem, this);
        cc.systemEvent.on("eventClickSave",this.onEventClickSave, this);
    },

    initTest(arr){
        for(let i = 0; i < arr.length; i++){
            let item = cc.instantiate(this.testSelectItem);
            item.getComponent('testOptItem').initTest(arr[i]);
            this._optArray.push(item.getComponent('testOptItem'));
            this.testOptions.node.addChild(item);
            
        }
    },

    onTouchTestItem(e){
        let value = e.getUserData().value;
        this.testName.string = value;
        this._optValueStorage['selectTestValue'] = value;
    },

    onEventClickSave(e){
        let userData = JSON.parse(cc.sys.localStorage.getItem('userData'));
        userData.test = this._optValueStorage;
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
