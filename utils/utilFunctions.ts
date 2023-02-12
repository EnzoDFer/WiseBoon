/**
 * Filters an array of objects based on the value of a specified parameter and returns a new filtered array.
 * The filter type determines whether to include or exclude objects based on the equality of the specified parameter and value.
 * @param myArray The array to filter by the parameter and value
 * @param param The object parameter to filter by in the parameter array, myArray
 * @param value The value to filter for using the object key [param].
 * @param filter The filter type, 'include' or 'exclude'.
 * @returns Returns a new filtered array of objects.
 */
export function filterByParam<T, K>(myArray:T[],param: keyof T,value:K,filter: 'include'|'exclude'):T[] {
  if (filter==='include') {
    return myArray.filter((ele:T) => ele[param]===value);
  } else {
    return myArray.filter((ele:T) => ele[param]!==value);
  }
}
/**
 * Returns a new string where leading/trailing spaces are removed 
 * and multi-line breaks are replaced with single space
 * @param str String to be trimmed
 * @returns new string
 */
export function cleanString(str: string): string {
  //First trims starting and ending spaces
  //then replaces inner line breaks using regex with a normal space
  return str.trim().replace(/[\r\n]+/gm, ' ');
}