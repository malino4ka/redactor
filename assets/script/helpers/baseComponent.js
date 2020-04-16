import Socket from "./Socket";
import mapEvents from "./mapEvents";
import globalVariable from "./globalVariable";
import mapGameAreiaItem from "./mapGameAreiaItem";

cc.Class({
    extends: cc.Component,

    ctor(){
        this._socket = Socket;
        this._mapEvents = mapEvents;
        this._globalVariable = globalVariable;
        this._mapGameAreiaItem = mapGameAreiaItem;
    },

    // properties: {

    // },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
