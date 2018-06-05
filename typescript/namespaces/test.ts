/// <reference path="validation.ts" />
/// <reference path="lettersOnlyValidator.ts" />
/// <reference path="zipCodeValidator.ts" />

// samples
let strings = ['hello', '98052', '101']

// Validator to sue
let validators: {[s: string]: Validation.StringValidator} = {}
validators['ZIP code'] = new Validation.ZipCodeValidator()
validators['Letters only'] = new Validation.LettersOnlyValidator()

for (let s of strings) {
  for (let name in validators) {
    let isMatch = validators[name].isAcceptable(s)
    console.log(`'${s}' ${isMatch ? 'matches' : 'does not match'} '${name}'.`)
  }
}
