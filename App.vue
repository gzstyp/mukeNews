<script>
	export default {
		onLaunch: function() {
			console.log('全局仅启动一次');
      //todo 正常情况下是用 uni.login({});登录获取user_id的!!!
      this.$api.get_user({user_id : '5fa4a4c10a5b540001020389'}).then(result =>{
        const {code,data} = result;
        if(200 === code){
          this.$store.dispatch('set_userinfo',data);
        }
      }).catch(err =>{
        console.info(err);
      });
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		}
	}
</script>

<style>
	/*每个页面公共css */
  @import 'components/gaoyia-parse/parse.css';/* todo 富文本渲染重点,uParse 富文本解析 https://ext.dcloud.net.cn/plugin?id=183 */
</style>