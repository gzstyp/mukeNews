<template>
	<view class="home">
		<!-- 自定义导航栏 -->
		<navbar></navbar>
		<!-- 标签 -->
		<tab :list="tabList" @tab="tab"></tab>
    <view class="scroll">
      <scroll-view class="list-scroll" scroll-y>
        <view>
          <view v-for="item in 100">
          	{{item}}内容
          </view>
        </view>
      </scroll-view>
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
				tabList : []
			}
		},
		onLoad() {
			this.getLabel();
		},
		methods: {
      tab({data,index}){
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
    border: 1px solid #007AFF;
    .scroll{
      flex: 1;
      box-sizing: border-box;
      overflow: hidden;
      .list-scroll{
        height: 100%;
        display: flex;
        flex-direction:column;//垂直排列
      }
    }
  }
</style>