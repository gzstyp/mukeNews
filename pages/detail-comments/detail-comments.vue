<template>
	<view>
    <view class="comments-content" v-for="(item,index) in commentsList" :key="index">
      <comments-box :comments="item"></comments-box>
    </view>
    <uni-load-more v-if="commentsList.length === 0 || commentsList.length > pageSize" iconType="snow" :status="status"></uni-load-more>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        status : 'loading',
        article_id : '',
        commentsList : [],
        page : 0,//默认是0;然后是 ++
        pageSize : 10,
        enablePullRefresh : false //是否已启用下拉刷新
      }
		},
    onLoad : function(query) {
      this.article_id = query.id;
      this.getComments();
    },
    //页面上拉触底事件的处理函数
    onReachBottom() {
      this.enablePullRefresh = false;
      if(this.status === 'noMore')return;
      this.getComments();
    },
    //监听用户下拉动作,需要在 pages.json 里开启 enablePullDownRefresh:true
    onPullDownRefresh(){
      this.page = 0;
      this.enablePullRefresh = true;//注意顺序!!!
      this.getComments();
    },
		methods: {
      getComments(){
        this.page++;
        const params = {
          article_id : this.article_id,
          page : this.page,
          pageSize : this.pageSize
        };
        this.$api.get_comments(params).then(result =>{
          const {code,data} = result;
          uni.stopPullDownRefresh();
          if(200 === code){
            if(this.enablePullRefresh){
              this.commentsList = data;
              this.status = 'loading';
            }else{
              const listData = JSON.parse(JSON.stringify(this.commentsList));//注意这里,对象复制
              listData.push(...data);//解构,重新赋值进去
              this.commentsList = listData;
            }
          }else if(201 === code){
            this.page--;
            this.status = 'noMore';
          }
        }).catch(err =>{
          console.log(err);
          uni.stopPullDownRefresh();
        });
      }
		}
	}
</script>

<style lang="scss" scoped>
  .comments-content{
    padding: 0 14px;
  }
</style>