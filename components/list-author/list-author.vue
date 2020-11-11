<template>
	<view class="listauthor">
    <view class="listauthor-image">
      <image :src="item.avatar" mode="aspectFill"></image>
    </view>
    <view class="listauthor-content">
      <view class="listauthor-content_title">{{item.author_name}}</view>
      <view class="listauthor-content_des">
        <view class="listauthor-content_des_label">{{item.professional}}</view>
        <view class="listauthor-content_des_info">
          <text>文章 {{item.article_ids.length}}</text>
          <text>粉丝 {{item.fans_count}}</text>
        </view>
      </view>
    </view>
	</view>
</template>

<script>
	export default {
    props:{
      item : {
        type : Object,
        default(){
          return {}
        }
      }
    },
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
  .listauthor{
    display: flex;
    padding: 10px 0;
    margin: 0 10px;
    border-radius: 5px;
    box-sizing: border-box;/* 让元素在本容器内显示 */
    border-bottom: 1px solid #f5f5f5;
    .listauthor-image{
      flex-shrink: 0;/* 让头像图片不被挤压 */
      width: 40px;
      height: 40px;
      overflow: hidden;
      image {
        height: 100%;
        width: 100%;
      }
    }
    .listauthor-content{
      display: flex;
      flex-direction: column;/* 让子元素垂直排列对齐;column行[此处是垂直方向的左右对齐] */
      justify-content: space-between;/* 使子元素左右对齐,子元素两端对齐，项目之间的间隔都相等*/
      padding-left: 10px;/* 让左右两边的左边的子元素离左边有点距离 */
      width: 100%;/* 本容器宽度100% */
      .listauthor-content_title{
        position: relative;
        padding-right: 30px;
        font-size: 14px;
        color: #333;
        font-weight: bold;
        line-height: 1.2;/* 1.2倍的行间距 */
      }
      .listauthor-content_des{
        display: flex;
        justify-content: space-between;/* 让子元素水平排列对齐[此处是水平方向的左右对齐]; 两端对齐*/
        font-size: 12px;
        .listauthor-content_des_label{
          color: #666;
        }
        .listauthor-content_des_info{
          color: #999;
          line-height: 1.5;/* 1.5倍的行间距 */
          text:first-child{//第1个元素,找到第1个text标签
            margin-right: 10px;
          }
        }
      }
    }
  }
</style>