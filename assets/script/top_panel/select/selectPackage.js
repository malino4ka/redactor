import baseComponent from "../../helpers/baseComponent";


cc.Class({

    extends: baseComponent,

    properties: {

        /*======== Prefab ==========*/

        packageSelectItem: {
            default: null,
            type: cc.Prefab,
        },

        /*======== Select ==========*/

        packageName: {
            default: null,
            type: cc.Label,
        },


        /*======== Options ==========*/

        packageOptions: {
            default: null,
            type: cc.Layout,
        },

        /*======== helpers =========*/

        _optionsFlag: {
            default: true,
        },

        _optArray: {
            default: [],
        },
        _optValueStorage: {
            default: {},
        },
        _packageId: {
            default: null,
        },

        _packageName: {
            default: null,
        },

    },


    onLoad() {
        this._packageName = this._globalVariable.getPackageName();
        this.onDisableSelectPacksge();

        this.node.on(cc.Node.EventType.TOUCH_START, this.onShowOptions, this);
        cc.systemEvent.on("eventPackageItem", this.onTouchPackageItem, this);
        cc.systemEvent.on("eventClickSave", this.onEventClickSave, this);

        cc.systemEvent.on(this._mapEvents.REDACTOR_GAME_AREA_INIT_RESPONSE, this.initPackage, this);

    },

    onDisableSelectPacksge() {
        let editData = JSON.parse(cc.sys.localStorage.getItem('editData'));
        if (editData) {
            if (editData.packageId) {
                this.packageName.string = this._packageName;
                this.packageOptions.node.active = false;
                this._packageId = editData.packageId;
            }
        }
    },

    initPackage(event) {
        let a = event.getUserData();
        let packageArray = a.response.packages
        for (let i = 0; i < packageArray.length; i++) {
            let item = cc.instantiate(this.packageSelectItem);
            item.getComponent('packageOptItem').initPackage(packageArray[i].name, packageArray[i].id);
            this._optArray.push(item.getComponent('packageOptItem'));
            this.packageOptions.node.addChild(item);
        }
    },

    onTouchPackageItem(e) {
        let value = e.getUserData().value;
        let id = e.getUserData().id;
        this.packageName.string = value;
        this._optValueStorage = value;
        this._packageId = id;

    },

    onEventClickSave(e) {
        let userData = JSON.parse(cc.sys.localStorage.getItem('userData'));
        userData.levelInfo.settings.packageId = this._packageId;
        cc.sys.localStorage.setItem('userData', JSON.stringify(userData));
    },

    /*==========================*/

    onShowOptions() {
        for (let i in this._optArray) {
            this._optArray[i].init(this._optionsFlag);
        }
        if (this._optionsFlag == true) {
            this.packageOptions.node.opacity = 255;
            this._optionsFlag = false;
            return;
        }
        else if (this._optionsFlag == false) {
            this.packageOptions.node.opacity = 0;
            this._optionsFlag = true;
            return;
        }
    },

    start() {

    },

    // update (dt) {},
});
