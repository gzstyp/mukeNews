'use strict';
//获取数据的引用
const db = uniCloud.database();
exports.main = async (event, context) => {
	//获取名为 label 云数据库表名的数据
	let label = await db.collection('label').get();
	return {
		code : 200,
		msg : '操作成功',
		data : label.data,
		total : label.affectedDocs
	};
};