<template>
	<view @click="open">
    <!-- 基础卡片-->
    <view v-if="item.mode === 'base'" class="listcard">
      <view class="listcard-image">
        <image :src="item.cover[0]" mode="aspectFill"></image>
      </view>
      <view class="listcard-content">
        <view class="listcard-content_title">
          <text>{{item.title}}</text>
          <likes :types="types" :item="item"></likes>
        </view>
        <view class="listcard-content_des">
          <view class="listcard-content_label">
            <view class="listcard-content_item">
              {{item.classify}}
            </view>
          </view>
          <view class="listcard-content_browse">{{item.browse_count || 1}}浏览</view>
        </view>
      </view>
    </view>
    <!-- 多图模式 -->
    <view v-if="item.mode === 'column'" class="listcard mode-column">
      <view class="listcard-content">
        <view class="listcard-content_title">
          <text>{{item.title}}</text>
          <likes :types="types" :item="item"></likes>
        </view>
        <view class="listcard-image">
          <view v-if="index < 3" v-for="(subItem,index) in item.cover" :key="index" class="listcard-image_item">
            <image :src="subItem" mode="aspectFill"></image>
          </view>
        </view>
        <view class="listcard-content_des">
          <view class="listcard-content_label">
            <view class="listcard-content_item">
              {{item.classify}}
            </view>
          </view>
          <view class="listcard-content_browse">{{item.browse_count || 1}}浏览</view>
        </view>
      </view>
    </view>
    <!-- 大图模式 -->
    <view v-if="item.mode === 'image'" class="listcard mode-image">
      <view class="listcard-image">
        <image :src="item.cover[0]" mode="aspectFill"></image>
      </view>
      <view class="listcard-content">
        <view class="listcard-content_title">
          <text>{{item.title}}</text>
          <likes :types="types" :item="item"></likes>
        </view>
        <view class="listcard-content_des">
          <view class="listcard-content_label">
            <view class="listcard-content_item">
              {{item.classify}}
            </view>
          </view>
          <view class="listcard-content_browse">{{item.browse_count || 1}}浏览</view>
        </view>
      </view>
    </view>
	</view>
</template>

<script>
	export default {
    props : {
      item : {
        type : Object,
        default(){
          return {}
        }
      },
      //用于区分是哪一个组件页面触发点击事件,判断这个值即可
      types : {
        type : String,
        default : ''
      }
    },
    data() {
      return {

      };
    },
    methods:{
      open(){
        const obj = this.item;
        this.$emit('setHistory',obj);//home-search.vue页面接收并处理setHistory自定义事件
        const params = {
          _id : obj._id,
          title : obj.title,
          author : obj.author,
          create_time : obj.create_time,
          thumbs_up_count : obj.thumbs_up_count,
          browse_count : obj.browse_count
        };
        uni.navigateTo({
          url:'/pages/home-detail/home-detail?params='+JSON.stringify(params)
        });
      }
    }
	}
</script>

<style lang="scss">
  .listcard{
    display: flex;
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
    box-shadow: 0 0 5px 1px rgba($color: #000000, $alpha:0.1);
    box-sizing: border-box;
    .listcard-image{
      flex-shrink: 0;//防止图片被挤压
      height: 60px;
      width: 60px;
      border-radius: 5px;
      overflow: hidden;
      image{
        height: 100%;
        width: 100%;
      }
    }
    .listcard-content{
      display: flex;
      flex-direction: column;
      justify-content: space-between;/*子元素两端对齐，项目之间的间隔都相等*/
      padding-left: 10px;
      width: 100%;
      .listcard-content_title{
        position: relative;
        padding-right: 30px;
        font-size: 14px;
        color:#333;
        font-weight:400;
        line-height: 1.3;
        text{
          overflow: hidden;/* 文字多了之后要隐藏 */
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp:2;
          -webkit-box-orient:vertical;
        }
      }
      .listcard-content_des{
        display: flex;
        justify-content: space-between;/*子元素两端对齐，项目之间的间隔都相等*/
        font-size: 12px;
        .listcard-content_label{
          display: flex;
          .listcard-content_item{
            padding: 0 6px;
            margin-right: 5px;
            border-radius: 4px;
            color: $mk-base-color;
            border: 1px solid $mk-base-color;
          }
        }
        .listcard-content_browse{
          color: #999;
          line-height: 1.5;
        }
      }
    }
    /* 多图模式*/
    &.mode-column{
      .listcard-content{
        width: 100%;
        padding-left: 0;
      }
      .listcard-image{
        display: flex;
        margin-top: 10px;
        width: 100%;
        height: 70px;
        .listcard-image_item{
          margin-left: 10px;
          width: 100%;
          border-radius: 5px;
          overflow: hidden;
          &:first-child{
            margin-left: 0px;
          }
          image{
            height: 100%;
            width: 100%;
          }
        }
      }
      .listcard-content_des{
        margin-top: 10px;
      }
    }
    /* 大图模式 */
    &.mode-image{
      flex-direction: column;//纵向排列
      .listcard-image{
        width: 100%;
        height: 100px;
      }
      .listcard-content{
        padding-left: 0px;
        margin-top: 10px;
        .listcard-content_des{
          display: flex;
          align-items: center;
          margin-top: 10px;
        }
      }
    }
  }
</style>