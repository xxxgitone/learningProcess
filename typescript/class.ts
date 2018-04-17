// es7中和es6中class的不同
// es6中实例的属性只能通过构造函数的this.xxx来定义，es7可以直接定义
class Animal {
  name = 'Jack'

  constructor() {/*...*/}
}

// es7可以使用static定义一个静态属性
class Animal1 {
  static num = 42

  constructor() {/*...*/}
}
console.log(Animal1.num)

// TypeScript中类的用法
// 三种修饰符
// 1、`public`修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是public
class Animal2 {
  public name
  public constructor(name) {
    this.name = name
  }
}

// let a = new Animal2('Jack')
// console.log(a.name) // Jack
// a.name = 'Tom'
// console.log(a.name) // Tom

// 2、`private`修饰符属性或者方法是私有的，不能在声明它的累的外部访问
class Animal3 {
  private name
  public constructor(name) {
    this.name = name
  }
}
// let a = new Animal3('Jack')
// console.log(a.name) // 报错
// a.name = 'Tom' // 报错

// 3、`protected`修饰的属性或者方法是受保护的，和`private`类似，区别是它在子类中允许被访问
class Animal4 {
  protected name
  public constructor(name) {
    this.name = name
  }
}

class Cat extends Animal4 {
  constructor(name) {
    super(name)
    console.log(this.name) // 如果是private，则报错
  }
}

// 抽象类：用于定义抽象类和其中的抽象方法
// 1、不允许实例化
// 2、抽象类中的方法必须被子类实现
abstract class Animal5 {
  public name: string
  public constructor(name: string) {
    this.name = name
  }
  public abstract sayHi()
}

class Dog extends Animal5 {
  public sayHi(): void {
    console.log('hi')
  }
}

const dog = new Dog('Tom')
