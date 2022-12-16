module.exports = function longestCommonPrefix(strs) {
  if (!strs.length) return '';
  var s = '';
  for (var i = 0; i < strs[0].length; i++) {
    if (strs.every(_ => strs[0][i] === _[i])) {
      s = s + strs[0][i];
    } else {
      break;
    }
  }

  return s;
};

// var longestCommonPrefix = function (strs) {
//   if (strs ===null || strs.length === 0) return ''
//   let prefix = strs[0];
//   for(let i = 0; i < prefix.length; i++) {
//     const c = prefix.charAt(i)
//     for(let j = 1; j < strs.length; j++) {
//       if(strs[j].charAt(i) !== c || i === strs[j].length) {
//         return prefix.slice(0, i)
//       }
//     }
//   }
//   return prefix
// }


// var longestCommonPrefix = function (strs) {
//     if (strs === null || strs.length === 0) return ''
//     var s = '';
// }
