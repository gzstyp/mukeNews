<template>
	<view class="scroll">
	  <scroll-view class="list-scroll" scroll-y @scrolltolower="loadmore">
	    <view>
	      <slot></slot>
	    </view>
	  </scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
    methods:{
      loadmore(event){
        this.$emit('loadmore');//发送给 list-item.vue,路线：list-scroll.vue 到 list-item.vue 再到 list.vue
      }
    }
	}
</script>

<style lang="scss">
  .scroll{
    height: 100%;//父容器的高度应该小于子容器的高度才出现滚动条
    flex: 1;
    box-sizing: border-box;/* 若高度是100%没有看到下边框的话,加上这个就可以 */
    overflow: hidden;
    .list-scroll{
      height: 100%;
      display: flex;
      flex-direction:column;//垂直排列
    }
  }
</style>