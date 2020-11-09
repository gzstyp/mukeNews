'use strict';
const db = uniCloud.database();
const aggr = db.command.aggregate;
const dbCmd = db.command;
exports.main = async (event, context) => {
  const {
    user_id,
    article_id,//文章id
    content,//评论或回复的内容
    comment_id = '', //评论id,此处给了默认值为'';它是从this.replyFormData = {"comment_id" : comment.comment_id};传递来的
    reply_id = '',//子回复的id
    is_reply = false //是否子回复
  } = event;
  let user = await db.collection('user').doc(user_id).get();
  user = user.data[0];//获取用户对象
  //获取当前的文章信息
  const article = await db.collection('article').doc(article_id).get();
  //获取文章下的所有评论
  const comments = article.data[0].comments;
  let commentObj = {
    comment_id : getId(5),
    comment_content : content,
    create_time : new Date().getTime(),
    is_reply : is_reply,//区分主回复还是子回复
    author : {
      author_id : user._id,
      author_name : user.author_name,
      avatar : user.avatar,
      professional : user.professional //专业
    },
    replys : []//回复字段
  }
  //表示是评论的内容,否则就是回复的内容
  if(comment_id === ''){
    commentObj.replys = [];
    commentObj = dbCmd.unshift(commentObj);
  }else{
    //获取所有评论的索引
    let commentIndex = comments.findIndex(item =>item.comment_id === comment_id);
    //获取回复的作者信息
    let commentAuthor = '';
    //子回复|主回复
    if(is_reply){
      commentAuthor = comments[commentIndex].replys.find(item =>item.comment_id === reply_id);
    }else{
      commentAuthor = comments.find(item =>item.comment_id === comment_id);
    }
    commentAuthor = commentAuthor.author.author_name;
    commentObj.to = commentAuthor;
    //更新回复信息
    commentObj = {
      [commentIndex] : {
        replys : dbCmd.unshift(commentObj)
      }
    };
  }
  //更新操作
  await db.collection('article').doc(article_id).update(
    {
      comments : commentObj
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