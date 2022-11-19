import { useEffect, useState } from "react";
import { IBudget, useBudget } from "../../../contexts/BudgetsContext";
import styles from "./BudgetModal.module.css";
import { v4 as uuidV4 } from "uuid";

export default function BudgetModal(
  {opened}:{opened:boolean}
):JSX.Element|null {

  const [newName,setName] = useState<string>();
  const [nameValid, setNameValid] = useState<boolean>(false);
  const [newMax,setMax] = useState<number>();
  const [maxValid, setMaxValid] = useState<boolean>(false);

  const { addBudget } = useBudget();

  function handleCreateBudget(): void {
    if (nameValid && maxValid) {
      addBudget({
        id: uuidV4(),
        name: newName,
        max: newMax,
      })}
    }
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
            <label htmlFor="budget name"/>
            <input 
              type={'text'} 
              name="budget name" 
              placeholder="Budget Name" 
            />
            <label htmlFor="budget max"/>
            <input 
              type={'number'} 
              name="budget max" 
              placeholder="Budget Name" 
            />
            <input type="submit" value="Create" />
          </form>
        </div>
    </div>
  );

  return null;
}

