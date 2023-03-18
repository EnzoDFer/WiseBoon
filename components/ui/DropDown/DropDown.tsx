import { useRef, useState } from "react";
import { useBudget } from "../../../contexts/BudgetsContext";
import { IBudget } from "../../../utils/interfaces";
import styles from "./DropDown.module.scss";

interface IDropDownProps {
  defaultText: string,
  callback: (id: string, name: string)=> void,
}

export default function DropDown({defaultText,callback}:IDropDownProps):JSX.Element {

  const [text, setText] = useState<string>(defaultText);
  const [hasBudget, setHasBudget] = useState<boolean>(false);
  const {budgets} = useBudget();
  const checkboxRef = useRef<HTMLInputElement>(null);

  function handleClick(id: string,name: string):void {
    if (checkboxRef.current) checkboxRef.current.checked = false;
    setText(name);
    setHasBudget(true);
    callback(id,name);
  } 

  return (
    <div
      className={styles.menu}
    >
      <label htmlFor="budget-select" className={`${styles.label} ${hasBudget?styles.hasBudget:''}`}>{`${text}`}</label>
      <input id='budget-select' type='checkbox' className={styles.checkbox} ref={checkboxRef}/>
      <div className={styles.itemWrapper}>
        {
          budgets[0]? //Check if there are any budget groups for user
          budgets.map((budget:IBudget,index:number)=>{
            return (
              <button
                type="button"
                key={`budget ${index}`}
                className={styles.item}
                onClick={()=>handleClick(budget.id,budget.name)}
              >
                {budget.name}
              </button>
            )
          }):
          <div className={styles.item}>No budget groups found</div>
        }
      </div>
    </div>
  )
}
