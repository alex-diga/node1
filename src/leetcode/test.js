function longestPalindrome(str) {
  if (str.length <= 1) return str;
  let left = 0;
  let right = 0;
  for(let i = 0; i < str.length; i++) {
    const [left1, right1] = isPalindrome(str, i, i)
    const [left2, right2] = isPalindrome(str, i, i + 1)
    if (right1 - left1 > right - left) {
      left = left1
      right = right1
    }
    if (right2 - left1 > right - left) {
      left = left1
      right = right2
    }
  }
  return [left, right]
}

function isPalindrome(str, left, right) {
  while(left >= 0 && right < str.length && str[left] === str[right]) {
    left--;
    right++;
  }
  return [left + 1, right - 1]
}

function longestCommonPrefix(str) {
  let res = ''
  let one = str[0]
  for(let i = 0; i < one.length; i++) {
    if (str.every(s => s[i] === one[i])) {
      res += one[i]
    } else {
      break;
    }
  }
  return res;
}