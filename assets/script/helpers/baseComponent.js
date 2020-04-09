import Socket from "./Socket";
import mapEvents from "./mapEvents";

cc.Class({
    extends: cc.Component,

    ctor(){
        this._socket = Socket;
        this._mapEvents = mapEvents;
    },

    // properties: {

    // },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
