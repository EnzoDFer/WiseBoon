import { ChangeEvent, useEffect, useState } from "react";
import { useBudget } from "../../../contexts/BudgetsContext";
import { useModal } from "../../../contexts/ModalContext";
import Button from "../Button/Button";
import DropDown from "../DropDown/DropDown";
import styles from './CreateExpenseForm.module.scss';

export default function CreateExpenseForm():JSX.Element|null {

  const {toggleModal} = useModal();

  const [budgetId,setBudgetId] = useState<string>();
  const [budgetIdValid,setBudgetIdValid] = useState<boolean>(false);
  const [budgetName, setBudgetName] = useState<string>();
  const [newAmount, setAmount] = useState<number>();
  const [amountValid, setAmountValid] = useState<boolean>(false);
  const [newDescription, setDescription] = useState<string>();
  const [descriptionValid, setDescriptionValid] = useState<boolean>(false);

  const {addExpense, currentBudget, setCurrentBudget} = useBudget();

  useEffect(()=>{
    //Validation

    if (currentBudget) {
      setBudgetId(currentBudget.id);
      setBudgetName(currentBudget.name);
    }

    //budgetId Validation
    if (budgetId) {
      setBudgetIdValid(true);
    } else {
      setBudgetIdValid(false);
    }
    //Amount Validation
    if (newAmount && (newAmount>=0)) {
      setAmountValid(true);
    } else setAmountValid(false);
    //Description Validation
    if (newDescription) {
      setDescriptionValid(true);
    } else setDescriptionValid(false);
  }, [budgetId, currentBudget, newAmount, newDescription])


  function handleSetBudget(id:string, name:string) {
    setBudgetId(id);
    setBudgetName(name);
  }

  function handleCreateExpense(): void {
    if (budgetIdValid && amountValid && descriptionValid) {
      addExpense({
        budgetId: budgetId!,
        budgetName: budgetName!,
        amount: newAmount!,
        description: newDescription!,
      })
    }
    toggleModal();
    setCurrentBudget(undefined);
    setBudgetId(undefined);
    setAmount(undefined);
    setDescription(undefined);
  }

  return (
    <form 
      onSubmit={()=>handleCreateExpense()}  
      className={styles.form} 
    >
      { 
        (!currentBudget)? 
        <DropDown 
          defaultText="Please select budget group ⌄"
          callback={handleSetBudget}
        />:
        <div style={{marginBottom:'1rem'}}>{`Budget Group: ${currentBudget.name}`}</div>
      } 
      {/* Expense Amount Input */}
      <div
        className={styles.inputWrapper}
      >
        <label htmlFor="expense amount">
          Expense Amount
        </label>
        <input
          type={"number"}
          name="expense amount"
          placeholder="$0"
          onChange={(e:ChangeEvent<HTMLInputElement>)=>setAmount(parseFloat(e.target.value))}
          style={(amountValid?{}:{border:'2px solid rgb(251,59,33,0.6)'})}
          value={newAmount}
          required
        />  
        {
          (!newAmount || !amountValid) && 
          <span
            className={styles.error}
          >
            {
              (!newAmount)?
              'Please enter the expense amount':
              amountValid?
                '':
                "Please enter an expense greater than 0"
            }
          </span>
        }
      </div>
      {/* Expense Description Input */}
      <div
        className={styles.inputWrapper}
      >
        <label htmlFor="expense description">
          Expense Description
        </label>
        <textarea
          name="expense description"
          placeholder="Ex: New wallet purchased at XYZ Mall"
          onChange={(e:ChangeEvent<HTMLTextAreaElement>)=>setDescription(e.target.value)}
          style={(descriptionValid?{}:{border:'2px solid rgb(251,59,33,0.6)'})}
          value={newDescription}
          required
        />
        {(!newDescription || !descriptionValid) && 
          <span
            className={styles.error}
          >
            {
              (!newDescription || !descriptionValid) && 'Please enter an expense description'
            }
          </span>
        }
      </div>
      <div className={styles.buttonGroup}>
        <button
          type="button"
          onClick={toggleModal}
          className={styles.cancelButton}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={styles.confirmButton}
          disabled={!(budgetIdValid && amountValid && descriptionValid)}
        >
          {!(budgetIdValid && amountValid && descriptionValid)?'Please enter missing information':"Create"}
        </button>
      </div>
    </form>
  );
}