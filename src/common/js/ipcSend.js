/**
 * Created by gxk on 2017/9/28.
 */
var ipc = require('electron').ipcRenderer;
export function ipcSend (name,vla){
    ipc.send(name,vla);
}
export function ipcOn (name,call){
    ipc.on(name, function (event, arg) {
        call(arg)
    })
}
