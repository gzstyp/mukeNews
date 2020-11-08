<template>
	<view class="comments-box">
		<view class="comments-header">
      <!-- 头像 -->
		  <view class="comments-header_logo">
		    <image :src="comments.author.avatar" mode="aspectFill"></image>
		  </view>
      <view class="comments-header_info">
        <view class="title">{{comments.author.author_name}}</view>
        <view>{{comments.create_time}}</view>
      </view>
		</view>
    <!-- 评论内容 -->
    <view class="comments-content">
      <view>{{comments.comment_content}}</view>
      <view class="comments-info">
        <view class="comments-button" @click="commentsReply(comments)">回复</view>
      </view>
      <!-- comments.replys 防止因递归导致死循环 -->
      <view class="comments-reply" v-for="item in comments.replys" :key="item.comment_id">
        <!-- 递归调用 -->
        <comments-box :comments="item"></comments-box>
      </view>
    </view>
	</view>
</template>

<script>
  // 在自己组件调用自己表示 commentsBox 递归,自己引用自己
  import commentsBox from '@/components/comments-box/comments-box.vue'
	export default {
    name : "comments-box",//使用递归时必须指定name
    components:{
      commentsBox
    },
    props:{
      comments : {
        type : Object,
        default(){
          return {}
        }
      }
    },
		data() {
			return {};
		},
    methods:{
      commentsReply(comment){
        this.$emit('reply',comment)//事件丢给父组件处理
      }
    }
	}
</script>

<style lang="scss">
  .comments-box{
    margin: 15px 0;
    .comments-header{
      display: flex;
      .comments-header_logo{
        flex-shrink: 0;/* 防止被挤压变性 */
        width: 30px;
        height: 30px;
        border-radius: 5px;
        overflow: hidden;
        image{
          width: 100%;
          height: 100%;
        }
      }
      .comments-header_info{
        display: flex;
        flex-direction: column;
        padding-left: 15px;
        font-size: 12px;
        color: #999;
        line-height: 1;
        .title{
          margin-bottom: 10px;
          font-size: 14px;
          color: #333;
        }
      }
    }
    .comments-content{
      margin-top: 10px;
      font-size: 14px;
      color: #000;
      .comments-info{
        margin-top: 15px;
        display: flex;
        .comments-button{
          padding: 2px 10px;
          font-size: 12px;
          color: #999;
          border-radius: 4px;
          border: 1px solid #ccc;
        }
      }
      .comments-reply{
        display: flex;
        margin: 15px 0;
        padding: 0 10px;
        border: 1px solid #eee;
      }
    }
  }
</style>