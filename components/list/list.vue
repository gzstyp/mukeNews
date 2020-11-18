<template>
	<swiper class="home-swiper" :current="activeIndex" @change="change">
	  <swiper-item v-for="(item,index) in tab" :key="index" class="swiper-item">
      <list-item :list="listCatchData[index]" :load="load[index]" @loadmore="loadmore"></list-item>
    </swiper-item>
	</swiper>
</template>

<script>
  import listItem from './list-item.vue';
	export default {
    components:{
      listItem
    },
    props : {
      tab : {
        type : Array,
        default(){
          return []
        }
      },
      activeIndex : {
        type : Number,
        default : 0
      }
    },
    data() {
      return {
        list : [],
        listCatchData : {},//用于缓存,解决页面数据闪屏的问题
        load : {},
        pageSize : 10
      };
    },
    watch:{
      tab(value){
        if(value.length ===0) return;
        this.refreshData();
      }
    },
    //注意:onLoad 是在页面有效,created在组件里有效
    created() {
      //全局的自定义事件,刷新页面数据,它只能在已打开的页面才触发!!!
      uni.$on('update_article',(types)=>{
        if(types === 'follow'){
          this.refreshData();//是 ‘页面follow.vue’发送的自定义事件
        }
      });
    },
    methods : {
      //刷新数据,用于全局的自定义事件触发
      refreshData : function(){
        this.listCatchData = {};//解决key重复的问题
        this.load = {};//解决key重复的问题
        this.getList(this.activeIndex);//仅更新被点赞的那个item
      },
      // 此自定义事件是从 list-scroll.vue 到 list-item.vue 再到 list.vue 本页面
      loadmore(){
        if(this.load[this.activeIndex].loading === 'noMore') return;
        this.load[this.activeIndex].page++;
        this.getList(this.activeIndex);
      },
      change(e){
        const {current} = e.detail;
        this.$emit('change',current);//发送给调用页面
        const catch_data = this.listCatchData[current];
        //当没有数据时再去请求数据
        if(!catch_data || catch_data.length ===0){
          this.getList(current);
        }
      },
      getList(current){
        if(!this.load[current]){
          this.load[current] = {
            page : 1,
            loading : 'loading'
          }
        }
        this.$api.get_list(
          {
            name : this.tab[current].name,
            page : this.load[current].page,
            pageSize : this.pageSize
          }
        ).then(result =>{
          const {code,data} = result;
          //if(code === 201){
          if(data.length ===0){
            let oldLoad = {};
            oldLoad.loading = 'noMore';
            oldLoad.page = this.load[current].page;
            this.$set(this.load,current,oldLoad);//懒加载,通知页面的数组或对象已发生变化,进行刷新
            this.$forceUpdate();//强制刷新页面
            return;
          }
          if(200 === code){
            let oldList = this.listCatchData[current] || [];//没有时默认空数组
            oldList.push(...data);
            this.$set(this.listCatchData,current,oldList);//懒加载,通知页面的数组或对象已发生变化,进行刷新
            //console.log(this.listCatchData);
          }
        }).catch(err =>{
          console.info(err);
        });
      }
    }
	}
</script>

<style lang="scss">
  .home-swiper{
    height: 100%;
    .swiper-item{
      height: 100%;
      overflow: hidden;
      .list-scroll{
        height: 100%;
      }
    }
  }
</style>