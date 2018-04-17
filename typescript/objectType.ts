// 对象类型--接口
// 借口是对行为的抽象，而具体如何行动需要由类去实现
// typescript中的接口除了可用于对类的一部分欣慰进行抽象以外
// 也经常用于对`对象的形状`进行描述

interface Person {
  name: string,
  age: number
  // age?: number 表示可选
  // 任意属性：一旦定义了任意属性，那么确定属性和可选属性都必须是它的子属性
  // [propName: string]: string

  // 只读属性
  // readonly id: number
}

let tom: Person = {
  name: 'Tom',
  age: 25
}

