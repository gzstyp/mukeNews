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
//收藏或取消收藏,用法 this.$api.updateLike({}).then(data =>{}).catch(err =>{});
export const updateLike = (params) =>{
	return request('update_like',params);
}
//搜索列表,用法 this.$api.getSearch({}).then(data =>{}).catch(err =>{});
export const getSearch = (params) =>{
	return request('get_search',params);
}
//更新个人标签
export const updateLabel = (params) =>{
	return request('update_label',params);
}
/* 获取内容详细信息,使用富文本渲染 */
export const get_detail = (params) =>{
	return request('get_detail',params);
}
/* 评论的添加,用法 this.$api.update_comment({}).then(data =>{}).catch(err =>{}); */
export const update_comment = (params) =>{
	return request('update_comment',params);
}
/* 获取评论信息,用法 this.$api.get_comments({}).then(data =>{}).catch(err =>{}); */
export const get_comments = (params) =>{
	return request('get_comments',params);
}
/* 作者关注或取消关注,用法 this.$api.update_author({}).then(data =>{}).catch(err =>{}); */
export const update_author = (params) =>{
	return request('update_author',params);
}
/* 文章的点赞,用法 this.$api.update_thumbs({}).then(data =>{}).catch(err =>{}); */
export const update_thumbs = (params) =>{
	return request('update_thumbs',params);
}
/* 获取收藏的文章,用法 this.$api.get_follow({}).then(data =>{}).catch(err =>{}); */
export const get_follow = (params) =>{
	return request('get_follow',params);
}
/* 获取已关注的作者,用法 this.$api.get_author({}).then(data =>{}).catch(err =>{}); */
export const get_author = (params) =>{
	return request('get_author',params);
}
/* 获取个人信息,用法 this.$api.get_user({}).then(data =>{}).catch(err =>{}); */
export const get_user = (params) =>{
	return request('get_user',params);
}
/* 获取我的文章,用法 this.$api.get_my_article({}).then(data =>{}).catch(err =>{}); */
export const get_my_article = (params) =>{
	return request('get_my_article',params);
}
/* 意见反馈的提交,用法 this.$api.update_feedback({}).then(data =>{}).catch(err =>{}); */
export const update_feedback = (params) =>{
	return request('update_feedback',params);
}