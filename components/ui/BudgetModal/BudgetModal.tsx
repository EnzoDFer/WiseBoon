import { ChangeEvent, useEffect, useState } from "react";
import { IBudget, useBudget } from "../../../contexts/BudgetsContext";
import styles from "./BudgetModal.module.css";
import { v4 as uuidV4 } from "uuid";

export default function BudgetModal(
  {opened,setOpened}:{opened:boolean,setOpened:(state:boolean)=>void}
):JSX.Element|null {

  const [newName,setName] = useState<string>();
  const [nameValid, setNameValid] = useState<boolean>(false);
  const [newMax,setMax] = useState<number>();
  const [maxValid, setMaxValid] = useState<boolean>(false);

  const { addBudget, budgets } = useBudget();

  function handleValidation(): void {
    //Validation
    //Name Validation
    if (newName && !(newName in budgets)) {
      setNameValid(true);
    } else setNameValid(false);
    //Max Validation
    if (newMax && (newMax >= 0)) {
      setMaxValid(true);
    } else setMaxValid(false);
  }

  function handleCreateBudget(): void {
    handleValidation();
    if (nameValid && maxValid) {
      addBudget({
        name: newName!,
        max: newMax!,
      })
    }
    setOpened(false);
  }

  if (opened) return (
    <div
        className={styles.background}
       >
        <div
          className={styles.modal}
        >
          <h1>Add New Budget</h1>
          <form onSubmit={()=>handleCreateBudget()}>
            <label htmlFor="budget name">{nameValid?'':"Budget name already taken."}</label>
            <input 
              type={'text'} 
              name="budget name" 
              placeholder="Budget Name"
              onChange={(e:ChangeEvent<HTMLInputElement>)=>setName(e.target.value)}
              value={newName}
              required
            />
            <label htmlFor="budget max" >{maxValid?'':"Please enter max greater than 0."}</label>
            <input 
              type='number' 
              name="budget max" 
              placeholder="Budget Name"
              onChange={(e:ChangeEvent<HTMLInputElement>)=>setMax(parseFloat(e.target.value))}
              value={newMax}
              required
            />
            <input type="submit" value="Create" />
          </form>
        </div>
    </div>
  );

  return null;
}

