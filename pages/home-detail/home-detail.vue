<template>
	<view class="detail">
		<view class="detail-title">
      {{formData.title || '标题'}}
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
      <button class="detail-header_button" type="default" @click="follow(formData.author.id)">{{formData.is_author_like ? '取消关注' : '关注'}}</button>
    </view>
    <!-- 内容 -->
    <view class="detail-content">
      <view class="detail-html">
        <html-parse :content="formData.content" :noData="noData"></html-parse>
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
        <!-- 评论 -->
        <view class="detail-bottom_icons_box" @click="openList">
          <uni-icons type="chat" size="22" color="#f07373"></uni-icons>
        </view>
        <!-- 收藏 -->
        <view class="detail-bottom_icons_box" @click="likeTap(formData._id)">
          <uni-icons :type="formData.is_like ? 'heart-filled' : 'heart'" size="22" color="#f07373"></uni-icons>
        </view>
        <!-- 点赞 -->
        <view class="detail-bottom_icons_box" @click="thumbsup(formData._id)">
          <uni-icons :type="formData.is_thumbs_up ? 'hand-thumbsup-filled' : 'hand-thumbsup'" size="22" color="#f07373"></uni-icons>
        </view>
      </view>
    </view>
    <!-- 如何触发呢???先指定一个组件节点,即 ref="popup" ,通过 ref可以获取组件节点的信息,可以对它进行一些操作 -->
    <uni-popup ref="popup" type="bottom" :maskClick="false"><!-- maskClick是蒙版点击是否关闭弹窗 -->
      <view class="popup-wrap">
        <view class="popup-header">
          <text class="popup-header_item" @click="close">取消</text>
          <text class="popup-header_item" @click="submit">提交</text>
        </view>
        <view class="popup-content">
          <textarea class="popup-textarea" v-model="commentsValue" maxlength="200" fixed placeholder="请输入内容" />
          <view class="popup-count">{{commentsValue.length}}/200</view>
        </view>
      </view>
    </uni-popup>
	</view>
</template>

<script>
  import htmlParse from '@/components/gaoyia-parse/parse.vue';
	export default {
    components:{
      htmlParse,
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
      //评论列表
      openList(){
        uni.navigateTo({
          url:'/pages/detail-comments/detail-comments?id='+this.formData._id
        })
      },
      //点赞
      thumbsup(article_id){
        this.setUpdateThumbs(article_id);
      },
      //收藏
      likeTap(article_id){
        this.setUpdateLike(article_id);
      },
      //关注作者
      follow(author_id){
        this.setUpdateAuthor(author_id);
      },
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
            title:'请输入内容',
            icon:'none'
          });
          return;
        }
        this.setUpdateComment({content:this.commentsValue,...this.replyFormData});
      },
      //回复,有子组件交给父组件处理事件,自定义事件来实现
      reply(params){
        this.replyFormData = {
          "comment_id" : params.comments.comment_id,
          "is_reply" : params.is_reply
        };
        if(params.comments.reply_id){
          this.replyFormData.reply_id = params.comments.reply_id;
        }
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
            this.commentsValue = '';//成功时输入框清空
            this.replyFormData = {};//成功时回复信息清空
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
      },
      //关注作者
      setUpdateAuthor : function(author_id){
        const params = {
          author_id : author_id
        };
        uni.showLoading({title:'正在操作……'});
        this.$api.update_author(params).then(data =>{
          uni.hideLoading();
          this.formData.is_author_like = !this.formData.is_author_like;
          if(200 === data.code){
            uni.showToast({
              title : data.msg,// this.formData.is_author_like ? '关注成功' : '取消成功'
              icon : 'none'
            });
            uni.$emit('update_author');//自定义全局事件名,用于刷新‘关注页面的作者tab’数据
          }
        }).catch(err =>{
          console.log(err);
          uni.hideLoading();
        });
      },
      //收藏文章
      setUpdateLike(article_id){
        const params = {
          "article_id" : article_id
        };
        uni.showLoading({title:'正在操作……'});//显示正在操作动画
        this.$api.updateLike(params).then(data =>{
          uni.hideLoading();
          if(200 === data.code){
            this.formData.is_like = !this.formData.is_like;
            //提示操作结果
            uni.showToast({
              title : this.formData.is_like ? '收藏成功' : '取消成功',
              icon : 'none'
            });
            //自定义全局事件,方便其他页面刷新数据[可以多个地方定义同一个事件名],还有一处 /components/likes/likes.vue
            uni.$emit('update_article','follow');//手动添加参数达到首页列表数据刷新效果
          }
        }).catch(err =>{
          console.info(err);
          uni.hideLoading();
        });
      },
      setUpdateThumbs(article_id){
        const params = {
          "article_id" : article_id
        };
        uni.showLoading({title:'正在操作……'});//显示正在操作动画
        this.$api.update_thumbs(params).then(data =>{
          uni.hideLoading();
          if(200 === data.code){
            if(!this.formData.is_thumbs_up){
              this.formData.thumbs_up_count++;
            }
            this.formData.is_thumbs_up = true;
            uni.showToast({
              title : data.msg,
              icon : 'none'
            });
          }
        }).catch(err =>{
          console.info(err);
          uni.hideLoading();
        });
      }
		}
	}
</script>

<style lang="scss">
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
      justify-content: space-between;/*子元素两端对齐，项目之间的间隔都相等*/
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
    .detail-header_button{
      flex-shrink: 0;
      height: 30px;
      font-size: 12px;
      background-color: $mk-base-color;
      color: #fff;
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
      justify-content: space-between;/* 左右对齐，子元素两端对齐，项目之间的间隔都相等*/
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
  			justify-content: space-between;/*子元素两端对齐，项目之间的间隔都相等*/
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