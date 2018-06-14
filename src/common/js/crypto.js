/**
 * Created by gxk on 2017/8/29.
 */
var crypto = require('crypto');

//加密
export function cipher (buf) {
    var encrypted = "";
    var cip = crypto.createCipher('rc4', 'pkdpkq');
    encrypted += cip.update(buf, 'hex', 'hex');
    encrypted += cip.final('hex');
    return encrypted
};

//解密
export function decipher(encrypted) {
    var decrypted = "";
    var decipher = crypto.createDecipher('rc4', 'pkdpkq');
    decrypted += decipher.update(encrypted, 'hex', 'hex');
    decrypted += decipher.final('hex');
    return decrypted
};

//威哥解密
export function weiJieMi(data){
    let key ="\x38\x38\x62\x34\x61\x64\x63\x61\x61\x63\x63\x63\x65\x36\x33\x37\x33\x63\x37\x31\x66\x66\x35\x63\x36\x66\x64\x66\x33\x37\x30\x38";
    if (!data) {
        return ""
    }
    try {
        var iv = iv || key;
        iv = 'AAAAAAAAAAAAAAAA';
        var clearEncoding = 'utf8';
        var cipherEncoding = 'base64';
        var cipherChunks = [];
        var decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
        decipher.setAutoPadding(true);
        cipherChunks.push(decipher.update(data, cipherEncoding, clearEncoding));
        cipherChunks.push(decipher.final(clearEncoding));
        return cipherChunks.join('');
    }catch(err){
        console.log(err)
        return false
    }

}
//威哥加密
export function weiJiaMi(data) {
    let key ="\x38\x38\x62\x34\x61\x64\x63\x61\x61\x63\x63\x63\x65\x36\x33\x37\x33\x63\x37\x31\x66\x66\x35\x63\x36\x66\x64\x66\x33\x37\x30\x38";
    var iv = iv || ""
    iv = 'AAAAAAAAAAAAAAAA'
    var clearEncoding = 'utf8'
    var cipherEncoding = 'base64'
    var cipherChunks = []
    try{
        var cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
        cipher.setAutoPadding(true)
        cipherChunks.push(cipher.update(data, clearEncoding, cipherEncoding))
        cipherChunks.push(cipher.final(cipherEncoding))
        return cipherChunks.join('')
    }catch(err){
        return false
    }
}