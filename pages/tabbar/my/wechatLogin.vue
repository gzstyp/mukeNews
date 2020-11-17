<template>
	<view>
    <titlebar backIcon title="微信登录"></titlebar>
    <!-- <button @tap="loginWeChat()">获取授权</button> -->
    <button type="primary" open-type='getUserInfo' @tap="loginWeChat()">获取授权</button>
    <view>
      <text selectable>openId：{{openId}}</text>
    </view>
    <view>
      <text selectable>{{userInfo.nickName}}</text>
    </view>
    <view>
      <text selectable>{{userInfo.gender === 1 ? '男' : '女'}}</text>
    </view>
    <view>
      <image :src="userInfo.avatarUrl" mode="aspectFill"></image>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        openId : '',
        userInfo : {}
			};
		},
    methods:{
      loginWeChat : function(){
        const _this = this;
        //#ifndef H5
        uni.login({
        	provider : 'weixin',
        	success : (res) => {
            _this.personInfo(res.code);
        	},
        	fail : (err) => {
            console.info(err);
        	}
        });
        //#endif
        //#ifdef H5
        uni.showToast({
          title:'H5不支持微信登录',
          icon:'none'
        })
        //#endif
      },
      //获取openId,这个业务放在服务端来完成,防止 appid 和 secret 被盗
      getOpenId(code){
        //小程序appid
        let appid = 'wxbf1695db9525b4ed'; //我瞎写的
        //小程序secret
        let secret = '4604d5cbfe688d03c7724ef44e8ce404'; //我瞎写的
        //wx接口路径
        let url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' + code + '&grant_type=authorization_code';
        this.$api.wechatLogin(url,{}).then(data =>{
          this.openId = data.openid;
        }).catch(err =>{
          console.info(err);
        });
      },
      //获取个人信息
      personInfo(code){
        const _this = this;
        uni.getUserInfo({
        	provider : 'weixin',
        	success : (infoRes) => {
            console.info(infoRes);
            console.info(infoRes.userInfo.avatarUrl);
            _this.userInfo = infoRes.userInfo;
            this.$store.dispatch('setLoginInfo',infoRes.userInfo);
            uni.$emit('loginInfo',infoRes.userInfo);
            _this.getOpenId(code);
        	},
        	fail(err){
        		console.info(err);
        	}
        });
      }
    }
	}
</script>

<style lang="scss">

</style>