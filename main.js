import Vue from 'vue';
import App from './App';
import exports from './common/api/exports.js';
// vuex
import store from './store/index.js';

Vue.config.productionTip = false;
Vue.prototype.$api = exports;
// 检查是否已登录，参数 backpage : 登录后返回的页面; backtype : 打开页面的类型[1 : redirectTo 2 : switchTab];
// 用法 const check = this.checkLogin('/pages/tabbar/follow/follow',2);if(!check)return; uni.redirectTo({url:pageOptions.backpage});uni.switchTab({url:pageOptions.backpage});
Vue.prototype.checkLogin = function(backpage, backtype){
	var userInfo  = uni.getStorageSync('USERINFO');
	if(userInfo === null || userInfo === ''){
		uni.redirectTo({url:'../login/login?backpage='+backpage+'&backtype='+backtype});
		return false;
	}
	return userInfo;
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