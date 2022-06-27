const http = require('http');
const fs = require('fs');
const html = fs.readFileSync('./index.html')
const server =http.createServer((req,res)=>{
  fs.createReadStream('./index.html').pipe(res)
})
server.listen(3000,()=>{
  console.log('PORT:3000 LISTEN!')
})