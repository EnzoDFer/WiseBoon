import React from 'react'
import { useBudget } from '../../../contexts/BudgetsContext';
import { useModal } from '../../../contexts/ModalContext';
import { IExpense } from '../../../utils/interfaces';
import { ExpenseItem } from '../ExpenseItem/ExpenseItem';
import styles from "./ExpenseList.module.scss"

export default function ExpenseList({budgetId}:{budgetId:string}) {
  const { getExpenseList, deleteExpense } = useBudget();
  const { toggleModal } = useModal();

  const expenseList: IExpense[] = getExpenseList(budgetId);
 
  if (expenseList.length) return (
    <div>
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
      </div>
      <button
        onClick={toggleModal}
      >
        Close
      </button>
    </div>
  );

  return (
    <div>
      No recorded expenses.
      <button
        onClick={toggleModal}
      >
        Close
      </button>
    </div>
  );
}
