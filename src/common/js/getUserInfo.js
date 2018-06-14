/**
 * Created by gxk on 2017/10/18.
 */
import {getCookie} from './cokie';
import {weiJieMi} from './crypto';
export function getUserInfo(){
    let userInfo = window.localStorage.token;
    if (!userInfo){
        return JSON.stringify({token:""});
    }else {
        return weiJieMi(userInfo)
    }
}