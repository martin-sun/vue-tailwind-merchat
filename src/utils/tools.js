/* eslint-disable */
export function dateTimeFormatter (date, format) {
  // 时间格式化辅助函数 date:毫秒数 format:'yyyy-MM-dd hh:mm:ss'
  if (!date || date == "") {
    return ""
  }

  if (typeof date === "string") {
    var mts = date.match(/(\/Date\((\d+)\)\/)/)
    if (mts && mts.length >= 3) {
      date = parseInt(mts[2])
    }
  }

  date = new Date(date)
  if (!date || date.toUTCString() == "Invalid Date") {
    return ""
  }

  var map = {
    "M": date.getMonth() + 1, //月份
    "d": date.getDate(), //日
    "h": date.getHours(), //小时
    "m": date.getMinutes(), //分
    "s": date.getSeconds(), //秒
    "q": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds() //毫秒
  }

  format = format.replace(/([yMdhmsqS])+/g, function(all, t){
    var v = map[t]
    if(v !== undefined){
      if(all.length > 1){
        v = '0' + v
        v = v.substr(v.length-2)
      }
      return v
    }
    else if(t === 'y'){
      return (date.getFullYear() + '').substr(4 - all.length)
    }
    return all
  })

  return format
}

export function setCookie(A, C, D) {
  var B = new Date();
  B.setTime(B.getTime() + D * 1000);
  document.cookie = A + "=" + C + "; expires=" + B.toGMTString() + "; path=/;"
}

/* eslint-disable */
export function getCookie(B) {
    var A;
    A = B + "=";
    offset = document.cookie.indexOf(A);
    if (offset != -1) {
        offset += A.length;
        end = document.cookie.indexOf(";", offset);
        if (end == -1) {
            end = document.cookie.length
        }
        return document.cookie.substring(offset, end)
    } else {
        return ""
    }
}

export function ossurl(url) {
  if (!url) return ''
  var pattern = new RegExp('[http|https]://')
  if (!url.match(pattern)) {
    url = 'http://overseas-1252412068.costj.myqcloud.com' + url
  }
  return url
}