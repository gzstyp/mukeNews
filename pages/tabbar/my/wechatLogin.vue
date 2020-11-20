<template>
	<view>
    <titlebar backIcon title="微信登录"></titlebar>

    <!-- #ifdef MP-WEIXIN -->
    <button type="primary" open-type='getUserInfo' @getuserinfo="mpWeChat">微信登录</button>
    <!-- #endif -->

    <!-- #ifdef APP-PLUS -->
    <button type="primary" open-type='getUserInfo' withCredentials="true" @tap="mpApp">微信登录</button>
    <!-- #endif -->

    <!-- #ifdef H5 -->
    <button type="primary" open-type='getUserInfo' withCredentials="true" @tap="loginHtml5">H5微信登录</button>
    <!-- #endif -->
    <template v-if="personInfo">
      <image :src="personInfo.avatarUrl" mode="aspectFill"></image>
    </template>
    <grids></grids>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        unionId : '',
        personInfo : {}
			};
		},
    onLoad(params) {},
    methods : {
      //仅微信小程序
      //#ifndef H5
      mpWeChat(info){
        if(info.detail.userInfo){
          uni.login({
            provider:'weixin',
            complete: (authInfo) => {
              if(authInfo.errMsg === 'login:ok'){
                uni.getUserInfo({
                  provider:'weixin',
                  complete: (userInfos) => {
                    if(userInfos.errMsg === 'getUserInfo:ok'){
                      this.initDom(userInfos.userInfo);
                      const params = {
                        code : authInfo.code,
                        iv : userInfos.iv,
                        encryptedData : userInfos.encryptedData
                      };
                      this.$api.wechatLogin('http://192.168.3.108:8181/api/getUnionId',params).then(data =>{
                        console.info(data);
                      }).catch(err =>{
                        console.info(err);
                      });
                    }
                  }
                });
              }
            }
          });
        }else{
          this.dialog('你已拒绝授权');
        }
      },
      //app获取到的是unionId;APP直接可以获取到 info.userInfo.unionId
      mpApp : function(){
        uni.login({
          provider : 'weixin',
          success: (infoRes) => {
            console.log(infoRes);
            console.info('openid:'+infoRes.authResult.openid);
            this.unionId = infoRes.authResult.unionid;
            uni.getUserInfo({
              complete: (result) => {
                if(result.errMsg === 'getUserInfo:ok'){
                  this.initDom(result.userInfo);
                }else{
                  this.dialog('授权失败');
                }
              }
            });
          }
        });
      },
      //#endif
      //#ifdef H5
      loginHtml5(){
        this.dialog('H5不支持微信登录哦');
      },
      //#endif
      //更新个人信息页面
      initDom(dataInfo){
        this.personInfo = dataInfo;
        uni.$emit('loginInfo',dataInfo);
      }
    }
	}
</script>

<style lang="scss">

</style>