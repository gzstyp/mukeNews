调用组件关系

父子关系：index.vue ->list.vue -> list-item.vue -> list-card.vue

父子关系：index.vue -> tab.vue

父子关系：index.vue -> navbar.vue

样式的优先级，就是就近原装

生命周期是 onLoad()优先于created()优先于mounted()

ES6数组操作
this.labelList = data.data.filter(item => item.current);//过滤并返回
this.list = data.data.filter(item => !item.current);//过滤并返回
let commentIndex = comments.findIndex(item =>item.comment_id === comment_id);
const newArrIds = [];
lists.forEach(item =>{
  newArrIds.push(item._id);
});
console.info(newArrIds);

flex-direction: column;/* 垂直排列 */
box-sizing: border-box;/* 若高度是100%没有看到下边框的话,加上这个就可以 */

APP直接可以获取到 info.userInfo.unionId

思路有两种：

　　第一种：（ 前端判断是否有 unionid ）在向后端上传 code 并且后端返回数据以后，
前端判断返回值中是否有 unionid 或者 unionid 是否为 null，null 的情况下去调用带有用户登录态的wx.getUserInfo()，
然后再将微信返回的  encryptedData 和 iv 返回给后端，后端解密出相应的信息后再返回给前端；

　　第二种：（ 后端判断是否有 unionid ）前端在调用 wx.getUserInfo() 时候带着登录态，
然后不管后台能不能拿到 unionid，都把 encryptedData 和 iv 返回给后端，
后端在拿到前端 code 之后去请求微信的接口拿 unionid，如果返回的 unionid 为空，
再拿前端传的 encryptedData、iv以及之前的 session_key 解密出 unionid。

小程序和微信公众平台需要绑定同一个微信开放平台，即通过登录公众号，‘小程序管理’关联小程序???

/pages/home-detail/home-detail.vue 页面详情
/pages/detail-comments/detail-comments.vue 文章评论列表
/pages/home-label/home-label.vue 标签管理页面
/pages/home-label/home-search.vue 搜索页面

//自定义全局事件,方便其他页面刷新数据[可以多个地方定义同一个事件名],还有一处 /pages/home-detail/home-detail.vue
//自定义全局事件,方便其他页面刷新数据[可以多个地方定义同一个事件名],还有一处 /components/likes/likes.vue
uni.$emit('update_article');
//全局的自定义事件,刷新页面数据,它只能在已打开的页面才触发!!!
uni.$on('update_article',()=>{
  this.refreshData();
});

此处的types若是变量才需要冒号:
<list-card v-for="item in list" :key="item._id" types="follow" :item="item"></list-card>

让头像图片不被挤压
.listauthor-image{
    flex-shrink: 0;/* 让头像图片不被挤压,为什么要这个属性??? */
    width: 40px;
    height: 40px;
    overflow: hidden;
    image{
      height: 100%;
      width: 100%;
    }
}

//头像,图片一般要给一个容器包裹,给定宽高度，防止被挤压然后image宽高度100%,这里为什么没有 flex-shrink: 0 属性???,因为不需要也不会被挤压!!!
.my-header_logo_box{
  height: 60px;
  width: 60px;
  border-radius: 50%;
  overflow: hidden;
  image{
    height: 100%;
    width: 100%;
  }
}

--------------------------------------------换行--------------------------------------------
.feedback-images-box{
  display: flex;
  flex-wrap: wrap;//换行
  padding: 10px;
}
--------------------------------------------换行--------------------------------------------

--------------------------------------------九宫格效果--------------------------------------------
<!-- 图片,九宫格的图片展示 -->
<view class="feedback-images-box">
  <view class="feedback-images-item">
    <view class="images-box">
      <image src="/static/logo.png" mode="aspectFill"></image>
    </view>
  </view>
  <view class="feedback-images-item">
    <view class="images-box">
      <image src="/static/logo.png" mode="aspectFill"></image>
    </view>
  </view>
  <view class="feedback-images-item">
    <view class="images-box">
      <image src="/static/logo.png" mode="aspectFill"></image>
    </view>
  </view>
  <view class="feedback-images-item">
    <view class="images-box">
      <image src="/static/logo.png" mode="aspectFill"></image>
    </view>
  </view>
</view>

.images-box{
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;/* 九宫格效果开始 */
  top: 5px;
  right: 5px;
  bottom: 5px;
  left: 5px;/* 九宫格效果结束 */
  border: 1px solid #eee;
  border-radius: 5px;/* 圆角,看起来不那么生硬 */
  overflow: hidden;
  image{
    height: 100%;
    width: 100%;
  }
}
--------------------------------------------九宫格效果--------------------------------------------

经典的布局样式1-开始
<template>
	<view class="listauthor">
    <view class="listauthor-image">
      <image src="/static/logo.png" mode="aspectFill"></image>
    </view>
    <view class="listauthor-content">
      <view class="listauthor-content_title">引路者</view>
      <view class="listauthor-content_des">
        <view class="listauthor-content_des_label">前端工程师</view>
        <view class="listauthor-content_des_info">
          <text>发帖1024</text>
          <text>粉丝512</text>
        </view>
      </view>
    </view>
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

<style lang="scss" scoped>
  .listauthor{
    display: flex;
    padding: 10px 0;
    margin: 0 10px;
    border-radius: 5px;
    box-sizing: border-box;/* 让元素在本容器内显示 */
    border-bottom: 1px solid #f5f5f5;
    .listauthor-image{
      flex-shrink: 0;/* 让头像图片不被挤压 */
      width: 40px;
      height: 40px;
      overflow: hidden;
      image {
        height: 100%;
        width: 100%;
      }
    }
    .listauthor-content{
      display: flex;
      flex-direction: column;/* 让子元素垂直排列对齐;column行[此处是垂直方向的左右对齐] */
      justify-content: space-between;/* 使子元素左右对齐 */
      padding-left: 10px;/* 让左右两边的左边的子元素离左边有点距离 */
      width: 100%;/* 本容器宽度100% */
      .listauthor-content_title{
        background-color: #555555;
        position: relative;
        padding-right: 30px;
        font-size: 14px;
        color: #333;
        font-weight: bold;
        line-height: 1.2;/* 1.2倍的行间距 */
      }
      .listauthor-content_des{
        background-color: #375539;
        display: flex;
        justify-content: space-between;/* 让子元素水平排列对齐[此处是水平方向的左右对齐]; */
        font-size: 12px;
        .listauthor-content_des_label{
          color: #666;
        }
        .listauthor-content_des_info{
          color: #999;
          line-height: 1.5;/* 1.5倍的行间距 */
          text:first-child{//第1个元素,找到第1个text标签
            margin-right: 10px;
          }
        }
      }
    }
  }
</style>
经典的布局样式1-结束

经典的布局样式2-开始------------------------------------
<template>
	<view>
    <view class="my-header">
      <view class="my-header-logo">
        <view class="my-header_logo_box">
          <image src="/static/logo.png" mode="aspectFill"></image>
        </view>
        <text class="my-header_name">引路者</text>
      </view>
      <!-- 关注-->
      <view class="my-header-info">
        <view class="my-header-info_box">
          <text class="my-header-info-title">被关注</text>
          <text>0</text>
        </view>
        <view class="my-header-info_box">
          <text class="my-header-info-title">粉丝</text>
          <text>0</text>
        </view>
        <view class="my-header-info_box">
          <text class="my-header-info-title">积分</text>
          <text>0</text>
        </view>
      </view>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
  page{
    background-color: #f5f5f5;
  }
  .my-header{
    padding-bottom: 15px;
    //头像+作者名字的样式
    .my-header-logo{
      display: flex;
      flex-direction: column;/* 垂直排列 */
      align-items: center;
      padding-top: 30px;
      //头像,图片一般要给一个容器包裹,给定宽高度，防止被挤压然后image宽高度100%
      .my-header_logo_box{
        height: 60px;
        width: 60px;
        border-radius: 50%;
        overflow: hidden;
        image{
          height: 100%;
          width: 100%;
        }
      }
      .my-header_name{
        margin-top: 12px;
        font-size: 16px;
        font-weight: bold;
      }
    }
    .my-header-info{
      margin-top: 14px;
      //让3个文字和数字水平排列
      display: flex;
      //让文字和数字上下垂直排列
      .my-header-info_box{
        display: flex;
        flex-direction: column;/* 上下垂直排列 */
        justify-content: center;/* 左右居中 */
        align-items: center;/* 上下居中 */
        width: 100%;
        font-size: 12px;
        color: #999;
        //让文字变粗且换个颜色
        .my-header-info-title{
          font-size: 14px;
          color: #333;
        }
      }
    }
  }
</style>
经典的布局样式2-结束------------------------------------

♥♥♥♥♥♥♥♥♥♥♥♥-----------------------------------------js引用_调用vuex的index.js示例
js引用_调用vuex的index.js示例
import store from '../../store/index.js';
export default function callPromise(options){
	const {url,params} = options;
  //js获取vuex状态管理
	const dataObj = {
		user_id : store.state.userinfo._id,//每次请求默认都会添加这个user_id,仅适用于ES6???
		...params //解构合并一下,你需要在每个请求的参数里重复添加上面的user_id，即在原来的数据基础上添加新的数据
	}
  //reslove是成功的回调;reject失败的回调
  //uni.showLoading({title:'正在操作……'});
	return new Promise((reslove,reject) =>{
		uniCloud.callFunction({
			name : url,
			data : dataObj
		}).then(res =>{
      //uni.hideLoading();//隐藏
			//成功的是 .then(data);
			reslove(res.result);//主要是正常返回的都走reslove();此处处理登录超时或token无效，code为401;204之类的处理
		}).catch((err) =>{
      //uni.hideLoading();//隐藏
			//失败的是.catch(err);
			reject(err);
		});
	});
}
♥♥♥♥♥♥♥♥♥♥♥♥