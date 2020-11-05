<template>
  <list-scroll class="list-scroll" @loadmore="loadmore">
    <list-card mode="base" :item="item" v-for="item in list" :key="item._id"></list-card>
    <!-- 此处的 list.length 必须大于(每页大小-1)的数据量 -->
    <uni-load-more v-if="list.length === 0 || list.length > 9" iconType="snow" :status="load.loading"></uni-load-more>
  </list-scroll>
</template>

<script>
  export default {
    props : {
      list : {
        type : Array,
        default(){
          return []
        }
      },
      load : {
        type : Object,
        default(){
          return {
            loading : 'loading'
          }
        }
      }
    },
    methods:{
      loadmore(){
        this.$emit('loadmore');//发送给 list.vue,路线：list-scroll.vue 到 list-item.vue 再到 list.vue
      }
    }
  }
</script>

<style lang="scss">
  .list-scroll{
    height: 100%;
  }
</style>
