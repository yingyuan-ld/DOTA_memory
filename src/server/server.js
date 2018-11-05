var http = require('http');
var fs = require("fs");
var url = require("url");

let server = http.createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname;
    pathname = pathname=="/"?"/index.html":pathname;
    let type = pathname.split('.').pop();
    let contentType = {
        "css": "text/css",
        "gif": "image/gif",
        "html": "text/html",
        "ico": "image/x-icon",
        "jpeg": "image/jpeg",
        "jpg": "image/jpeg",
        "js": "text/javascript",
        "json": "application/json",
        "pdf": "application/pdf",
        "png": "image/png",
        "svg": "image/svg+xml",
        "swf": "application/x-shockwave-flash",
        "tiff": "image/tiff",
        "txt": "text/plain",
        "wav": "audio/x-wav",
        "wma": "audio/x-ms-wma",
        "wmv": "video/x-ms-wmv",
        "xml": "text/xml"
      }
    // 从文件系统中读取请求的文件内容
    fs.readFile(pathname.substr(1), function (err, data) {
        if (err) {
            console.log(err);
            response.writeHead(404, {'Content-Type': 'text/html'});
        }else{          
            response.writeHead(200, {'Content-Type': contentType[type]});    
            response.write(data);
        }
        response.end();
    }); 
}).listen(80);
const io = require('socket.io')(server); 

var history = new Array();
var persenObj = {};//登录人员对象
var persenAry = [];//登录人员数组
var messageAry = [];//消息数组数组
io.on('connection', function(socket){
    socket.on('login', function(name){//接收登录信息
        var res = {};
        if(!persenObj[name]){
            persenObj[name]=socket.id;
            persenAry.push({
                name:name,
                id:socket.id,
                state:"free"
            });
            res = {
                type:true,
                name:name,
                id:socket.id,
                message : "登录成功,欢迎你\""+name+"\""
            }
        }else{
            res = {
                type:false,
                message:"已有相同的用户名!"
            }
        }
        socket.emit('getLogin', res);//给指定的客户端发送消息
        if(res.type){
            socket.join('prepare room');
            getpersen(persenAry);
            getmessage({
                system:true,
                name:"系统消息",
                value:'玩家"'+name+'"登录游戏'
            });
        }
    });
    socket.on('sendmessage', function(mymessage){//广播消息
        for(fatename in persenObj){
            if(persenObj[fatename]===socket.id)break;
        }
        getmessage({
            system:false,
            name:fatename,
            value:mymessage
        });
    });
    socket.on('sendFight', function(challengId){//发起挑战
        for(fatename in persenObj){
            if(persenObj[fatename]===socket.id)break;
        }
        io.to(challengId).emit('getFight',{
            id:socket.id,
            name:fatename,
            message:'"'+fatename+'"向你发起挑战,是否迎战'
        });
    });
    socket.on('fightAns', function(res){//接受挑战
        if(res.fight){
            let myname;
            for(i in persenAry){
                if(persenAry[i].id===socket.id){
                    persenAry[i].state = "fighting";
                    persenAry[i].tname= res.name;
                    persenAry[i].tid = res.id;
                    myname = persenAry[i].name;
                }
                if(persenAry[i].id===res.id){
                    persenAry[i].state = "fighting"
                    persenAry[i].tname= myname;//可能没有取到
                    persenAry[i].tid = socket.id;
                }
            }
            getpersen(persenAry);
            getmessage({
                system:true,
                name:"系统消息",
                value:'玩家"'+res.name+'"和"'+myname+'"开战'
            })
            io.to(res.id).emit('fightAns',{
                fight:true,
                name:myname,
                id:socket.id,
                message:'对方接受了挑战!'
            });
        }else{
            io.to(res.id).emit('fightAns',{
                fight:false,
                message:'对方让你滚蛋!'
            });
        }
    });
    socket.on('logout', function(res){//退出登录
        persenObj[res.name] = "";
        for(i in persenAry){
            if(persenAry[i].id===res.id){
                if(persenAry[i].tid){
                    io.to(persenAry[i].tid).emit('runaway',{//逃跑消息
                        message:'对方逃跑了'
                    });
                }
                persenAry.splice(i, 1);
                break;
            }
        }
        getpersen(persenAry);
        getmessage({
            system:true,
            name:"系统消息",
            value:'玩家"'+res.name+'"离开了...'
        });
    });
    socket.on('fightResult', function(res){//战斗结果
        for(i in persenAry){
            if(persenAry[i].id===res.id){
                persenAry[i].state = "free";
                persenAry[i].tid = null;
            }
        }
        getpersen(persenAry);
    });
    socket.on('totalk', function(res){//游戏交互
        // console.info(res);
        io.to(res.id).emit('totalk',res);
    });
    
});

let getpersen = function(persenAry){
    io.in('prepare room').emit('getpersen', persenAry);
}
let getmessage = function(message){
    messageAry.push(message);
    if(messageAry.length>100)messageAry.shift();
    io.in('prepare room').emit('getmessage', messageAry);
}
console.log('Server running at http://127.0.0.1:80/');