var htt = require("http");
var fs = require("fs");

htt.createServer(function( request, response) {
    
    fs.readFile("app.js", function(erro, conteudo){
        
        if (erro) {
        
            console.log(erro);
            
        } else {
        
            response.write(conteudo);
            
        }

        response.end();
        
    })
    
}).listen( process.env.http_port );


