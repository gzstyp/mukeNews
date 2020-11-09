调用组件关系

父子关系：index.vue ->list.vue -> list-item.vue -> list-card.vue

父子关系：index.vue -> tab.vue

父子关系：index.vue -> navbar.vue

flex-direction: column;/* 垂直排列 */
box-sizing: border-box;/* 若高度是100%没有看到下边框的话,加上这个就可以 */

/pages/home-detail/home-detail.vue 页面详情
/pages/detail-comments/detail-comments.vue 文章评论列表
/pages/home-label/home-label.vue 标签管理页面
/pages/home-label/home-search.vue 搜索页面

//自定义全局事件,方便其他页面刷新数据[可以多个地方定义同一个事件名],还有一处 /pages/home-detail/home-detail.vue
//自定义全局事件,方便其他页面刷新数据[可以多个地方定义同一个事件名],还有一处 /components/likes/likes.vue
uni.$emit('update_article');
//全局的自定义事件,刷新页面数据,它只能在已打开的页面才触发!!!
uni.$on('update_article',()=>{
  this.refreshData();
});

此处的types若是变量才需要冒号:
<list-card v-for="item in list" :key="item._id" types="follow" :item="item"></list-card>