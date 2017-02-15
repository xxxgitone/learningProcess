// 当模板不再简单和清晰，任何复杂逻辑，都应该使用计算属性
var vm = new Vue({
    el: '#example',
    data: {
        message: 'Hello'
    },
    computed: {
        // 声明了一个计算属性 reversedMessage ，提供的函数将用作属性 vm.reversedMessage 的 getter 
        //vm.reversedMessage 的值始终取决于 vm.message 的值。
        reversedMessage: function () {
            //this指向vm实例
            return this.message.split('').reverse().join('');
        }
    }
})

//同样的功能可以通过表达式中的method来达到效果
{/*<p>Reversed message: "{{ reverseMessage() }}"</p>*/}

// in component
// methods: {
//   reverseMessage: function () {
//     return this.message.split('').reverse().join('')
//   }
// }

// 不同的是计算属性是基于它的依赖缓存。计算属性只有在它的相关依赖发生改变时才会重新取值。这就意味着只要 message 没有发生改变，多次访问 reversedMessage 计算属性会立即返回之前的计算结果，而不必再次执行函数。
// 相比而言，每当重新渲染的时候，method 调用总会执行函数。
// 我们为什么需要缓存？假设我们有一个重要的计算属性 A ，这个计算属性需要一个巨大的数组遍历和做大量的计算。然后我们可能有其他的计算属性依赖于 A 。如果没有缓存，我们将不可避免的多次执行 A 的 getter ！如果你不希望有缓存，请用 method 替代。







