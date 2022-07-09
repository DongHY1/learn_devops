# How to use?
node server.js
+ 如果用手机,连接同一WIFI也可以通过主机的IP地址加端口号访问
+ 在电脑上可以用curl -v localhost:3000访问

# Question
## 什么是 rewrite 和 redirect?
rewrite:重写URL地址
redirect:重定向URL地址
## 如何给响应头添加Content-Length
为什么会没有Content-Length?
因为：Transfer-Encoding: chunked时，数据以一系列分块的形式进行发送。 Content-Length 首部在这种情况下不被发送
[mdn解释](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Transfer-Encoding)
```javascript
  res.writeHead(200, {
    'Content-Length' : html.length
});
```