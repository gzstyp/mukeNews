<template>
	<transition name="zj-dialog__anim">
		<view class="zj-dialog" v-show="show">
			<view class="zj-dialog__container">
				<view class="zj-dialog__wrap">
					<block v-if="title != null && title != ''">
						<view class="zj-dialog__title">
							{{title}}
						</view>
					</block>
					<block v-else>
						<view class="zj-dialog__header">
							<view class="zj-dialog-iconfont zj-dialog-warn" v-show="type == 'warn'"></view>
							<view class="zj-dialog-iconfont zj-dialog-success" v-show="type == 'success'"></view>
						</view>
					</block>
					<view class="zj-dialog__content">
						{{text}}<text v-if="type == 'copy'" @tap.stop="_copy" class="zj_dialog_copy">复制</text>
					</view>
					<view class="zj-dialog__btn">
						<button type="default" @tap.stop="_confirm">{{confirmText}}</button>
					</view>
				</view>
			</view>
		</view>
	</transition>
</template>

<script>
	export default {
		props: {
			/**
			 * 是否显示当前组件
			 */
			show: {
				type: Boolean,
				default: false
			},

			/**
			 * 弹框类型
			 * 值：warn, success, copy
			 */
			type: {
				type: String,
				default: 'warn'
			},

			/**
			 * 标题
			 */
			title: {
				type: String,
				default: ''
			},

			/**
			 * 内容
			 */
			text: {
				type: String,
				default: ''
			},

			/**
			 * 确定按钮文字
			 */
			confirmText: {
				type: String,
				default: '确定'
			},

			/**
			 * 复制回调
			 */
			copyCallBack: {
				type: Function,
				default () {
					return function() {};
				}
			},

			/**
			 * 确定回调
			 */
			callback: {
				type: Function,
				default () {
					return function() {};
				}
			}
		},
		methods: {
			_confirm() {
				this.callback();
				this.hide();
			},

			_copy() {
				this.copyCallBack();
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
@import "./style/alert.scss";
</style>