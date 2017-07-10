// 二叉搜索树，左侧节点只能存储比父节点小的值，右侧存储比父节点大的值
function BinarySearchTree () {

    var Node = function (key) {
        this.key = key
        this.left = null
        this.right = null
    }

    var root = null

    // 插入节点的辅助函数
    var insertNode = function (node, newNode) {
        if (newNode.key < node.key) {
            if (node.left === null) {
                node.left = newNode
            } else {
                insertNode(node.left, newNode)
            }
        } else {
            if (node.right === null) {
                node.right = newNode
            } else {
                insertNode(node.right, newNode)
            }
        }
    }

    // 向树中插入一个键
    this.insert = function (key) {
        var newNode = new Node(key)

        if (root === null) {
            root = newNode
        } else {
            insertNode(root, newNode)
        }
    }

    // 中序遍历
    // 中序遍历是一种以上行顺序访问BST所有节点的遍历方式，也就是以从小到大的顺序访问所有节点
    // 中序遍历的一种应用就是对树进行排序操作

    // 辅助函数
    var inOrderTraverseNode = function (node, callback) {
        if (node !== null) {
            inOrderTraverseNode(node.left, callback)
            callback(node.key)
            inOrderTraverseNode(node.right, callback)
        }
    }

    this.inOrderTraverse = function (callback) {
        inOrderTraverseNode(root, callback)
    }

    // 先序遍历
    // 先序遍历是以优先于后代节点的顺序访问每个节点，先序遍历的一种应用就是打印一个结构化文档
    // 先序遍历会先访问节点本身，然后再访问它的左侧节点，最后是右侧节点

    // 辅助函数
    var preOrderTraverseNode = function (node, callback) {
        if (node !== null) {
            callback(node.key)
            preOrderTraverseNode(node.left, callback)
            preOrderTraverseNode(node.right, callback)
        }
    }
    this.preOrderTraverse = function (callback) {
        preOrderTraverseNode(root, callback)
    }

    // 后序遍历
    // 后序遍历是先访问节点的后代节点，再访问节点本身
    // 后序遍历的一种应用是计算一个项目和它的子目录中所有文件所占空间的大小

    // 辅助函数
    var postOrderTraverseNode = function (node, callback) {
        if (node !== null) {
            postOrderTraverseNode(node.left, callback)
            postOrderTraverseNode(node.right, callback)
            callback(node.key)
        }
    }
    this.postOrderTraverse = function (callback) {
        postOrderTraverseNode(root, callback)
    }

    // 最小值,根据二叉搜索树的特点可以知道，最小值在最左侧节点

    // 辅助函数
    var minNode = function (node) {
        if (node) {
            while (node && node.left !== null) {
                node = node.left
            }

            return node.key
        }

        return null
    }

    this.min = function () {
        return minNode(root)
    }

    // 最大值，在最右侧

    // 辅助函数
    var maxNode = function (node) {
        if (node) {
            while (node && node.right) {
                node = node.right
            }

            return node.key
        }

        return null
    }

    this.max = function () {
        return maxNode(root)
    }

    // 搜索一个特定值

    // 辅助函数
    var serachNode = function (node, key) {
        if (node === null) {
            return false
        }

        if (key < node.key) {
            return serachNode(node.left, key)
        } else if (key > node.key) {
            return serachNode(node.right, key)
        } else {
            return true
        }
    }

    this.search = function (key) {
        return serachNode(root, key)
    }

    // 移除一个节点

    // 辅助函数
    var removeNode = function (node, key) {
        if (node === null) {
            return null
        }

        if (key < node.key) {
            node.left = removeNode(node.left, key)
            return node
        } else if (key > node.key) {
            node.right = removeNode(node.right, key)
        } else { // 键等于node.key

            // 第一种情况，一个节点
            if (node.left === null && node.right === null) {
                node = null // 将这个节点设置为null
                return node // 并返回，将其父节点对应的指针设置为null
            } 

            // 第二种情况，一个只有一个子节点的节点
            if (node.left === null) {
                node = node.right
                return node
            } else if (node.right === null) {
                node = node.left
                return node
            }

            // 第三种情况，一个有两个子节点的节点
        }
    }

    this.remove = function (key) {
        root = removeNode (root, key)
    }
} 

var tree = new BinarySearchTree()
tree.insert(11)
tree.insert(7)
tree.insert(15)
tree.insert(5)
tree.insert(3)
tree.insert(9)
tree.insert(8)
tree.insert(10)
tree.insert(13)
tree.insert(12)
tree.insert(14)
tree.insert(20)
tree.insert(18)
tree.insert(25)
tree.insert(6)

// 打印函数, 作为遍历的回调函数
// function printNode (value) {
//     console.log(value)
// }

// tree.inOrderTraverse(printNode) // 3 5 6 7 8 9 10 11 12 13 14 15 18 20 25

// tree.preOrderTraverse(printNode) // 11 7 5 3 6 9 8 10 15 13 12 14 20 18 25

// tree.postOrderTraverse(printNode)  // 3 6 5 8 10 9 7 12 14 13 18 25 20 15 11

// console.log(tree.min()) // 3

// console.log(tree.max()) // 25

// console.log(tree.search(10)) // true
