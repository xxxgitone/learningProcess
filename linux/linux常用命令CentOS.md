# linux常用命令(CentOS)

### 软件操作命令

* 软件包管理器：`yum`

* 安装软件：`yum install xxx`

* 卸载软件：`yum remove xxx`

* 搜索软件：`yum search xxx`

* 清理缓存：`yum clean packages`

* 列出已安装：`yum list`

* 查看软件信息： `yum info xxx-common`

### 服务器硬件资源信息

* 内存：`free -m`

* 硬盘：`df -h`

* 负载：`w/top`

* cpu个数和核数：`cat /proc/cpuinfo`

### 文件操作命令

#### linux文件目录结构

* 根目录`/`

* 家目录`/home`

* 临时目录`/tmp`(会定时删除，可以存放一些临时文件)

* 配置目录`/etc`

* 用户程序目录`/usr`

#### 文件操作基本命令

* 查看目录下的文件`ls`

  * `ls -al` 和`ll`显示详细信息

* 新建文件`touch`

* 新建文件夹`mkdir`

  * 新建多层目录文件`mkdir -p workspace/demo/test`

* 进入目录`cd`

* 删除文件和目录`rm`

  * `rm test.json`

  * `rm -rf  workspace`目录

* 复制`cp`

  * `cp ./test.json ~/test.json`复制当前 `test`文件到家目录下，而且可以重命名

* 移动`mv`

  * `mp ./test.json ~/`当前 `test`文件到家目录下

* 显示路径`pwd`

#### 文本编辑器VIM

#### 文件搜索，查找和读取

* 从文件尾部开始读`tail`

* 从文件头部读`head`

* 读取整个文件`cat`

* 分页读取`more`

* 可控分页`less`

* 搜索关键字`grep`

* 查找文件`find`

  * 当前目录的所有文件`find .`

  * 某个文件夹下的所有文件`find /dir`

  * 某个文件名录下的`.vue`文件`find ./src/ -name '*.vue'`

  * 某个文件目录下的文件夹`find . -type d`

  * 某个文件目录下的文件`find . -type f`

* 统计个数`wc` 

  * 统计某个文件的行数`cat filename | wc -l`

  * 统计某个关键字在文件中出现的频次`grep '2018-06-17' filename | wc -l`

#### 文件解压缩(一般使用gzip)

* 参数意义

  * `-c`: `--create`建立新的备份文件

  * `-z`: `--gzip`过gzip指令处理备份文

  * `-v`: `--verbose`显示指令执行过程

  * `-f`:  `--file=`指定备份文件

  * `-x`: `--extrac`从备份文件中还原文件

  * `-t`: `--list`列出备份文件的内容

* 压缩：`tar -czvf test.tar.gz test`

* 查看压缩文件有哪些文件：`tar -tzvf test.tar.gz`

* 解压：`tar -xzvf test.tar.gz`

### 系统用户操作命令

* 添加用户：`useradd username`

  * 添加用户：`adduser`,在`centOS`中这个命令和`useradd`没有什么区别，在`Ubuntu`中区别挺大，如下

    * `useradd`在使用该命令创建用户是不会在 `/home`下自动创建与用户名同名的用户目录，而且不会自动选择`shell`版本，也没有设置密码，那么这个用户是不能登录的，需要使用`passwd`命令修改密码。

    * `adduser`在使用该命令创建用户是会在`/home`下自动创建与用户名同名的用户目录，系统`shell`版本，会在创建时会提示输入密码，更加友好
    
  * 添加用户后，还得将用户添加到`sudoers`中，`vim /etc/sudoers`,添加
  
  ```
	%xujiang  ALL=(ALL)       ALL
  ```

* 删除用户：`userdel username`

* 设置密码：`passwd username`

### 防火墙设置

* 安装：`yum install firewalld(centOS7默认安装)`

  * 确认已经安装`yum list | grep firewall`

  * 确认服务已经启动`ps -ef | grep firewall`

* 启动：`service firewalld start`

* 检查状态：`service firewalld status`

* 关闭或禁用防火墙：`service firewalld stop/disable`

* 安装好后，防火墙会提供一个命令`firewall-cmd`

  * 版本：`firewall-cmd --version`

  * 状态：`firewall-cmd --state`

  * 区域：`firewall-cmd --get-zones`

  * 默认区域：`firewall-cmd --get-default-zone`

  * 所有区域：`firewall-cmd --list-all-zone`

### 提权和文件上传下载操作

* 提权：`sudo`

  * `visudo`: 让用户可以执行sudo命令,`visudo`命令，添加`%username ALL=(ALL)       ALL`

* 文件下载：`wget、curl`

* 文件上传到服务器`scp`

  * 上传：`scp filename username@ip:/your/path`
  * 下载：`scp username@ip:/your/path/filename ./`

### WebServer之Nginx

#### 基本操作

* 安装：`yum install -y nginx`

  * `centOS7`需要先添加`nginx`到`yum`源：`sudo rpm -Uvh http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm`

* 启动：`service nginx start`

* 停止：`service nginx stop`

* 重载：`service nginx reload`

  * 安装并且启动`nginx`服务后，可以通过主机ip访问，默认访问80端口，可以看到`welcome to nginx!`页面(如果访问不到，先关闭防火墙)

#### 访问静态资源(实现域名`www.xujiang.com`访问服务器www目录下的index.html文件)

* 关闭防火墙：`sudo service firewalld stop`

* 新建文件并写入内容`sudo mkdir /data/www`,`sudo vim /data/www/index.html`

* 添加配置文件`cd /etc/nginx/conf.d`,`sudo vim xujiang.conf`

  ```shell
  server {
          # 可以配置多端口
          listen  80;
          # 可以配置多域名
          server_name www.xujiang.com;
          root /data/www;
          index index.html index.htm;
          location / {
                  # 所有访问.htm路径都转发到index.html
                  rewrite ^(.*)\.htm$ /index.html;
          }
  }
  ```

* 重启`nginx`服务，`sudo service nginx reload`

* 因为通过自定义域名访问，要修改本地电脑`host`文件,`sudo vim /etc/hosts`,添加`本机ip www.xujiang.com`

* 关闭`SELinux`

  * 查看状态：`getenforce`

  * 临时关闭：`setenforce 0`

  * 永久关闭（需要重启机器）：`sudo vim /etc/selinux/config`,修改为`SELINUX=disabled`

#### 反向代理(表面上访问本台服务器，实际上代理到了其他服务器)

实现通过`www.xujiang.com`代理到`www.xxxuthus.cn`

修改`xujiang.conf`

```shell
upstream xujiang {
				# www.xxxuthus.cn对应的服务器ip
        server 106.14.173.2:80;
}

server {
        listen  80;
        server_name www.xujiang.com;
        root /data/www;
        index index.html index.htm;
        location / {
                #rewrite ^(.*)\.htm$ /index.html;
                proxy_set_header Host www.xxxuthus.cn;
                proxy_pass http://xujiang;
        }
}
```

#### 负载均衡

服务器分流，分发到多个服务器

```shell
upstream xujiang {
				# www.xxxuthus.cn对应的服务器ip
        server 106.14.173.2:80;
        
        # 增加多个服务器 
        server	10.102.75.152:80
}
```


