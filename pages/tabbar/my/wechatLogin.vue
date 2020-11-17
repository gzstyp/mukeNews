<template>
	<view>
    <titlebar backIcon title="微信登录"></titlebar>
    <!-- 仅在微信小程序执行 -->
    <!-- #ifdef MP-WEIXIN -->
    <!-- <button @tap="loginWeChat()">获取授权</button> -->
    <button type="primary" open-type='getUserInfo' @tap="loginWeChat()">获取授权</button>
    <!-- #endif -->
    <!-- 仅在微信小程序执行 -->
    <!-- #ifdef MP-WEIXIN -->
    <button type="primary" open-type="getUserInfo" @getuserinfo="getUserInfos">使用微信登录</button>
    <!-- #endif -->
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
    onLoad(params) {
      //仅在app端执行-开始
      //#ifdef APP-PLUS
      uni.login({
        complete: (infoRes) => {
          console.info('--------------------authResult--------------------');
          console.info(infoRes);
          console.info(infoRes.errMsg);
          console.info(infoRes.authResult);
          console.info('openid:'+infoRes.authResult.openid);
          console.info('unionId:'+infoRes.authResult.unionid);
          console.info('--------------------authResult--------------------');
          const loginMsg = infoRes.errMsg;
          if(loginMsg === 'login:ok'){
            uni.getUserInfo({
              complete : (res) => {
                console.info('--------------------userInfo--------------------');
                console.info(res);
                const infoMsg = res.errMsg;
                if(infoMsg === 'getUserInfo:ok'){
                  console.info(res.userInfo);
                  console.info('openId:'+res.userInfo.openId);
                  console.info('unionId:'+res.userInfo.unionId);
                }else{
                  this.dialog('微信登录授权失败');
                }
                console.info('--------------------userInfo--------------------');
              }
            });
          }
        }
      });
      //#endif
      //仅在app端执行-结束

      // 仅在微信小程序执行-开始
      // #ifdef MP-WEIXIN
      // 调用 微信 login 获取 code
      uni.login({
          success: (res) => { //仅拿到code数据
            console.info(res);
              //通过code和个人基本信息获取openId或unionId,http://www.hcoder.net/tutorials/info/id/1374
              /* uni.request({
                  url:_self.apiServer+'member&m=codeToSession&code='+res.code,
                  success: (sessions) => { //此处返回openId和session_key
                      // sessions.date 数据格式
                      // expires_in:7200
                      // openid:"oS6of0V0rdp9nY_BuvCnQUasOHYc"
                      // session_key:"87sE2oDD8lc+aDJj0tB6+g=="
                      // 获取 unionId
                      session_key = sessions.data.session_key;
                      openid      = sessions.data.openid;
                  },
              }); */
          }
      });
      // #endif
      // 仅在微信小程序执行-接收
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
        this.dialog('H5不支持微信登录');
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
        	fail : (err) =>{
        		console.info(err);
        	}
        });
      },
      // 仅在微信小程序执行-开始
      // #ifdef MP-WEIXIN
      getUserInfos : (info) => {
        console.info(info);
        info = info.mp.detail.userInfo;
        //userInfo {"nickName":"深海","gender":1,...avatarUrl":"https://7tdPvkPaJlkaLFFbLAffGVApluZdanLkDVplNlAhq1EJA/132"}
        // 与服务器交互将数据提交到服务端数据库
        /* uni.request({
            url: _self.apiServer+'member&m=login',
            method: 'POST',
            header: {'content-type' : "application/x-www-form-urlencoded"},
            data: {
                openid : openid,
                name   : info.nickName,
                face   : info.avatarUrl,
            },
            success: res => {
                console.log(res);
                res = res.data;
                // 登录成功 记录会员信息到本地
                if(res.status == 'ok'){
                    uni.showToast({title:"登录成功"});
                    uni.setStorageSync('SUID' , res.data.u_id + '');
                    uni.setStorageSync('SRAND', res.data.u_random + '');
                    uni.setStorageSync('SNAME', res.data.u_name + '');
                    uni.setStorageSync('SFACE', res.data.u_face + '');
                    // 跳转
                    if(pageOptions.backtype == 1){
                        uni.redirectTo({url:pageOptions.backpage});
                    }else{
                        uni.switchTab({url:pageOptions.backpage});
                    }
                }else{
                    uni.showToast({title:res.data});
                }
            },
            fail: (e) => {
                console.log(JSON.stringify(e));
            }
        }); */
      },
      // #endif
      //仅在微信小程序执行-结束
    }
	}
</script>

<style lang="scss">

</style>