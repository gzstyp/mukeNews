<template>
	<view class="detail">
		<view class="detail-title">
      {{formData.title}}
		</view>
    <view class="detail-header">
      <!-- 左侧是作者头像 -->
      <view class="detail-header_logo">
        <image :src="formData.author.avatar" mode="aspectFill"></image>
      </view>
      <!-- 右侧是作者信息 -->
      <view class="detail-header_content">
        <!-- 作者名字 -->
        <view class="detail-header_author">
          {{formData.author.author_name}}
        </view>
        <!-- 发布日期、浏览量、点赞... -->
        <view class="detail-header_date_browse">
          <text>{{formData.create_time}}</text>
          <text>{{formData.browse_count || 1}}浏览</text>
          <text>{{formData.thumbs_up_count || 0}}点赞</text>
        </view>
      </view>
    </view>
    <!-- 内容 -->
    <view class="detail-content">
      <view class="detail-html">
        <!-- <html-parse :content="formData.content" :noData="noData"></html-parse> -->
        内容
      </view>
      <view class="detail-comment">
        <view class="comment-title">最新评论</view>
        <view class="comment-content" v-for="(item,index) in commentsList" :key="item.comment_id">
          <comments-box :comments="item" @reply="reply"></comments-box>
        </view>
      </view>
    </view>
    <!-- 底部工具栏 -->
    <view class="detail-bottom">
      <!-- 左侧最外层 -->
      <view class="detail-bottom_input" @click="openComponent">
        <text>谈谈你的看法</text>
        <uni-icons type="compose" size="16" color="#f07373"></uni-icons>
      </view>
      <!-- 右侧的3个图标 -->
      <view class="detail-bottom_icons">
        <view class="detail-bottom_icons_box">
          <uni-icons type="chat" size="22" color="#f07373"></uni-icons>
        </view>
        <!-- 关注 -->
        <view class="detail-bottom_icons_box">
          <uni-icons type="heart" size="22" color="#f07373"></uni-icons>
        </view>
        <!-- 点赞 -->
        <view class="detail-bottom_icons_box">
          <uni-icons type="hand-thumbsup" size="22" color="#f07373"></uni-icons>
        </view>
      </view>
    </view>
    <!-- 如何触发呢???先指定一个组件节点,即 ref="popup" ,通过 ref可以获取组件节点的信息,可以对它进行一些操作 -->
    <uni-popup ref="popup" type="bottom" :maskClick="false"><!-- maskClick是蒙版点击是否关闭弹窗 -->
      <view class="popup-wrap">
        <view class="popup-header">
          <text class="popup-header_item" @click="close">取消</text>
          <text class="popup-header_item" @click="submit">发布</text>
        </view>
        <view class="popup-content">
          <textarea class="popup-textarea" v-model="commentsValue" maxlength="200" fixed placeholder="请输入评论内容" />
          <view class="popup-count">{{commentsValue.length}}/200</view>
        </view>
      </view>
    </uni-popup>
	</view>
</template>

<script>
  import htmlParse from '@/components/gaoyia-parse/parse.vue'
	export default {
    components:{
      htmlParse
    },
		data() {
			return {
        formData : {},
        noData : '<p style="text-align: center;color: #666;">详情加载中……</p>',
        commentsValue : '',
        commentsList : [],
        replyFormData : {}//回复相关的数据
			}
		},
    onLoad(query) {
      this.formData = JSON.parse(query.params);
      this.getDetail();
      this.getComments();
    },
		methods: {
      //打开评论窗口
      openComponent(){
        //popup是名,即上面的 ref="popup"
        this.$refs.popup.open();
      },
      //关闭弹窗
      close(){
        //popup是名,即上面的 ref="popup"
        this.$refs.popup.close();
      },
      //发布
      submit(){
        if(!this.commentsValue){
          uni.showToast({
            title:'请输入评论内容',
            icon:'none'
          });
          return;
        }
        this.setUpdateComment({content:this.commentsValue,...this.replyFormData});
      },
      //回复,有子组件交给父组件处理事件,自定义事件来实现
      reply(comment){
        this.replyFormData = {
          "comment_id" : comment.comment_id
        };
        this.openComponent();
      },
      setUpdateComment(content){
        const formData = {
          article_id : this.formData._id,
          ...content
        };
        uni.showLoading({title:'正在操作……'});
        this.$api.update_comment(formData).then(data =>{
          uni.hideLoading();
          if(200 === data.code){
            this.close();
            uni.showToast({
              title : '评论成功',
              icon : 'none'
            });
            this.getComments();
          }
        }).catch(err =>{
          uni.hideLoading();
          console.log(err);
        });
      },
      //获取详细信息
      getDetail(){
        this.$api.get_detail({article_id:this.formData._id}).then(data =>{
          if(200 === data.code){
            this.formData = data.data;
          }
        }).catch(err =>{
          console.log(err);
        });
      },
      //请求评论数据
      getComments(){
        this.$api.get_comments({article_id:this.formData._id}).then(data =>{
          if(200 === data.code){
            this.commentsList = data.data;
          }else if(201 === data.code){
          }
        }).catch(err =>{
          console.log(err);
        });
      }
		}
	}
</script>

<style lang="scss" scoped>
  .detail{
    padding: 15px 0;
    padding-bottom: 54px;/* 预留底部工具栏高度 */
  }
  .detail-title{
    padding: 0 15px;
    font-size: 18px;
    font-weight: bold;
    color: #333;
  }
  .detail-header{
    display: flex;
    align-items: center;
    margin-top: 10px;
    padding: 0 15px;
    .detail-header_logo{
      flex-shrink: 0;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
      image{
        width: 100%;
        height: 100%;
      }
    }
    .detail-header_content{
      width: 100%;
      padding-left: 10px;
      display: flex;
      flex-direction: column;/* 垂直排列 */
      justify-content: space-between;
      font-size: 12px;
      .detail-header_author{
        font-size: 14px;
        color: #333;
      }
      .detail-header_date_browse{
        color: #999;
        text{
          margin-right: 10px;
        }
      }
    }
  }
  .detail-content{
    margin-top: 20px;
    min-height: 500px;
    .detail-html{
      padding: 0 15px;
    }
    .detail-comment{
      margin-top: 30px;
      .comment-title{
        padding: 10px 15px;
        font-size: 14px;
        color: #666;
        border-bottom: 1px solid #f5f5f5;
      }
      .comment-content{
        padding: 0 15px;
        border-top:  1px solid #eee;
      }
    }
  }
  //底部工具栏
  .detail-bottom{
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    width: 100%;
    height: 44px;
    border-top: 1px solid #f5f5f5;
    background-color: #fff;
    box-sizing: border-box;
    .detail-bottom_input{
      display: flex;
      justify-content: space-between;/* 左右对齐 */
      align-items: center;
      margin-left: 10px;
      padding: 0 10px;
      width: 100%;
      height: 30px;
      border: 1px solid #ddd;
      border-radius: 5px;
      /* 文字'谈谈你的看法'样式 */
      text{
        font-size: 14px;
        color: #999;
      }
    }
    .detail-bottom_icons{
      display: flex;
      flex-shrink: 0;/* 均匀评分排列 */
      padding: 0 10px;
      /* 各图标样式 */
      .detail-bottom_icons_box{
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 44px;
      }
    }
  }

  .popup-wrap {
  		background-color: #fff;
  		.popup-header {
  			display: flex;
  			justify-content: space-between;
  			font-size: 14px;
  			color: #666;
  			border-bottom: 1px #F5F5F5 solid;
  			.popup-header_item {
  				height: 50px;
  				line-height: 50px;
  				padding: 0 15px;
  			}
  		}
  		.popup-content {
  			width: 100%;
  			padding: 15px;
  			box-sizing: border-box;
  			.popup-textarea {
  				width: 100%;
  				height: 200px;
  			}
  			.popup-count {
  				display: flex;
  				justify-content: flex-end;
  				font-size: 12px;
  				color: #999;
  			}
  		}
  	}
</style>