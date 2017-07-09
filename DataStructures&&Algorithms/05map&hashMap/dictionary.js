// 字典，用键值对的形式存储不重复的值，和集合类似，只不过集合是以值值的方式存储
// 在ES6中map就是字典

function Dictionary () {
    var items = {}

    this.has = function (key) {
        return key in items
    }

    this.set = function (key, value) {
        items[key] = value
    }

    this.remove = function (key) {
        if (this.has(key)) {
            delete items[key]
            return true
        }
        return false
    }

    this.get = function (key) {
        return this.has(key) ? items[key] : undefined
    }

    this.values = function () {
        var values = []
        for (var k in items) {
            if (this.has(k)) {
                values.push(items[k])
            }
        }
        return values
    }

    this.clear = function () {
        items = {}
    }

    this.size = function () {
        return Object.keys(items).length
    }

    this.keys = function () {
        return Object.keys(items)
    }

    this.getItems = function () {
        return items
    }
}

var dictionary = new Dictionary()
dictionary.set('Gandalf', 'gandalf@email.com')
dictionary.set('John', 'Johnsnow@email.com')
dictionary.set('Tyrion', 'Tyrion@email.com')

console.log(dictionary.has('Gandalf')) // true
console.log(dictionary.keys()) // ["Gandalf", "John", "Tyrion"]
console.log(dictionary.values()) // ["gandalf@email.com", "Johnsnow@email.com", "Tyrion@email.com"]
console.log(dictionary.get('Johnsnow')) // Johnsnow@email.com

dictionary.remove('John')
console.log(dictionary.keys()) // ["Gandalf", "Tyrion"]
console.log(dictionary.getItems()) // Object {Gandalf: "gandalf@email.com", Tyrion: "Tyrion@email.com"}
