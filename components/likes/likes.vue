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
    methods:{
      likeTap(){
        const params = {
          //"user_id" : "5f939ce1f10d24000162d352",
          "article_id" : this.item._id
        }
        this.$api.updateLike(params).then(data =>{
          if(200 === data.code){
            this.like = !this.like;
            const obj = data.data[0];
            const len = obj.article_likes_ids.length;
            if(len ===1){
              console.info('收藏成功');
            }else{
              console.info('取消成功');
            }
          }
        }).catch(err =>{
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