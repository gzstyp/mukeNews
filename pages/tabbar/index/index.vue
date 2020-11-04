<template>
	<view class="home">
		<!-- 自定义导航栏 -->
		<navbar></navbar>
		<!-- 标签，tabIndex是页面向标签联动 -->
		<tab :list="tabList" :tabIndex="tabIndex" @tab="tab"></tab>
    <view class="home-list">
      <!-- activeIndex标签向页面联动 -->
      <list :tab="tabList" :activeIndex="activeIndex" @change="change"></list>
    </view>
	</view>
</template>

<script>
	import navbar from '@/components/navbar/navbar.vue'
	export default {
		components:{
			navbar
		},
		data() {
			return {
				title: 'Hello',
				tabList : [],
        tabIndex : 0,
        activeIndex : 0
			}
		},
		onLoad() {
			this.getLabel();
		},
		methods: {
      change(current){
        this.tabIndex = current;
      },
      tab({data,index}){
        this.activeIndex = index;
      },
			getLabel(){
				//调用云函数方法
				this.$api.getLabel({}).then(data =>{
          if(200 === data.code){
            this.tabList = data.data;
          }
				}).catch(err =>{
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
  }
  .home{
    display: flex;
    flex-direction:column;//垂直排列
    flex: 1;
    overflow: hidden;
    .home-list{
      flex:1;
      box-sizing:border-box;
    }
  }
</style>