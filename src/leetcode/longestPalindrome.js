module.exports = function longestPalindrome(s) {
    if (s.length <= 1) return s;
    let left = 0;
    let right = 0;
    for(let i = 0; i < s.length; i++) {
        const [left1, right1] = isPalindrome(s, i, i);
        const [left2, right2] = isPalindrome(s, i, i + 1);
        if (right1 - left1 > right - left) {
            right = right1
            left = left1
        }
        if (right2 - left2 > right - left) {
            right = right2
            left = left2
        }
    }
    return s.slice(left, right + 1)
};

function isPalindrome(s, left, right) {
    while(left >= 0 && right < s.length && s[left] === s[right]) {
        left--
        right++
    }
    return [left + 1, right - 1]
}
