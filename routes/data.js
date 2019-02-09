var fs=require('fs');

exports.finduser=function(username,cb){
    fs.readFile('auth.json','utf-8',function(err,data){
        if(err){
            console.log(err);
        }
        else{
            var arr=JSON.parse(data);
            if(arr.username==username){
                return cb(null,arr);
            }
        }
        
    });
}


exports.findid = function(id, cb) {
    process.nextTick(function() {
      fs.readFile('auth.json','utf-8',function(err,data){
          if(err){
              console.log(err);
          }
          else{
            var arr=JSON.parse(data);
            if(arr.id==1){
            cb(null, arr);
          }
          else{
              cb(new Error('User ' + id + ' does not exist'));
          }
        }
      });
      
    });
  }







