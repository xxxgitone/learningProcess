// 优先队列，元素的添加和移除是基于优先级的
// 比如： 机场登机顺序，头等舱和商务舱乘客的优先级高于经济舱， 在医院，会优先处理病情严重的
// 实现方案：设置优先级，然后在正确的位置添加元素
function PriorityQueue () {
    var items = []

    function QueueElement (element, priority) {
        this.element = element
        this.priority = priority
    }

    this.enqueue = function (element, priority) {
        var queueElement = new QueueElement(element, priority)

        if (this.isEmpty()) {
            items.push(queueElement)
        } else {
            var added = false
            for (var i = 0; i < items.length; i++) {
                if (queueElement.priority < items[i].priority) {
                    items.splice(i, 0, queueElement) // priority越大，优先级越低
                    added = true
                    break
                }
            }

            if (!added) { // 执行到这里表示，待添加的元素的priority比队列中任何元素的都大，直接添加即可
                items.push(queueElement)
            }
        }
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

var priorityQueue = new PriorityQueue();
priorityQueue.enqueue('John', 2)
priorityQueue.enqueue('Jack', 1)
priorityQueue.enqueue('Camila', 1)
priorityQueue.print() // Jack Camila John