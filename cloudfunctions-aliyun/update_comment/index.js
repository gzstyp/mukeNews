'use strict';
const db = uniCloud.database();
const aggr = db.command.aggregate;
const dbCmd = db.command;
exports.main = async (event, context) => {
  const {user_id,article_id,content} = event;
  let user = await db.collection('user').doc(user_id).get();
  user = user.data[0];//获取用户对象
  let commentObj = {
    comment_id : getId(5),
    comment_content : content,
    create_time : new Date().getTime(),
    author : {
      author_id : user._id,
      author_name : user.author_name,
      avator : user.avator,
      professional : user.professional //专业
    },
    replys : []//回复字段
  }
  //更新操作
  await db.collection('article').doc(article_id).update(
    {
      comments : dbCmd.unshift(commentObj)
    }
  );
	return {
	  code : 200,
	  msg : '操作成功'
	};
};
function getId(langth){
  return Number(Math.random().toString().substr(3,langth) + Date.now()).toString(36);
}