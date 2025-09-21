# 使用 node:24-alpine 作为基础镜像，固定版本+减少体积
FROM node:24-alpine AS builder

# 在容器中创建目录
WORKDIR /app

# 安装pnpm（使用 npm 的 --global-style 可以减少依赖安装体积）
RUN npm install -g pnpm@10.10.0 --global-style
# 设置pnpm镜像源
RUN pnpm config set registry https://registry.npmmirror.com
# 复制依赖文件
COPY package.json pnpm-lock.yaml ./
# 先复制scripts目录，因为prepare脚本需要用到其中的文件
COPY scripts ./scripts
# 安装依赖，但跳过prepare脚本（这一步会缓存，只有 package.json 或 pnpm-lock.yaml 变化时才会重新运行）
RUN pnpm install --ignore-scripts --frozen-lockfile
# 手动执行我们需要的docker:prepare脚本
RUN pnpm run docker:prepare
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
