//vuex 是功能强大的状态管理组件
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
  //数据源
  state : {
    historyLists : uni.getStorageSync('__history') || []
  },
  //提供修改数据源的方法;对外提供修改数据源[state]的方法,它可以改变 state 数据源的数据
  mutations : {
    //页面调用方式:this.$store.commit('SET_HISTORY_LISTS',history);
    SET_HISTORY_LISTS(state,history){
      state.historyLists = history;
    },
    CLEAR_HISTORY(state){
      state.historyLists = [];
    }
  },
  //它和mutations的功能差不多,仅能调用mutations里的方法来修改数据源,所以它不能直接修改数据源,这里可以执行任意的异步操作
  actions : {
    //调用方式;this.$store.dispatch('set_history',数据);
    set_history({commit,state},history){//第1个参数是对象,其commit可以调用mutations里的方法;第2个参数history是调用端传递过来的数据
      let list = state.historyLists;
      list.unshift(history);
      uni.setStorageSync('__history',list);
      commit('SET_HISTORY_LISTS',list);//SET_HISTORY_LISTS是mutations里的方法名,history是参数的数据
    },
    //调用方式;this.$store.dispatch('clearHistory');
    clearHistory({commit}){
      uni.removeStorageSync('__history');
      commit('CLEAR_HISTORY');
    }
  }
})
export default store;