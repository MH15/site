
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const {formatBytes} = require('./utils');
const dirTree = require('directory-tree')


exports.readFile = function readFile(filepath, callback){
    fs.readFile(filepath, 'utf8', (err, data)=>{
        if(err){
            console.log(err);
            data = null;
        }

        callback && callback(err, data);
    });
}

exports.readFilePromise = (fileName) =>
  new Promise((resolve, reject) =>
    fs.readFile(fileName, 'utf8', (err, data) => {
      //if has error reject, otherwise resolve
      return err ? reject(err) : resolve(data);
    })
  );




exports.writeFile = function writeFile(dir, filename, data, callback){
    checkDir(dir, next);

    function next(err){
        if(err){
            callback && callback(err);
        }
        else {
            fs.writeFile(path.resolve(dir, filename), data, function(err2){
                if(err2){
                    console.log(err2);
                }
                callback && callback(err2);
            });
        }

    }
}



exports.deleteFile = function deleteFile(filepath, callback){
    fs.unlink(filepath, (err)=>{
        callback && callback(err);
    });
}

exports.renameFile = function renameFile(dir, oname, nname, callback){
    fs.rename(path.resolve(dir, oname), path.resolve(dir, nname), (err)=>{
        callback && callback(err);
    });
}

exports.fileInfo = function fileInfo(dir, name, callback) {

    fs.stat(path.resolve(dir,name), (err, stats) => {
        if (err) {
            console.log(err);
            callback && callback(err, {});
        }
        else {
            console.log(stats);
            var obj = {
                name:name,
                isDirectory: stats.isDirectory(),
                created: stats.birthtime.toLocaleString(),
                modified: stats.mtime.toLocaleString(),
                bytes: stats.size,
                size: formatBytes(stats.size, 2)// + ' (' + stats.size.toLocaleString() + ' bytes)'
            }
            callback && callback(err, obj);
        }

    });
}


exports.getChildren = function getChildren(dir, callback){
	isDir(dir, (err, res)=>{
		if(err || !res){
			callback && callback(err, null);
		}
		else {
			fs.readdir(dir, (err2, files)=>{
				if (err2) {
					console.log(err2);
					callback && callback(err2, null);
				}
				else {
					//console.log(files);
					callback && callback(err2, files);
				}
			});
		}
	});
	
}

function isDir(filename, callback){
    fs.stat(filename, (err, stats) => {
        if (err) {
            console.log(err);
            callback && callback(err, false);
        }
        else {
            callback && callback(err, stats.isDirectory());
        }

    });
}
exports.isDir = isDir;


exports.hasDir = function hasDir(dir, callback){
    if (fs.existsSync(dir)) {
        fs.stat(dir, (err, stats) => {
            if (err) {
                console.log(err);
                callback && callback(err, false);
            }
            else {
                callback && callback(err, stats.isDirectory());
            }

        });
    }
    else {
        callback && callback(err, false);
    }
}


function checkDir(dir, callback){
    if (fs.existsSync(dir)) {
        if(callback){
            callback(null);
        }
    }
    else {
        mkdirp(dir, 0o777, function(err){
            if (err) {
                console.log(err);
            }
            if(callback){
                if(err && err.code == 'EEXIST'){
                    err=null;
                }
                callback(err);
            }
        });
    }
}
exports.checkDir = checkDir;


// Returns all files in a directory through a callback one
// by one. Useful for serving any page in a directory.
exports.fromDir = function(startPath, filter, callback) {
    // console.log('Starting from dir '+startPath+'/');

    const tree = dirTree(startPath, {extensions:/\.json$/});
    // console.log(tree)
    let files = tree.children
    for(let i=0; i<files.length;i++){
        let filename = files[i].name.replace(/\.[^/.]+$/, "")
        callback(filename)
    };
}
// Returns all files in a directory in an array of their filenames
exports.arrayFromDir = function(startPath, filter, callback) {
    // console.log('Starting from dir '+startPath+'/');
    let array = []
    const tree = dirTree(startPath, {extensions:/\.json$/});
    // console.log(tree)
    let files = tree.children
    for(let i=0; i<files.length;i++){
        let filename = files[i].name.replace(/\.[^/.]+$/, "")
        array.push(filename)
    };
    console.log(array)
    callback(array)
}