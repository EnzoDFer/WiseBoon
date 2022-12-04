export function filterById<T extends {id:string}>(myArray:T[],id:string):T[] {
  return myArray.filter((ele:T) => ele.id!==id);
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

export function removeRedundantSpaces(str: string): string {
  //Checks to see if there are any starting or ending spaces
  //and removes them accordingly
  if (str[0]===' ') {
    return removeRedundantSpaces(str.substring(1));
  } 
  else if (str[str.length-1]===' ') {
    return removeRedundantSpaces(str.substring(0,str.length-1));
  } 
  else return str;
}