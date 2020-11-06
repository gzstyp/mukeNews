'use strict';
//获取数据的引用
const db = uniCloud.database();
const aggre = db.command.aggregate;
exports.main = async (event, context) => {
  const user_id = event.user_id;
  const value = event.value;
  const userInfo = await db.collection('user').doc(user_id).get();
  const article_likes_ids = userInfo.data[0].article_likes_ids;
  //使用聚合函数处理,更精细化的处理数据,求和，分组，指定字段
  const list = await db.collection('article')
  .aggregate()
  //在返回的每条数据里追加字段
  .addFields({
    is_like : aggre.in(['$_id',article_likes_ids]) //表示当前的某个数组里包含了某个字段,其中的$_id表示的是表的,第二个参数是在要哪一个数组里
  })
  .match({
    title : new RegExp(value)
  })
  .project({
    content : 0
  })
  .end();
  const code = list.data.length > 0 ? 200 : 201;
	return {
    code : code,
    msg : '操作成功',
    data : list.data,
    total : list.affectedDocs
  };
};