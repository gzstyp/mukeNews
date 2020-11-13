<template>
	<transition name="zj-dialog__anim">
		<view class="zj-dialog" v-show="show">
			<view class="zj-dialog__container">
				<view class="zj-dialog__wrap">
					<view v-if="title != null && title != ''" class="zj-dialog__title">
						{{title}}
					</view>
					<view class="zj-dialog__content">
						{{text}}
					</view>
					<view class="zj-dialog__btn">
						<button class="zj-dialog__cancel" type="default" @tap.stop="_cancel">取消</button>
						<button class="zj-dialog__confirm" type="default" @tap.stop="_confirm">{{confirmText}}</button>
					</view>
				</view>
			</view>
		</view>
	</transition>
</template>

<script>
	export default {
		props: {
			show: {
				type: Boolean,
				default: false
			},
			title: {
				type: String,
				default: ''
			},
			text: {
				type: String,
				default: ''
			},
			confirmText: {
				type: String,
				default: '确定'
			},
			callback: {
				type: Function,
				default () {
					return function() {};
				}
			}
		},
		methods: {
			_cancel() {
				this.hide();
			},
			_confirm() {
				this.callback();
				this.hide();
			},
			hide() {
				this.show = false;
				//清除值
				setTimeout(() => {
					this.$el.remove();
				}, 500);
			},
		}
	}
</script>

<style lang="scss" scoped>
@import "./style/confirm.scss";
</style>