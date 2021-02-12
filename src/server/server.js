let http = require('http');
let fs = require("fs");
let url = require("url");
let path = require("path");
var cache = require("./cache.js");

let server = http.createServer(function (request, response) {
    let pathname = url.parse(request.url).pathname;
    pathname = pathname=="/"?"/index.html":pathname;
    //------------------------------关于缓存的研究
    cache(request, response, next);    //缓存相关处理
    //---------------------------------------------
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
    function next (){
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
    }
}).listen(80);
// }).listen(81);
console.log('Server running at http://127.0.0.1:80/');
// console.log('Server running at http://127.0.0.1:81/');
const io = require('socket.io')(server); 

let history = new Array();
let persenObj = {};//登录人员对象
let persenAry = [];//登录人员数组
let messageAry = [];//消息数组数组

setInterval(function(){//确认在线状态用
    io.in('prepare room').emit('areYouOk'); //每5分钟去问问玩家，还活着没？
    for(let i=0;persenAry[i];i++){
        let persen = persenAry[i];
        persen.outLine++;             //并且每个人的离线数值加1
        if(persen.outLine>=12){       //离线超过1小时，踢出系统
            persenObj[persen.name] = "";
            if(persen.tid){
                io.to(persen.tid).emit('runaway',{//逃跑消息
                    message:'对方掉线了~~~'
                });
            }
            persenAry.splice(i, 1);
            updatePersen(persenAry);
            updateMessage({
                system:true,
                name:"系统消息",
                value:'玩家"'+persen.name+'"掉线了...'
            });
        }
    }
},300000);
io.on('connection', function(socket){
    socket.on('imOk', function(res){//如果玩家还活着，数值清零
        for(i in persenAry){
            if(persenAry[i].id===res.id){
                persenAry[i].outLine = 0;
                break;
            }
        }
    });
    socket.on('login', function(name){//接收登录信息
        let res = {};
        if(!persenObj[name]){
            persenObj[name]=socket.id;
            persenAry.push({
                name:name,
                id:socket.id,
                state:"free",
                outLine:0//离线值，每5min加1，到12踢出系统
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
            updatePersen(persenAry);
            updateMessage({
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
        updateMessage({
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
            updatePersen(persenAry);
            updateMessage({
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
        updatePersen(persenAry);
        updateMessage({
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
        updatePersen(persenAry);
    });
    socket.on('totalk', function(res){//游戏交互
        io.to(res.id).emit('totalk',res);
    });
    socket.on('getPersen', function(res){// 返回人员列表
        io.in(res.id).emit('updatePersen', persenAry);
    });
    socket.on('getMessage', function(res){// 返回消息记录
        io.to(res.id).emit('updateMessage',messageAry);
    });
});

let updatePersen = function(persenAry){// 告诉玩家 当前登录人信息
    io.in('prepare room').emit('updatePersen', persenAry);
}
let updateMessage = function(message){// 发送消息
    messageAry.push(message);
    if(messageAry.length>100)messageAry.shift();
    io.in('prepare room').emit('updateMessage', messageAry);
}