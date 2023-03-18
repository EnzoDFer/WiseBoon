import React from 'react';
import { useBudget } from '../../../contexts/BudgetsContext';
import { useModal } from '../../../contexts/ModalContext';
import { IBudget, IExpense } from '../../../utils/interfaces';
import styles from "./DeletePrompt.module.scss";

export const DeletePrompt = ({item}:{item: IBudget | IExpense}) => {
  const {toggleModal} = useModal();
  const {deleteExpense, deleteBudget} = useBudget();

  const handleDelete = (id: string) => {
    if ('amount' in item) {
      deleteExpense(id)
    } else {
      deleteBudget(id)
    }
    toggleModal();  
  }

  return (
    <div className={styles.wrapper}>
      <p>Are you sure you want to delete this {'amount' in item?'expense':'budget'}?</p>
      <div className={styles.buttonGroup}>
        <button
          type='button'
          className={'primaryAction '+styles.deleteButton}
          onClick={()=>handleDelete(item.id)}
        >
          DELETE
        </button>
        <button
          type='button'
          className={'tertiaryAction '+styles.cancelButton}
          onClick={toggleModal}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
