//cookie的读取、写入和删除操作
var CookieUtil = {
    // 完整cookie: Set-Cookie: name=value; expires=Mon, 22-Jan-07 07:10:24 ; secure;等
    //读取
    get: function (name) {
        //cookie的名字和值都是经过URL编码的
        // 这里使用encodeURIComponent手动加上URL编码
        var cookieName = encodeURIComponent(name) + '=',
            //方法可返回某个指定的字符串值在字符串中首次出现的位置
            cookieStart = document.cookie.indexOf(cookieName),
            cookieValue = null;

        if (cookieStart > -1) {
            //后面参数规定在字符串中开始检索的位置
            //查找该位置之后的第一个分号，表示该cookie结束位置
            var cookieEnd = document.cookie.indexOf(';', cookieStart);

            //如果没有找到，表示该cookie是字符串的最后一个，余下的都是cookie的值
            if (cookieEnd === -1) {
                cookieEnd = document.cookie.length;
            }
                // 写解码，然后再截取，substring(start,stop)
            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart +　cookieName.length, cookieEnd));
        }

        return cookieValue;
    },

    //写入
    set: function(name, value, expires, path, domain, secure) {
        var cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value);

        if (expires instanceof date) {
            cookieText += '; expires=' + expires.toGMTString();
        }

        if (path) {
            cookieText += '; path=' + path;
        }

        if (domain) {
            cookieText += '; domain=' + domain;
        }

        if (secure) {
            cookieText += '; secure';
        }

        document.cookie = cookieText;
    },

    //删除
    unset: function (name, path, domain, secure) {
        this.set(name, '', new Date(0), path, domain, secure);
    }
}
