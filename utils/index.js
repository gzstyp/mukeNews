//时间格式化,使用方法:
export const paraseTime = (time)=>{
  let date = null;
  const format = '{y}-{m}-{d} {h}:{i}:{s}';
  if(typeof time === 'string'){
    time = parseInt(time);
  }
  date = new Date(time);
  const formObj = {
    y : date.getFullYear(),
    m : date.getMonth() + 1,
    d : date.getDate(),
    h : date.getHours(),
    i : date.getMinutes(),
    s : date.getSeconds()
  };
  date = format.replace(/{(y|m|d|h|i|s)+}/g,(result,key)=>{
    let value = formObj[key];
    if(value > 0 && value < 10){
      value = '0'+value;
    }
    return value;
  });
  return date;
}