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

