<template>
  <!-- click.stop 防止点击本元素事件时影响到父元素事件 -->
	<view class="icons" @click.stop="likeTap">
	  <uni-icons size="20" color="#f07373" :type="like ? 'heart-filled' : 'heart'"></uni-icons>
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
        like : false
			};
		},
    watch:{
      item(value){
        this.like = this.item.is_like;
      }
    },
    created() {
      this.like = this.item.is_like;
    },
    methods:{
      likeTap(){
        const params = {
          //"user_id" : "5f939ce1f10d24000162d352",
          "article_id" : this.item._id
        }
        uni.showLoading({title:'正在操作……'});//显示正在操作动画
        this.$api.updateLike(params).then(data =>{
          uni.hideLoading();//功能时隐藏
          if(200 === data.code){
            this.like = !this.like;
            //提示操作结果
            uni.showToast({
              title : this.like ? '收藏成功' : '取消成功',
              icon : 'none'
            });
          }
        }).catch(err =>{
          uni.hideLoading();//失败时隐藏
          console.info(err);
        });
      }
    }
	}
</script>

<style lang="scss">
  .icons{
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
  }
</style>