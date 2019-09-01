var http = require('http');

server = http.createServer((req, res)=>{
  out = [];
  req.on('data', chunk=>{
    out.push(chunk);
  }
)
  res.writeHead(200, "content-type: application/json");
  res.end();
  
});

server.listen(3000);