<template>
	<view>
    <titlebar title="个人中心"></titlebar>
    <view class="my-header">
      <view class="my-header-background">
        <image :src="userinfo.avatar" mode="aspectFill"></image>
      </view>
      <view class="my-header-logo">
        <view class="my-header_logo_box">
          <image :src="userinfo.avatar" mode="aspectFill"></image>
        </view>
        <text class="my-header_name">{{userinfo.author_name}}</text>
      </view>
      <!-- 关注-->
      <view class="my-header-info">
        <view class="my-header-info_box">
          <text class="my-header-info-title">被关注</text>
          <text>{{userinfo.follow_count || 0}}</text>
        </view>
        <view class="my-header-info_box">
          <text class="my-header-info-title">粉丝</text>
          <text>{{userinfo.fans_count || 0}}</text>
        </view>
        <view class="my-header-info_box">
          <text class="my-header-info-title">积分</text>
          <text>{{userinfo.integral_count || 0}}</text>
        </view>
      </view>
    </view>
    <view class="my-content">
      <!-- 列表的左边一个图标和文字,右边一个箭头图标,所以要包装一层 -->
      <view class="my-content_list" @click="myArticle">
        <view class="my-content-list-title">
          <uni-icons class="icons" type="contact" size="16" color="#666"></uni-icons>
          <text>我的文章</text>
        </view>
        <uni-icons type="arrowright" size="16" color="#666"></uni-icons>
      </view>
      <!-- 列表的左边一个图标和文字,右边一个箭头图标,所以要包装一层 -->
      <view class="my-content_list" @click="feedback">
        <view class="my-content-list-title">
          <uni-icons class="icons" type="help" size="16" color="#666"></uni-icons>
          <text>意见反馈</text>
        </view>
        <uni-icons type="arrowright" size="16" color="#666"></uni-icons>
      </view>
      <view class="my-content_list" @click="help">
        <view class="my-content-list-title">
          <uni-icons class="icons" type="help" size="16" color="#666"></uni-icons>
          <text>帮助中心</text>
        </view>
        <uni-icons type="arrowright" size="16" color="#666"></uni-icons>
      </view>
    </view>
	</view>
</template>

<script>
  import {mapState} from 'vuex';//它和计算属性一起使用???
	export default {
		data() {
			return {}
		},
    //属性计算_实时监听vuex里的数据源数据变化
    computed:{
      ...mapState(['userinfo'])//取值:{{userinfo.xxx}} 或 this.userinfo;
    },
    onLoad() {},
    methods : {
      //我的文章
      myArticle(){
        uni.navigateTo({
          url:'/pages/my-article/my-article'
        });
      },
      //意见反馈
      feedback(){
        uni.navigateTo({
          url:'/pages/feedback/feedback'
        });
      },
      //帮助中心
      help(){
        uni.navigateTo({
          url:'/pages/tabbar/my/help'
        });
      }
    }
	}
</script>

<style lang="scss">
  page{
    background-color: #f5f5f5;
  }
  .my-header{
    position: relative;
    padding-bottom: 15px;
    //上部分的虚幻背景,模糊感觉,高度仅在父容器的高度
    .my-header-background{
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      filter: blur(8px);/* 模糊 */
      opacity: 0.3;/* 透明度 */
      image{
        width: 100%;
        height: 100%;
      }
    }
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
  .my-content{
    /* 列表的左边一个图标和文字,右边一个箭头图标 */
    .my-content_list{
      display:flex;
      justify-content:space-between;/*使子元素左右对齐，子元素两端对齐*/
      padding:15px;
      margin-top: 10px;
      background-color: #fff;
      color: #333;
      font-size: 14px;
      .my-content-list-title{
        display: flex;
        align-items: center;/* 垂直方向排列,即让内容垂直居中对齐 */
        /* 和左边的文字有点距离 */
        .icons{
          margin-right:6px;
        }
      }
    }
  }
</style>