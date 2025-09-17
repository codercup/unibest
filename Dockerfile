# 使用官方 Node.js 作为基础镜像；不适用 alpine 版本，这样可以自带git
FROM node:latest AS builder

# 在容器中创建目录
WORKDIR /app

# 安装pnpm
RUN npm install -g pnpm@10.10.0
# 设置pnpm镜像源
RUN pnpm config set registry https://registry.npmmirror.com
# 复制依赖文件
COPY package.json pnpm-lock.yaml ./
# 先复制scripts目录，因为prepare脚本需要用到其中的文件
COPY scripts ./scripts
# 创建src目录，确保create-base-files.js脚本能正常写入文件
RUN mkdir -p src
# 安装依赖
RUN pnpm install
# 复制其余源代码
COPY . .
# 构建项目
RUN pnpm run build


# 使用nginx作为服务
FROM nginx:1.29.1-alpine3.22 AS production-stage

# 将构建好的项目复制到nginx下
COPY --from=builder /app/dist/build/h5 /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

# 暴露端口
EXPOSE 80
EXPOSE 443

# 启动nginx
CMD ["nginx", "-g", "daemon off;"]
