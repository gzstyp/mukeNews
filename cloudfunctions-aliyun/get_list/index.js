'use strict';
//获取数据的引用
const db = uniCloud.database();
exports.main = async (event, context) => {
  //获取名为 article 云数据库表名的数据,通过分类筛选数据
  const name = event.name;
  let matchObj = {};
  if(name !== '全部'){
    matchObj = {
      classify : name
    }
  }
  //使用聚合函数处理,更精细化的处理数据,求和，分组，指定字段
  const list = await db.collection('article')
  .aggregate()
  .match(matchObj)
  .project({
    content : 0
  })
  .end();

  /* let list = await db.collection('article')
  .field({content:false})//即过滤到content字段，false是不返回 content 字段的数据,如果是true的话,仅返回 content 的字段
  .get(); */

	return {
    code : 200,
    msg : '操作成功',
    data : list.data,
    total : list.affectedDocs
  };
};