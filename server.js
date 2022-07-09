const http = require('http');
const fs = require('fs');
const html = fs.readFileSync('./index.html')
http.createServer((req,res)=>{
  res.writeHead(200, {
    'Content-Length' : html.length
});
  fs.createReadStream('./index.html').pipe(res)
}).listen(3000,()=>{
  console.log('PORT:3000 LISTEN!')
})