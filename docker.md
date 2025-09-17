## Docker

根据提供的 `Dockerfile`，可以通过以下步骤构建并运行镜像：

### 1. 构建Docker镜像

在项目根目录执行以下命令：

- `-t unibest:v1-2025091701`：为镜像指定名称和标签，YYYYMMDD+编号
- `.`：表示使用当前目录的Dockerfile

```bash
docker build -t unibest:v1-2025091701 .
docker build -t unibest:v1-2025091702 .
```
### 2. 运行Docker容器
使用以下命令运行容器：

```bash
docker run -d --name unibest-v1-2025091701 -p 80:80 unibest:v1-2025091701
docker run -d --name unibest-v1-2025091702 -p 80:80 unibest:v1-2025091702
```

- `-d`：表示在后台运行容器
- `-p 80:80`：将容器的80端口映射到主机的80端口
- `--name unibest-v1-2025091701`：为容器指定一个名称


