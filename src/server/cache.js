var url = require("url");
var path = require("path");

let config = {
    fileMatch: /^(gif|png|jpg|js|css|html)$/ig,
    // maxAge: 60*60*24*365
    maxAge: 60*60*1 
};

module.exports = function (request, response,next) {
    var pathname = url.parse(request.url).pathname;
    var ext = path.extname(pathname);
    ext = ext ? ext.slice(1) : 'unknown';
    if (ext.match(config.fileMatch)) {

        var expires = new Date();

        expires.setTime(expires.getTime() + config.maxAge * 1000);

        response.setHeader("Expires", expires.toUTCString());
        
        response.setHeader("Cache-Control", "max-age=" + config.maxAge);

    }
    next();
}