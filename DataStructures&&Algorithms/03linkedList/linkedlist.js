//数组在大多数语言中大小是固定的，从数组的起点或中间插入或移除项的成本高
//虽然JavaScript中可以轻松实现，但是背后的情况同样是这样
// 链表存储有序的元素集合，但不同于数组，链表中的元素在内存中并不是连续放置的
// 每个元素又一个存储元素本身的节点，和一个指向下一个元素的引用（指针）组成

function LinkedList () {
    var Node = function (element) {
        this.element = element
        this.next = null
    }

    var length = 0
    var head = null // 用于存储第一个节点的引用

    // 向链表尾部追加元素
    // 两种情况：链表为空，添加的是第一个元素，或者不为空，向其追加元素
    this.append = function (element) {
        var node = new Node(element),
            current
        
        if (head === null) { // 链表中第一个节点
            head = node
        } else {
            current = head

            // 循环链表，直到找到最后一项
            while (current.next) {
                current = current.next
            }

            // 找到最后一项，将其next赋为node，建立连接
            current.next = node
        }

        length++ // 更新长度
    }

    // 从链表中移除一个给定位置的元素
    this.removeAt = function (position) {

        // 检查越界值
        if (position > -1 && position < length) {
            var current = head,
                previous,
                index = 0

            // 移除第一项
            if (position === 0) {
                head = current.next
            } else {
                while (index++ < position) {
                    previous = current
                    current = current.next
                }

                // 将previous与current的下一项链接起来，跳过current，从而移除它
                previous.next = current.next
            }

            length--

            return current.element
        } else {
            return null
        }
    }

    // 在任意一个位置插入一个元素
    this.insert = function (position, element) {

        // 检查越界值
        if (position >= 0 && position <= length ) {

            var node = new Node(element),
                current = head,
                previous,
                index = 0
            
            // 在第一个位置添加
            if (position === 0) {

                node.next = current
                head = node

            } else {
                
                while (index++ < position) {
                    previous = current
                    current = current.next
                }
                node.next = current
                previous.next = node
            }

            length++

            return true

        } else {
            return false
        }
    }

    // 链表的toString()方法
    this.toString = function () {
        var current = head,
            string = ''
        
        while (current) {
            string += current.element + ' '
            current = current.next
        }

        return string
    }

    this.indexOf = function (element) {
        var current = head,
            index = 0
        
        while (current) {
            if (element === current.element) {
                return index
            }
            index++
            current = current.next
        }

        return -1
    }

    // 移除指定值
    this.remove = function (element) {
        var index = this.indexOf(element)
        return this.removeAt(index)
    }

    this.isEmpty = function () {
        return length === 0
    }

    this.size = function () {
        return length
    }

    this.getHead = function () {
        return head
    }

}

var list = new LinkedList()
list.append(5)
list.append(10)
list.append(15)
console.log(list.remove(10))
console.log(list.toString())

