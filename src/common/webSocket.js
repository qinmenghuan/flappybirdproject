
// export default {
// 	install: (Vue) => {
// 		// 全局变量
// 		Vue.myAddedProperty = 'Example Property';
// 		Vue.myAddedMethod = function() {
// 			return Vue.myAddedProperty
// 		}
// 		Vue.prototype.$helpers = {
// 			arrayDifference(arrayA, arrayB) {
// 				(arrayA.length < arrayB.length) && (arrayB = [arrayA, arrayA = arrayB][0]);
//
// 				return arrayA.filter((x) => {
// 					return arrayB.indexOf(x) < 0;
// 				});
// 			}
// 		};
// 	}
// };

// import Vue from 'vue'

// const SocketPlugin= {
// 	install(Vue, options) {
// 		Vue.myAddedProperty = 'Example Property'
// 		Vue.myAddedMethod = function() {
// 			return Vue.myAddedProperty
// 		}
// 	}
// };

// const SocketPlugin = {
// 	// The install method is all that needs to exist on the plugin object.
// 	// It takes the global Vue object as well as user-defined options.
// 	install(Vue, options) {
// 		// We call Vue.mixin() here to inject functionality into all components.
// 		Vue.mixin({
// 			// Anything added to a mixin will be injected into all components.
// 			// In this case, the mounted() method runs when the component is added to the DOM.
// 			mounted() {
// 				console.log('Mounted!');
// 			}
// 		});
// 	}
// };

//1
const SocketPlugin= {
	install(Vue, options) {

		Vue.aaa="aaa";
		Vue.prototype.$myAddedProperty = 'Example Property'
		Vue.prototype.$myAddedMethod = function() {
			return Vue.aaa
		}
		Vue.prototype.$myModifyMethod = function() {
			Vue.myAddedProperty="2";
			Vue.aaa="bbb"
		}
	}
};


export default SocketPlugin;