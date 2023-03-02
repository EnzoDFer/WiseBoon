import React from 'react'
import { useBudget } from '../../../contexts/BudgetsContext';
import { useModal } from '../../../contexts/ModalContext';
import { IBudget, IExpense } from '../../../utils/interfaces';
import { usdFormat } from '../../../utils/utilFunctions';
import { ExpenseItem } from '../ExpenseItem/ExpenseItem';
import styles from "./ExpenseList.module.scss"

export default function ExpenseList({budget}:{budget: IBudget}) {
  const { getExpenseList, getBudgetExpensesTotal } = useBudget();
  const { toggleModal } = useModal();

  const expenseList: IExpense[] = getExpenseList(budget.id);
 
  if (expenseList.length) return (
    <>
      <div
        className={styles.list}
      >
        <div className={styles.titleGroup}>
          <h1 className={styles.title}>{budget.name}</h1>
          <div className={styles.amountWrapper}>
            <div className={styles.amount}>{usdFormat(getBudgetExpensesTotal(budget.id))}</div>
            <div className={styles.max}>{'/ ' + usdFormat(budget.max)}</div>
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={toggleModal}
        className={styles.cancelButton}
      >
        Close
      </button>
    </>
  );

  return (
    <div>
      No recorded expenses.
      <button
        className={styles.cancelButton}
        onClick={toggleModal}
      >
        Close
      </button>
    </div>
  );
}


/*
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
        */