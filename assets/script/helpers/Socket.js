// import EventsMap from './EventsMap';
let instance = null;
let url = '';

class Socket {

    constructor() {
        throw new Error('Cannot construct singleton');
    }

    static init(token) {
        // let a = '0ea3ef57';
        url = `ws://ws-dev.sagaofpirates.games:8011`;
        Socket.getInstance();
    }

    static getInstance() {
        if (instance !== null) {
            return instance;
        }
        instance = new WebSocket(url);

        instance.onopen = (event) => {
            cc.log(event);
            if (event.type === 'open') {
                cc.log('SOCKET WAS OPENED');
                let attemptConnection = {type: "AttemptConnection", data: {message: "Handshake"}};
                Socket.send(attemptConnection);
            }
        };

        instance.onmessage = (event) => {
            cc.log(event.data);
            let message = JSON.parse(event.data);
            if ((typeof message['type'] !== 'undefined') && (typeof message['data'] !== 'undefined')) {
                let customEvent = new cc.Event.EventCustom(message.type, true);
                customEvent.setUserData(message.data);
                cc.systemEvent.dispatchEvent(customEvent);
            }
        };

        instance.onerror = (event) => {
            cc.log("ON ERROR");
            let customEvent = new cc.Event.EventCustom("SocketError", true);
            customEvent.setUserData({code: 1002});
            cc.systemEvent.dispatchEvent(customEvent);
        };

        instance.onclose = (event) => {
            cc.log('ON CLOSE');
            let customEvent = new cc.Event.EventCustom("SocketClose", true);
            customEvent.setUserData({code: 1002});
            cc.systemEvent.dispatchEvent(customEvent);
        };
    }

    static send(message) {
        // let excludedArray = [
        //     EventsMap.USER_CLICKED_PLAY_BUTTON,
        //     EventsMap.USER_CLICKED_PLAY_BUTTON_TUTORIAL,
        //     EventsMap.USER_CLICKED_PLAY_BUTTON_PVP,
        //     EventsMap.USER_CLICKED_PLAY_BUTTON_CHALLENGE,
        //     EventsMap.USER_CHANGED_BET,
        // ];
        // if (!excludedArray.includes(message.type)) {
        //     let customEvent = new cc.Event.EventCustom(EventsMap.LOADING_DIALOG_SHOW, true);
        //     cc.systemEvent.dispatchEvent(customEvent);
        // }
        let data = JSON.stringify(message);
        Socket.getInstance().send(data);
    }

    static reset() {
        instance = null;
    }
}

export default Socket;
