// 栈： 遵循后进先出(LIFO)原则
function Stack () {
    var items = []

    // 往栈里添加新元素
    this.push = function (element) {
        items.push(element)
    }

    // 移除栈顶元素
    this.pop = function () {
        return items.pop()
    }

    // 获取栈里最后添加的元素
    this.peek = function () {
        return items[items.length - 1]
    }

    // 判断栈是否为空
    this.isEmpty = function () {
        return items.length === 0
    }

    // 返回栈的长度
    this.size = function () {
        return items.length
    }

    // 清除栈中所有元素
    this.clear = function () {
        items = []
    }

    // 输出栈中元素
    this.print = function () {
        console.log(items.toString())
    }
}