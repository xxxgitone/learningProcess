// interface StringValidator {
//   isAcceptable(s: string): boolean
// }

// let lettersRegexp = /^[A-Za-z]+$/
// let numberRegexp = /^[0-9]+$/

// class LettersOnlyValidator implements StringValidator {
//   isAcceptable(s: string) {
//     return lettersRegexp.test(s)
//   }
// }

// class ZipCodeValidator implements StringValidator {
//   isAcceptable(s: string) {
//     return s.length === 9 && numberRegexp.test(s)
//   }
// }

// // samples
// let strings = ['hello', '98052', '101']

// // Validator to sue
// let validators: {[s: string]: StringValidator} = {}
// validators['ZIP code'] = new ZipCodeValidator()
// validators['Letters only'] = new LettersOnlyValidator()

// for (let s of strings) {
//   for (let name in validators) {
//     let isMatch = validators[name].isAcceptable(s)
//     console.log(`'${s}' ${isMatch ? 'matches' : 'does not match'} '${name}'.`)
//   }
// }

// 为了方便管理
// 将所有与验证器有关的可行都放在一个命名空间
// namespace Validation {
//   export interface StringValidator {
//     isAcceptable(s: string): boolean
//   }

//   let lettersRegexp = /^[A-Za-z]+$/
//   let numberRegexp = /^[0-9]+$/

//   export class LettersOnlyValidator implements StringValidator {
//     isAcceptable(s: string) {
//       return lettersRegexp.test(s)
//     }
//   }
  
//   export class ZipCodeValidator implements StringValidator {
//     isAcceptable(s: string) {
//       return s.length === 9 && numberRegexp.test(s)
//     }
//   }
// }

// samples
// let strings = ['hello', '98052', '101']

// // Validator to sue
// let validators: {[s: string]: Validation.StringValidator} = {}
// validators['ZIP code'] = new Validation.ZipCodeValidator()
// validators['Letters only'] = new Validation.LettersOnlyValidator()

// for (let s of strings) {
//   for (let name in validators) {
//     let isMatch = validators[name].isAcceptable(s)
//     console.log(`'${s}' ${isMatch ? 'matches' : 'does not match'} '${name}'.`)
//   }
// }
