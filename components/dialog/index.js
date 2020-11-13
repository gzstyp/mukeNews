import Vue from 'vue'
import AlertComponent from './zj-alert.vue'
import ConfirmComponent from './zj-confirm.vue'

 // 创建vue构造器
var alertConstructor = Vue.extend(AlertComponent);
var confirmConstructor = Vue.extend(ConfirmComponent);

var instance;
const alert = function(options, callback) {
	// 实例化
	instance = new alertConstructor();

	// 挂载实例
	document.body.appendChild(instance.$mount().$el);

	// 初始化数据
	showAlert(options, callback)
}

const showAlert = function(options, callback) {
	if (typeof options === 'string') { // 对参数进行判断
		instance.text = options // 传入props
	} else {
		Object.assign(instance, options) // 合并参数与实例
		
		if (options.type == 'copy') {
			if (typeof options.copy == 'function') {
				instance.copyCallBack = options.copy;
			}
		}
	}

	if (typeof callback == "function") {
		instance.callback = callback;
	}

	instance.show = true;
}

const confirm = function (options, callback) {
	// 实例化
	instance = new confirmConstructor();
	
	// 挂载实例
	document.body.appendChild(instance.$mount().$el);
	
	// 初始化数据
	showConfirm(options, callback)
} 

const showConfirm = function(options, callback) {
	if (typeof options === 'string') { // 对参数进行判断
		instance.text = options // 传入props
	} else {
		Object.assign(instance, options) // 合并参数与实例
	}

	if (typeof callback == "function") {
		instance.callback = callback;
	}

	instance.show = true;
}

export default {
	alert,
	confirm
}
