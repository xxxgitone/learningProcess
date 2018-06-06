# 配置多个ssh

通常我们会面临多个平台管理代码的情况，拿最简单的情况来看，个人一般将代码放在github上，而公司一般则会自己搭建自己的git服务。用户身份一多，如果稍不留神
就会导致自己提交用户错乱，我就吃过这样的亏，以公司的用户身份提交到了自己的github上。:sob: 

以往为了简单，我都是以`https`的形式进行克隆仓库，虽然简单，每次提交都得输入用户名和密码，也是挺烦的，虽然可以通过以下设置

```bash
git config user.name "xxxgitone"
git config user.email "xxxgit@sina.com"
```

> 记得不要加`--global`,  要不然就设置全局了，要是其他的项目忘了设置，那么都以这个身份了

每次新项目或者克隆下来都得重复这样的操作，麻烦

对比以下`https`和`ssh`方式的区别

* `https`的形式非常简单，直接克隆就行，但是每次`push`和`pull`都得输入密码和用户名

* `ssh`稍微复杂一点，需要进行配置，并且想要使用SSH url克隆的话，你必须是这个项目的拥有者

对于程序员来说，估计就是最不愿意重复的做某件事，比如输入密码和用户名 :joy:

以自身为例，自己的代码主要托管于`github`，当然码云和`bitbucket`也有,公司的代码在`gitlab`上公司，搭建的git服务，这里记录配置`github`和
`gitlab`的步骤，其他类似。


生成`github`的`ssh key`

```bash
ssh-keygen -t rsa -C "xxxgit@sina.com" -f ~/.ssh/giuhub_rsa
```

然后将`.ssh`文件下的`github_rsa.pub`复制到`github`的`ssh key`配置中

生成`gitlab`的`ssh key`

```bash
ssh-keygen -t rsa -C "name@yourcompany.com" -f ~/.ssh/gitlab_rsa
```

然后将`.ssh`文件下的`gitlib_rsa.pub`复制到`gitlib`的`ssh key`配置中

然后写一个配置文件，让不同平台使用其对应的`ssh key`

在`.ssh`目录下生成`config`文件

```bash
# gitlab
Host gitlab.company.com
HostName gitlab.company.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/gitlib_rsa

# github
Host github.com
HostName github.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/github_rsa
```

最后进行测试，看是否成功

```bash
ssh -T git@github.com
```

如果输出
```
Hi xxxgitone! You've successfully authenticated, but GitHub does not provide shell access
```
则表明正确连接 :heart: 其他测试类似
