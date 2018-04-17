// 布尔值,不能使用new Boolean(false)，因为返回的是对象
let isDone: boolean = false
let createdByBoolean: boolean = Boolean(1)

// 数值
let decLiteral: number = 6
let hexLiteral: number = 0xf00d
let notANumber: number = NaN
let infinityNumber: number = Infinity

// 字符串
let myName: string = 'Tom'

// 空值：可以用void表示没有任何返回值的函数
function alertName(): void {
  alert('name')
}
// void类型的变量只能赋值为undefind和null
let unusable: void = undefined

// Null和Undefined
let u: undefined = undefined
let n: null = null

// undefined和null是所有类型的子类型
// 所以下面不会报错
let num: number = undefined

// 任意值：可以被赋值为任意类型
let anyThing: any = 'hello'

// 联合类型：表示取值可以为多种中的一种
let myFavoriteNumber: string | number
myFavoriteNumber = 'seven'
myFavoriteNumber = 7

// 访问联合类型的属性或者方法
// 当ts不确定一个联合类型的变量到底是哪个类型的时候，只能方位此联合类型的所有类型里共有属性
function getLength(something: string | number): number {
  return something.length // 报错
  // something.toString() 不会报错
}

// 联合属性在被赋值的时候，会根据类型推断出一个类型
let myFavoriteNumber1: string | number
myFavoriteNumber1 = 'seven';
console.log(myFavoriteNumber1.length); // 5
myFavoriteNumber1 = 7;
console.log(myFavoriteNumber1.length); // 编译时报错

