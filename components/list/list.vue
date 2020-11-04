<template>
	<swiper class="home-swiper" :current="activeIndex" @change="change">
	  <swiper-item v-for="(item,index) in tab" :key="index" class="swiper-item">
      <list-item :list="list"></list-item>
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
        list:[]
      };
    },
    //注意:onLoad 是在页面有效,created在组件里有效
    created() {
      this.getList();
    },
    methods:{
      change(e){
        const {current} = e.detail;
        this.$emit('change',current);//发送给调用页面
      },
      getList(){
        this.$api.get_list({}).then(data =>{
          if(200 === data.code){
            this.list = data.data;
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
