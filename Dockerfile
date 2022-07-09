# 选择一个体积小的镜像 (~5MB)
FROM nginx:alpine
ADD index.html /usr/share/nginx/html/
