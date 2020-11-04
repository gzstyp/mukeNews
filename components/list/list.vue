<template>
	<swiper class="home-swiper" :current="activeIndex" @change="change">
	  <swiper-item v-for="(item,index) in tab" :key="index" class="swiper-item">
      <list-item></list-item>
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

			};
		},
    methods:{
      change(e){
        const {current} = e.detail;
        this.$emit('change',current);//发送给调用页面
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
