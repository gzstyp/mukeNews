import Vue from 'vue';
import App from './App';
import exports from './common/api/exports.js';
//vuex
import store from './store/index.js';

Vue.config.productionTip = false;
Vue.prototype.$api = exports;

App.mpType = 'app'

const app = new Vue({
  store,
  ...App,
})
app.$mount()