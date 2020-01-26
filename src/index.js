var http = require('http');
var rs = require('fs'); //trabajar con archivos en nodejs
var {info} = require('./modules/mylog');
var firebase = require('../libs/firebase');
var {countries} = require('countries-list');
var url = require('url');
var queryString = require('querystring');

var server = http.createServer(function(request, response){
    
    var parsed = url.parse(request.url);
    console.log("Parsed: ", parsed);
    
    var pathname = parsed.pathname;

    var query = queryString.parse(parsed.query);
    console.log("query", query);

    if (pathname === "/")
    {       
        response.writeHead(200, {'Content-type':'text/html'}); 
        response.write('<html><body><p>HOME PAGE</p></body></html>')
    }else if (pathname === "/exit")
    {        
        response.writeHead(200, {'Content-type':'text/html'});
        response.write('<html><body><p>Bye</p></body></html>')
    }else if (pathname === "/country")
    {                
        response.writeHead(200, {'Content-type':'application/json'});
        response.write(JSON.stringify(countries[query.code]));
    }
    else if (pathname === "/info"){        
        var result = info(pathname);        
        response.write(result);
    }
    else{
        response.write('<html><body><p>NOT FOUND</p></body></html>')
    }
    
    response.end; 
});


server.listen(4000);

console.log("Running on: 4000");