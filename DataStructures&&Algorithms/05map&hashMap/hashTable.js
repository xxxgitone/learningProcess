// 散列表
// hashTable类，也称为hashMap，是字典类Dictionary的一种散列表实现方式
// 散列算法的作用是尽可能快的在数据结构中找到一个值，在数据结构中获取一个值（使用get方法）
//需要遍历整个结构来找到它
//如果使用散列函数，就知道值的具体位置，因此能够快速检索到该值
// 散列函数的作用是给定一个键值，然后返回值在表中的地址

// 使用一个最常见的散列函数——"lose lose"散列函数，就是将每个键中的每个字母ASCII值加起来，形成一个新的地址，用于查找值
var loseloseHashCode = function (key) {
    var hash = 0
    for (var i = 0; i < key.length; i++) {
        hash += key.charCodeAt(i)
    }
    return hash % 37 // 为了得到较小的值，和任意一个数取余
}


function HashTable () {
    var table = []

    this.put = function (key, value) {
        var position = loseloseHashCode(key)
        console.log(position + ' - ' + key)
        table[position] = value
    }

    this.get = function (key) {
        return table[loseloseHashCode(key)]
    }

    this.remove = function (key) {
        // 由于元素分布于整个数组范围内，一些位置会没有任何元素占据，并默认为undefined
        // 我们也不能将位置本身从数组中移除，移除的话会改变其他数组的位置
        table[loseloseHashCode(key)] = undefined
    }
}

var hash = new HashTable()
hash.put('Gandalf', 'gandalf@email.com')
hash.put('John', 'Johnsnow@email.com')
hash.put('Tyrion', 'Tyrion@email.com')

console.log(hash.get('Gandalf')) // gandalf@email.com
hash.remove('Gandalf')
console.log(hash.get('Gandalf')) // undefined