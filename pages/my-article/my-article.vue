<template>
	<view>
    <titlebar backIcon title="我的文章"></titlebar>
    <list-card v-for="item in lists" :key="item._id" :item="item"></list-card>
    <uni-load-more v-if="lists.length === 0 || load" status="loading"></uni-load-more>
  </view>
</template>

<script>
	export default {
		data() {
			return {
        lists : [],
        pageSize : 5,
        page : 0,
        loadAll : false,//标识是否已全部加载完毕
        load : false//表示是否显示加载动画
			}
		},
    onLoad(){
      this.getMyArticle();
    },
    //下拉刷新,使用这个要开启 enablePullDownRefresh:true
    onPullDownRefresh: function(){
        this.page = 0;
        this.lists = [];
        this.loadAll = false;//注意顺序!!!
        this.getMyArticle();
    },
    // 加载更多
    onReachBottom:function(){
        this.getMyArticle();
    },
		methods: {
      getMyArticle(){
        if(this.loadAll)return;
        this.page++;
        this.load = true;
        this.$api.get_my_article({page:this.page,pageSize:this.pageSize}).then(result =>{
          this.stopPullDown();
          const {code,data} = result;
          if(200 === code){
            if(data.length < this.pageSize){
              this.loadAll = true;
            }
            const tempList = JSON.parse(JSON.stringify(this.lists));
            tempList.push(...data);
            this.lists = tempList;
          }else if(201 === code){
            this.loadAll = true;
            this.page--;
          }
        }).catch(err =>{
          console.info(err);
          this.stopPullDown();
          this.page--;
        });
      },
      stopPullDown(){
        uni.stopPullDownRefresh();
        this.load = false;
      }
		}
	}
</script>

<style lang="scss" scoped>
</style>