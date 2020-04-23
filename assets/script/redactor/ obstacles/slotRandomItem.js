

cc.Class({
    extends: cc.Component,

    properties: {

        hurricane: {
            default: null,
            type: cc.SpriteFrame,
        },
        storm: {
            default: null,
            type: cc.SpriteFrame,
        },

        toggleActive: {
            default: null,
            type: cc.Toggle,
        },

        imgRandomItem: {
            default: null,
            type: cc.Sprite,
        },
        _randomId: {
            default: null,
        },
        _randomName: {
            default: null,
        },

    },


    onLoad() {
        // this.toggleActive.node.on('toggle', this.onTouchItemStart, this);
        cc.systemEvent.on("eventClickSave", this.onRandomItemsSave, this);
    },

    onTouchItemStart() {
        cc.log('work')
    },

    onRandomItemsSave() {
        let userData = JSON.parse(cc.sys.localStorage.getItem('userData'));
        let activeItem = this.toggleActive.isChecked;
        if (typeof userData.levelInfo.items.randomItems === 'undefined') {
            userData.levelInfo.items.randomItems = [
            ]
        }
        userData.levelInfo.items.randomItems.push({ [this._randomName]: { active: activeItem } });
        cc.sys.localStorage.setItem('userData', JSON.stringify(userData));
    },


    init(id, name) {
        this.imgRandomItem.spriteFrame = this[name];
        this._randomName = name;
        this._randomId = id;
    },

    initEdit(name) {
        if (name === this._randomName) {
            this.toggleActive.isChecked = true;
        }
    },

    start() {

    },

    // update (dt) {},s
});
