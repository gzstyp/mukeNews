<template>
	<view class="scroll">
	  <scroll-view class="list-scroll" scroll-y>
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
		}
	}
</script>

<style lang="scss">
  .scroll{
    flex: 1;
    box-sizing: border-box;
    overflow: hidden;
    .list-scroll{
      height: 100%;
      display: flex;
      flex-direction:column;//垂直排列
    }
  }
</style>