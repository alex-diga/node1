function main() {
  const res = [1, 2, 3].filter(item => item === 4);
  console.log(res)
  // const res = Math.ceil(0 / 10);
  // const res = test(fromArray(5));
  // const res1 = test(fromArray(15));
  // console.log(res, res1)
}

function fromArray(length = 1) {
  return Array.from({ length }).map((_, index) => index);
}

function test(list) {
  if (list.length) {
    for(let i = 0; i < list.length; i++) {
      if (list[i] > 10) {
        return list[i] * 10;
      }
    }
  }
  return 'empty';
}

main()