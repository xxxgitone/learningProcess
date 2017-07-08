// 循环队列，击鼓传花
// 孩子们围成一个圆圈，把花尽快地传递为旁边的人。某一时刻传花停止，这个时候花在谁手里，谁就淘汰
// 重复这个过程，直到最后一个孩子
function hotPotato (nameList, num) {
    var queue = new Queue()

    for (var i = 0; i < nameList.length; i++) {
        queue.enqueue(nameList[i]) // 将小孩名字放入队列
    }

    var eliminated = ''
    while (queue.size() > 1) {
        for (var i = 0; i < num; i++) {
            queue.enqueue(queue.dequeue()) // 从列头开始移除一项，再将其添加到队列末尾，模拟传花
        }

        eliminated = queue.dequeue() // 当传递次数达到给定的数字，拿着花的就被淘汰
        console.log(eliminated + '被淘汰')
    }

    return queue.dequeue()
}

var names = ['John', 'Jack', 'Camila', 'Ingrid', 'Carl']
var winner = hotPotato(names, 7)
console.log('胜利者: ' + winner)