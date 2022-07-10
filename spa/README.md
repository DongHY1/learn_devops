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
还有以下可以做
+ 使用 terser 压缩 Javascript 资源 
+ 使用 cssnano 压缩 CSS 资源
+ 使用 sharp/CDN 压缩 Image 资源或转化为 Webp
+ 使用 webpack 将小图片转化为 DataURI
+ 使用 webpack 进行更精细的分包，避免一行代码的改动使大量文件的缓存失效