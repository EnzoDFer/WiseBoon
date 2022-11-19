import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import {  useBudget } from "../../../contexts/BudgetsContext";
import { findNameInArray } from "../../../utils/genericHelperFuntions";
import styles from "./BudgetModal.module.scss";

export default function BudgetModal(
  {opened,setOpened}:{opened:boolean,setOpened:Dispatch<SetStateAction<boolean>>}
):JSX.Element|null {

  const [newName,setName] = useState<string>();
  const [nameValid, setNameValid] = useState<boolean>(false);
  const [newMax,setMax] = useState<number>();
  const [maxValid, setMaxValid] = useState<boolean>(false);

  const { addBudget, budgets } = useBudget();

  useEffect(()=>{
    //Validation
    //Name Validation
    if (newName && !(findNameInArray(budgets,newName))) {
      setNameValid(true);
    } else setNameValid(false);
    //Max Validation
    if (newMax && (newMax >= 0)) {
      setMaxValid(true);
    } else setMaxValid(false);
  },[newName, newMax, budgets])

  function handleCreateBudget(): void {
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
      className={styles.wrapper}
    >
      <div 
        className={styles.background} 
        onClick={()=>setOpened(false)}
      />
      <div
        className={styles.modal}
      >
        <div
          className={styles.titleWrapper}
        >
          <h1>Add New Budget</h1>
          <button 
            onClick={()=>setOpened(false)}
            className={styles.closeButton}
            name='close button'
          >
            x
          </button>
        </div>
        <hr className={styles.divider}/>
        <form 
          onSubmit={()=>handleCreateBudget()}
          className={styles.form}
        >
          <div>
            <label htmlFor="budget name">
              {(!newName)?'Please enter a name for the budget':
              nameValid?'':"Budget name already taken."
              }
            </label>
            <input
              type={'text'}
              name="budget name"
              placeholder="Budget Name"
              onChange={(e:ChangeEvent<HTMLInputElement>)=>setName(e.target.value)}
              value={newName}
              required
            />
          </div>
          <div>
            <label htmlFor="budget max" >{maxValid?'':"Please enter max greater than 0."}</label>
            <input
              type='number'
              name="budget max"
              placeholder="Budget Max"
              onChange={(e:ChangeEvent<HTMLInputElement>)=>setMax(parseFloat(e.target.value))}
              value={newMax}
              required
            />
          </div>
          <input type="submit" value="Create" />
        </form>
      </div>
    </div>
  );

  return null;
}

