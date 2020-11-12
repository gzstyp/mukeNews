<template>
	<view>
    <titlebar backIcon title="意见反馈"></titlebar>
    <!-- 标题 -->
    <view class="feedback-title">意见</view>
    <!-- 输入框 -->
    <view class="feedback-content">
      <textarea class="feedback-textarea" v-model="context" placeholder="请输入你要反馈的问题" />
    </view>
    <view class="feedback-title">反馈图片</view>
    <!-- 图片,九宫格的图片展示 -->
    <view class="feedback-images-box">
      <view class="feedback-images-item" v-for="(item,index) in imagesLists" :key="index">
        <!-- 关闭图标;选中图片时可以删除[按钮] -->
        <view class="close-icon" @click="delImage(index)">
          <uni-icons type="closeempty" size="18" color="#fff"></uni-icons>
        </view>
        <view class="images-box">
          <image :src="item.url" mode="aspectFill"></image>
        </view>
      </view>
      <!-- 添加图片的 +号 -->
      <view v-if="imagesLists.length < limit" class="feedback-images-item" @click="addImage">
        <view class="images-box">
          <uni-icons type="plusempty" size="50" color="#eee"></uni-icons>
        </view>
      </view>
    </view>
    <button class="feedback-button" type="primary" @click="submitForm">提交反馈</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        imagesLists : [],
        limit : 5, /* 限制选择图片张数 */
        context : ''
			}
		},
		methods: {
      //添加图片
      addImage(){
        const count = this.limit - this.imagesLists.length;//总张数限制为5张
        uni.chooseImage({
          count : count,/* 限制张数 */
          success : (result) =>{ //或者使用 count _this = this;
            //const {errMsg,tempFilePaths,tempFiles} = result;//返回的参数
            const tempFilePaths = result.tempFilePaths;
            const tempFiles = result.tempFiles;
            tempFilePaths.forEach((item,index)=>{
              if(index < count){//由于个h5\app\小程序的平台不同,所以只能这样处理
                this.imagesLists.push({
                  url : item,
                  name : result.tempFiles[index].name || item
                });
              }
            });
          }
        })
      },
      //删除图片
      delImage : function(index){
        this.imagesLists.splice(index,1);
      },
      //提交表单，先上传图片完成回调得到返回的数据再提交表单保存
      submitForm : async function(){
        if(this.context.length === 0){
          this.dialog('请输入反馈内容');
          return;
        }
        const imagesPath = [];
        //因为云存储仅支持单张图片上传,所以要 for 循环
        const len = this.imagesLists.length;
        uni.showLoading({title:'正在提交……'});
        for (let i = 0; i < len; i++){
          const filePath = this.imagesLists[i].url;
          const fileName = this.imagesLists[i].name;
          const result = await this.uploadFile(filePath,fileName);
          //console.info(result.fileID);//文件唯一 ID，用来访问文件，建议存储起来;
          //console.info(result.filePath);//请求序列号，用于错误排查;
          //console.info(result.success);//true|false
          imagesPath.push(result.fileID);
        }
        const params = {
          feedbackImages : imagesPath,
          context : this.context
        };
        this.$api.update_feedback(params).then(res =>{
          uni.hideLoading();
          const {code,data} = res;
          if(200 === code){
            this.context = '';
            this.imagesLists = [];
            this.dialog('提交成功,感谢参与');
            setTimeout(()=>{
              uni.switchTab({
                url:'/pages/tabbar/my/my'
              })
            },1800);
          }
        }).catch(err =>{
          console.info(err);
          uni.hideLoading();
        });
      },
      dialog : function(msg){
        uni.showToast({
          title:msg,
          icon:'none'
        });
      },
      //同步的方法,因为云服务器仅支持单张图片上传,所以要同步的方法
      async uploadFile(filePath,fileName){
        return await uniCloud.uploadFile({
          filePath : filePath,//要上传的文件对象
          cloudPath : fileName,//文件的绝对路径?
          fileType : 'image',//包含文件名,文件类型，支付宝小程序、钉钉小程序必填，可选image、video、audio
          onUploadProgress : function(progressEvent){//上传进度
            //console.info(progressEvent);
            var percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            //console.info(percentCompleted);
          }
        });
      }
		}
	}
</script>
<style lang="scss" scoped>
  .feedback-title{
    margin: 14px;
    margin-bottom: 0;
    font-size: 14px;
    color: #666;
  }
  .feedback-content{
    margin: 14px;
    padding: 6px;
    box-sizing: border-box;
    border: 1px solid #eee;
    .feedback-textarea{
      font-size: 12px;
      width: 100%;
      height: 100px;
    }
  }
  .feedback-images-box{
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    /* 九宫格,3x3；33.33% */
    .feedback-images-item{
      position: relative;
      width: 33.33%;
      height: 0;
      padding-top:33.33%;/* 显示方形;当高度是0时，要想把高度撑开的话，需要给定 padding-top的值和 width的值一样即可 */
      box-sizing: border-box;
      /* 处理关闭图标 */
      .close-icon{
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        right: 0;
        top: 0;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background-color: #ff5a5f;
        z-index: 2;
      }
      .images-box{
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;/* 九宫格效果开始 */
        top: 5px;
        right: 5px;
        bottom: 5px;
        left: 5px;/* 九宫格效果结束 */
        border: 1px solid #eee;
        border-radius: 5px;/* 圆角,看起来不那么生硬 */
        overflow: hidden;
        image{
          height: 100%;
          width: 100%;
        }
      }
    }
  }
  .feedback-button{
    margin: 0 14px;
    background-color: $mk-base-color;
    height: 38px;
    line-height: 38px;
    font-size: 16px;
  }
</style>