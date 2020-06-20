/* eslint-disable */
export function grouponStatus (status) {
  switch (status) {
    case 1:
      return '未开始'
      break
    case 0:
      return '进行中'
      break
    case 3:
      return '已结束'
      break
  }
}
export function dateTimeFormatter (date ,format) {
  // 时间格式化辅助函数 date:毫秒数 format:'yyyy-MM-dd hh:mm:ss'
  if (!date || date == "") {
      return "";
  }else if(date.toString().length < 13){
      date = date*1000;
  }

  if (typeof date === "string") {
      var mts = date.match(/(\/Date\((\d+)\)\/)/);
      if (mts && mts.length >= 3) {
          date = parseInt(mts[2]);
      }
  }

  date = new Date(date);
  if (!date || date.toUTCString() == "Invalid Date") {
      return "";
  }

  var map = {
      "M": date.getMonth() + 1, //月份
      "d": date.getDate(), //日
      "h": date.getHours(), //小时
      "m": date.getMinutes(), //分
      "s": date.getSeconds(), //秒
      "q": Math.floor((date.getMonth() + 3) / 3), //季度
      "S": date.getMilliseconds() //毫秒
  };

  format = format.replace(/([yMdhmsqS])+/g, function(all, t){
      var v = map[t];
      if(v !== undefined){
          if(all.length > 1){
              v = '0' + v;
              v = v.substr(v.length-2);
          }
          return v;
      }
      else if(t === 'y'){
          return (date.getFullYear() + '').substr(4 - all.length);
      }
      return all;
  });

  return format;
}

export function ossurl(url) {
    if (!url) return ''
    var pattern = new RegExp('[http|https]://')
    if (!url.match(pattern)) {
      url = 'http://overseas-1252412068.costj.myqcloud.com' + url
    }
    return url
}