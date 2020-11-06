//vuex 是功能强大的状态管理组件
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
  //数据源
  state : {
    historyLists : []
  },
  //提供修改数据源的方法;对外提供修改数据源[state]的方法,它可以改变 state 数据源的数据
  mutations : {
    //页面调用方式:this.$store.commit('SET_HISTORY_LISTS',history);
    SET_HISTORY_LISTS(state,history){
      state.historyLists = history;
    }
  },
  //它和mutations的功能差不多,仅能调用mutations里的方法来修改数据源,所以它不能直接修改数据源,这里可以执行任意的异步操作
  actions : {
    set_history({commit,state},history){//第1个参数是对象,其commit可以调用mutations里的方法;第2个参数history是调用端传递过来的数据
      commit('SET_HISTORY_LISTS',history);//SET_HISTORY_LISTS是mutations里的方法名,history是参数的数据
    }
  }
})
export default store;