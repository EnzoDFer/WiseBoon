import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useBudget } from "../../../contexts/BudgetsContext";
import BaseModal from "./BaseModal/BaseModal";

interface IExpenseModalProps {
  opened: boolean,
  setOpened:Dispatch<SetStateAction<boolean>>
  parentBudgetId: string,
}

export default function ExpenseModal(
  {opened,setOpened,parentBudgetId}:IExpenseModalProps
):JSX.Element|null {

  const [budgetId,setBudgetId] = useState<string>(parentBudgetId);
  const [newAmount, setAmount] = useState<number>();
  const [amountValid, setAmountValid] = useState<boolean>(false);
  const [newDescription, setDescription] = useState<string>();
  const [descriptionValid, setDescriptionValid] = useState<boolean>(false);

  const {addExpense} = useBudget();

  useEffect(()=>{
    //Validation
    //Amount Validation
    if (newAmount && (newAmount>=0)) {
      setAmountValid(true);
    } else setAmountValid(false);
    //Description Validation
    if (newDescription) {
      setDescriptionValid(true);
    } else setDescriptionValid(false);
  },[newAmount, newDescription])

  function handleCreateExpense(): void {
    if (amountValid && descriptionValid) {
      addExpense({
        budgetId: budgetId,
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
     {/*  {
        if no budgetId <DropDownMenu chooseBudget
      } */}
      <form>

      </form>
    </BaseModal>
  );
  return null;
}
