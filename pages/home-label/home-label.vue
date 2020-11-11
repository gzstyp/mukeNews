<template>
	<view class="label">
    <view class="label-box">
      <view class="label-header">
        <view class="label-title">我的标签</view>
        <view class="label-edit" @click="editLabel">{{is_edit ? '完成' : '编辑'}}</view>
      </view>
      <uni-load-more v-if="show" status="loading" iconType="snow"></uni-load-more>
      <view v-if="!show" class="label-content">
        <view class="label-content_item" v-for="(item,index) in labelList" :key="item._id">
          {{item.name}}
          <uni-icons v-if="is_edit" class="icons-close" type="clear" size="20" color="#f00" @click="del(index)"/>
        </view>
        <!-- 且不是正在加载的状态时显示 -->
        <view v-if="labelList.length === 0 && !show" class="no-data">
          当前没有数据
        </view>
      </view>
    </view>
    <view class="label-box">
      <view class="label-header">
        <view class="label-title">标签推荐</view>
      </view>
      <uni-load-more v-if="show" status="loading" iconType="snow"></uni-load-more>
      <view v-if="!show" class="label-content">
        <view class="label-content_item" v-for="(item,index) in list" :key="item._id" @click="add(index)">{{item.name}}</view>
      </view>
      <!-- 且不是正在加载的状态时显示 -->
      <view v-if="list.length === 0 && !show" class="no-data">
        当前没有数据
      </view>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        is_edit : false,
        labelList : [],
        list : [],
        show : true
			}
		},
    onLoad() {
    	this.getLabel();
    },
		methods: {
      editLabel(){
        //true时正在编辑状态,false已完成的操作
        if(this.is_edit){
          this.is_edit = false;
          this.setUpdateLabel(this.labelList);
        }else{
          this.is_edit = true;
        }
      },
      add(index){
        if(!this.is_edit) return;
        this.labelList.push(this.list[index]);
        this.list.splice(index,1);//移除|删除
      },
      del(index){
        this.list.push(this.labelList[index]);
        this.labelList.splice(index,1);//移除|删除
      },
      setUpdateLabel(label){
        const newArrIds = [];
        label.forEach(item =>{
          newArrIds.push(item._id);
        });
        uni.showLoading({title:'正在操作……'});
        this.$api.updateLabel({label:newArrIds}).then(data =>{
          uni.hideLoading();
          uni.showToast({
            title:data.msg
          });
          // 自定义全局事件:类似于 this.$emit();事件 uni.$emit()是全局的事件,即某个数据变化了需要更新页面或刷新获取数据,它只能在已打开的页面触发,即上一页页面
          uni.$emit('labelChange','512');//其中参数1的 labelChange 是全局的事件名,参数2是否需要传递参数,此时已触发事件了，那怎么接收事件呢?
        }).catch(err =>{
          uni.hideLoading();
        	console.info(err);
        });
      },
      getLabel(){
        this.show = true;
        this.$api.getLabel({type : 'all'}).then(data =>{
          this.show = false;
          this.labelList = data.data.filter(item => item.current);
          this.list = data.data.filter(item => !item.current);
        }).catch(err =>{
          this.show = false;
        	console.info(err);
        });
      }
		}
	}
</script>

<style lang="scss">
  page{
    background-color: #f5f5f5;
  }
  .label{
    .label-box{
      background-color: #fff;
      margin-bottom: 10px;
      .label-header{
        display: flex;
        justify-content: space-between;/*子元素两端对齐，项目之间的间隔都相等*/
        padding: 10px 15px;
        font-size: 14px;
        color: #666;
        border-bottom: 1px solid #f5f5f5;
        .label-edit{
          color: #30b33a;
        }
      }
      .label-content{
        display: flex;
        flex-wrap: wrap;
        padding: 15px;
        padding-top: 0;
        .label-content_item{
          position: relative;
          padding: 2px 5px;
          margin-top: 12px;
          margin-right: 10px;
          border-radius: 5px;
          border: 1px solid #666;
          font-size: 14px;
          color: #666;
          .icons-close{
            position: absolute;
            right: -8px;
            top: -8px;
            background-color: #fff;
            border-radius: 50%;
          }
        }
      }
    }
  }
  .no-data{
    width: 100%;
    text-align: center;
    padding: 40px 0;
    color: #999;
    font-size: 14px;
  }
</style>