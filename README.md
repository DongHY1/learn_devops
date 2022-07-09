# 第一章：Use Node
## How to use?
node server.js
+ 如果用手机,连接同一WIFI也可以通过主机的IP地址加端口号访问
+ 在电脑上可以用curl -v localhost:3000访问

## Question
### what is rewrite and redirect?
rewrite:重写URL地址
redirect:重定向URL地址
### How to add Content-Length Response Header
为什么会没有Content-Length?
因为：Transfer-Encoding: chunked时，数据以一系列分块的形式进行发送。 Content-Length 在这种情况下不被发送
[mdn解释](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Transfer-Encoding)
```javascript
  res.writeHead(200, {
    'Content-Length' : html.length
});
```
# PartII ：Use Docker with nodejs
## How to use?
+ write Dockerfile
+ Build Images
+ Build Container（write docker-compose.yaml can be simple, run docker-compose up -d --build）
# PartIII: Use Docker with nginx
## How to use?
使用Node的镜像体积太大,改用Nginx
```
docker run -it --rm nginx:alpine sh
```
-it(交互模式启动)
--rm(退出时清理容器文件系统)
sh(进入容器内终端,exit退出)
## 性能优化
+ 本地写nginx.conf文件通过yaml文件volumes映射到容器中。
+ 以下是多个docker-compose命令文件执行其中一个的方法
```
docker-compose -f docker-compose.yaml up learn-nginx
```
-f是指定使用的 Compose 模板文件 [命令地址](https://yeasy.gitbook.io/docker_practice/compose/commands)

