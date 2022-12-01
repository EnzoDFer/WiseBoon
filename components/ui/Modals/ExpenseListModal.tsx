import { Dispatch, SetStateAction } from "react";
import { IBudget, IExpense, useBudget } from "../../../contexts/BudgetsContext";
import { usdFormatter } from "../../../utils/formatCurrency";
import { ExpenseItem } from "../ExpenseItem/ExpenseItem";
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
              <ExpenseItem
                key={`expense ${index}`} 
                description={expense.description} 
                amount={expense.amount} 
                handleEdit={()=>{}} 
                handleDel={()=>{}}                
              />
            );
          })}
        </ul>:
        <div>Has no expenses</div>
      }
    </BaseModal>
  );

  return null;
}