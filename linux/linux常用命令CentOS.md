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

* 删除用户：`userdel username`

* 设置密码：`passwd username`




