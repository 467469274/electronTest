/**
 * Created by gxk on 2017/8/28.
 */
export function postFetch (url,data,successCall,eCall){
    var fromData = new FormData();
    for (var key in data) {
        fromData.append(key,data[key])
    }
    fetch(url,{
/*        method: 'POST',
        mode: 'cors',
        body:fromData*/
    }).then(response => response.json())
        .then(data =>successCall(data))
        .catch(e => console.log(e))
}
