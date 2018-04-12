# git常用操作命令

标签（空格分隔）： git

---

### 修改项目名

* 进入仓库主页面--> setting --> 直接在仓库名下输入想要更改的名字，点击rename即可 
* 进入本地仓库目录 --> `git remote -v` --> 可以看到当前仓库的列出所有远程仓库信息
* `git remote set-url origin git@github.com:xxxgitone/cms_server.git` 修改远程仓库对应的网址 --> 以上就可以了

### 如何将本地分支内容推送到不同名的远程分支上

假设现在在本地分支`feature/example`开发，想要推送到远程分支`sit`上

* `git checkout -b sit`
* `git pull origin sit`
* `git merge origin feature/example`
* `git push origin sit`

