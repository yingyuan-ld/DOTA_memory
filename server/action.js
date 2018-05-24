var url = require("url");
var fs = require("fs");
var persen = {};
var action = {
    "/login":function(request, response){
        var temp_url = url.parse(request.url);
        response.writeHead(200, {'Content-Type': 'application/json'});  
        let name = decodeURI(temp_url.query)
        var res = {};
        if(!persen[name]){
            persen[name] = true;
            res = {
                type:true,
                message:"登录成功,欢迎你"+"\""+name+"\""
            }  
        }else{
            res = {
                type:false,
                message:"已有相同的用户名!"
            }
        }
        response.write(JSON.stringify(res)); 
        response.end();
    },
    "/getpersen":function(request, response){
        let rurl = url.parse(request.url);
        response.writeHead(200, {'Content-Type': 'application/json'});  
        // response.write(JSON.stringify(persen));
        let persens = {
            ludi:true,
            huhu:true,
            hehe:true,
            haha:true,
            name:true,
            nulll:true,
        }
        response.write(JSON.stringify(persens)); 
        response.end();
    },
    "/message":function(request, response){
        let rurl = url.parse(request.url);
        response.writeHead(200, {'Content-Type': 'application/json'});  
        var name = {name:"ludi",text:"hehe"}  
        response.write(JSON.stringify(name)); 
        response.end();
    }
}
module.exports= action;