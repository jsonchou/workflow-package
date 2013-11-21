/*!
 * jsonchou 实用组件
 * v: 1.1
 * d: 2013-8-14
*/

/*global navigator */

var _env = 'real'; //real,dev
var _domain = 'uzai.com';

var _ua =navigator.userAgent.toLowerCase();

var _uzw = window._uzw || {}; //外部暴露
var _atom = window._atom || {}; //原子类,统一私有方法
var _util = window._util || {}; //简单通用方法

_atom = {
    pop: {}
};

_util = {
    url: {},
    user: {}
};

//url:http://m.uzai.com?source=weixin&man=jsonchou
_util.url.param = function (url, tag) {
    //通过url，tag获取参数tag值
    "use strict";
    var u = url.toLowerCase();
    if (u) {
        u = u.replace(/#/g, '');
        var uindex = u.indexOf("?");
        u = u.substr(uindex + 1);
        var uArray = u.split('&');
        for (var i = 0; i < uArray.length; i++) {
            var item = uArray[i];
            var i1 = item.split('=')[0];
            var i2 = item.split('=')[1];
            if (i1 == tag.toLowerCase()) {
                return i2;
            }
        }
    }
    return "";
};

//user:userName=x&Email=jsonchou@uzai.com&Mobile=x&realname=x&userid=x&nickname=&headUrl=&islogin=1&userGrade=A
//传参，区分大小写
_util.user.param = function (tag) {
    //通过url，tag获取参数tag值
    "use strict";
    var user = _uzw.cookie.get('user');//WTF
    if (user) {
        var userArr = user.split('&');
        for (var i = 0; i < userArr.length; i++) {
            var item = userArr[i];
            var i1 = item.split('=')[0];
            var i2 = item.split('=')[1];
            if (i1 == tag) {
                return i2;
            }
        }
    } return "";
};

_uzw = {
    env: _env,//real 正式， dev 开发环境
    cookie: {},
    user: {},
    regex: {},
    cooperate: {}, //合作
    mobile: {}
};

_uzw.regex = {
    qq: "^[1-9]*[1-9][0-9]*$",
    mobile: "^13[0-9]{9}|15[012356789][0-9]{8}|18[02356789][0-9]{8}|147[0-9]{8}$"
};

_uzw.cookie.set = function (k, v, day) {
    day = day === undefined ? 7 : day;
    if (_uzw.env == 'real') {
        $.cookie(k, v, { expires: day, path: '/', domain: _domain });
    } else {
        $.cookie(k, v, { expires: day, path: '/' });
    }
};

_uzw.cookie.get = function (k) {
    if ($.cookie(k)) {
        return decodeURIComponent($.cookie(k));
    }
    return null;
};

_uzw.cookie.del = function (k) {
    var ck=_uzw.cookie.get(k);
    if (ck) {
        $.cookie(k, '', { expires: -1 });
        if (_uzw.env == 'real') {
            $.cookie(k, '', { expires: -1, path: '/', domain: _domain });
        } else {
            $.cookie(k, '', { expires: -1, path: '/' });
        }
    }
};

//统一线上
_uzw.user = {
    userid: _util.user.param('userid'),
    userName: _util.user.param('userName'),
    nickname: _util.user.param('nickname'),
    realname: _util.user.param('realname'),
    Email: _util.user.param('Email'),
    Mobile: _util.user.param('Mobile'),
    islogin: _util.user.param('islogin'),
    userGrade: _util.user.param('userGrade'),
    headUrl: _util.user.param('headUrl')
};

_uzm.mobile = {
    isForce: false,
    isIpad: _ua.match(/ipad/i) == 'ipad',
    isIphone: _ua.match(/iphone/i) == "iphone",
    isAndroid: _ua.match(/android/i) == "android",
    isWC: _ua.match(/windows ce/i) == "windows ce",
    isWM: _ua.match(/windows mobile/i) == "windows mobile",
    isWebOS: _ua.match(/webos/i),
    isBlackberry: _ua.match(/blackberry/i),
    isWP: _ua.match(/windows phone/i),
    isUC: _ua.match(/ucweb/i) || _ua.match(/ucbrowser/i)
};

//打包初始化
_uzw.init = function () {
    _uzw.cooperate.source();
};

/*jshint unused:true, eqnull:true */
_uzw.cooperate.source = function () {
    var refer = decodeURIComponent(document.referrer);
    var url = decodeURIComponent(document.location.href.replace('#', ''));
    var ckRName = "uzwURLRefer";//统一线上
    var ckSName = "uzwSource";
    var vc = _uzw.cookie.get(ckRName);

    //url?source=weixin
    if (url.indexOf('source=weixin') > -1) {
        var v = _util.url.param(url, "source");
        _uzw.cookie.set(ckSName, v, 1);
    }

    //有cookie的回车
    //refergetUrlParam
    if (refer !== '') {
        if (vc !== null && vc !== '' && (vc.indexOf('utm_source=') > -1 || vc.indexOf('utm_medium=') > -1)) {
            if (url.indexOf('utm_source=') > -1 || url.indexOf('utm_medium=') > -1) {
                _uzw.cookie.set(ckRName, url, 1);
            }
        } else {
            //console.log(vc);
            //console.log(refer);
            if (url.indexOf('utm_source=') > -1 || url.indexOf('utm_medium=') > -1) {
                _uzw.cookie.set(ckRName, url, 1);
            } else {
                //_uzw.cookie.set(ckRName, refer, 1);
            }
        }
    } else {
        if (vc === null || vc === '') {
            _uzw.cookie.set(ckRName, url, 1);
        }
        else {
            if (url.indexOf('utm_source=') > -1 || url.indexOf('utm_medium=') > -1) {
                _uzw.cookie.set(ckRName, url, 1);
            }
        }
    }
};

$(function () {
    _uzw.init();//初始化
});