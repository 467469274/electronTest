/*
var crypto = require('crypto');
var querystring = require('querystring');
var isLoginOut = false;
var PouchDB = require('pouchdb-browser');
var fs = require('fs');
var port = new PouchDB('port');
var mid = '';
var netWorkStatus = window.navigator.onLine;
import {machineIdSync} from 'node-machine-id';
import {getUserInfo} from './getUserInfo';
import {app} from 'electron';
import {osType} from './getOs.js';
import Ajax from './ajax.js';


var SC = {SAFEAPI: 'http://api-safe.pro.lavaradio.com'};//正式
// var SC = {SAFEAPI: 'http://api-safe-pre.lavaradio.com'};  // 预发
// var SC = {SAFEAPI: 'http://api-safe.dev.lavaradio.net'};// 测试
var APPKEY = "\x63\x6c\x69\x65\x6e\x74\x2d\x77\x65\x62"
    ,
    APPSECRET = "\x38\x38\x62\x34\x61\x64\x63\x61\x61\x63\x63\x63\x65\x36\x33\x37\x33\x63\x37\x31\x66\x66\x35\x63\x36\x66\x64\x66\x33\x37\x30\x38"
    ,
    HOST = SC["\x53\x41\x46\x45\x41\x50\x49"] || "\x68\x74\x74\x70\x3a\x2f\x2f\x61\x70\x69\x2d\x73\x61\x66\x65\x2e\x70\x72\x6f\x2e\x6c\x61\x76\x61\x72\x61\x64\x69\x6f\x2e\x6e\x65\x74"

var TIMECORRECT = 0;
var running = 0;
var osTypes = osType(); //  路径

function _transCode(code) {
    var l = code.length / 2;
    var r = []
    for (var i = 0; i < l; i++) {
        r.push(parseInt(code.slice(i * 2, i * 2 + 2), 16))
    }
    return String.fromCharCode.apply(String, r)
}

function q(opts, cbk, erroBack) {
    if (!opts) return false;
    var api = opts.url
        , arg = opts.query
        , apiGet = opts.gets
        , body = opts.data || {}
        , cbk = cbk || opts.cbk;
    if (!api || !cbk) return false;
    if (running > 20) {
        setTimeout(function () {
            q(opts, cbk)
        }, 2000);
        return
    }
    running++;

    if (!arg && api.indexOf('?') > 0) {
        var api_parsed = querystring.stringify(api);
        api = api_parsed.pathname;
        arg = api_parsed.query
    }

    arg = arg || {};

    function genSign(arg) {
        var sortable = [];
        var keys = Object.keys(arg).sort()
        var cont = []
        keys.forEach(function (key) {
            cont.push(arg[key])
        })
        return md5(cont.join('') + APPSECRET).toString()
    }

    function md5(str) {
        return crypto.createHash('md5').update(str).digest('hex')
    }

    function cloneObj(oldObj) { //复制对象方法
        if (typeof(oldObj) != 'object') return oldObj;
        if (oldObj == null) return oldObj;
        var newObj = new Object();
        for (var i in oldObj)
            newObj[i] = cloneObj(oldObj[i]);
        return newObj;
    };
    var data = cloneObj(arg);
    data._t = Date.now() + TIMECORRECT;
    data._from = 'client_lb';
    if (api != '/web/Security/merchantSignIn') {
        data.token = JSON.parse(getUserInfo()).token;
        mid = '&' + JSON.parse(getUserInfo()).mid;
    } else {
        mid = '';
    }
    var sign = genSign(data);
    data._sign = sign;
    data._key = APPKEY;

    function encrypt(data, key) {

        var iv = iv || "";
        iv = 'AAAAAAAAAAAAAAAA';
        var clearEncoding = 'utf8';
        var cipherEncoding = 'base64';
        var cipherChunks = [];
        try {
            var cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
            cipher.setAutoPadding(true)
            cipherChunks.push(cipher.update(data, clearEncoding, cipherEncoding))
            cipherChunks.push(cipher.final(cipherEncoding))
            return cipherChunks.join('')
        } catch (err) {
            return false
        }
    }

    function decrypt(data, key) {

        if (!data) {
            return ""
        }
        try {
            var iv = iv || key
            iv = 'AAAAAAAAAAAAAAAA'
            var clearEncoding = 'utf8'
            var cipherEncoding = 'base64'
            var cipherChunks = []
            var decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
            decipher.setAutoPadding(true);
            cipherChunks.push(decipher.update(data.data, cipherEncoding, clearEncoding))
            cipherChunks.push(decipher.final(clearEncoding));
            return cipherChunks.join('')
        } catch (err) {
            return false
        }

    }
    var noBody = JSON.stringify(body);
    body= JSON.stringify(body);
    body = encrypt(body, APPSECRET);
    Ajax[body ? 'write' : 'read']({
        url: HOST + api + '?' + querystring.stringify(data)
        , data: body
        , processData: false
        , dataType: 'text'
    }, function (err, result, status,data) {
        running--;


        let key = encrypt(api, APPSECRET) + '&' + body + mid;
        if (result == 'error') {
            let results;
            port.get('' + key + '')
                .then((doc) => {
                    results = JSON.parse(decrypt(JSON.parse(doc.content), APPSECRET));
                })
                .catch((erro) => {
                    results = 'error';
                    if (api != '/web/Security/heartBeat'
                        && api != '/client/Merchant/localSongListMsg'
                        && api != '/client/Merchant/verifyPrivilege'
                        && api != '/web/Security/merchantSignIn'
                        && api != '/common/Common/uploadPlayLog'
                        && api != '/common/Common/uploadActionLog'
                    ) {
                        var serverErro = document.getElementsByClassName('serverErro')[0];
                        if (serverErro.style.display == 'none')
                            serverErro.style.display = 'block';
                        serverErro.style.opacity = '1';
                        setTimeout(function () {
                            serverErro.style.opacity = '0';
                            setTimeout(function () {
                                serverErro.style.display = 'none';
                            }, 500)
                        }, 5000);
                    }
                })
                .then(function () {
                    if(status){
                        var info = {
                            action:'request_net_error',
                            url:api,
                            parameter1:noBody,
                            parameter3:+new Date(),
                            parameter2:JSON.stringify({
                                status:status.status,
                                resData:status.data,
                                statusText:status.statusText,
                            }),
                            mid:(mid)?mid:'',
                            pmid:'',
                            source:5,
                            device_id : machineIdSync({original: true})
                        };
                        fs.readFile(osTypes + '/erroInfo.txt', {
                            encoding: 'utf8'
                        }, function (err, decipherData) {
                            if (err) {
                                let Strings = '[]';
                                fs.writeFile(osTypes + '/erroInfo.txt', '[]', [], function (data) {
                                    writeFile(Strings)
                                });
                            } else {
                                writeFile(decipherData)
                            }

                            function writeFile(datas) {
                                let yuanlai = JSON.parse(datas);
                                yuanlai.push(info);
                                fs.writeFile(osTypes + '/erroInfo.txt', JSON.stringify(yuanlai), [], function (data) {
                                });
                            }
                        });
                    }
                     if(netWorkStatus){
                         q(
                             {
                                 url: '/common/Common/uploadActionLog',
                                 data: info
                             }
                             , function ()
                             {
                             }
                         )
                     }
                    cbk(results);
                });
            return;
        }
        try {
            let decEnd = decrypt(result, APPSECRET);
            decEnd = JSON.parse(decEnd);
            if (decEnd.ok == 0 && decEnd.data == 'mid不存在' && !isLoginOut) {
                alert('请重新登录');
                isLoginOut = true;
                window.location.hash = '#/';
                window.localStorage.clear();
                location.reload();
                return;
            }
            if (decEnd.ok == 1 && status == 200 && typeof decEnd == 'object' && decEnd.data) {
                let content = {
                    'content': JSON.stringify(result),
                    '_id': key
                };
                port.get('' + key + '')
                    .then((doc) => {
                        content._rev = doc._rev;
                    })
                    .catch((erro) => {
                    })
                    .then(function () {
                        port.put(content)
                            .then(function (responseq) {
                            }).catch(function (erre) {
                        })
                    });
            }
            cbk(decEnd)
        } catch (err) {
            cbk('error')
        }
    })
}

function CIProcess(ret) {
    if (ret && ret.ok) {
        return {'data': ret.data}
    } else {
        return {'err': (ret && ret.data) || 'response error'}
    }

}

function corrctTime() {
    if (!netWorkStatus) {
        return;
    }
    var now = Date.now();
    Ajax.read({
        url: HOST + '/_time'
    }, function (err, result) {
        if (err || !result.data) {
            window.setTimeout(corrctTime, 1000);
            return
        }
        if (result.data) {
            TIMECORRECT = result.data.data - now;
        }
    })
}

corrctTime();
setInterval(corrctTime, 600000);
exports.callApi = q;
exports.read = q;
exports.write = q;

var EventUtil = {

    addHandler: function (element, type, handler) {

        if (element.addEventListener) {

            element.addEventListener(type, handler, false);

        } else if (element.attachEvent) {

            element.attachEvent("on" + type, handler);

        } else {

            element["on" + type] = handler;

        }

    }

};

EventUtil.addHandler(window, "online", function () {
    netWorkStatus = true;
});

EventUtil.addHandler(window, "offline", function () {
    netWorkStatus = false;
});

function parseDom(arg) {

    var objE = document.createElement("div");

    objE.innerHTML = arg;

    return objE.childNodes;

}*/
