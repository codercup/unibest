# 前端打包
FROM node:24 AS build
WORKDIR /app
# 安装pnpm
RUN npm install -g pnpm
# 设置pnpm镜像源
RUN pnpm config set registry https://registry.npmmirror.com
# 复制依赖文件
COPY package.json pnpm-lock.yaml ./
# 安装依赖（类似npm ci的严格模式）
RUN pnpm install --frozen-lockfile
# 复制源代码
COPY . .
# 构建项目
RUN pnpm run build

# 内容组装
FROM nginx:1.29.1 AS final

COPY --from=build /app/dist/build/h5 /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf

CMD nginx -g  "daemon off;"
