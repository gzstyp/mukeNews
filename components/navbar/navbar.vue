<template>
	<view class="navbar">
		<view class="navbar-fixed">
			<!-- 状态栏,解决微信小程序状态栏开始 -->
			<view :style="{height:statusBarHeight + 'px'}"></view>
			<!-- 解决微信小程序状态栏结束 -->
			<!-- 导航栏内容,若isSearch为ture时覆盖navbar-content样式即可 -->
			<view class="navbar-content" :class="{search:isSearch}" :style="{height:navBarHeight + 'px',width:windowWidth+'px'}" @click.stop="open">
				<!-- 返回箭头 -->
        <view v-if="isSearch" class="navbar-content-search-icons" @click="back">
          <uni-icons type="back" size="24" color="#fff"></uni-icons>
        </view>
        <!-- 非搜索页显示 -->
        <view v-if="!isSearch" class="navbar-search">
					<view class="navbar-search_icon">
						<uni-icons type="search" size="16" color="#999"></uni-icons>
					</view>
					<view class="navbar-search_text">输入关键字…</view>
				</view>
        <!-- 是搜索页显示 -->
        <view v-else class="navbar-search">
        	<input class="navbar-search_text" type="text" v-model="val" placeholder="请输入搜索内容" @input="inputChange"/>
        </view>
			</view>
		</view>
		<!-- 这个高度在小程序里的不正确的,所以要动态计算获取,状态栏的高度+导航栏的高度 -->
		<view :style="{height:statusBarHeight + navBarHeight+'px'}"></view>
	</view>
</template>

<script>
	export default {
    props : {
      value : {
        type : [String,Number],
        default : ''
      },
      isSearch : {
        type : Boolean,
        default : false
      }
    },
		data() {
			return {
				statusBarHeight : 20,//默认状态栏的高度
				navBarHeight : 45,//在html中是45px的高度
				windowWidth : 375,
        val : ''
			};
		},
    watch:{
      //监听实时输入的内容,todo,重点!!!
      value(newValue){
        this.val = newValue;
      }
    },
		created() {
			//同步方法,获取手机系统系统
			const info = uni.getSystemInfoSync();
			/* 设置状态栏的高度 */
			this.statusBarHeight = info.statusBarHeight;
			this.windowWidth = info.windowWidth;
			// #ifndef H5 || APP-PLUS || MP-ALIPAY
			//获取胶囊的位置
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
			console.info(menuButtonInfo);
			//(胶囊底部高度 - 状态栏的高度) + (胶囊顶部高度 - 状态栏内的高度) = 导航栏的高度
			this.navBarHeight = (menuButtonInfo.bottom - info.statusBarHeight) + (menuButtonInfo.top - info.statusBarHeight);
			this.windowWidth = menuButtonInfo.left;
			// #endif
		},
    methods : {
      back(){
        //uni.navigateBack({})//在h5平台下可能会有问题,不推荐,因一开始就打开该页面那点返回还是当前页,因为页面栈之前就没有页面
        uni.switchTab({
          url :'/pages/tabbar/index/index'
        })
      },
      open(){
        if(this.isSearch) return;//是在搜索页时不跳转页面
        uni.navigateTo({
          url:"/pages/home-search/home-search"
        });
      },
      inputChange(e){
        const {value} = e.detail;
        this.$emit('input',value);
      }
    }
	}
</script>

<style lang="scss">
	@import '@/common/css/icons.css';//@import '../../common/css/icons.css';是等价的!!!
	.navbar{
		.navbar-fixed{
			/* 解决 /tu_jie/001_解决上下滚动时被顶上去.gif 问题开始*/
			position: fixed;
			top: 0;
			left: 0;
			z-index: 99;
			/* 解决 /tu_jie/001_解决上下滚动时被顶上去.gif 问题结束*/
			width:100%;
			background-color: $mk-base-color;
			.navbar-content{
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 0 15px;
				height: 45px;//解决微信小程序状态栏
				box-sizing: border-box;/* 让子元素仅在本容器内显示,即在盒内显示 */
				.navbar-search{
					display: flex;
					align-items: center;
					padding: 0 10px;
					width: 100%;
					height: 30px;
					border-radius: 30px;
					background-color: #fff;
					.navbar-search_icon{
						margin-right: 10px;
						margin-top: 2px;
					}
					.navbar-search_text{
            width: 100%;
						font-size: 14px;
						color: #999;
            padding-top: 2px;
					}
				}
        //同级元素,为ture时覆盖样式即可
        &.search{
          padding-left: 0;
          .navbar-content-search-icons{
            margin-left: 10px;
            margin-right: 10px;
          }
          .navbar-search{
            border-radius: 5px;
          }
        }
			}
		}
	}
</style>