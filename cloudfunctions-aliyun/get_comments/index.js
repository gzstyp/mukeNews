'use strict';
//获取数据的引用,获取评论信息
const db = uniCloud.database();
const aggre = db.command.aggregate;
exports.main = async (event, context) => {
  const user_id = event.user_id;
  const article_id = event.article_id;
  const list = await db.collection('article')
  .aggregate()
  .match({
    _id:article_id
  })
  .unwind('$comments')//它需要和replaceRoot一起使用
  .project({
    _id : false,//0;不需要返回该字段
    comments : true//1;返回该字段
  })
  .replaceRoot({//它需要和unwind一起使用
    newRoot:'$comments'
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