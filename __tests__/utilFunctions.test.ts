import { cleanString, filterByParam, usdFormat } from "../utils/utilFunctions";
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

/*
  Testing function cleanString
*/
describe(cleanString, () => {
  test('removes trailing and leading spaces', () => {
    expect(cleanString(' string ')).toBe('string');
  });

  test('removes in-line breaks', () => {
    expect(cleanString(
      `My
string`
    )).toBe('My string');
    expect(cleanString('My\nstring')).toBe('My string');
  });

  test('multiple line breaks are replaced with a single string', () => {
    expect(cleanString('My\n\n\n\nstring')).toBe('My string');
  });

  test('consecutive spaces within string are replaced with single string', () => {
    expect(cleanString('My     string')).toBe('My string');
  });

  test('a string of spaces and or breaks returns an empty string', () => {
    expect(cleanString(' ')).toBe('');
    expect(cleanString('\n')).toBe('');
    expect(cleanString(' \n ')).toBe('');
  });
});

/*
  Testing function usdFormat
*/
describe(usdFormat, () => {
  test('Delimits with comma every three digits', () => {
    expect(usdFormat(1000000)).toBe('$1,000,000');
  });

  test('Handles negative values', () => {
    expect(usdFormat(-100)).toBe('-$100');
  });

  test('Handles null or undefined input', () => {
    expect(() => usdFormat(null as any)).toThrow(`null was attempted to be formatted as USD.`);
    expect(() => usdFormat(undefined as any)).toThrow(`undefined was attempted to be formatted as USD.`);
  });
});

export {};