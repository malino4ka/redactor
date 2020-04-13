import baseComponent from "../helpers/baseComponent";

cc.Class({
    extends: baseComponent,

    properties: {

        levelItem:{
            default: null,
            type: cc.Prefab,
        },

        btnBack: {
            default: null,
            type: cc.Button,
        },

        createBtn:{
            default: null,
            type: cc.Button,
        },

        levelsBlockLayout: {
            default: null,
            type: cc.Layout,
        },
    },


    onLoad () { 
        this._socket.init();
        cc.systemEvent.on(this._mapEvents.REDACTOR_GET_LEVELS_BY_PACKAGE_RESPONSE,this.onInitLevelItemsResponse, this);

        cc.systemEvent.on("togglePacks",this.initLevelRequest, this);

        this.btnBack.node.on('click', this.onBack, this)
        this.createBtn.node.on('click', this.onRedactorScene, this);
    },

    initLevelRequest(event){
        let id = event.getUserData().id;
        let name = event.getUserData().name;
        let attemptConnection = {type: this._mapEvents.REDACTOR_GET_LEVELS_BY_PACKAGE_REQUEST , data: {testId: 1, packageId: id}};
        this._socket.send(attemptConnection);
    },

    onInitLevelItemsResponse(event){
        let a = event.getUserData();
        let levlelItems =  a.response.levels;
        if(a.result && (a.status === 'OK')){
            for(index in levlelItems){
                let item = cc.instantiate(this.levelItem);
                item.getComponent('levelPackItem').initLevelItem(levlelItems[index].levelNumber, levlelItems[index].packageId, levlelItems[index].testVersionNumber);
                this.levelsBlockLayout.node.addChild(item);
            }
        }
    },

    onBack(){
        cc.director.loadScene("choosePack");
    },

    onRedactorScene(){
        cc.director.loadScene("gameRedactor");
    },


    start () {

    },

    // update (dt) {},
});
