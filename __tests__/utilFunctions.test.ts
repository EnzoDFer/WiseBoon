import { filterByParam } from "../utils/utilFunctions";
/*
  Testing function filterByParam
*/
describe('filterByParam', () => {
  test('Does not mutate original array', () => {
    const array1 = [
      { name: "John", age: 25 },
      { name: "Jane", age: 30 },
      { name: "Jim", age: 35 },
      { name: "Jerry", age: 25 },
    ];
    const array2 = filterByParam(array1,'age',25,'include');
    expect(array2).not.toBe(array1);
  })

  test('Returns new object array where [param]===key', () => {
    const array1 = [
      { name: "John", age: 25 },
      { name: "Jane", age: 30 },
      { name: "Jim", age: 35 },
      { name: "Jerry", age: 25 },
    ];
    const array2 = filterByParam(array1,'age',25,'include');
    expect(array2).toEqual([{ name: "John", age: 25 }, { name: "Jerry", age: 25 }]);
  })

  test('Returns new object array where [param]!==key', () => {
    const array1 = [
      { name: "John", age: 25 },
      { name: "Jane", age: 30 },
      { name: "Jim", age: 35 },
      { name: "Jerry", age: 25 },
    ];
    const array2 = filterByParam(array1,'age',25,'exclude');
    expect(array2).toEqual([{ name: "Jane", age: 30 }, { name: "Jim", age: 35 }]);
  })

  test('Handles empty array case', () => {
    const array1 = filterByParam([],'param','val','include');
    const array2 = filterByParam([],'param','val','exclude');
    expect(array1).toStrictEqual([]);
    expect(array2).toStrictEqual([]);
  })

  test('Handles multi-type object', () => {
    const array1 = [{name: 'John', age: 25}, {name: 'John', city: 'NY'}];
    const array2 = filterByParam(array1,'name','John','include');
    expect(array2).toStrictEqual([{name: 'John', age: 25}, {name: 'John', city: 'NY'}]);
    expect(array2).not.toStrictEqual([{}]);
  })
});

export {};