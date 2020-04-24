import baseComponent from "../helpers/baseComponent";


cc.Class({
    extends: baseComponent,

    properties: {

        _dataUser: {
            default: null,
        },

        /*======== Panel ==========*/

        panelLeft: {
            default: null,
            type: cc.Node,
        },

        panelTop: {
            default: null,
            type: cc.Node,
        },


        /*======= Scroll ========*/

        scrollItem: {
            default: null,
            type: cc.ScrollView,
        },

        scrollRandom: {
            default: null,
            type: cc.ScrollView,
        },
        scrollAssets: {
            default: null,
            type: cc.ScrollView,
        },

        /*======= Prafab ========*/

        slotCustomizeItem: {
            default: null,
            type: cc.Prefab,
        },

        slotAssetsItem: {
            default: null,
            type: cc.Prefab,
        },

        slotRandomItem: {
            default: null,
            type: cc.Prefab,
        },

        /*======= Layout ========*/

        layoutCustomizeItem: {
            default: null,
            type: cc.Layout,
        },

        layoutRandomItem: {
            default: null,
            type: cc.Layout,
        },
        layoutAssetsItem: {
            default: null,
            type: cc.Layout,
        },

        /*======== Game Area =========*/

        gameAreaItem: {
            default: null,
            type: cc.Prefab,
        },
        gameArea: {
            default: null,
            type: cc.Node,
        },

        /*====== Arrow left =========*/

        scrollRandomArrow: {
            default: null,
            type: cc.Button,
        },
        _scrollRandomFlag: {
            default: true,

        },

        /*====== Arrow Top =========*/

        arrowTopPanel: {
            default: null,
            type: cc.Button,
        },
        _arrowTopPanelFlag: {
            default: true,

        },

        btnBackRedactor: {
            default: null,
            type: cc.Button,
        },

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this._globalVariable.starsCountReset();
        this._globalVariable.resetKeyCount();
        this._globalVariable.resetGateCount();

        this.scheduleOnce(this.initGameItemsRequest, 1)
        cc.systemEvent.on(this._mapEvents.REDACTOR_GAME_AREA_INIT_RESPONSE, this.onInitGameItemsResponse, this);
        cc.systemEvent.on(this._mapEvents.REDACTOR_SAVE_ROUND_RESPONSE, this.onSaveRoundResponse, this);

        this.scrollRandomArrow.node.on('click', this.onTweenPanelLeft, this);
        this.arrowTopPanel.node.on('click', this.onTweenPanelTop, this);
        this.btnBackRedactor.node.on('click', this.onBackToPack, this);

        cc.systemEvent.on("TouchCustomizeItem", this.onTouchCustomizeItem, this);
        cc.systemEvent.on("TouchAssetsItem", this.onTouchAssetsItem, this);
        cc.systemEvent.on("eventClickSave", this.onSave, this);

    },

    start() {

    },

    onSave() {
        this.scheduleOnce(this.onUserDataSave, 0)
    },

    onUserDataSave() {
        let userData = JSON.parse(cc.sys.localStorage.getItem('userData'));
        this._dataUser = userData;
        cc.log(userData)
        let attemptConnection = { type: this._mapEvents.REDACTOR_SAVE_ROUND_REQUEST, data: this._dataUser };
        this._socket.send(attemptConnection);
        cc.sys.localStorage.removeItem('userData');
    },

    initGameItemsRequest(event) {
        let attemptConnection = { type: this._mapEvents.REDACTOR_GAME_AREA_INIT_REQUEST, data: { message: 'initItems' } };
        this._socket.send(attemptConnection);
    },

    onSaveRoundResponse(event) {
        let a = event.getUserData();
        if (a.result && (a.status === 'OK')) {
            cc.log(a)
        }
    },

    onInitGameItemsResponse(event) {
        let a = event.getUserData();
        cc.log(a)
        let ObstaclesCustomizeId = a.response.obstacles.customize;
        let ObstaclesAssets = a.response.assets;
        let ObstaclesRandom = a.response.obstacles.random;
        if (a.result && (a.status === 'OK')) {
            this.initScrollCustomizeItem(ObstaclesCustomizeId);
            this.initScrolAssetsItem(ObstaclesAssets)
            this.initScrollRandomItem(ObstaclesRandom);
        }
    },

    onTouchCustomizeItem(e) {
        let id = e.getUserData().id;
        let name = e.getUserData().name;
        let score = e.getUserData().score;
        let health = e.getUserData().health;
        let gameAreaItemNode = cc.instantiate(this.gameAreaItem);
        gameAreaItemNode.getComponent('gameAreaItem').init(name, score, health);
        this.gameArea.addChild(gameAreaItemNode);
    },

    onTouchAssetsItem(e) {
        let id = e.getUserData().id;
        let name = e.getUserData().name;
        let score = e.getUserData().score;
        let health = e.getUserData().health;
        let gameAreaItemNode = cc.instantiate(this.gameAreaItem);
        gameAreaItemNode.getComponent('gameAreaItem').init(name, score, health);
        this.gameArea.addChild(gameAreaItemNode);
    },


    onTweenPanelLeft() {

        if (this._scrollRandomFlag == true) {
            cc.tween(this.panelLeft).by(1, { x: -160 }, { easing: 'sineOut' }).start();
            this._scrollRandomFlag = false;
            return;
        }
        else if (this._scrollRandomFlag == false) {
            cc.tween(this.panelLeft).by(1, { x: 160 }, { easing: 'sineOut' }).start();
            this._scrollRandomFlag = true;
            return;
        }
    },

    onTweenPanelTop() {
        if (this._arrowTopPanelFlag == true) {
            cc.tween(this.panelTop).by(1, { y: -150 }, { easing: 'sineOut' }).start();
            this._arrowTopPanelFlag = false;
            return;
        }
        else if (this._arrowTopPanelFlag == false) {
            cc.tween(this.panelTop).by(1, { y: 150 }, { easing: 'sineOut' }).start();
            this._arrowTopPanelFlag = true;
            return;
        }
    },



    initScrollRandomItem(random) {
        for (let i = 0; i < random.length; i++) {
            let item = cc.instantiate(this.slotRandomItem);
            item.getComponent('slotRandomItem').init(random[i].id, random[i].name);
            this.layoutRandomItem.node.addChild(item);
        }
    },

    initScrolAssetsItem(assets) {
        for (let i = 0; i < assets.length; i++) {
            let item = cc.instantiate(this.slotAssetsItem);
            item.getComponent('slotAssetsItem').init(assets[i].id, assets[i].name, assets[i].score, assets[i].health);
            this.layoutAssetsItem.node.addChild(item);
        }
    },

    initScrollCustomizeItem(customize) {
        for (let i = 0; i < customize.length; i++) {
            let item = cc.instantiate(this.slotCustomizeItem);
            item.getComponent('slotCustomizeItem').init(customize[i].id, customize[i].name, customize[i].score, customize[i].health);
            this.layoutCustomizeItem.node.addChild(item);
        }
    },

    onBackToPack() {
        cc.director.loadScene("levelsPack");
    }

    // update (dt) {},
});
