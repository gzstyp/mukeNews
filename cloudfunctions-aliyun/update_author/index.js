'use strict';
//获取数据的引用
const db = uniCloud.database();
//数据库操作符
const dbCmd = db.command;
exports.main = async (event, context) => {
  const {
    user_id,//登录者的id
    author_id//作者的id
  } = event;
  const user = await db.collection('user').doc(user_id).get();
  const author_likes_ids = user.data[0].author_likes_ids;
  let cmdExe = dbCmd.addToSet(author_id)//addToSet(Xxx)是添加到数据,若数组里不存在该值则添加,否则不操作;pull(Xxx)是从数组里删除
  let msg = "关注成功";
  if(author_likes_ids.includes(author_id)){
    cmdExe = dbCmd.pull(author_id);
    msg = "取消成功";
  }
  //更新|添加,云数据库里的字段author_likes_ids是个数组,怎么更新呢?
  await db.collection('user').doc(user_id).update(
    {
      author_likes_ids : cmdExe
    }
  );
	return {
	  code : 200,
	  msg : msg
	};
};