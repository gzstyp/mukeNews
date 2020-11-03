import Vue from 'vue'
import App from './App'
import _index from './common/api/index.js';

Vue.config.productionTip = false;
Vue.prototype.$api = _index;

App.mpType = 'app'

const app = new Vue({
    ...App,
})
app.$mount()