import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useBudget } from "../../../contexts/BudgetsContext";
import BaseModal from "./BaseModal/BaseModal";

interface IExpenseModalProps {
  opened: boolean,
  setOpened:Dispatch<SetStateAction<boolean>>
  parentBudgetId: string|null,
}

export default function ExpenseModal(
  {opened,setOpened,parentBudgetId}:IExpenseModalProps
):JSX.Element|null {

  const [budgetId,setBudgetId] = useState<string|null>(parentBudgetId);
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
     {(!parentBudgetId) && <div>choose parent budget</div>}
      <form onSubmit={()=>handleCreateExpense()}>
        test
      </form>
    </BaseModal>
  );
  return null;
}
