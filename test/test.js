const util = require('../lib/util.js');
const mocker = require("../lib/main.js")

test('test isfunc', () => {
  expect(util.isFunction(()=>{})).toBe(true);

});

test('test getStackTop', () => {
    const stack = [1,2,3]
    expect(util.getStackTop(stack)).toBe(3);

});
  
test('test isNormalValue', () => {

    expect(util.isNormalValue(undefined)).not.toBeTruthy()
    expect(util.isNormalValue(Math.random())).not.toBeTruthy()
    expect(util.isNormalValue("bool")).toBe(true)
    expect(util.isNormalValue("double")).toBe(true)
    expect(util.isNormalValue("float")).toBe(true)
    expect(util.isNormalValue("int32")).toBe(true)
    expect(util.isNormalValue("uint32")).toBe(true)
    expect(util.isNormalValue("int64")).toBe(true)
    expect(util.isNormalValue("uint64")).toBe(true)
    expect(util.isNormalValue("sint32")).toBe(true)
    expect(util.isNormalValue("sint64")).toBe(true)
    expect(util.isNormalValue("fixed32")).toBe(true)
    expect(util.isNormalValue("fixed64")).toBe(true)
    expect(util.isNormalValue("sfixed32")).toBe(true)
    expect(util.isNormalValue("sfixed64")).toBe(true)
    expect(util.isNormalValue("string")).toBe(true)
    expect(util.isNormalValue("bytes")).toBe(true)
});

test('test deletePropRandom', () => {
    
    let testObject = {
        name:"jack",
        age:1,
        address:"china",
        sex:"male",
    }
    let props = ["name","age","address","sex"]
    util.deletePropRandom(testObject,props)
    expect(Object.keys(testObject).length).toBe(1)

});

test('test isfunc', () => {
    expect(typeof util.logger).toBe("function");
  
  });

  