import Vue from 'vue'
import App from './App'
import exports from './common/api/exports.js';

Vue.config.productionTip = false;
Vue.prototype.$api = exports;

App.mpType = 'app'

const app = new Vue({
    ...App,
})
app.$mount()