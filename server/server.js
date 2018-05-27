var http = require('http');
var fs = require("fs");
var url = require("url");
// var action=require("./action.js");

let server = http.createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname;
    // 从文件系统中读取请求的文件内容
    // if(pathname=="/index.html"||pathname=='/build/bundle.js'){
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
    // }else{
    //     action[pathname]?action[pathname](request, response):"";//请求处理action
    // }
}).listen(8088);
const io = require('socket.io')(server); 

var history = new Array();
var persen = {};
io.on('connection', function(socket){
    socket.on('login', function(name){
        var res = {};
        if(!persen[name]){
            persen[name] = {
                id:socket.id,
                state:"free"
            };
            res = {
                type:true,
                message : "登录成功,欢迎你\""+name+"\""
            }
        }else{
            res = {
                type:false,
                message:"已有相同的用户名!"
            }
        }
        socket.emit('loginreturn', res);//给指定的客户端发送消息
        if(res.type){
            socket.join('prepare room');
            io.in('prepare room').emit('message', {
                persen:persen,
                message:'玩家"'+name+'"登录游戏'
            });
        }
    });
    socket.on('letsFight', function(name){//发起挑战
        for(fatename in persen){
            if(persen[fatename].id===socket.id)break;
        }
        io.to(persen[name].id).emit('letsFight',{
            name:fatename,
            message:'"'+fatename+'"向你发起挑战'
        });
    });
    socket.on('okFight', function(res){
        if(tes.fight){//接受挑战
            for(fatename in persen){
                if(persen[fatename].id===socket.id){
                    persen[fatename].state = "fighting"
                    break;
                }
            }
            persen[res.name].state = "fighting";
            io.in('prepare room').emit('message', {
                persen:persen,
                message:'"'+fatename+'"和"'+res.name+'"开战了!'
            });
        }else{
            //没有接收挑战
        }
    });
});
console.log('Server running at http://127.0.0.1:8088/');