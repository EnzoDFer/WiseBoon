import { Dispatch, SetStateAction } from "react";
import { IBudget, IExpense, useBudget } from "../../../contexts/BudgetsContext";
import { usdFormatter } from "../../../utils/formatCurrency";
import BaseModal from "./BaseModal/BaseModal";

export default function ExpenseListModal(
  {opened,setOpened}:
  {opened:boolean,setOpened:Dispatch<SetStateAction<boolean>>}
):JSX.Element|null {

  const {getBudgetExpenses, currentBudget} = useBudget();

  if (!currentBudget) return null;
  const expenseList: IExpense[] = getBudgetExpenses(currentBudget.id);

  if (opened) return (
    <BaseModal
      opened={opened} 
      setOpened={setOpened} 
      title={"Expenses List"}
    >
      { 
        expenseList.length?
        <ul>
          {expenseList.map((expense:IExpense,index:number)=>{
            return (
              <li
                key={`expense ${index}`}
              >
               <div>{`Description:`}</div>
               <div>{expense.description}</div> 
               <div>{`Amount: ${usdFormatter.format(expense.amount)}`}</div>
              </li>
            );
          })}
        </ul>:
        <div>Has no expenses</div>
      }
    </BaseModal>
  );

  return null;
}