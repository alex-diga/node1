module.exports = function main(...args) {
    return reverseWords(...args)
}

function reverseWords(s) {
    const arr = s.trim().split(/\s+/)
    return reserve(arr).join(' ')
 }
  
function reserve(arr) {
    const len = arr.length;
    if (len <= 1) return arr;
    let begin = 0;
    let end = len - 1;
    while(begin + 1 <= end) {
        const temp = arr[begin]
        arr[begin] = arr[end]
        arr[end] = temp
        begin++
        end--
    }
    return arr;
}