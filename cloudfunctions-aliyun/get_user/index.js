'use strict';
//获取数据的引用
const db = uniCloud.database();
exports.main = async (event, context) => {
  const user_id = event.user_id;
  if(!user_id){
    return {
      code : 201,
      msg : "用户不存在",
    };
  }
  let userinfo = await db.collection('user').doc(user_id).get();
  const total = userinfo.affectedDocs;
  const code = total > 0 ? 200 : 201;
  const msg = total  > 0 ? '操作成功' : '暂无数据';
	return {
		code : code,
		msg : msg,
		data : userinfo.data[0],//得到的是对象{}
		total : total
	};
};