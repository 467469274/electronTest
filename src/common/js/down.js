/**
 * Created by gxk on 2017年9月29日11:50:08.

 _
 | |__ _ _ __ _
 | '_ \| | | |/ _` |
 | |_) | |_| | (_| |
 |_.__/ \__,_|\__, |
 |___/
 */
var request = require('request');
var fs = require('fs');
// var PouchDB = require('pouchdb-browser');
// var music = new PouchDB('music');
const os = require("os");
import {decrypt} from 'common/js/confusemp3';

var FileLocal = (os.type() == 'Windows_NT') ? process.cwd() : '/tmp';
// var insertionDB = new PouchDB('inser')

export function downFile(type, uri, filename, id, callback) {

    request({url: uri, encoding: null}, function (error, response, buffer) {
        if(error){
            callback();
            return;
        }
        // console.log(buffer);
        let newFile;
        if (type == 'music') {
            newFile = decrypt(buffer);
        } else {
            newFile = buffer;
        }
        fs.writeFile(FileLocal + '/cache/' + filename + '', newFile, function (err) {
            if (err == 'Error: ENOSPC: no space left on device, write') {
                callback(err)
            } else {
            }
        })
    })

};
