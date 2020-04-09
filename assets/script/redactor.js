import baseComponent from "./helpers/baseComponent";

cc.Class({
    extends: baseComponent,

    properties: {


        panelLeft : {
            default : null,
            type : cc.Node,
        },

        panelTop : {
            default : null,
            type : cc.Node,
        },


        /*======= Scroll ========*/

        scrollItem : {
            default : null,
            type : cc.ScrollView,
        },

        scrollRandom : {
            default : null,
            type : cc.ScrollView,
        },
        scrollAssets : {
            default : null,
            type : cc.ScrollView,
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

        arrowTopPanel:{
            default: null,
            type: cc.Button,
        },
        _arrowTopPanelFlag: {
            default: true,

        },

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        let a = {"obstacles":{"customize":[{"id":1,"typeId":1,"name":"rock","description":"Rock mountain","score":0,"health":0},{"id":2,"typeId":1,"name":"transporterShip","description":"Ship with obstacles and gifts","score":40,"health":70},{"id":7,"typeId":1,"name":"waterMill","description":"Water mill with blades","score":30,"health":60},{"id":8,"typeId":1,"name":"woodFence","description":"Wood fence like defence for any object","score":5,"health":10},{"id":9,"typeId":1,"name":"magicTriangle","description":"Magic triangle. Like Bermuda","score":0,"health":0},{"id":10,"typeId":1,"name":"tideIsland","description":"Islands woth tides","score":0,"health":0},{"id":12,"typeId":1,"name":"cargoShipsProcession","description":"Ship's procession with line of cargo ships","score":70,"health":60},{"id":13,"typeId":1,"name":"fortSingle","description":"Small fort with single cannon","score":100,"health":100}],"random":[{"id":3,"typeId":1,"name":"hurricane","description":"Hurricanes"},{"id":11,"typeId":1,"name":"storm","description":"Storm which disappears some part of game area"}]},
            "assets":[{"id":4,"typeId":2,"name":"star","description":"Valuable asset for reach success","score":0,"health":0},{"id":5,"typeId":2,"name":"key","description":"Valuable asset for reach Win","score":0,"health":0},{"id":6,"typeId":2,"name":"gate","description":"Valuable asset for reach Win","score":0,"health":0}]};
        this.initRedactor(a);
        this.scrollRandomArrow.node.on('click',this.onTweenPanelLeft,this);
        this.arrowTopPanel.node.on('click',this.onTweenPanelTop,this);

        cc.systemEvent.on("TouchCustomizeItem",this.onTouchCustomizeItem, this);
        cc.systemEvent.on("TouchAssetsItem",this.onTouchAssetsItem, this);

        this._socket.init();
        cc.systemEvent.on(this._mapEvents.REDACTOR_GAME_AREA_INIT_RESPONSE,this.onLexa, this);
        this.scheduleOnce(this.myAwesomeRequest, 2)

    },

    start () {
    
    },

    onTouchCustomizeItem(e){
        let id = e.getUserData().id;
        let gameAreaItemNode = cc.instantiate(this.gameAreaItem);
        gameAreaItemNode.getComponent('gameAreaItem').init(id);
        this.gameArea.addChild(gameAreaItemNode);
    },

    onTouchAssetsItem(e){
        let id = e.getUserData().id;
        let gameAreaItemNode = cc.instantiate(this.gameAreaItem);
        gameAreaItemNode.getComponent('gameAreaItem').init(id);
        this.gameArea.addChild(gameAreaItemNode);
    },

    onTweenPanelLeft(){
        cc.log('btn');

        if(this._scrollRandomFlag == true){
           cc.tween(this.panelLeft).by(1,{x : -160},{ easing: 'sineOut'}).start();
           this._scrollRandomFlag = false; 
           return;
        }
        else if(this._scrollRandomFlag == false){
            cc.tween(this.panelLeft).by(1,{x : 160},{ easing: 'sineOut'}).start(); 
            this._scrollRandomFlag = true;
            return; 
        }
    },

    onTweenPanelTop(){
        cc.log('btn');

        if(this._arrowTopPanelFlag == true){
           cc.tween(this.panelTop).by(1,{y : -150},{ easing: 'sineOut'}).start();
           this._arrowTopPanelFlag = false; 
           return;
        }
        else if(this._arrowTopPanelFlag == false){
            cc.tween(this.panelTop).by(1,{y : 150},{ easing: 'sineOut'}).start(); 
            this._arrowTopPanelFlag = true;
            return; 
        }
    },

    myAwesomeRequest(event){
        let attemptConnection = {type: this._mapEvents.REDACTOR_GAME_AREA_INIT_REQUEST, data: {message: "Redactor"}};
        this._socket.send(attemptConnection);
    },

    // onLexa(event){
    //     let a = event.getUserData();
    //     let ObstaclesCustomizeId = a.response.obstacles.customize;
    //     let ObstaclesAssets = a.response.assets;
    //     if(a.result && (a.status === 'OK')){
    //         cc.log(a.response);
    //         this.initScrollCustomizeItem(ObstaclesCustomizeId);
    //         this.initScrolAssetsItem(ObstaclesAssets)
    //     }
    // },

    initRedactor(a){
        let ObstaclesCustomizeId = a.obstacles.customize;
        let ObstaclesAssets = a.assets;
        let ObstaclesRandom = a.obstacles.random;
        this.initScrolAssetsItem(ObstaclesAssets);
        this.initScrollCustomizeItem(ObstaclesCustomizeId);
        this.initScrollRandomItem(ObstaclesRandom);
        cc.sys.localStorage.setItem('userData', JSON.stringify({}));
    },


    initScrollRandomItem(random){
        for(let i = 0; i < random.length; i++){
            let item = cc.instantiate(this.slotRandomItem);
            item.getComponent('slotRandomItem').init(random[i].id);
            this.layoutRandomItem.node.addChild(item);
        }
    },

    initScrolAssetsItem(assets){
        for(let i = 0; i < assets.length; i++){
            let item = cc.instantiate(this.slotAssetsItem);
            item.getComponent('slotAssetsItem').init(assets[i].id);
            this.layoutAssetsItem.node.addChild(item);
        }
    },

    initScrollCustomizeItem (customize){
        for(let i = 0; i < customize.length; i++){
            let item = cc.instantiate(this.slotCustomizeItem);
            item.getComponent('slotCustomizeItem').init(customize[i].id);
            this.layoutCustomizeItem.node.addChild(item);
        }
    },

    // update (dt) {},
});
