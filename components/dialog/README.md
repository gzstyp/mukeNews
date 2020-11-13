# zj-dialog
alert, confirm

## 适用范围
移动端H5

## 引入插件
`xx.vue`
```javascript
import zj from '../../components/dialog/index.js'
```

## 使用
### 自定义样式
```
// @/components/zj-dialog/_style.scss
$zj-dialog-primary-color: #FF7B07;
```

### alert
```javascript
zj.alert({
	title: '标题',
	text: '我是内容'
}, function() {
	console.log('click')
})

zj.alert({
	type: 'warn',
	text: '操作失败'
}, function() {
	console.log('click')
})

zj.alert({
	type: 'success',
	text: '操作成功'
}, function() {
	console.log('click')
})

zj.alert({
	type: 'copy',
	title: '关注微信公众号',
	text: 'XX公众号',
	copy: function() {
		console.log('已复制')
	}
})

zj.alert({
	title: '标题',
	text: '我是内容',
	confirmText: '关闭',
}, function() {
	console.log('click')
})
```

### confirm
```javascript
zj.confirm('确定要删除吗？', function() {
	console.log('click')
});

zj.confirm({
	title: '标题',
	text: '确定要删除吗？',
	confirmText: '删除'
}, function() {
	console.log('click')
})
```

## 我的封装
### common/common.js
```javascript
import zjDialog from '../components/zj-dialog/index.js'
const dialog = {

	warn(text, callback) {
		zjDialog.alert(text, callback);
	},

	success(text, callback) {
		zjDialog.alert({type: 'success', text: text}, callback);
	},

	copy(title, text, callback) {
		zjDialog.alert({
			type: 'copy',
			title: title,
			text: text,
			confirmText: '关闭',
			copy: callback
		})
	},

	confirm(options, callback) {
		zjDialog.confirm(options, callback);
	}

}

export default {
	dialog
}
```