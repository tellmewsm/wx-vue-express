// data[{},{}]去重
export function uniqDevice (array, func) {
  var result = []
  var length = array.length
  var i
  if (!func) {
    for (i = 0; i < length; i++) {
      if (result.indexOf(array[i]) < 0) {
        result.push(array[i])
      }
    }
  } else {
    var seen = []
    for (i = 0; i < length; i++) {
      if (seen.indexOf(func(array[i])) < 0) {
        seen.push(func(array[i]))
        result.push(array[i])
      }
    }
  }
  return result
};
