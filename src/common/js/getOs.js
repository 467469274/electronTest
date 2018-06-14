/**
 * Created by gxk on 2017/11/9.
 */
const os = require("os");
export function osType (){
    return (os.type()=='Windows_NT')?process.cwd():'/tmp';
}