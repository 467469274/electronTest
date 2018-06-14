/**
 * Created by gxk on 2017/10/16.
 */
import axios from 'axios';
export function postAxios (url,data,successCall,eCall){
    var fromData = new FormData();
    for (var key in data) {
        fromData.append(key,data[key])
    }
    var now = Date.now();
    axios({
        method: 'post',
        url: `http://api-safe.dev.lavaradio.net/${url}`,
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        data:fromData
    }).then(function(re){
        successCall(re)
    });
    /*
    axios({
        method: 'post',
        url: `http://api-safe.dev.lavaradio.net/${url}`,
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        data:fromData
    }).then(function(re){
        successCall(re)
    })*/
}
