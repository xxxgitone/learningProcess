# mongodb常用操作指令

### 1.创建简单mongodb服务器

* `mongod --dbpath E:\MongoDB\db`

* `mongo.exe`

### 2.数据库操作(CRUD)

* 显示数据库名称：`show dbs`

* 切换数据库：`use <dbname>`

* 删除当前数据库：`db.dropDatabase()`

* 想要新建数据库，直接使用`use <dbname>`,在需要的时候会自动创建

* 新建表`db.<表名>.insert({})`;数据以json的格式

* 显示表名 ：`show collections`

> 例子

	> use exapmledb

	> db.ex_collection1.insert({x:1}) //在表ex_collection1中插入数据{x:1}

	> show collections

	输出：
	
	ex_collection1
	system.indexes


#### 2.1 查
* 查询 ：`db.<表名>.find()` 默认返回所有数据

	`> db.ex_collection1.find()` 

* 查询表中数据，默认返回所有

	`{ "_id" : ObjectId("58e9e1c6d6ffabd315a4f74a"), "x" : 1 }`

	数据库会自动生成一个`_id`，也可以自己添加，但不能重复

* 条件查询：db.ex_collection1.find({x:1})

* 循环插入

	`> for(i=2;i<50;i++)db.ex_collection1.insert({x:i})`

* 计算查询出来的总数

	`> db.ex_collection1.find().count()`  

* 增加查询条件,下面表示，过滤前3条，返回两条，并且以x排序

	`db.ex_collection1.find().skip(3).limit(2).sort({x:1})`
#### 2.2 更新

* 更新数据，比如将`x：1`的数据改为`x：999`

	`db.ex_collection1.update({x:1},{x:999})` 

* 部分更新，比如有数据{x:100, y:100, z:100},想要以z:100为条件，更新里面的y为99；

	`db.ex_collection1.update({z:100},{$set:{y:99}})`

* 更新一条不存在的数据，如果查找y为100的数据，改为y：999，如果不存在的话就直接写入y：999数据,增加第三个参数true即可。

	`db.ex_collection1.update({y:100},{y:999},true)`

* 更新多条数据，mongodb默认更新一条数据，比如有三条c为1的数据，使用前面方式更新只会修改第一条。

	`db.immoc_collection.update({c:1},{$set:{c:2}},false,true)`
	
#### 2.3 删除
* 删除数据

	`db.immoc_collection.remove({c:2})`

* 删除表

	`db.ex_collection1.drop()`


### 3. 索引

#### 3.1 查询创建索引
* 查询索引

	`db.ex_collection1.getIndexes()`

* 创建索引(这里的1代表为正向，-1为负向索引)

	`db.imooc_collection.ensureIndex({x:1})`








