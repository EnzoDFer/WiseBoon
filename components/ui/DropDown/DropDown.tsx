import { Dispatch, SetStateAction, useState } from "react";
import { IBudget, useBudget } from "../../../contexts/BudgetsContext";
import styles from "./DropDown.module.scss";

interface IDropDownProps {
  defaultText: string,
  callback: Dispatch<SetStateAction<string|undefined>>
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
        {
          budgets[0]? //Check if there are any budget groups for user
          budgets.map((budget:IBudget,index:number)=>{
            return (
              <div
                key={`budget ${index}`}
                className={styles.item}
                onClick={()=>handleClick(budget.id,budget.name)}
              >
                {budget.name}
              </div>
            )
          }):
          <div className={styles.item}> No budget groups found</div>
        }
      </div>
    </div>
  )
}
