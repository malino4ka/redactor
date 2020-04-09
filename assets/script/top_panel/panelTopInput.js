
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

/* ========== helpers ============*/
		
		_inputArrayStars:{
 			default: {},
 		},

 		_inputArrayHearts:{
 			default: {},
 		},

    },

    onLoad () {
    	cc.systemEvent.on("eventClickSave",this.onEventClickSave, this);
    },

    onEventClickSave(e){

        let userData = JSON.parse(cc.sys.localStorage.getItem('userData'));
 
    	this._inputArrayStars[1] = this.stars_1.string;
    	this._inputArrayStars[2] = this.stars_2.string;
    	this._inputArrayStars[3] = this.stars_3.string;

    	this._inputArrayHearts[1] = this.hearts_1.string;
    	this._inputArrayHearts[2] = this.hearts_2.string;
    	this._inputArrayHearts[3] = this.hearts_3.string;

        userData.Stars = this._inputArrayStars;
        userData.Hearts = this._inputArrayHearts;
        userData.TimeRound = this.timeLevel.string;
        userData.Level = this.chooseLevel.string;
        cc.sys.localStorage.setItem('userData', JSON.stringify(userData));
    },


    start (){

    },

    // update (dt) {},
});
