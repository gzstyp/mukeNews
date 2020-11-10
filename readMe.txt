调用组件关系

父子关系：index.vue ->list.vue -> list-item.vue -> list-card.vue

父子关系：index.vue -> tab.vue

父子关系：index.vue -> navbar.vue

flex-direction: column;/* 垂直排列 */
box-sizing: border-box;/* 若高度是100%没有看到下边框的话,加上这个就可以 */

/pages/home-detail/home-detail.vue 页面详情
/pages/detail-comments/detail-comments.vue 文章评论列表
/pages/home-label/home-label.vue 标签管理页面
/pages/home-label/home-search.vue 搜索页面

//自定义全局事件,方便其他页面刷新数据[可以多个地方定义同一个事件名],还有一处 /pages/home-detail/home-detail.vue
//自定义全局事件,方便其他页面刷新数据[可以多个地方定义同一个事件名],还有一处 /components/likes/likes.vue
uni.$emit('update_article');
//全局的自定义事件,刷新页面数据,它只能在已打开的页面才触发!!!
uni.$on('update_article',()=>{
  this.refreshData();
});

此处的types若是变量才需要冒号:
<list-card v-for="item in list" :key="item._id" types="follow" :item="item"></list-card>

让头像图片不被挤压
.listauthor-image{
    flex-shrink: 0;/* 让头像图片不被挤压,为什么要这个属性??? */
    width: 40px;
    height: 40px;
    overflow: hidden;
    image{
      height: 100%;
      width: 100%;
    }
}

//头像,图片一般要给一个容器包裹,给定宽高度，防止被挤压然后image宽高度100%,这里为什么没有 flex-shrink: 0 属性???,因为不需要也不会被挤压!!!
.my-header_logo_box{
  height: 60px;
  width: 60px;
  border-radius: 50%;
  overflow: hidden;
  image{
    height: 100%;
    width: 100%;
  }
}

经典的布局样式1-开始
<template>
	<view class="listauthor">
    <view class="listauthor-image">
      <image src="/static/logo.png" mode="aspectFill"></image>
    </view>
    <view class="listauthor-content">
      <view class="listauthor-content_title">引路者</view>
      <view class="listauthor-content_des">
        <view class="listauthor-content_des_label">前端工程师</view>
        <view class="listauthor-content_des_info">
          <text>发帖1024</text>
          <text>粉丝512</text>
        </view>
      </view>
    </view>
	</view>
</template>

<script>
	export default {
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
      justify-content: space-between;/* 使子元素左右对齐 */
      padding-left: 10px;/* 让左右两边的左边的子元素离左边有点距离 */
      width: 100%;/* 本容器宽度100% */
      .listauthor-content_title{
        background-color: #555555;
        position: relative;
        padding-right: 30px;
        font-size: 14px;
        color: #333;
        font-weight: bold;
        line-height: 1.2;/* 1.2倍的行间距 */
      }
      .listauthor-content_des{
        background-color: #375539;
        display: flex;
        justify-content: space-between;/* 让子元素水平排列对齐[此处是水平方向的左右对齐]; */
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
经典的布局样式1-结束

经典的布局样式2-开始------------------------------------
<template>
	<view>
    <view class="my-header">
      <view class="my-header-logo">
        <view class="my-header_logo_box">
          <image src="/static/logo.png" mode="aspectFill"></image>
        </view>
        <text class="my-header_name">引路者</text>
      </view>
      <!-- 关注-->
      <view class="my-header-info">
        <view class="my-header-info_box">
          <text class="my-header-info-title">被关注</text>
          <text>0</text>
        </view>
        <view class="my-header-info_box">
          <text class="my-header-info-title">粉丝</text>
          <text>0</text>
        </view>
        <view class="my-header-info_box">
          <text class="my-header-info-title">积分</text>
          <text>0</text>
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

<style lang="scss" scoped>
  page{
    background-color: #f5f5f5;
  }
  .my-header{
    padding-bottom: 15px;
    //头像+作者名字的样式
    .my-header-logo{
      display: flex;
      flex-direction: column;/* 垂直排列 */
      align-items: center;
      padding-top: 30px;
      //头像,图片一般要给一个容器包裹,给定宽高度，防止被挤压然后image宽高度100%
      .my-header_logo_box{
        height: 60px;
        width: 60px;
        border-radius: 50%;
        overflow: hidden;
        image{
          height: 100%;
          width: 100%;
        }
      }
      .my-header_name{
        margin-top: 12px;
        font-size: 16px;
        font-weight: bold;
      }
    }
    .my-header-info{
      margin-top: 14px;
      //让3个文字和数字水平排列
      display: flex;
      //让文字和数字上下垂直排列
      .my-header-info_box{
        display: flex;
        flex-direction: column;/* 上下垂直排列 */
        justify-content: center;/* 左右居中 */
        align-items: center;/* 上下居中 */
        width: 100%;
        font-size: 12px;
        color: #999;
        //让文字变粗且换个颜色
        .my-header-info-title{
          font-size: 14px;
          color: #333;
        }
      }
    }
  }
</style>
经典的布局样式2-结束------------------------------------