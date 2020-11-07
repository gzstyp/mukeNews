'use strict';
//获取数据的引用
const db = uniCloud.database();
const aggre = db.command.aggregate;//聚合操作符
exports.main = async (event, context) => {
  const user_id = event.user_id;
  const article_id = event.article_id;
  let user = await db.collection('user').doc(user_id).get();
  user = user.data[0];
  let list = await db.collection('article')
  .aggregate()
  .addFields({
    //是否关注作者
    is_author_like : aggre.in(['$author.id',user.author_likes_ids]),//$表示当前的记录,author.id表示的是字段
    //是否收藏文章
    is_like : aggre.in(['$_id',user.article_likes_ids]),
    //是否点赞
    is_thumbs_up : aggre.in(['$_id',user.thumbs_up_article_ids])
  })
  .match({_id:article_id})
  .project({coments : 0})
  .end();
	return {
	  code : 200,
	  msg : '操作成功',
	  data : list.data[0]
	};
};