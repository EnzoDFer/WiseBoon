import { ChangeEvent, useEffect, useState } from "react";
import {  useBudget } from "../../../contexts/BudgetsContext";
import { useModal } from "../../../contexts/ModalContext";
import { filterByParam, cleanString } from "../../../utils/utilFunctions";
import styles from './CreateBudgetForm.module.scss';

export default function CreateBudgetForm():JSX.Element|null {

  const {toggleModal} = useModal();

  const [newName,setName] = useState<string>();
  const [nameValid, setNameValid] = useState<boolean>(false);
  const [newMax,setMax] = useState<number>();
  const [maxValid, setMaxValid] = useState<boolean>(false);

  const { addBudget, budgets } = useBudget();

  useEffect(()=>{
    //Validation
    //Name Validation
    if (newName) {
      // Checks if name already exists by filtering budgets by name and checking if filtered array is empty
      if (!filterByParam(budgets,'name',cleanString(newName),'include').length) {
        setNameValid(true);
      }
      else setNameValid(false);
    } 
    else setNameValid(false);
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
    toggleModal();
  }

  return (
    <form 
      onSubmit={()=>handleCreateBudget()}
      className={styles.form}
    >
      <div
        className={styles.inputWrapper}
      >
        <label htmlFor="budget name">
          Budget Name
        </label>
        <input
          type={'text'}
          name="budget name"
          placeholder="Budget Name"
          onChange={(e:ChangeEvent<HTMLInputElement>)=>setName((e.target.value))}
          style={(nameValid?{}:{border:'2px solid hsl(0, 100%, 80%)'})}
          value={newName}
          required
        />
        {(!newName || !nameValid) && 
          <span
            className={styles.error}
          >
            {(!newName)?'Please enter a name for the budget':
          nameValid?'':"Budget name already taken."
            }
          </span>
        }
      </div>
      <div
        className={styles.inputWrapper}
      >
        <label htmlFor="budget max" >Budget Maximum</label>
        <input
          type='number'
          name="budget max"
          placeholder="Budget Max"
          onChange={(e:ChangeEvent<HTMLInputElement>)=>setMax(parseFloat(e.target.value))}
          style={(maxValid?{}:{border:'2px solid rgb(251,59,33,0.6)'})}
          value={newMax}
          required
        />
        {(!newMax || !maxValid) && 
          <span
            className={styles.error}
          >
            {maxValid?'':"Please enter max greater than 0."}  
          </span>
        }
      </div>
      <div className={styles.buttonGroup}>
        <button
          className={styles.cancelButton}
        >
          Cancel
        </button>
        <button
          className={styles.confirmButton}
        >
          Create
        </button>
      </div>
    </form>
  );
}