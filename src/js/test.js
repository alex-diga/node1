function testRege() {
  const str = `
'\r\n"(PDH-CSV 4.0)","\\\\��\\Network Interface(Realtek Gaming 2.5GbE Family Controller)\\Bytes Received/sec"\r\n"12/19/2022 16:50:00.782","8982.250254"\r\n�����˳������Ժ�...                        \r\n����ɹ�������\r\n\r\r'
`;

const regE = /sec"\r\n"(.*)","(.*)"\r\n/i;

// str.replace(regE, (_, val1, val2) => {
//   console.log(val1, val2);
// })
// const res1 = str.match(regE);
const res = regE.exec(str);
const res1 = str.match(regE);
// console.log(res[1], res[2])
console.log(res1)
}

function fromArray(length = 1) {
  return Array.from({ length }).map((_, index) => index);
}

function test(list) {
  if (list.length) {
    for(let i = 0; i < list.length; i++) {
      if (list[i] > 10) {
        // return list[i] * 10;
        break;
      }
    }
  }
  return 'empty';
}

function main() {
  // testRege()
  // const res = [1, 2, 3].filter(item => item === 4);
  // console.log(res)
  // const res = Math.ceil(0 / 10);
  // const res = test(fromArray(5));
  // const res1 = test(fromArray(15));
  // console.log(res, res1)
  // console.log(fromArray(5));
  // const obj = {
  //   age: 12,
  //   name: 'tom',
  //   code: null
  // }
  // const res = JSON.stringify(obj)
  // console.log(obj, res)
  // const str = 'abc888';
  // const str1 = 'ab88';

  // console.log(str.search('88') !== -1, str1.search('88') !== -1)

  testFn('list', 1, (err, list) => {
    console.log(err, list)
  })
}

function testFn(type, ...args) {
  const [cb] = args.splice(args.length - 1, 1)
  console.log(type, args, typeof cb)
}

main()