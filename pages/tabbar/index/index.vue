<template>
	<view class="content">
		<!-- 自定义导航栏 -->
		<navbar></navbar>
		<!-- 标签 -->
		<tab :list="tabList"></tab>
		<!-- <view v-for="item in 100">
			{{item}}内容
		</view> -->
	</view>
</template>

<script>
	import navbar from '@/components/navbar/navbar.vue'
	export default {
		components:{
			navbar
		},
		data() {
			return {
				title: 'Hello',
				tabList : []
			}
		},
		onLoad() {
			this.getLabel();
		},
		methods: {
			getLabel(){
				//调用云函数方法
				uniCloud.callFunction({
					name:'get_label'//这个值是在云函数的/cloudfunctions-aliyun/get_label/index.js里的get_label目录
				}).then(data =>{
					const {result} = data;
					this.tabList = result.data;
				}).catch(err =>{
					console.info(err);
				});
			}
		}
	}
</script>

<style lang="scss">
	
</style>