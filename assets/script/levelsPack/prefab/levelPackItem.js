import baseComponent from "../../helpers/baseComponent";

cc.Class({
    extends: baseComponent,

    properties: {

        levelImg: {
            default: null,
            type: cc.Sprite,
        },

        levelName: {
            default: null,
            type: cc.Label,
        },

        _packageId: {
            default: null,
        },

        _testVersionNumber: {
            default: null,
        },
        // _levelNumber:{
        //     default: null,
        // },

    },



    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchLevel, this);
        cc.systemEvent.on(this._mapEvents.REDACTOR_FIND_LEVEL_RESPONSE, this.onResponse, this);
    },

    initLevelItem(levelNumber, packageId, testVersionNumber) {
        this.levelName.string = levelNumber;
        this._packageId = packageId;
        this._testVersionNumber = testVersionNumber;
        this._levelNumber = levelNumber;
    },

    onTouchLevel() {
        let attemptConnection = { type: this._mapEvents.REDACTOR_FIND_LEVEL_REQUEST, data: { packageId: this._packageId, levelNumber: this._levelNumber, testVersionNumber: this._testVersionNumber } };
        this._socket.send(attemptConnection);
    },

    onResponse(event) {
        let a = event.getUserData();
        if (a.result && (a.status === 'OK')) {
            cc.sys.localStorage.setItem('editData', JSON.stringify(a.response));
        }
        this.onChangeSctne();
    },

    onChangeSctne() {
        cc.director.loadScene("edit");
    },

    start() {

    },

    // update (dt) {},
});
