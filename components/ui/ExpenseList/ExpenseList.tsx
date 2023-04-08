import Image from 'next/image';
import React from 'react'
import { useBudget } from '../../../contexts/BudgetsContext';
import { useModal } from '../../../contexts/ModalContext';
import { IBudget, IExpense } from '../../../utils/interfaces';
import { usdFormat } from '../../../utils/utilFunctions';
import CreateExpenseForm from '../CreateExpenseForm/CreateExpenseForm';
import { ExpenseEditForm } from '../ExpenseEditForm/ExpenseEditForm';
import styles from "./ExpenseList.module.scss"

export default function ExpenseList({budget}:{budget: IBudget}) {
  const { getExpenseList, getBudgetExpensesTotal } = useBudget();
  const { toggleModal, openModal } = useModal();

  const expenseList: IExpense[] = getExpenseList(budget.id);

  function handleExpenseEdit(expense: IExpense) {
    openModal(
      <ExpenseEditForm expense={expense} />
    );
  }

  if (expenseList.length) return (
    <>
      <WarningBanner budget={budget} />
      <div
        className={styles.listWrapper}
      >
        <div className={styles.titleGroup}>
          <h1 className={styles.title}>{budget.name}</h1>
          <div className={styles.amountWrapper}>
            <div className={styles.amount}>{usdFormat(getBudgetExpensesTotal(budget.id))}</div>
            <div className={styles.max}>{'/ ' + usdFormat(budget.max)}</div>
          </div>
        </div>
        <div className={styles.itemsContainer}>
          {
            expenseList.map( (expense: IExpense, index: number) => {
              return (
                <div className={styles.itemWrapper} key={`expense ${index}`}>
                  <p>{expense.description}</p>
                  <div>{usdFormat(expense.amount)}</div>
                  <button
                    className={styles.expenseActions}
                    type='button'
                    onClick={()=>handleExpenseEdit(expense)}
                  >
                    <Image
                      fill
                      src={'/img/icon-dots-vertical.svg'}
                      alt={`More actions for expense ${index}`}
                    />
                  </button>
                </div>
              );
            })
          }
        </div>
        <button
          type="button"
          onClick={toggleModal}
          className={styles.cancelButton}
        >
          Close
        </button>
      </div>
    </>
  );

  return (
    <div
      className={styles.missing}
    >
      <button
        className={`${styles.add} tertiaryAction`}
        onClick={()=>openModal(<CreateExpenseForm/>)}
      >
        Create a new Expense
      </button>
      <button
        className={styles.cancelButton}
        onClick={toggleModal}
      >
        Close
      </button>
    </div>
  );
}

const WarningBanner = ({budget}:{budget:IBudget}): JSX.Element | null => {
  const { getBudgetExpensesTotal } = useBudget();
  const usage: number = getBudgetExpensesTotal(budget.id) / budget.max;

  if (usage >= 0.5) return (
    <div 
      className={styles.warningBanner}
      style={{
        backgroundColor: (usage<0.75)?'hsl(48,100%,88%)':'hsl(360, 100%, 87%)',
      }}
    />
  );

  return null;
}