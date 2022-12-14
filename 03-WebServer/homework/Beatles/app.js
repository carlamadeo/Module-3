const http = require('http');
const fs = require('fs');

const beatles = [
  {
    name: "John Lennon",
    birthdate: "09/10/1940",
    profilePic: "https://blogs.correiobraziliense.com.br/trilhasonora/wp-content/uploads/sites/39/2020/10/CBNFOT081020100047-550x549.jpg"
  },
  {
    name: "Paul McCartney",
    birthdate: "18/06/1942",
    profilePic: "http://gazettereview.com/wp-content/uploads/2016/06/paul-mccartney.jpg"
  },
  {
    name: "George Harrison",
    birthdate: "25/02/1946",
    profilePic: "https://canaldosbeatles.files.wordpress.com/2012/02/george-george-harrison-8321345-438-600.jpg"
  },
  {
    name: "Richard Starkey",
    birthdate: "07/08/1940",
    profilePic: "http://cp91279.biography.com/BIO_Bio-Shorts_0_Ringo-Starr_SF_HD_768x432-16x9.jpg"
  }
]


http.createServer( (req, res) => {

  if(req.url === '/'){
    const html = fs.readFileSync(__dirname +'/index.html', 'utf8');
    res.writeHead(200, {'Content-Type':'text/html'});
    res.end(html);
  }

  else if(req.url === '/api' || req.url === '/api/'){
    res.writeHead(200, {'Content-Type':'application/json'});
    res.end(JSON.stringify(beatles));
  }

  else if(req.url.startsWith('/api')){
    const name = decodeURI(req.url.replace('api/', '').replaceAll('/', '').toUpperCase());
    const beatle = beatles.find( (b) => b.name.toUpperCase() === name);

    if(beatle) {
      let html = fs.readFileSync(__dirname +'/beatle.html', 'utf8');
      res.writeHead(200, {'Content-Type':'text/html'});
      html = html.replaceAll('{beatle}', beatle.name).replace('{birthdate}', beatle.birthdate).replace('{profilePic}', beatle.profilePic);
      res.end(html);
    }
    
  }

  else{
    res.writeHead(404, {'Content-Type':'text/plain'})
    res.end('Recurso no encontrado\n');
  }

}).listen(3000,'127.0.0.1');
