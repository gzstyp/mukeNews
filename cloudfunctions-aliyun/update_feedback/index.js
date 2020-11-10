'use strict';
const db = uniCloud.database();
//数据操作符,更新|添加
const dbCmd = db.command;
exports.main = async (event,e) => {
  const {
    user_id,
    feedbackImages = [],
    context = ''
  } = event;
  const data = await db.collection('feedback').add({
    user_id : user_id,
    feedbackImages : feedbackImages,
    context : context
  });
  return {
    code : 200,
    msg : '操作成功',
    data : data
  };
};