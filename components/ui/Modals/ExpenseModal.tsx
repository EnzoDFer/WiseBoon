import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import { IBudget, useBudget } from "../../../contexts/BudgetsContext";
import Button from "../Button/Button";
import DropDown from "../DropDown/DropDown";
import BaseModal from "./BaseModal/BaseModal";
import styles from './BaseModal/ModalForm.module.scss';

interface IExpenseModalProps {
  opened: boolean,
  setOpened:Dispatch<SetStateAction<boolean>>
  parentBudget: IBudget|null,
}

export default function ExpenseModal(
  {opened,setOpened,parentBudget}:IExpenseModalProps
):JSX.Element|null {

  const [budgetId,setBudgetId] = useState<string|null>(parentBudget?parentBudget.id:null);
  const [budgetIdValid,setBudgetIdValid] = useState<boolean>(false);
  const [newAmount, setAmount] = useState<number>();
  const [amountValid, setAmountValid] = useState<boolean>(false);
  const [newDescription, setDescription] = useState<string>();
  const [descriptionValid, setDescriptionValid] = useState<boolean>(false);

  const {addExpense} = useBudget();

  useEffect(()=>{
    //Validation
    //budgetId Validation
    if (budgetId) {
      setBudgetIdValid(true);
    } else setBudgetIdValid(false);
    //Amount Validation
    if (newAmount && (newAmount>=0)) {
      setAmountValid(true);
    } else setAmountValid(false);
    //Description Validation
    if (newDescription) {
      setDescriptionValid(true);
    } else setDescriptionValid(false);
  },[budgetId, newAmount, newDescription])

  function handleCreateExpense(): void {
    if (budgetIdValid && amountValid && descriptionValid) {
      addExpense({
        budgetId: budgetId!,
        amount: newAmount!,
        description: newDescription!,
      })
    }
    setOpened(false);
  }

   if (opened) return (
    <BaseModal
      opened={opened}
      setOpened={setOpened}
      title={"Add New Expense"}
    >
      {(!parentBudget)? 
        <DropDown 
          defaultText="Please select parent budget."
          callback={setBudgetId}
        />:
        <div style={{marginBottom:'1rem'}}>{`Parent budget: ${parentBudget.name}`}</div>
      }
      <form 
        onSubmit={()=>handleCreateExpense()}  
        className={styles.form} 
      >
        {/* Expense Amount Input */}
        <div>
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
          {(!newAmount || !amountValid) && 
            <text
              className={styles.error}
            >
              {(!newAmount)?'Please enter the expense amount':
            amountValid?'':"Please enter an expense greater than 0"
              }
            </text>
          }
        </div>
        {/* Expense Description Input */}
        <div>
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
            <text
              className={styles.error}
            >
              {
                (!newDescription || !descriptionValid) && 'Please enter an expense description'
              }
            </text>
          }
        </div>
        <Button 
            variant='fill'
            disabled={(!budgetIdValid || !amountValid || !descriptionValid)?true:false}
          >
            Create
          </Button>
      </form>
    </BaseModal>
  );
  return null;
}
