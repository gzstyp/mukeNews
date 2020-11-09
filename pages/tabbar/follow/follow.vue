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
            <uni-load-more v-if="list.length === 0 && !articleShow" iconType="snow" status="loading"></uni-load-more>
            <list-card v-for="item in list" :key="item._id" types="follow" :item="item"></list-card>
            <view v-if="articleShow" class="no-data">
              没有数据
            </view>
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
        activeIndex : 0,
        list : [],
        articleShow : false//默认不让其显示,等第1次加载玩没有数据时才显示
			}
		},
    onLoad(){
      //全局的自定义事件,刷新页面数据,它只能在已打开的页面才触发!!!
      uni.$on('update_article',()=>{
        this.gerFollow();
      });
      this.gerFollow();
    },
		methods: {
      tab : function(index){
        this.activeIndex = index;
      },
      gerFollow(){
        this.$api.get_follow({}).then(result =>{
          const {code,data} = result;
          this.list = data;
          this.articleShow = this.list.length === 0 ? true : false;//因为没有做分页
        }).catch(err =>{
          console.info(err);
        });
      }
		}
	}
</script>

<style lang="scss" scoped>
  page{
    height: 100%;
    display: flex;
  }
  .follow{
    height: 100%;
    display: flex;
    flex-direction: column;
    flex: 1;//让页面撑起来???
    box-sizing: border-box;/* 若高度是100%没有看到下边框的话,加上这个就可以 */
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
      .follow-list-swiper{
        height: 100%;
        .swiper-item{
          height: 100%;
        }
      }
    }
  }
  .no-data{
    padding: 50px;
    font-size: 14px;
    color: #999;
    text-align: center;
  }
</style>