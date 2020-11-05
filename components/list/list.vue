<template>
	<swiper class="home-swiper" :current="activeIndex" @change="change">
	  <swiper-item v-for="(item,index) in tab" :key="index" class="swiper-item">
      <list-item :list="listCatchData[index]"></list-item>
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
        list:[],
        listCatchData:{}//用于缓存,解决页面数据闪屏的问题
      };
    },
    watch:{
      tab(value){
        if(value.length ===0) return;
        this.getList(this.activeIndex);
      }
    },
    //注意:onLoad 是在页面有效,created在组件里有效
    created() {},
    methods:{
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
        this.$api.get_list({name:this.tab[current].name}).then(data =>{
          if(200 === data.code){
            this.$set(this.listCatchData,current,data.data);//懒加载,通知页面的数组或对象已发生变化,进行刷新
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
