// 图是非线性数据结构
// 图有好几种表示方法，邻接矩阵，邻接表，关联矩阵，这里选用邻接表
// 选择字典表示相邻顶点列表，还可以选用的有数组，链表，散列表
// 这里的图的类型为无向图

function Graph () {
    var vertices = [] // 顶点名字
    var adjList = new Dictionary() // 存储邻接表，顶点名字作为键，邻接顶点作为值

    // 添加顶点
    this.addVertex = function (v) {
        vertices.push(v)
        adjList.set(v, [])
    }

    // 添加顶点之间的边
    this.addEdge = function (v, w) {
        adjList.get(v).push(w)
        adjList.get(w).push(v)        
    }

    this.toString = function () {
        var s = ''
        for (var i = 0; i < vertices.length; i++) {
            s += vertices[i] + ' -> '
            var neighbors = adjList.get(vertices[i])
            for (var j = 0; j < neighbors.length; j++) {
                s += neighbors[j] + ' '
            }
            s += '\n'
        }
        return s
    }

    // 图的遍历
    // 图的遍历有两种算法：广度优先搜索（Breadth-First Search, BFS）和深度优先搜索（Depth-First Search, DFS）
    // 图的遍历可以用来寻找特定的顶点或寻找两个顶点之间的路径，检查图是够联通，是否含有环等
    // 图的遍历思想：追踪每个第一次访问的节点，并且追踪有哪些节点还没有被完全探索，
    // 完成探索一个顶点要求我们查看顶点的每一条边，对于每一条边所连接的没有被访问过的顶点将其标注问被发现的，
    // 并将其加进待访问的顶点列表中
    // 广度优先搜索和深度优先搜索两者基本上相同，就是待访问顶点列表的数据结构不同
    // 广度优先搜索为队列数据结构，通过将顶点存入队列中，最先入队列的顶点先被探索
    // 深度优先搜索为栈数据结构，通过将顶点存入栈中，存在新的相邻顶点就去访问

    // 当要标注已经访问过的顶点时，用三种颜色来反映他们的状态
    // 白色：表示该顶点还没有被访问过
    // 灰色： 表示该顶点被访问过，但并未探索过
    // 黑色： 表示该顶点被访问过并且被完全探索过

    // 广度优先搜索会从指定的第一个顶点开始遍历，先访问其所有的相邻点，就像访问图的一层，先宽后深的访问
    // 广度优先搜索步骤
    // 1.创建一个队列Q
    // 2.将v标注为被发现（灰色），并将v入队列Q
    // 3.如果Q非空，则运行下列步骤
    //    将u从Q中出队列
    //    将标注u为被发现
    //    将u所有未被访问过的邻点(白色)入队列
    //    将u标注为已被探索（黑色）

    var initializeColor = function () {
        var color = []
        for (var i = 0; i < vertices.length; i++) {
            color[vertices[i]] = 'white'
        }
        return color
    }

    this.bfs = function (v, callback) {
        var color = initializeColor(),
            queue = new Queue()
        queue.enqueue(v)

        while (!queue.isEmpty()) {
            var u = queue.dequeue(),
                neighbors = adjList.get(u)
            color[u] = 'grey'
            for (var i = 0; i < neighbors.length; i++) {
                var w = neighbors[i]
                if (color[w] === 'white') {
                    color[w] = 'grey'
                    queue.enqueue(w)
                }
            }
            color[u] = 'black'
            if (callback) {
                callback(u)
            }
        }
    }


    // 深度优先算法
    // 深度优先算法将会从第一个指定的顶点开始遍历图，沿着路径直到这条路径最后一个顶点被访问了，接着原路回退并探索下一条路径
    // 先深度后广度
    // 步骤
    //  1.标注v为被发现的(灰色)
    //  2.对于v的所有未访问的邻点w
    //      访问顶点w
    //  3.标注v为已被访问(黑色)

    // 深度优先搜索的步骤是递归的，这意味着深度优先搜索算法使用栈来存储函数调用（由递归调用所创建的栈）

    var dfsVisit = function (u, color, callback) {
        color[u] = 'grey'
        if (callback) {
            callback(u)
        }
        var neighbors = adjList.get(u)
        for (var i = 0; i < neighbors.length; i++) {
            var w = neighbors[i]
            if (color[w] === 'white') {
                dfsVisit(w, color, callback)
            }
        }
        color[u] = 'black'
    }

    this.dfs = function (callback) {
        var color = initializeColor()
        for (var i = 0; i < vertices.length; i++) {
            if (color[vertices[i]] === 'white') {
                dfsVisit(vertices[i], color, callback)
            }
        }
    }


}

var graph = new Graph()
var myVertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
for (var i = 0; i < myVertices.length; i++) {
    graph.addVertex(myVertices[i])
}
graph.addEdge('A', 'B')
graph.addEdge('A', 'C')
graph.addEdge('A', 'D')
graph.addEdge('C', 'D')
graph.addEdge('C', 'G')
graph.addEdge('D', 'G')
graph.addEdge('D', 'H')
graph.addEdge('B', 'E')
graph.addEdge('B', 'F')
graph.addEdge('E', 'I')

console.log(graph.toString())
// A -> B C D 
// B -> A E F 
// C -> A D G 
// D -> A C G H 
// E -> B I 
// F -> B 
// G -> C D 
// H -> D 
// I -> E 

function printNode (value) {
    console.log('Visisted vertex: ' + value)
}

graph.bfs(myVertices[0], printNode)
// Visisted vertex: A
// Visisted vertex: B
// Visisted vertex: C
// Visisted vertex: D
// Visisted vertex: E
// Visisted vertex: F
// Visisted vertex: G
// Visisted vertex: H
// Visisted vertex: I

graph.dfs(printNode)
// Visisted vertex: A
// Visisted vertex: B
// Visisted vertex: E
// Visisted vertex: I
// Visisted vertex: F
// Visisted vertex: C
// Visisted vertex: D
// Visisted vertex: G
// Visisted vertex: H