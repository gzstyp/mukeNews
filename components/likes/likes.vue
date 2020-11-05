<template>
  <!-- click.stop 防止点击本元素事件时影响到父元素事件 -->
	<view class="icons" @click.stop="likeTap">
	  <uni-icons size="20" color="#f07373" type="heart" ></uni-icons>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
    methods:{
      likeTap(){
        console.info('收藏点击');
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