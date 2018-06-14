import axios from 'axios';
function doFetch(method , opt , cbk){
	var post_data = opt.data;
	if (!('processData' in opt)) opt.processData = true;

	return axios({
		method: method,
		url: opt.url,
		headers : {
			'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
		},
		dataType:opt.dataType || 'json',
		data:post_data
	}).then(function(re){
        // console.log('re',re)
        cbk(null ,re,re.status,re.data)
	}).catch(function (error) {
		var erroCode = JSON.parse(JSON.stringify(error));
        cbk(null ,'error',erroCode.response)
	})
}
exports.read = function(opt , cbk){
	return doFetch('GET' , opt ,cbk)
}
exports.write = function(opt , cbk){
	return doFetch('POST' , opt ,cbk)
}
