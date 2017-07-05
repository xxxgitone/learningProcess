/**
 * 
 * @param {旧的DOM树} oldTree 
 * @param {新的DOM树} newTree 
 * @return {记录每个节点差异的对象} patches
 */
function diff (oldTree, newTree) {
    var index = 0 // 当前节点的标志
    var patches = {} // 记录每个节点的差异对象
    dfsWalk(oldTree, newTree, index, patches)
    return patches
}

/**
 * 
 * @param {旧的DOM树} oldNode 
 * @param {新的DOM树} newNode 
 * @param {当前节点的标志} index 
 * @param {记录每个节点的差异对象} patches 
 * 
 * 对两棵树进行深度优先遍历
 */
function dfsWalk (oldNode, newNode, index, patches) {
    // 对比oldNode和newNode的不同， 记录下来
    patches[index] = []

    diffChildren(oldNode.children, newNode.children, index, patches)

}

/**
 * 
 * @param {旧的DOM树的子节点} oldChildren 
 * @param {新的DOM树的子节点} newChildren 
 * @param {当前节点的标志} index 
 * @param {记录每个节点的差异对象} patches 
 * 
 * 遍历子节点
 */
function diffChildren (oldChildren, newChildren, index, patches) {
    var leftNode = null
    var currentNodeIndex = index
    oldChildren.forEach(function(child, i) {
        var newChild = newChildren[i]
        currentNodeIndex = (leftNode && leftNode.count) // 计算节点的标识
          ? currentNodeIndex + leftNode.count + 1
          : currentNodeIndex + 1
        dfsWalk(child, newChild, currentNodeIndex, patches) // 深度遍历子节点
        leftNode = child
    })
}