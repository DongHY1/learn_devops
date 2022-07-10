# FROM node:14-alpine as builder

# WORKDIR /code
# RUN npm i -g pnpm
# # 单独分离 package.json，是为了安装依赖可最大限度利用缓存
# ADD package.json pnpm-lock.yaml /code/
# # 此时，yarn 可以利用缓存，如果 yarn.lock 内容没有变化，则不会重新依赖安装
# RUN pnpm install
# ADD . /code
# RUN pnpm run build

# FROM nginx:alpine
# COPY --from=builder code/dist /usr/share/nginx/html
FROM node:14-alpine as builder

WORKDIR /code

# 单独分离 package.json，是为了安装依赖可最大限度利用缓存
ADD package.json yarn.lock /code/
RUN yarn

ADD . /code
RUN npm run build

# 选择更小体积的基础镜像
FROM nginx:alpine
COPY --from=builder code/dist /usr/share/nginx/html