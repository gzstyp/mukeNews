<template>
	<view>
    <uni-load-more v-if="lists.length ===0" status="loading" ></uni-load-more>
    <list-card v-for="item in lists" :key="item._id" :item="item"></list-card>
  </view>
</template>

<script>
	export default {
		data() {
			return {
        lists : []
			}
		},
    onLoad() {
      this.getMyArticle();
    },
		methods: {
      getMyArticle(){
        this.$api.get_my_article({}).then(result =>{
          const {code,data} = result;
          if(200 === code){
            this.lists = data;
          }else if(201 === code){

          }
        }).catch(err =>{
          console.info(err);
        });
      }
		}
	}
</script>

<style lang="scss" scoped>
</style>