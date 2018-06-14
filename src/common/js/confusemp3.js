var fs = require('fs')
	,path = require('path')

var pieces = 21;

export function encrypt(str){

	var fraglen = Math.floor(str.length / pieces)
	var ret = []
	var i = 0
	while(true){
		var frag = str.slice(i , i + fraglen)
		i += fraglen
		ret.push(frag)
		if (i > str.length) break
	}
	ret.reverse()
	var ret = Buffer.concat(ret)
	return ret
}

export function decrypt(str){
	var fraglen = Math.floor(str.length / pieces)
	var ret = []
	var taillen = str.length % fraglen
	var frag_tail = str.slice(0, taillen)
	var decoded = encrypt(str.slice(taillen))
	ret.push(decoded , frag_tail)
	var ret = Buffer.concat(ret)
	return ret
}