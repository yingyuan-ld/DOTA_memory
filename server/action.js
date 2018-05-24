var dell = function(pathname,request, response){
    if(pathname == "/message"){
        let rurl = url.parse(request.url);
        response.writeHead(200, {'Content-Type': 'application/json'});  
        var name = {name:"ludi",text:"hehe"}  
        response.write(JSON.stringify(name)); 
        response.end();
    }
    if(pathname == "/login"){
        let rurl = url.parse(request.url);
        response.writeHead(200, {'Content-Type': 'application/json'});  
        var name = {name:"ludi",text:"hehe"}  
        response.write(JSON.stringify(name)); 
        response.end();
    }
}
return dell;