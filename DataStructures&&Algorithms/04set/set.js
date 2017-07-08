// set集合是由一组无序且唯一的项组成
// 在ES6中已经原生支持
function Sets() {
    // 这里使用对象而不是数组，对象不允许一个键指向两个不同属性，保证了集合里元素的唯一性，也可以使用数组来实现
    var items = {}

    this.has = function (value) {
        return items.hasOwnProperty(value)
        // 或者 reutrn value in items
    }

    this.add = function (value) {
        if (!this.has(value)) {
            items[value] = value
            return true
        }

        return false
    }

    this.remove = function (value) {
        if (this.has(value)) {
            delete items[value]
            return true
        }

        return false
    }

    this.clear = function () {
        items = {}
    }

    this.size = function () {
        return Object.keys(items).length

        //或者
        /*
        设置一个length属性，每次添加和移除都执行相应的操作
         */

        // 再或者
        /*
        var count = 0
        for (var prop in items) { // for...in 会将原型上的属性也会遍历出来
            if (items.hasOwnProperty(prop))
                ++count
        }

        return count
         */
    }

    this.values = function () {
        return Object.keys(items)

        /* 或者
            var keys = []
            for (var key in items) {
                keys.push(key)
            }
            return keys
        */
    }

    // 并集
    this.union = function (otherSet) {
        var unionSet = new Sets()

        var values = this.values()
        for (var i = 0; i < values.length; i++) {
            unionSet.add(values[i])
        }

        values = otherSet.values()
        for (var i = 0; i < values.length; i++) {
            unionSet.add(values[i])
        }

        return unionSet
    }

    // 交集
    this.intersection = function (otherSet) {
        var intersectionSet = new Sets()

        var values = this.values()
        for (var i = 0; i < values.length; i++) {
            if (otherSet.has(values[i])) {
                intersectionSet.add(values[i])
            }
        }

        return intersectionSet
    }

    // 差集 A-B 表示元素存在A中，且不存在B中
    this.difference = function (otherSet) {
        var differenceSet = new Sets()

        var values = this.values()
        for (var i = 0; i < values.length; i++) {
            if (!otherSet.has(values[i])) {
                differenceSet.add(values[i])
            }
        }

        return differenceSet
    }

    // 子集
    this.subset = function (otherSet) {
        if (this.size() > otherSet.size()) { // 如果A的长度大于B，那A肯定不是B的子集
            return false
        } else {
            var values = this.values()
            for (var i = 0; i < values.length; i++) {
                if (!otherSet.has(values[i])) { // 有任何不相同的就不是子集
                    return false
                }
                return true
            }
        }
    }

}

var set = new Sets()
set.add(1)
console.log(set.values()) // ["1"]
console.log(set.has(1)) // true
console.log(set.size()) // 1

set.add(2)
console.log(set.values()) // ["1", "2"]
set.remove(2)
console.log(set.values()) // ["1"]

// 并集
var setA = new Sets()
setA.add(1)
setA.add(2)
setA.add(3)

var setB = new Sets()
setB.add(3)
setB.add(4)
setB.add(5)

var unionAB = setA.union(setB)
console.log(unionAB.values()) // ["1", "2", "3", "4", "5"]

// 交集
var setC = new Sets()
setC.add(1)
setC.add(2)
setC.add(3)

var setD = new Sets()
setD.add(2)
setD.add(3)
setD.add(4)

var unionCD = setC.intersection(setD)
console.log(unionCD.values()) // ["2", "3"]

// 差集
var setE = new Sets()
setE.add(1)
setE.add(2)
setE.add(3)

var setF = new Sets()
setF.add(2)
setF.add(3)
setF.add(4)

var differenceEF = setE.difference(setF)
console.log(differenceEF.values())  // ["1"]

// 子集
var setG = new Sets()
setG.add(1)
setG.add(2)

var setH = new Sets()
setH.add(1)
setH.add(2)
setH.add(3)

console.log(setG.subset(setH))  // true