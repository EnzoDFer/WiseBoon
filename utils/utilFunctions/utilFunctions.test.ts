import { filterByParam } from "./utilFunctions";
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
});

export {};