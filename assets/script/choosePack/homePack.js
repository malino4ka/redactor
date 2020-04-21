import baseComponent from "../helpers/baseComponent";

cc.Class({
    extends: baseComponent,

    properties: {

        packItem: {
            default: null,
            type: cc.Prefab,
        },

        packLayout: {
            default: null,
            type: cc.Layout,
        },

    },

    onLoad() {
        this.initPacksRequest();
        cc.systemEvent.on(this._mapEvents.REDACTOR_GET_PACKAGES_RESPONSE, this.onInitPackItemsResponse, this);
        // cc.sys.localStorage.setItem('editData', JSON.stringify({}));
    },

    initPacksRequest(event) {
        let attemptConnection = { type: this._mapEvents.REDACTOR_GET_PACKAGES_REQUEST, data: { message: 'packItems' } };
        this._socket.send(attemptConnection);
    },

    onInitPackItemsResponse(event) {
        let a = event.getUserData();
        let arrayPack = a.response.packages;
        if (a.result && (a.status === 'OK')) {
            this.initHomePack(arrayPack);
        }
    },

    initHomePack(arrayPack) {
        for (let index in arrayPack) {
            let item = cc.instantiate(this.packItem);
            item.getComponent('packItem').initPack(arrayPack[index].id, arrayPack[index].name);
            this.packLayout.node.addChild(item);
        }
    },

    start() {

    },

    // update (dt) {},
});
