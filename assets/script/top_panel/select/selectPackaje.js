import baseComponent from "../../helpers/baseComponent";

cc.Class({

    extends: baseComponent,

    properties: {

    /*======== Prefab ==========*/

        packajeSelectItem : {
            default : null,
            type : cc.Prefab,
        },

    /*======== Select ==========*/   

        packajeName : {
            default : null,
            type : cc.Label,
        },


    /*======== Options ==========*/   
     
        packajeOptions : {
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
        let b = [1,2,3]
        this.initPackaje(b);
        this.node.on(cc.Node.EventType.TOUCH_START, this.onShowOptions, this);
        cc.systemEvent.on("eventPackajeItem",this.onTouchPackajeItem, this);
        cc.systemEvent.on("eventClickSave",this.onEventClickSave, this);

        cc.systemEvent.on(this._mapEvents.REDACTOR_GAME_AREA_INIT_RESPONSE,this.initPackaje, this);
    },

    initPackaje(arr){
        for(let i = 0; i < arr.length; i++){
            let item = cc.instantiate(this.packajeSelectItem);
            item.getComponent('packajeOptItem').initPackaje(arr[i]);
            this._optArray.push(item.getComponent('packajeOptItem'));
            this.packajeOptions.node.addChild(item);
        }
    },

    onTouchPackajeItem(e){
        let value = e.getUserData().value;
        this.packajeName.string = value;
        this._optValueStorage['selectPackajeValue'] = value;
    },

    onEventClickSave(e){
        let userData = JSON.parse(cc.sys.localStorage.getItem('userData'));
        userData.pack = this._optValueStorage;
        cc.sys.localStorage.setItem('userData', JSON.stringify(userData));
    },

    /*==========================*/

    onShowOptions(){
        for(let i in this._optArray){
            this._optArray[i].init(this._optionsFlag);
        }
        if(this._optionsFlag == true){
            this.packajeOptions.node.opacity = 255;
            this._optionsFlag = false;
            return;
        }
        else if(this._optionsFlag == false){
            this.packajeOptions.node.opacity = 0;
            this._optionsFlag = true;
            return;
        }
    },

    start () {

    },

    // update (dt) {},
});
