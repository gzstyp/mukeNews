'use strict';
//获取数据的引用
const db = uniCloud.database();
//聚合操作符
const aggre = db.command.aggregate;
//数据库操作符
const dbCmd = db.command;
exports.main = async (event, context) => {
  const user_id = event.user_id;
  let userInfo = await db.collection('user').doc(user_id).get();
  userInfo = userInfo.data[0];//返回的是对象{}
  //使用聚合函数处理,更精细化的处理数据,求和，分组，指定字段
  const lists = await db.collection('article')
  .aggregate()
  //在返回的每条数据里追加字段
  .addFields({
    is_like : aggre.in(['$_id',userInfo.article_likes_ids]) //表示当前的某个数组里包含了某个字段,其中的$_id表示的是表的,第二个参数是在要哪一个数组里
  })
  .match(
    {
      id : dbCmd.in(userInfo.article_ids)//过滤,如果存在就返回,不存在就不返回
    }
  )
  .end();
  const total = lists.affectedDocs;
  const code = total > 0 ? 200 : 201;
  const msg = total > 0 ? '操作成功' : '暂无数据';
	return {
    code : code,
    msg : msg,
    data : lists.data,
    total : total
  };
};