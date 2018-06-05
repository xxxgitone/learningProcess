/// <reference path="validation.ts" />

namespace Validation {
  let numberRegexp = /^[0-9]+$/
  export class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string) {
      return s.length === 9 && numberRegexp.test(s)
    }
  }
}