<template>
	<view class="navbar">
		<view class="navbar-fixed">
			<!-- 状态栏,解决微信小程序状态栏开始 -->
			<view :style="{height:statusBarHeight + 'px'}"></view>
			<!-- 解决微信小程序状态栏结束 -->
			<!-- 导航栏内容 -->
			<view class="navbar-content" :style="{height:navBarHeight + 'px',width:windowWidth+'px'}">
				<view class="navbar-search">
					<view class="navbar-search_icon">
						<uni-icons type="search" size="16" color="#999"></uni-icons>
					</view>
					<view class="navbar-search_text">输入关键字…</view>
				</view>
			</view>
		</view>
		<!-- 这个高度在小程序里的不正确的,所以要动态计算获取,状态栏的高度+导航栏的高度 -->
		<view :style="{height:statusBarHeight + navBarHeight+'px'}"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				statusBarHeight : 20,//默认状态栏的高度
				navBarHeight : 45,//在html中是45px的高度
				windowWidth : 375
			};
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
						font-size: 12px;
						color: #999;
					}
				}
			}
		}
	}
</style>