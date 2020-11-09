<template>
	<view class="follow">
    <!-- 切换导航栏 -->
    <view class="follow-tab">
      <view class="follow-tab-box">
        <!-- 其中active是类名 -->
        <view class="follow-tab-item" :class="{active:activeIndex ===0}" @click="tab(0)">文章</view>
        <view class="follow-tab-item" :class="{active:activeIndex ===1}" @click="tab(1)">作者</view>
      </view>
    </view>
    <view class="follow-list">
      <swiper class="follow-list-swiper">
        <swiper-item>
          <list-scroll>
            <view class="" v-for="item in 100">{{item}}内容</view>
          </list-scroll>
        </swiper-item>
        <swiper-item>
          <view class="swiper-item">作者</view>
        </swiper-item>
      </swiper>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        activeIndex : 0
			}
		},
		methods: {
      tab : function(index){
        this.activeIndex = index;
      }
		}
	}
</script>

<style lang="scss">
  page{
    height: 100%;
    display: flex;
  }
  .follow{
    height: 100%;
    display: flex;
    flex-direction: column;
    flex: 1;//让页面撑起来???
    box-sizing: border-box;
    .follow-tab{
      height: 30px;
      padding: 10px 16px;
      border-bottom: 1px solid #f5f5f5;
      .follow-tab-box{
        display: flex;
        height: 100%;//因为外层已指定高度,所以给100%高度
        width: 100%;//因为外层已指定高度,所以给100%宽度
        border-radius: 5px;
        border: 1px solid $mk-base-color;
        .follow-tab-item{
          display: flex;
          justify-content: center;
          align-items: center;
          color: #666;
          font-size: 14px;
          width: 100%;
          &:first-child{
            border-right: 1px solid $mk-base-color;
          }
          /* 附加,用法：follow-tab-item active */
          &.active{
            color: $mk-base-color;
          }
        }
      }
    }
    .follow-list{
      flex: 1;//高度直接撑开,即把剩余的宽高度撑满???
      border: 1px solid $mk-base-color;
      .follow-list-swiper{
        height: 100%;
        .swiper-item{
          height: 100%;
        }
      }
    }
  }
</style>