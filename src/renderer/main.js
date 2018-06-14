import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import {postFetch} from 'common/js/fetch';
import {downFile} from 'common/js/down';
import {ipcSend,ipcOn} from 'common/js/ipcSend';
import {weiJieMi,weiJiaMi} from 'common/js/crypto';
import {encrypt,decrypt} from 'common/js/confusemp3';
// import {callApi} from 'common/js/api-access';
import {setCookie,getCookie,clearAllCookie} from '../common/js/cokie';
import {getUserInfo} from '../common/js/getUserInfo';
import {osType} from '../common/js/getOs.js';
import QRCode from 'qrcode'
import {machineIdSync} from 'node-machine-id';
if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
//Vue.http = Vue.prototype.$http = axios;
Vue.prototype.callApi = callApi;
Vue.prototype.ipcSend = ipcSend;
Vue.prototype.ipcOn = ipcOn;
Vue.prototype.downFile = downFile;
Vue.prototype.encrypt = encrypt;
Vue.prototype.decrypt = decrypt;
Vue.prototype.weiJieMi = weiJieMi;
Vue.prototype.weiJiaMi = weiJiaMi;
Vue.prototype.setCookie = setCookie;
Vue.prototype.osType = osType;
Vue.prototype.yjId = machineIdSync({original: true});
Vue.prototype.getUserInfo = getUserInfo;
Vue.prototype.QRCode = QRCode;
Vue.prototype.clearAllCookie = clearAllCookie;
Vue.prototype.getCookie = getCookie;
Vue.config.productionTip = false;
new Vue({
    components: { App },
    router,
    store,
    template: '<App/>'
}).$mount('#app');
Vue.config.errorHandler = function (err, vm, info) {
    console.log(err)
    console.log(vm)
    console.log(info)
}