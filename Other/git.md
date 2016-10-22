#git的使用

##怎样将MyEclipse中的项目上传到github中
* MyEclipse

		1.选中项目右击，Team-->share project-->git-->next
		2.选中 Use or create repository in parent folder of project
		3.选中项目 点击 Create repository  结束
		4.继续选中项目 Team-->commit-->文件全选-->输入commit信息-->commit
* git 

	进入github创建仓库，不要勾选创建READNE文件，复制仓库https路径

		1.进入本地仓库路径(上面方法创建的就在MyEclipse工作空间那个目录)
		2.git status
		3.git remote add origin https路径
		4.gitpush


##怎么样保证fork出来的project和原project(上游项目)同步更新

当我们 在github上fork出一个项目后，如果原有的项目更新了，怎样保持我们fork出来的项目和原有项目保持同步呢并提交我们的代码更新呢？即怎样保持fork出的项目和上游项目保持更新，怎样创建pull request？关键步骤是使用git 的 rebase 命令。 	

步骤：

1.  在 Fork 的代码库中添加上游代码库的 remote 源，该操作只需操作一次即可。

	如: 其中# upstream 表示上游代码库名， 可以任意。

		git remote add upstream https://github.scm.corp.ebay.com/montage/frontend-ui-workspace

2. 将本地的修改提交 commit

3. 在每次 Pull Request 前做如下操作，即可实现和上游版本库的同步。

      	3.1 ： git remote update upstream

      	3.2 ： git rebase upstream/{branch name}

	需要注意的是在操作3.2之前，一定要将checkout到{branch name}所指定的branch，

	如:

		git checkout develop

4. Push 代码到 Github

		git push