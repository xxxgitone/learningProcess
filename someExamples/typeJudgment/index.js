/**
 * 检测是否为数组或者类数组
 * @param {Array, Array like} obj 
 */
function isArrayLike (obj) {
  // obj必须有length属性
  var length = !!obj && 'length' in obj && obj.length
}