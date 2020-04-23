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

        _arrayRandom: {
            default: [],
        },

        _a: {

            default: null,
        }

    },

    onLoad() {

        let homeEditLoad = new cc.Event.EventCustom('homeEditLoad', true);
        cc.systemEvent.dispatchEvent(homeEditLoad);

        cc.systemEvent.on(this._mapEvents.REDACTOR_GAME_AREA_INIT_RESPONSE, this.onInitGameItemsResponse, this);
        this.scheduleOnce(this.initGameItemsRequest, 1)

        cc.systemEvent.on(this._mapEvents.REDACTOR_SAVE_ROUND_RESPONSE, this.onSaveRoundResponse, this);

        this.scrollRandomArrow.node.on('click', this.onTweenPanelLeft, this);
        this.arrowTopPanel.node.on('click', this.onTweenPanelTop, this);
        this.btnBackRedactor.node.on('click', this.onBackToPack, this);

        cc.systemEvent.on("TouchCustomizeItem", this.onTouchCustomizeItem, this);
        cc.systemEvent.on("TouchAssetsItem", this.onTouchAssetsItem, this);

        cc.systemEvent.on("eventClickSave", this.onUserDataSave, this);

    },

    start() {

    },

    // onUserData() {
    //     this.scheduleOnce(this.onUserDataSave, 1)
    // },

    onUserDataSave() {
        let userData = JSON.parse(cc.sys.localStorage.getItem('userData'));
        this._dataUser = userData;
        cc.log(userData)
        let attemptConnection = { type: this._mapEvents.REDACTOR_SAVE_ROUND_REQUEST, data: this._dataUser };
        this._socket.send(attemptConnection);
        cc.sys.localStorage.removeItem('userData');
        cc.sys.localStorage.removeItem('editData');
    },

    initGameItemsRequest(event) {
        let attemptConnection = { type: this._mapEvents.REDACTOR_GAME_AREA_INIT_REQUEST, data: { message: 'initItems' } };
        this._socket.send(attemptConnection);
    },

    onSaveRoundResponse(event) {
        let a = event.getUserData();
        if (a.result && (a.status === 'OK')) {
        }
        cc.log(a)
    },

    onInitGameItemsResponse(event) {
        let a = event.getUserData();
        let ObstaclesCustomizeId = a.response.obstacles.customize;
        let ObstaclesAssets = a.response.assets;
        let ObstaclesRandom = a.response.obstacles.random;
        if (a.result && (a.status === 'OK')) {
            this.initScrollCustomizeItem(ObstaclesCustomizeId);
            this.initScrolAssetsItem(ObstaclesAssets)
            this.initScrollRandomItem(ObstaclesRandom);
            this.initEditData();
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
            this._arrayRandom.push(item);
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
        cc.sys.localStorage.removeItem('editData');
        cc.director.loadScene("levelsPack");
    },

    /*===============================*/

    initEditData() {
        let editData = JSON.parse(cc.sys.localStorage.getItem('editData'));
        let a = editData;
        if (editData) {
            cc.log(a)
            if (a.items.key) {
                this._globalVariable.setKeyCount(1);
                cc.log(this._globalVariable.getKeyCount())
            }
            else {
                this._globalVariable.setKeyCount(0);
                cc.log(this._globalVariable.getKeyCount())
            }
            if (a.items.gate) {
                this._globalVariable.setGatesCount(1);
                cc.log(this._globalVariable.getGateCount())
            }
            else {
                this._globalVariable.setGatesCount(0);
                cc.log(this._globalVariable.getGateCount())
            }
            if (a.items.star) {
                let arr = a.items.star.arr;
                this._globalVariable.setStarsCount(arr.length);
                cc.log(this._globalVariable.getStarsCount())
            }
            this.editGameAreaItems(a);
        }
    },

    editGameAreaItems(a) {
        let items = a.items;
        for (let key in items) {
            if (key === "randomItems") {
                let arrRandoms = items[key];
                this.onRandomEditItems(arrRandoms);
            }
            else {
                let arrGameAreaItems = items[key].arr;
                for (let index in arrGameAreaItems) {
                    let item = cc.instantiate(this.gameAreaItem);
                    item.getComponent('gameAreaItem').initEditItems(key, arrGameAreaItems[index].x, arrGameAreaItems[index].y, arrGameAreaItems[index].angle, arrGameAreaItems[index].score, arrGameAreaItems[index].health);
                    this.gameArea.addChild(item);
                }
            }
        }
    },

    onRandomEditItems(arrRandoms) {
        for (let key in arrRandoms) {
            for (let index in this._arrayRandom) {
                if (arrRandoms[key] === this._arrayRandom[index].getComponent('slotRandomItem')._randomName) {
                    this._arrayRandom[index].getComponent('slotRandomItem').initEdit(arrRandoms[key]);
                }
            }
        }
    },

    // update (dt) {},
});