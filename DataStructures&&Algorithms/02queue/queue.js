// 队列： 遵循先进先出原则(FIFO)
function Queue () {
    var items = []

    // 添加新元素，新的项只能添加到队列末尾
    this.enqueue = function (element) {
        items.push(items)
    }

    // 移除
    this.dequeue = function () {
        return items.shift()
    }

    // 直到队列最前面的元素
    this.front = function () {
        return items[0]
    }

    // 判断是否为空
    this.isEmpty = function () {
        return items.length === 0
    }

    // 长度
    this.size = function () {
        return items.length
    }

    // 打印
    this.print = function () {
        console.log(items.toString())
    }
}