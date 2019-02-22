var htt = require("http");

htt.createServer(function( request, response) {
    response.write("Olá mundo");
    response.end();
}).listen( process.env.http_port );


