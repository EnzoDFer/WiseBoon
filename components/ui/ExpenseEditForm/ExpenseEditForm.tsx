import React from 'react'
import { IExpense } from '../../../utils/interfaces';
import { usdFormat } from '../../../utils/utilFunctions';
import styles from "./ExpenseEditForm.module.scss"

export const ExpenseEditForm = ({expense}:{expense: IExpense}) => {
  return (
    <form>
      <h3>Edit Expense</h3>
      <div className={styles.expenseWrapper}>
        <label className={styles.hidden} htmlFor='expense-description'>Expense Description Box</label>
        <textarea id='expense-description' placeholder={expense.description}/>

        <label aria-label='Expense Amount Box' htmlFor='expenseAmount'>$</label>
        <input type='number' id='expenseAmount' defaultValue={expense.amount}/>
      </div>
    </form>
  );
}
