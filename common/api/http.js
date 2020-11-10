/* import store from '../../store/index.js'; */
import store from '@/store/index.js';
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