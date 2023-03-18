import React, { FormEvent, useState } from 'react'
import { useBudget } from '../../../contexts/BudgetsContext';
import { useModal } from '../../../contexts/ModalContext';
import { IExpense } from '../../../utils/interfaces';
import { DeletePrompt } from '../DeletePrompt/DeletePrompt';
import styles from "./ExpenseEditForm.module.scss"

export const ExpenseEditForm = ({expense}:{expense: IExpense}) => {
  const { editExpense } = useBudget();
  const { toggleModal, openModal } = useModal();
  const [newExpense, setNewExpense] = useState<Partial<IExpense>>({
    description: expense.description,
    amount: expense.amount
  });

  const handleDataUpdate = (param: keyof Partial<IExpense>) => <T extends HTMLElement>(e: React.ChangeEvent<T>) => { 
    if (!('value' in e.target)) throw new Error('Unexpected form element attempted to update');
    let newValue: string | number = e.target.value as string;
    if (param === 'amount') newValue = parseInt(newValue);
    setNewExpense({ ...newExpense, [param]: newValue })
  }

  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editExpense({...newExpense, id: expense.id});
    toggleModal();
  };  

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3 className={styles.title}>Edit Expense</h3>
      <div className={styles.expenseWrapper}>
        <label className='hidden' htmlFor='expense-description'>Expense Description Box</label>
        <textarea id='expense-description' placeholder={newExpense.description} onChange={handleDataUpdate('description')}/>

        <label aria-label='Expense Amount Box' htmlFor='expenseAmount'>$</label>
        <input type='number' id='expenseAmount' defaultValue={newExpense.amount} onChange={handleDataUpdate('amount')}/>
      </div>
      <div className={styles.buttonWrapper}>
        <button
          type='button'
          className='tertiaryAction'  
          onClick={()=>openModal(<DeletePrompt item={expense}/>)}
        >
          Delete
        </button>
        <button
          type='button'
          className='secondaryAction'
          onClick={()=>toggleModal()}
        >
          Cancel
        </button>
        <button
          type='submit'
          className='primaryAction'
        >
          Submit
        </button>
      </div>
    </form>
  );
}
