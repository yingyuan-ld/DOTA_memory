var url = require("url");
var fs = require("fs");
var action = {
    "/login":function(request, response){

            var temp_url = url.parse(request.url);
            response.writeHead(200, {'Content-Type': 'application/json'});  
            let name = decodeURI(temp_url.query)
            var res = {text:"登录成功,欢迎你"+"\""+name+"\""}  
            response.write(JSON.stringify(res)); 
            response.end();
        },
    "/message":function(pathname,request, response){
            let rurl = url.parse(request.url);
            response.writeHead(200, {'Content-Type': 'application/json'});  
            var name = {name:"ludi",text:"hehe"}  
            response.write(JSON.stringify(name)); 
            response.end();
        }
}
module.exports= action;