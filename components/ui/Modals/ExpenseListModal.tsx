import { Dispatch, SetStateAction } from "react";
import { useBudget } from "../../../contexts/BudgetsContext";
import { IExpense } from "../../../utils/interfaces";
import { ExpenseItem } from "../ExpenseItem/ExpenseItem";
import BaseModal from "./BaseModal/BaseModal";
import styles from "./BaseModal/BaseModal.module.scss";

/* export default function ExpenseListModal(
  {opened,setOpened}:
  {opened:boolean,setOpened:Dispatch<SetStateAction<boolean>>}
):JSX.Element|null {

  const {getBudgetExpenses, currentBudget, deleteExpense} = useBudget();

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
        <div
          className={styles.list}
        >
          {expenseList.map((expense:IExpense,index:number)=>{
            return (
              <ExpenseItem
                key={`expense ${index}`} 
                description={expense.description} 
                amount={expense.amount}
                handleDel={()=>deleteExpense(expense.id)}                
              />
            );
          })}
        </div>:
        <div>Has no expenses</div>
      }
    </BaseModal>
  );

  return null;
} */