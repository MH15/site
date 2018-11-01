const crypto = require('crypto');

exports.sha256 = function sha256(str){
	return crypto.createHash('sha256').update(str).digest('hex');
}

function randomIntRang(min, max){
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
exports.randomIntRang = randomIntRang;

exports.genString = function genString(len, candidates){
	if(len>0 && candidates){
		const max = candidates.length -1;
		var str = '';
		for (var i=0; i<len; i++){
			str += candidates.charAt(randomIntRang(0, max));
		}

		return str;
	}
	else {
		return '';
	}
}

exports.formatBytes = function formatBytes(bytes, decimals) {
	if (bytes == 0) {
		return '0 B';
	}

	var k = 1024;
	var dm = decimals || 2;
	var sizes = ['B','KB','MB','GB','TB','PB','EB','ZB','YB'];
	var i = Math.floor(Math.log(bytes) / Math.log(k));

	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

exports.arrToObj  = function arrToObj(arr, key){
	var obj = {};
	var c = arr.length;
	for(var i=0; i<c; i++){
		obj[arr[i][key]] = arr[i];
	}
	return obj;
}