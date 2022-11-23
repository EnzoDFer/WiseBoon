import { Dispatch, SetStateAction, useState } from "react";
import { IBudget, useBudget } from "../../../contexts/BudgetsContext";
import styles from "./DropDown.module.scss";

interface IDropDownProps {
  defaultText: string,
  callback: Dispatch<SetStateAction<string|null>>
}

export default function DropDown({defaultText,callback}:IDropDownProps):JSX.Element {

  const [text, setText] = useState<string>(defaultText);
  const {budgets} = useBudget();

  function handleClick(id: string,name: string):void {
    setText(name);
    callback(id);
  } 

  return (
    <div
      className={styles.menu}
    >
      <button>{`Parent budget: ${text}`}</button>
      <div className={styles.itemWrapper}>
        {budgets.map((budget:IBudget,index:number)=>{
          return (
            <div
              key={`budget ${index}`}
              className={styles.item}
              onClick={()=>handleClick(budget.id,budget.name)}
            >
              {budget.name}
            </div>
          );
        })}
      </div>
    </div>
  )
}
