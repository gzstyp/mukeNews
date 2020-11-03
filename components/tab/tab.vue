<template>
	<view class="tab">
		<!-- 标签,滚动条 -->
		<scroll-view class="tab-scroll" scroll-x>
			<view class="tab-scroll_box">
				<view v-for="(item,index) in list" :key="index" class="tab-scroll_item">
					{{item.name}}
				</view>
			</view>
		</scroll-view>
		<!-- 图标[设置],因为图标不能滚动,所以要单独view -->
		<view class="tab-icons">
			<uni-icons type="gear" size="26" color="#666"></uni-icons>
		</view>
	</view>
</template>

<script>
	export default {
		props : {
			list : {
				type : Array,
				default(){
					return []
				}
			}
		},
		data() {
			return {};
		}
	}
</script>

<style lang="scss" scoped>
	.tab{
		display: flex;
		width: 100%;
		border-bottom: 1px solid #f5f5f5;
		background-color: #fff;
		box-sizing: border-box;
		.tab-scroll{
			flex: 1;//让其撑满整个元素
			overflow: hidden;
			box-sizing: border-box;/* 仅在盒子内显示 */
			.tab-scroll_box{
				display: flex;
				align-items: center;
				flex-wrap: nowrap;/* 防止换行 */
				height: 45px;
				box-sizing: border-box;
				.tab-scroll_item{
					flex-shrink: 0;
					padding: 0 10px;
					color: #333;
					font-size: 14px;
				}
			}
		}
		.tab-icons{
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			width:45px;
			//使用伪类实现竖线
			&::after{
				content: '';
				position: absolute;
				top: 12px;
				bottom: 12px;
				left: 0;
				width: 1px;
				background-color: #ddd;
			}
		}
	}
</style>