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

    // 向书中插入一个键
    this.insert = function (key) {
        var newNode = new Node(key)

        if (root === null) {
            root = newNode
        } else {
            insertNode(root, newNode)
        }
    }

}