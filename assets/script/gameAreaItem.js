
cc.Class({
    extends: cc.Component,

    properties: {

        rock: {
            default: null,
            type: cc.SpriteFrame,
        },
        transporterShip: {
            default: null,
            type: cc.SpriteFrame,
        },

        star: {
            default: null,
            type: cc.SpriteFrame,
        },
        gate: {
            default: null,
            type: cc.SpriteFrame,
        },
        key: {
            default: null,
            type: cc.SpriteFrame,
        },

        waterMill: {
            default: null,
            type: cc.SpriteFrame,
        },
        woodFence: {
            default: null,
            type: cc.SpriteFrame,
        },
        magicTriangle: {
            default: null,
            type: cc.SpriteFrame,
        },
        tideIsland: {
            default: null,
            type: cc.SpriteFrame,
        },
        cargoShipsProcession: {
            default: null,
            type: cc.SpriteFrame,
        },
        fortSingle: {
            default: null,
            type: cc.SpriteFrame,
        },
        img: {
            default: null,
            type: cc.Sprite,
        },
        closeBtn: {
            default: null,
            type: cc.Button,
        },

        toggleItem: {
            default: null,
            type: cc.Toggle,
        },

        /*======================*/

        Delta: {
            default: 10,
        },
        _maxPosX: {
            default: null,
        },
        _minPosX: {
            default: null,
        },
        _maxPosY: {
            default: null,
        },
        _minPosY: {
            default: null,
        },
        _moving: {
            default: false,
        },
        _x: {
            default: false,
        },
        _y: {
            default: false,
        },
        stepRotation: {
            default: 10,
        },
        _itemName: {
            default: null,
        },

    },

    onLoad() {

        this._maxPosX = this.node.parent.width / 2 - this.node.width / 2;
        this._minPosX = -this.node.parent.width / 2 + this.node.width / 2;
        this._maxPosY = this.node.parent.height / 2 - this.node.height / 2;
        this._minPosY = -this.node.parent.height / 2 + this.node.height / 2;

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onToggleItem, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUpMoveItem, this);

        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchItemStart, this)
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchItemEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchItemCancel, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchItemMove, this);
        this.closeBtn.node.on('click', this.closeItemClick, this);
    },

    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDownMoveItem, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUpMoveItem, this);
        this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchItemStart, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchItemEnd, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchItemCancel, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchItemMove, this);
    },

    init(name, active) {
        this.img.spriteFrame = this[name];
        this.setItemName(name);
        this.setItemActive(active);
    },

    initEditItems(name, x, y) {
        this.img.spriteFrame = this[name];
        this.node.x = x;
        this.node.y = y;
    },

    setItemActive(active) {
        return active;
    },

    setItemName(name) {
        this._itemName = name;
    },

    getItemName() {
        return this._itemName;
    },

    closeItemClick() {
        this.node.destroy();
    },

    setPositionItem(posX, posY) {
        let newPosX = posX;
        let newPosY = posY;
        if (newPosX > this._maxPosX) {
            newPosX = this._maxPosX;
        } else if (newPosX < this._minPosX) {
            newPosX = this._minPosX;
        }
        else if (newPosY > this._maxPosY) {
            newPosY = this._maxPosY;
        } else if (newPosY < this._minPosY) {
            newPosY = this._minPosY;
        }
        this.node.x = newPosX;
        this.node.y = newPosY;
        // this.node.emit('moved',newPos);
    },

    /*======= key ===========*/

    onToggleItem(e) {
        let e_keyCode = e.keyCode
        if (!this.toggleItem.isChecked) {
            return;
        }
        this.onKeyDownMoveItem(e_keyCode);
    },

    onKeyDownMoveItem(keyCode) {

        if (keyCode == cc.macro.KEY.left) {
            this._x = this.node.x + this.Delta * (-1);
        }
        else if (keyCode == cc.macro.KEY.down) {
            this._y = this.node.y + this.Delta * (-1);
        }
        else if (keyCode == cc.macro.KEY.right) {
            this._x = this.node.x + this.Delta;
        }
        else if (keyCode == cc.macro.KEY.up) {
            this._y = this.node.y + this.Delta;
        }
        else if (keyCode == cc.macro.KEY.l) {
            this.node.rotation += this.stepRotation;
        }
        else if (keyCode == cc.macro.KEY.r) {
            this.node.rotation += -this.stepRotation;
        }
        this.setPositionItem(this._x, this._y);
        // this.updateByKeys();
    },

    // onKeyUpMoveItem(e){
    //     if(e.keyCode == cc.macro.KEY.left || e.keyCode == cc.macro.KEY.right || e.keyCode == cc.macro.KEY.up || e.keyCode == cc.macro.KEY.down){
    //         this._side = 0;
    //     }  
    // },


    /*======= Touch ===========*/

    onTouchItemStart(e) {
        this._moving = true;
        this._x = this.node.x;
        this._y = this.node.y;
    },

    onTouchItemEnd(e) {
        this._moving = false;
    },

    onTouchItemCancel(e) {
        this._moving = false;
    },

    onTouchItemMove(e) {
        if (!this._moving) {
            return;
        } else {
            this._x += e.getDelta().x;
            this._y += e.getDelta().y;
        }
    },

    /*==================*/


    updateByTouch() {
        this.setPositionItem(this._x, this._y);
    },


    currentItem() {

    },


    start() {

    },

    update(dt) {

        if (this._moving) {
            this.updateByTouch();
            return;
        }

        // this.updateByKeys();
    },
});
