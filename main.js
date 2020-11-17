import Vue from 'vue';
import App from './App';
import exports from './common/api/exports.js';
//vuex
import store from './store/index.js';

Vue.config.productionTip = false;
Vue.prototype.$api = exports;

Vue.prototype.checkLogin = function(backpage, backtype){
	var SUID  = uni.getStorageSync('SUID');
	var SRAND = uni.getStorageSync('SRAND');
	var SNAME = uni.getStorageSync('SNAME');
	var SFACE = uni.getStorageSync('SFACE');
	if(SUID == '' || SRAND == '' || SFACE == ''){
		uni.redirectTo({url:'../login/login?backpage='+backpage+'&backtype='+backtype});
		return false;
	}
	return [SUID, SRAND, SNAME, SFACE];
};
//扩展方法,其用法:this.dialog('提交成功,感谢参与');
Vue.prototype.dialog = function(msg){
  uni.showToast({
    title:msg,
    icon:'none'
  });
};
//直接跳转到指定tab底部标签,用法:this.switchTab('/pages/tabbar/my/my');
Vue.prototype.switchTab = function(url){
  uni.switchTab({
    url:url
  });
};

App.mpType = 'app';

const app = new Vue({
  store,
  ...App,
})
app.$mount()