'use strict';
//获取数据的引用
const db = uniCloud.database();
//聚合操作符
const aggre = db.command.aggregate;
exports.main = async (event, context) => {
  const user_id = event.user_id;
  let userinfo = await db.collection('user').doc(user_id).get();
  userinfo = userinfo.data[0];
  const lists = await db.collection('user')
  .aggregate()
  .addFields({
    is_like : aggre.in(['$id',userinfo.author_likes_ids])//$表示当前的记录,id表示的是字段
  })
  //只返回为true的数据
  .match({
    is_like : true
  })
  .end();
  const code = lists.affectedDocs > 0 ? 200 : 201;
  const msg = lists.affectedDocs  > 0 ? '操作成功' : '暂无数据';
	return {
		code : code,
		msg : msg,
		data : lists.data,
		total : lists.affectedDocs
	};
};