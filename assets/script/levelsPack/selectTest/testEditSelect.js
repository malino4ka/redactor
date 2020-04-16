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

    	testEditOptLayout:{
    		default: null,
    		type: cc.Layout,
    	},

    	_optEditArray:{
    		default: [],
    	},

    	_optionsFlag: {
            default: true,
        },

        _selectName:{
            default: "A",
        },
    },

    onLoad () {

    	cc.systemEvent.on(this._mapEvents.REDACTOR_GET_LEVELS_BY_PACKAGE_RESPONSE,this.initOptTestItem, this);

        cc.systemEvent.on('eventTestItem',this.onChangeName, this);

        this.node.on(cc.Node.EventType.TOUCH_START, this.onShowOptions, this);
    },

    initOptTestItem(event){ 
        cc.log('work')
        let a = event.getUserData();
        if(a.result && (a.status === 'OK')){
            cc.log(this.node.children)
            let testArray = a.response.testVersions;
            this.testEditName.string = this._selectName;

            this.testEditOptLayout.node.removeAllChildren();
            for(let i = 0; i < testArray.length; i++){
                let item = cc.instantiate(this.testEditOptItem);
                item.getComponent('testEditOptItem').initEditTest(testArray[i].name ,testArray[i].id);
                this._optEditArray.push(item.getComponent('testEditOptItem'));
                this.testEditOptLayout.node.addChild(item);
            }
        }
    },

    onChangeName(e){
        let name = e.getUserData().name;
        this._selectName = name;
        let id = e.getUserData().id;
    },

    onShowOptions(arg){
        cc.log('work')
        for(let i in this._optEditArray){
            this._optEditArray[i].initFlag(this._optionsFlag);
        }
        if(this._optionsFlag == true){
            this.testEditOptLayout.node.opacity = 255;
            this._optionsFlag = false;
            return;
        }
        else if(this._optionsFlag == false){
            this.testEditOptLayout.node.opacity = 0;
            this._optionsFlag = true;
            return;
        }
    },

    start () {

    },

    // update (dt) {},
});
