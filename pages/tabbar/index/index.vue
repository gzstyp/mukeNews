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
  import {mapState} from 'vuex';
	import navbar from '@/components/navbar/navbar.vue';
	export default {
		components:{
			navbar
		},
		data() {
			return {
				tabList : [],
        tabIndex : 0,
        activeIndex : 0
			}
		},
    computed:{
      ...mapState(['userinfo'])
    },
    /* 提示未赋值或undefined可以使用这个来操作 */
    watch:{
      userinfo(val){//监听上面的computed里的userinfo,兼容微信小程序,否则会报错docId必须为字符串或数字
        this.getLabel();
      }
    },
		onLoad() {
      //接收自定义全局事件,第1个参数是事件名,参数2是传递来的数据
      uni.$on('labelChange',(data)=>{
        this.tabList = [];//刷新后重新赋值
        this.tabIndex = 0;//刷新后重新赋值
        this.activeIndex = 0;//刷新后重新赋值
        this.getLabel();
      });
		},
		methods: {
      change(current){
        this.tabIndex = current;
        this.activeIndex = current;
      },
      tab({data,index}){
        this.activeIndex = index;
      },
			getLabel(){
				//调用云函数方法
				this.$api.getLabel({}).then(data =>{
          if(200 === data.code){
            // unshift()方法可向数组的开头添加一个或更多元素，并返回新的长度。该方法将改变数组的数目；若将新项添加到数组末尾，请使用 push()方法
            data.data.unshift({name:'全部'});
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