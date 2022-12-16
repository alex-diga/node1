/**
 * ES Module模式下Node没有`__filename`和`__dirname`值
 * import.meta.url 返回模块的绝对的 `file:` URL。
 * url模块中fileURLToPath()函数，返回完全解析的特定于平台的 Node.js 文件路径
 * path模块中dirname()函数，返回路径的目录路径
 * import { fileURLToPath } from 'url';
 * import path from 'path';
 * const __filename = fileURLToPath(import.meta.url);
 * const __dirname = path.dirname(__filename);
 */
const leetcode = require('./src/leetcode/index')
// const path = require('path');

// // console.log(process.env.PATH);
// const pathUrl = './src/js/math.js'
// const absolutedUrl = '/scr/js/math.js'

// // path.basename() 方法返回一个 path 的最后一部分
// console.log(path.basename(pathUrl))
// console.log(path.basename(pathUrl, '.js'))

// // path.dirname() 方法返回一个 path 的目录名
// console.log(path.dirname(pathUrl))

// // path.extname() 方法返回 path 的扩展名
// console.log(path.extname(pathUrl))

// // path.isAbsolute() 方法会判定 path 是否为一个绝对路径。
// console.log(path.isAbsolute(absolutedUrl))
// console.log(path.isAbsolute(pathUrl))

// // path.resolve() 方法会把一个路径或路径片段的序列解析为一个绝对路径。
// console.log(path.resolve(__dirname, pathUrl))

// // path.relative() 方法返回从 from 到 to 的相对路径（基于当前工作目录）
// console.log(path.relative('/src/js/index.js', '/src/common/math.js'))

// // path.parse() 方法返回一个对象，对象的属性表示 path 的元素
// console.log(path.parse(pathUrl))

// const { dateFormat } = require('./src/common/timestamp')


// const str = 'YYYY年MM月dd日 hh:mm:ss';
// const timer = dateFormat(new Date())
// const timer1 = dateFormat(new Date(), str)
// console.log(timer, timer1)

leetcode();

const { changeObj, testObj, getObj, num, getNum } = require('./src/common/test.js')

console.log(num, testObj)
changeObj()
console.log(num, testObj)
console.log(getNum(), getObj())