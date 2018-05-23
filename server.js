var http = require('http');
var fs = require("fs");
var url = require("url");

http.createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname;
    if(pathname == "/message"){
        let rurl = url.parse(request.url);
        response.writeHead(200, {'Content-Type': 'application/json'});  
        var name = {name:"ludi",text:"hehe"}  
        response.write(JSON.stringify(name)); 
        response.end();
    }
    // 从文件系统中读取请求的文件内容
    if(pathname=="/index.html"||pathname=='/build/bundle.js')fs.readFile(pathname.substr(1), function (err, data) {
        if (err) {
            console.log(err);
            response.writeHead(404, {'Content-Type': 'text/html'});
        }else{             
            response.writeHead(200, {'Content-Type': 'text/html'});    
            response.write(data.toString());        
        }
        response.end();
    }); 
}).listen(8080);

console.log('Server running at http://127.0.0.1:8080/');