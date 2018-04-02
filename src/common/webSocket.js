/**
 * web socket
 * Created by qinmenghuan on 2017-09-04.
 */

import constants from "./constants";

const SocketPlugin= {
	install(Vue, options) {

		Vue.loginSocket=new WebSocket(constants.baseDomain+"login");
		Vue.prototype.$returnLoginSocket = function() {
			return Vue.loginSocket
		}
	}
};

export default SocketPlugin;