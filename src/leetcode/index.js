const reverseWords = require('./reverseWords')
const longestPalindrome = require('./longestPalindrome')
const longestCommonPrefix = require('./longestCommonPrefix')

module.exports = function main() {
  console.log('longestCommonPrefix res=>', longestCommonPrefix(["flower", "flow", "flight"]))
  console.log('longestCommonPrefix res1=>', longestCommonPrefix(["dog", "racecar", "car"]))

  console.log('longestPalindrome res=>', longestPalindrome('babad'))
  console.log('longestPalindrome res1=>', longestPalindrome('bb'))

  console.log(`reverseWords res =>${reverseWords("a good   example")}=> word`)
}