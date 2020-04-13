// let userData = JSON.parse(cc.sys.localStorage.getItem('userData'));

let editOptions = {
    stars:{},
    hearts:{},
    timeRound:'',
    level:'',
}

cc.Class({
    extends: cc.Component,

    properties: {

/* ========== input ============*/

 		chooseLevel:{
 			default: null,
 			type: cc.EditBox,
 		},

 		timeLevel:{
 			default: null,
 			type: cc.EditBox,
 		},

 		stars_1:{
 			default: null,
 			type: cc.EditBox,
 		},

 		stars_2:{
 			default: null,
 			type: cc.EditBox,
 		},

 		stars_3:{
 			default: null,
 			type: cc.EditBox,
 		},

 		hearts_1:{
 			default: null,
 			type: cc.EditBox,
 		},

 		hearts_2:{
 			default: null,
 			type: cc.EditBox,
 		},

 		hearts_3:{
 			default: null,
 			type: cc.EditBox,
 		},


    },

    onLoad () {
    	cc.systemEvent.on("eventClickSave",this.onEventClickSave, this);
    },

    onEventClickSave(e){
        let userData = JSON.parse(cc.sys.localStorage.getItem('userData'));

        editOptions.stars[1] = this.stars_1.string;
        editOptions.stars[2] = this.stars_2.string;
        editOptions.stars[3] = this.stars_3.string;

        editOptions.hearts[1] = this.hearts_1.string;
        editOptions.hearts[2] = this.hearts_2.string;
        editOptions.hearts[3] = this.hearts_3.string;


        editOptions.timeRound = this.timeLevel.string;
        editOptions.level = this.chooseLevel.string;

        userData.settings = editOptions;

        cc.sys.localStorage.setItem('userData', JSON.stringify(userData));
    },


    start (){

    },

    // update (dt) {},
});
