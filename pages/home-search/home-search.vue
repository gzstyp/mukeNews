<template>
	<view class="home">
		<navbar :isSearch="true"></navbar>
    <view class="home-list">
      <view class="label-box">
        <view class="label-header">
          <text class="label-title">搜索历史</text>
          <text class="label-clear">清空</text>
        </view>
        <view class="label-content">
          <view class="label-content_item" v-for="item in 10">
            {{item}}内容
          </view>
        </view>
      </view>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

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
    border: 1px solid #f00;
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
</style>