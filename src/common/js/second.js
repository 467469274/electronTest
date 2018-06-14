/**
 * Created by gxk on 2017/10/17.
 */
export function formatTime(seconds) {
    return [
        parseInt(seconds / 60 % 60),
        parseInt(seconds % 60)
    ]
        .join(":")
        .replace(/\b(\d)\b/g, "0$1");
}

export function formatSeconds(value) {
    if(!(value >=0)){return '00:00'}
    var theTime = parseInt(value);// 秒
    var theTime1 = 0;// 分
    var theTime2 = 0;// 小时
// alert(theTime);
    if(theTime > 60) {
        theTime1 = parseInt(theTime/60);
        theTime = parseInt(theTime%60);
// alert(theTime1+"-"+theTime);
        if(theTime1 > 60) {
            theTime2 = parseInt(theTime1/60);
            theTime1 = parseInt(theTime1%60);
        }
    }
    var result = ""+((parseInt(theTime)>9)?parseInt(theTime):'0'+''+parseInt(theTime)+'')+"";
    if(theTime1 > 0) {
        result = ""+((parseInt(theTime1)>9)?parseInt(theTime1):'0'+''+parseInt(theTime1)+'')+":"+result;
    }
    if(theTime2 > 0) {
        result = ""+((parseInt(theTime2)>9)?parseInt(theTime2):'0'+''+parseInt(theTime2)+'')+":"+result;
    }
    return result;
}