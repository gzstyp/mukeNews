//负责维护url,其他尽管调用即可
import request from './request.js';
// 获取数据,其中 url 是接口,params是参数;method是请求方式,为空时是GET请求,若是GET请求则可以为空;
function ajaxReq(url,params,method){
	return request({url : url,params : params,method : method});// request 名要与import的request一致
}
//获取标签栏的数据,用法 this.$api.login('http://127.0.0.1:901/login',{username:'admin',password:'1'}).then(data =>{}).catch(err =>{});
export const login = (url,params) =>{
	return ajaxReq(url,params,"POST");
}