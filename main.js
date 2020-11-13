import Vue from 'vue';
import App from './App';
import exports from './common/api/exports.js';
//vuex
import store from './store/index.js';

import dialog from '@/components/dialog/index.js';//可行
//用法：this.$dialog.confirm('你确定要删除0吗?',function(){});
Vue.prototype.$dialog = dialog;

Vue.config.productionTip = false;
Vue.prototype.$api = exports;


App.mpType = 'app'

const app = new Vue({
  store,
  ...App,
})
app.$mount()