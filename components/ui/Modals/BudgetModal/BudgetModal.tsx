import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import {  useBudget } from "../../../../contexts/BudgetsContext";
import { findNameInArray } from "../../../../utils/genericHelperFuntions";
import Button from "../../Button/Button";
import BaseModal from "../BaseModal/BaseModal";
import styles from './BudgetModal.module.scss';

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
    <BaseModal
    opened={opened} 
    setOpened={setOpened} 
    title={"Add New Budget"}>
      <form 
          onSubmit={()=>handleCreateBudget()}
          className={styles.form}
        >
          <div>
            <label htmlFor="budget name">
              Budget Name
            </label>
            <input
              type={'text'}
              name="budget name"
              placeholder="Budget Name"
              onChange={(e:ChangeEvent<HTMLInputElement>)=>setName(e.target.value)}
              style={(nameValid?{}:{border:'2px solid rgb(251,59,33,0.6)'})}
              value={newName}
              required
            />
            {(!newName || !nameValid) && 
              <text
                className={styles.error}
              >
                {(!newName)?'Please enter a name for the budget':
              nameValid?'':"Budget name already taken."
                }
              </text>
            }
          </div>
          <div>
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
              <text
                className={styles.error}
              >
                {maxValid?'':"Please enter max greater than 0."}  
              </text>
            }
          </div>
          <Button 
            variant='fill'
            disabled={(!nameValid || !maxValid)?true:false}// if !nameValid || !maxValid
          >
            Create
          </Button>
        </form>
    </BaseModal>
  );

  return null;
}