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
