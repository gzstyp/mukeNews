'use strict';
const db = uniCloud.database();
const dbCmd = db.command;
exports.main = async (event, context) => {
  const {user_id,article_id} = event;
  const userinfo = await db.collection('user').doc(user_id).get();
  const article_id_ids = userinfo.data[0].article_likes_ids;
  let cmdExe = dbCmd.addToSet(article_id);//dbCmd.addToSet是添加|追加;
  if(article_id_ids.includes(article_id)){
    cmdExe = dbCmd.pull(article_id);//dbCmd.pull是删除
  }
  await db.collection('user').doc(user_id).update({
    article_likes_ids : cmdExe
  })
  return {
    code : 200,
    msg : '操作成功',
    data : userinfo.data,
    total : userinfo.affectedDocs
  };
};