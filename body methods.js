exports.bodyJSON = function(req, callback){
    let string = [];
    req.on('data', chunk=>{
      string.push(chunk);
      
    }).on('end', ()=>{
      string = string.toString();
      callback(string);
    })
}
