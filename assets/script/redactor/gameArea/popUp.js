import baseComponent from "../../helpers/baseComponent";


cc.Class({
    extends: baseComponent,

    properties: {

    },

    onLoad() {
        cc.systemEvent.on('ErrorResponse', this.onSaveResponse, this);

    },

    onDestroyPopUp() {
        this.node.opacity = 0;
    },

    onSaveResponse(event) {
        let a = event.getUserData();
        if (!a.result) {
            cc.log(a.message)
            this.node.opacity = 255;
            this.node.getComponent(cc.Label).string = a.message;
            this.scheduleOnce(this.onDestroyPopUp, 2)
        }
        cc.log(a)
    },

    start() {

    },

    // update (dt) {},
});
