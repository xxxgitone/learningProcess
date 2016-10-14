#git的使用

##1.怎样将MyEclipse中的项目上传到github中
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

		