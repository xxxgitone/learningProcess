# centos
### docker安装centos镜像

* 更新和安装curl `sudo apt-get update $ sudo apt-get install curl`
* 获得最新的docker安装包 `curl -sSL https://get.docker.com/ | sh`
* 将用户加入到docker用户组 `sudo usermod -aG docker USER_NAME`，若没添加成功，之后`docker`操作都要加`sudo`
* 拉取镜像 `docker pull NAME[:TAG]`， 如获取Ubuntu 14.04版镜像 `docker pull ubuntu:14.04`, TAG不显示说明自动为最新版

### docker操作

* 查看本机的所有容器 `docker ps -a`, 查看运行的容器 `docker ps`

* 创建容器 `docker create -it NAME[:TAG]`, 或新建并启动容器命令 `docker run -it NAME[:TAG]`

* 启动容器 `docker start` 容器名或ID

* 终止容器 `docker stop` 容器名或ID

* 进入容器

  * 使用attach命令：`docker attach` 容器名或ID

  * 使用exec命令(推荐)： `docker exec -it` 容器名或ID /bin/bash

  * 使用nsenter工具

* 删除容器 docker rm 容器名或ID

* 导出容器， 如`docker export -o ubuntu_for_run.tar c51d4f7ef554`

* 导入容器， 如`docker import ubuntu_for_run.tar test/ubuntu:1.0`
