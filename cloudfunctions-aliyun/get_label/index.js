'use strict';
//获取数据的引用
const db = uniCloud.database();
const aggre = db.command.aggregate;
exports.main = async (event, context) => {
  const user_id = event.user_id;
  const type = event.type;
  let matchObj = {}
  if(type !=='all'){
    matchObj = {
      current : true
    }
  }
  let userinfo = await db.collection('user').doc(user_id).get();
  userinfo = userinfo.data[0];
	//获取名为 label 云数据库表名的数据
	//let label = await db.collection('label').get();
	let label = await db.collection('label')
  .aggregate()
  .addFields({
    current:aggre.in(['$_id',aggre.ifNull([userinfo.label_ids,[]])])//$表示当前的记录,_id表示的是字段
  })
  .match(matchObj)
  .end();
	return {
		code : 200,
		msg : '操作成功',
		data : label.data,
		total : label.affectedDocs
	};
};