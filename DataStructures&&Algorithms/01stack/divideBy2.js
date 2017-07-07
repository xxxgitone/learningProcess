// 将十进制转换成二进制
// 将十进制数和2整除，取余数，直到结果为0
// 比如将10转化成二进制
// 10 / 2 = 5 余数为 0
// 5 / 2 = 2 余数为 1
// 2 / 2 = 1 余数为 0
// 1 / 2 = 0 余数为 1
// 存入栈中为0101， 取出则为1010
function divideBy2 (decNumber) {
    var remStack = new Stack(),
        rem,
        binaryString = ''
    
    while (decNumber > 0) {
        rem = Math.floor(decNumber % 2) // 取余
        remStack.push(rem)
        decNumber = Math.floor(decNumber / 2) // 取整数商
    }

    while (!remStack.isEmpty()) {
        // 取出
        binaryString += remStack.pop().toString()
    }

    return binaryString
}

console.log(divideBy2(233)) // 11101001
console.log(divideBy2(10)) // 1010