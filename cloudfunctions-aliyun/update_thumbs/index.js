'use strict';
const db = uniCloud.database();
//数据操作符,更新|添加
const dbCmd = db.command;
exports.main = async (event, context) => {
  const {user_id,article_id} = event;
  const user = await db.collection('user').doc(user_id).get();
  const thumbs_up_article_ids = user.data[0].thumbs_up_article_ids;
  if(thumbs_up_article_ids.includes(article_id)){
    return {
      code : 200,
      msg : '你已点过赞了'
    };
  }else{
    const cmdExe = dbCmd.addToSet(article_id);
    //处理点赞
    await db.collection('user').doc(user_id).update(
      {
        thumbs_up_article_ids : cmdExe
      }
    );
    //处理点赞数量+1,放在这里可以减少一次网络请求
    await db.collection('article').doc(article_id).update({
      thumbs_up_count : dbCmd.inc(1)//原子操作
    });
    return {
      code : 200,
      msg : '操作成功'
    };
  }
};