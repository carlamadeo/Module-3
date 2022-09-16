const fs = require('fs');
const http = require('http');
const path = require('path');

//Escribí acá tu servidor
http.createServer( (req, res) => {

  const imgURL = path.join(__dirname, 'images', `${req.url}.jpg`);
  fs.readFile(imgURL, (err, data) => {
    if(err){
      res.writeHead(404, {'Content-Type': 'text/plain'}, 'utf8');
      res.end('Recurso no encontrado');
    }
    else{
      res.writeHead(200, {'Content-Type': 'image/jpg'});
      res.end(data);
    }
  });
  
}).listen(3000, '127.0.0.1');