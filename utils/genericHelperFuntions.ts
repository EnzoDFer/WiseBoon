export function filterByParam<T, K>(myArray:T[],param: keyof T,value:K):T[] {
  return myArray.filter((ele:T) => ele[param]===value);
}

export function filterByName<T extends {name:string}>(myArray:T[],name:string):T[] {
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