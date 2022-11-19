export function filterById<T extends {id:string}>(myArray:T[],id:string):T[] {
  return myArray.filter((ele:T) => ele.id!==id);
}

export function filterByName<T extends {name:string}>(myArray:T[],name:string):T[] {
  return myArray.filter((ele:T) => ele.name!==name);
}

export function findNameInArray<T extends {name:string}>(myArray:T[],name: string):boolean {
  return myArray.reduce((isPresent:boolean,currentElement:T)=>{
    if (currentElement.name!==name) {
      return false;
    }
    return true;
  },false)
}
