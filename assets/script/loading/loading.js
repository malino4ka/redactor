import baseComponent from "../helpers/baseComponent";


cc.Class({
    extends: baseComponent,

    properties: {
    },

    onLoad() {
        this._socket.init();
        cc.systemEvent.on(this._mapEvents.CONNECTION_ACCEPTED, this.onConnectionAccepted, this);
        cc.sys.localStorage.removeItem('userData');
        cc.sys.localStorage.removeItem('editData');
    },

    onConnectionAccepted(event) {
        let a = event.getUserData();
        if (a.result && (a.status === 'OK')) {
            cc.director.loadScene("choosePack");
        }
    },

    start() {

    },

    // update (dt) {},
});
