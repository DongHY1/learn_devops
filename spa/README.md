# SPA应用部署
## 路由问题 (History模式)
通过nginx配置解决
```
    location / {
        try_files  $uri $uri/ /index.html;
    }
```
## 性能优化
gzip,开启缓存,带hash的缓存一年(在打包后的assets目录下,nginx中配置)
