
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

        if(typeof userData.levelInfo.settings === 'undefined'){
            userData.levelInfo.settings = {
                stars:{},
                life:{},
                timeRound:null,
                levelNumber:null,
            };
        }
        userData.levelInfo.settings.stars[1] = this.stars_1.string;
        userData.levelInfo.settings.stars[2] = this.stars_2.string;
        userData.levelInfo.settings.stars[3] = this.stars_3.string;

        userData.levelInfo.settings.life[1] = this.hearts_1.string;
        userData.levelInfo.settings.life[2] = this.hearts_2.string;
        userData.levelInfo.settings.life[3] = this.hearts_3.string;


        userData.levelInfo.settings.timeRound = this.timeLevel.string;
        userData.levelInfo.settings.levelNumber  = this.chooseLevel.string;

        cc.sys.localStorage.setItem('userData', JSON.stringify(userData));
    },


    start (){

    },

    // update (dt) {},
});
