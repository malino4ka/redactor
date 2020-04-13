import baseComponent from "../helpers/baseComponent";

cc.Class({
    extends: baseComponent,

    properties: {

        packItem:{
            default: null,
            type: cc.Prefab,
        },

        packLayout:{
            default: null,
            type: cc.Layout,
        },

    },

    onLoad () {
        this._socket.init();
        this.scheduleOnce(this.initPacksRequest, 1)
        cc.systemEvent.on(this._mapEvents.REDACTOR_GET_PACKAGES_RESPONSE,this.onInitPackItemsResponse, this);
        // cc.systemEvent.on("togglePacks",this.onChooseLevels, this);
    },

    // onChooseLevels(e){
    //     cc.log('work');
    //     cc.log(e)
    // },

    initPacksRequest(event){
        let attemptConnection = {type: this._mapEvents.REDACTOR_GET_PACKAGES_REQUEST , data: {message: 'packItems'}};
        this._socket.send(attemptConnection);
    },

    onInitPackItemsResponse(event){
        let a = event.getUserData();
        let arrayPack = a.response.packages;
        cc.log(arrayPack);
        if(a.result && (a.status === 'OK')){
            this.initHomePack(arrayPack);
        }
    },

    initHomePack(arrayPack){
        for(index in arrayPack){
            let item = cc.instantiate(this.packItem);
            item.getComponent('packItem').initPack(index, arrayPack[index]);
            this.packLayout.node.addChild(item);
        }
    },

    start () {

    },

    // update (dt) {},
});
