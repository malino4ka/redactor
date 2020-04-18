import baseComponent from "../helpers/baseComponent";

cc.Class({
    extends: baseComponent,

    properties: {

        levelItem: {
            default: null,
            type: cc.Prefab,
        },

        btnBack: {
            default: null,
            type: cc.Button,
        },

        createBtn: {
            default: null,
            type: cc.Button,
        },

        levelsBlockLayout: {
            default: null,
            type: cc.Layout,
        },

        packageNameLabel: {
            default: null,
            type: cc.Label,
        },

        _packageId: {
            default: null,
        },

        _packageName: {
            default: null,
        },
    },


    onLoad() {
        this._socket.init();
        this._packageId = this._globalVariable.getPackageId();
        this._packageName = this._globalVariable.getPackageName();
        this.initLevelRequest(this._packageId, 1);

        this.packageNameLabel.string = this._packageName;

        cc.systemEvent.on(this._mapEvents.REDACTOR_GET_LEVELS_BY_PACKAGE_RESPONSE, this.onInitLevelItemsResponse, this);
        cc.systemEvent.on('eventTestItem', this.onPrepareInitRequest, this);

        this.btnBack.node.on('click', this.onBack, this)
        this.createBtn.node.on('click', this.onRedactorScene, this);
    },

    initLevelRequest(packageId, testId) {
        let attemptConnection = { type: this._mapEvents.REDACTOR_GET_LEVELS_BY_PACKAGE_REQUEST, data: { packageId: packageId, testId: testId } };
        this._socket.send(attemptConnection);
    },

    onPrepareInitRequest(e) {
        let testId = e.getUserData().id;
        this.initLevelRequest(this._packageId, testId);
    },

    onInitLevelItemsResponse(event) {
        let a = event.getUserData();
        let levlelItems = a.response.levels;
        this.levelsBlockLayout.node.removeAllChildren();
        if (a.result && (a.status === 'OK')) {
            for (let index in levlelItems) {
                let item = cc.instantiate(this.levelItem);
                item.getComponent('levelPackItem').initLevelItem(levlelItems[index].levelNumber, levlelItems[index].packageId, levlelItems[index].testVersionNumber);
                this.levelsBlockLayout.node.addChild(item);
            }
        }
    },

    onBack() {
        cc.director.loadScene("choosePack");
    },

    onRedactorScene() {
        cc.director.loadScene("gameRedactor");
    },


    start() {

    },

    // update (dt) {},
});
