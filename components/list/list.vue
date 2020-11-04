<template>
	<swiper class="home-swiper">
	  <swiper-item class="swiper-item">
      <list-item></list-item>
    </swiper-item>
    <swiper-item class="swiper-item">
      <list-item></list-item>
    </swiper-item>
    <swiper-item class="swiper-item">
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
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
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
