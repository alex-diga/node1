const testObj = {
  age: 12,
  name: 'tom'
}

let num = 12;

function changeObj() {
  num++
  testObj.age = 20
}

function getObj() {
  return testObj;
}

function getNum() {
  return num;
}

module.exports = {
  get num() {
    return num
  },
  getNum,
  testObj,
  getObj,
  changeObj
}