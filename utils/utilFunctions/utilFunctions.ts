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

//depracated due to filterByParam
export function filterByName<T extends {name:string}>(myArray:T[],name:string):T[] {
  console.warn("filterByName is deprecated.  Please use filterByParam")
  return myArray.filter((ele:T) => ele.name.toLowerCase()!==name.toLowerCase());
}

export function findNameInArray<T extends {name:string}>(myArray:T[],name: string):boolean {
  return myArray.reduce((isPresent:boolean,currentElement:T)=>{
    if (currentElement.name.toLowerCase()!==name.toLowerCase()) {
      return false;
    }
    return true;
  },false)
}

export function removeRedundantBreaks(str: string): string {
  //First trims starting and ending spaces
  //then replaces inner line breaks using regex with a normal space
  return str.trim().replace(/[\r\n]/gm, ' ');
}