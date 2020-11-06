<template>
	<view class="home">
    <!-- 怎么跟我们自己自定义的组件实现数据的双向绑定呢?1先绑定v-model;2在需要传入需要改变的值,3进入到(子)组件navbar.vue里props创建一个与之对应的属性 value -->
		<navbar :isSearch="true" v-model="value" @input="change"></navbar>
    <view class="home-list">
      <view v-if="is_history" class="label-box">
        <view class="label-header">
          <text class="label-title">搜索历史</text>
          <text class="label-clear">清空</text>
        </view>
        <view v-if="historyLists.length > 0" class="label-content">
          <view class="label-content_item" v-for="(item,index) in historyLists" :key="index" @click="openHistory(item)">
            {{item.name}}
          </view>
        </view>
        <view v-else class="no-data">
          没有搜索历史
        </view>
      </view>
      <!-- 显示搜索结果 -->
      <list-scroll v-else class="list-scroll">
        <uni-load-more v-if="show" status="loading" iconType="snow"></uni-load-more>
        <view v-if="listSearch.length > 0">
          <list-card :item="item" v-for="item in listSearch" :key="item._id" @click="setHistory"></list-card>
        </view>
        <view v-if="listSearch.length === 0 && !show" class="no-data">
          没有搜索到相关数据
        </view>
      </list-scroll>
    </view>
	</view>
</template>

<script>
  import {mapState} from 'vuex';
	export default {
		data() {
			return {
        value : '',
        is_history : true,
        listSearch : [],
        show : false
			}
		},
    //计算数据,主要实时监听vuex里的state数据源状态变化
    computed:{
      ...mapState(['historyLists'])//参数是数组,其中的 historyLists 是定义在 state 里的
    },
    //页面是onLoad,组件是created
    onLoad() {},
		methods : {
      setHistory(){
        this.$store.dispatch('set_history',{name : this.value});
      },
      openHistory(item){
        this.value = item.name;
        this.get_search(this.value);
      },
      //监听输入变化
      change(value){
        //this.value = value; todo
        if(!value){
          clearTimeout(this.timer);
          this.mark = false;
          this.get_search(value);
          return;
        }
        //做个标记,请求延时
        if(!this.mark){
          this.mark = true;
          this.timer = setTimeout(()=>{
            this.mark = false;
            this.get_search(value);
          },1000);
        }
      },
      get_search(value){
        if(!value){
          this.listSearch = [];
          this.is_history = true;
          return;
        }
        this.show = true;
        this.$api.getSearch({value : value}).then(result =>{
          this.show = false;
          this.is_history = false;
          const {code,data} = result;
          if(200 === code){
            this.listSearch = data;
          }else if(201 === code){
            this.listSearch = [];
          }
        }).catch(err =>{
          this.show = false;
          console.info(err);
        });
      }
		}
	}
</script>

<style lang="scss">
  page{
    height: 100%;
    display: flex;
    background-color: #f5f5f5;
  }
  .home{
    display: flex;
    flex-direction: column;
    flex: 1;
    .label-box{
      background-color:#fff;
      margin-bottom:10px;
      .label-header{
        display:flex;
        justify-content:space-between;
        font-size:14px;
        color:#666;
        padding:10px 15px;
        border-bottom: 1px solid #f5f5f5;
        .label-title{
          color: $mk-base-color;
        }
        .label-clear{
          color: #30b33a;
        }
      }
      .label-content{
        display: flex;
        flex-wrap: wrap;//内容超出时换行
        padding: 15px;
        padding-top: 0;
        .label-content_item{
          padding: 2px 10px;
          margin-top: 12px;
          margin-right: 10px;
          border-radius: 5px;
          border: 1px solid #666;
          font-size:14px;
          color: #666;
        }
      }
    }
  }
  .no-data{
    height: 200px;
    line-height: 200px;
    width: 100%;
    text-align: center;
    font-size: 12px;
    color: #666;
  }
</style>