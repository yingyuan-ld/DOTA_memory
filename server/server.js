var http = require('http');
var fs = require("fs");
var url = require("url");
var action=require("./action.js");

http.createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname;
    // 从文件系统中读取请求的文件内容
    if(pathname=="/index.html"||pathname=='/build/bundle.js'){
        fs.readFile(pathname.substr(1), function (err, data) {
            if (err) {
                console.log(err);
                response.writeHead(404, {'Content-Type': 'text/html'});
            }else{             
                response.writeHead(200, {'Content-Type': 'text/html'});    
                response.write(data.toString());        
            }
            response.end();
        }); 
    }else{
        action[pathname]?action[pathname](request, response):"";//请求处理action
    }
    // action(pathname,request, response);//请求处理action
}).listen(8088);

console.log('Server running at http://127.0.0.1:8088/');