import baseComponent from "../../helpers/baseComponent";

cc.Class({
    extends: baseComponent,

    properties: {

    	testEditOptItem:{
    		default: null,
    		type: cc.Prefab,
    	},

    	testEditName:{
    		default: null,
    		type: cc.Label,
    	},

    	testEditOpt:{
    		default: null,
    		type: cc.Layout,
    	},

    	_optEditArray:{
    		default: [],
    	},

    	_optionsFlag: {
            default: true,
        },
    },

    onLoad () {
    	cc.systemEvent.on(this._mapEvents.REDACTOR_GET_LEVELS_BY_PACKAGE_RESPONSE,this.initOptTestItem, this);

        this.node.on(cc.Node.EventType.TOUCH_START, this.onShowOptions, this);
    },

    initOptTestItem(event){
        let a = event.getUserData();
        if(a.result && (a.status === 'OK')){
            cc.log(a.response)
        }
        let testArray = a.response.testVersions;
        for(let i = 0; i < testArray.length; i++){
            let item = cc.instantiate(this.testEditOptItem);
            item.getComponent('testEditOptItem').initEditTest(testArray[i].name ,testArray[i].id);
            this._optEditArray.push(item.getComponent('testEditOptItem'));
            this.testEditOpt.node.addChild(item);
            
        }
    },

    onShowOptions(arg){
        for(let i in this._optEditArray){
            this._optEditArray[i].initFlag(this._optionsFlag);
        }
        if(this._optionsFlag == true){
            this.testEditOpt.node.opacity = 255;
            this._optionsFlag = false;
            return;
        }
        else if(this._optionsFlag == false){
            this.testEditOpt.node.opacity = 0;
            this._optionsFlag = true;
            return;
        }
    },

    start () {

    },

    // update (dt) {},
});
