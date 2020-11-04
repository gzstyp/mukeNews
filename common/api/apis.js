//负责维护url,其他尽管调用即可
import callReq from './http.js';
// 获取数据,其中 name_url 是云函数名,params是参数
function request(name_url,params){
	return callReq({url : name_url,params : params});// callReq 名要与import的callReq一致
}
//获取标签栏的数据,用法 this.$api.getLabel({}).then(data =>{}).catch(err =>{});
export const getLabel = (params) =>{
	return request('get_label',params);
}
//获取数据列表,用法 this.$api.get_list({}).then(data =>{}).catch(err =>{});
export const get_list = (params) =>{
	return request('get_list',params);
}
//收藏或取消收藏,用法 this.$api.updateLikes({}).then(data =>{}).catch(err =>{});
export const updateLikes = (params) =>{
	return request('update_like',params);
}
//搜索列表,用法 this.$api.getSearch({}).then(data =>{}).catch(err =>{});
export const getSearch = (params) =>{
	return request('get_search',params);
}