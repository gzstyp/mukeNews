<template>
	<view>
    <!-- 基础卡片-->
    <view v-if="mode === 'base'" class="listcard">
      <view class="listcard-image">
        <image src="/static/logo.png" mode="aspectFill"></image>
      </view>
      <view class="listcard-content">
        <view class="listcard-content_title">
          <text>据外媒报道,美国白宫附近发生冲突2人被捕,该抗议活动发生在大选投票当日,很多反对特朗普的民众聚集在白宫外面,其中还有一些反对种族歧视的抗议者,他们与白宫警方发生了</text>
        </view>
        <view class="listcard-content_des">
          <view class="listcard-content_label">
            <view class="listcard-content_item">
              前端
            </view>
          </view>
          <view class="listcard-content_browse">1浏览</view>
        </view>
      </view>
    </view>
    <!-- 多图模式 -->
    <view v-if="mode === 'column'" class="listcard mode-column">
      <view class="listcard-content">
        <view class="listcard-content_title">
          <text>据外媒报道,美国白宫附近发生冲突2人被捕,该抗议活动发生在大选投票当日,很多反对特朗普的民众聚集在白宫外面,其中还有一些反对种族歧视的抗议者,他们与白宫警方发生了</text>
        </view>
        <view class="listcard-image">
          <view v-for="(item,index) in 3" :key="index" class="listcard-image_item">
            <image src="/static/logo.png" mode="aspectFill"></image>
          </view>
        </view>
        <view class="listcard-content_des">
          <view class="listcard-content_label">
            <view class="listcard-content_item">
              前端
            </view>
          </view>
          <view class="listcard-content_browse">1浏览</view>
        </view>
      </view>
    </view>
    <!-- 大图模式 -->
    <view v-if="mode === 'image'" class="listcard mode-image">
      <view class="listcard-image">
        <image src="/static/logo.png" mode="aspectFill"></image>
      </view>
      <view class="listcard-content">
        <view class="listcard-content_title">
          <text>据外媒报道,该抗议活动发生在大选投票当日,他们与白宫警方发生了</text>
        </view>
        <view class="listcard-content_des">
          <view class="listcard-content_label">
            <view class="listcard-content_item">
              前端
            </view>
          </view>
          <view class="listcard-content_browse">1浏览</view>
        </view>
      </view>
    </view>
	</view>
</template>

<script>
	export default {
    props : {
      mode : {
        type : String,
        default:'base'
      }
    },
		data() {
			return {

			};
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
      justify-content: space-between;
      padding-left: 10px;
      width: 100%;
      .listcard-content_title{
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
        justify-content: space-between;
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