import http2 from 'http2';
import fs from 'fs';


const server = http2.createSecureServer( {
  key: fs.readFileSync('./keys/server.key'),
  cert: fs.readFileSync('./keys/server.crt'),
}, (req, res) => {
  res.end('Hello World from http2');
  console.log(req.url);
  
});

server.listen(8080, () => {
  console.log('Server is running on port 8080');
});