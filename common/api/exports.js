//批量导出文件的方法,第1个参数是目录的相对路径;第2个是否查询子目录;第3个是查询文件的后悔名
const requireApi = require.context('.',false,/.js$/);
//定义一个空对象
let module = {};
requireApi.keys().forEach((key,index) =>{
	if(key === './exports.js' || key === './http.js')return;//排除
	Object.assign(module,requireApi(key))//复制,把参数2的数据复制到参数1里去
});
export default module;