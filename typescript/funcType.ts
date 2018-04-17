// 函数,函数的输入输出要进行约束

// 函数声明
// 输入多余的或者少于要求的参数，都会报错
function sum(x: number, y: number): number {
  return x + y
}

// 函数表达式
// 此处的`=>`和es6的不一样
// typescript中的类型定义中，`=>`用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型
let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
  return x + y
}

// 可选参数
function buildName(firstName: string, lastName?: string) {}

// 默认值
function buildName1(firstName: string, lastName: string = 'cat') {}

// 剩余参数
function push(array: any[], ...items: any[]) {}


