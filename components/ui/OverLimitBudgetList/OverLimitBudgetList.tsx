import styles from "./OverLimitBudgetList.module.scss";
import React from 'react'
import { useBudget } from "../../../contexts/BudgetsContext";
import { useModal } from "../../../contexts/ModalContext";
import { IBudget } from "../../../utils/interfaces";
import ExpenseList from "../ExpenseList/ExpenseList";
import Image from "next/image";
import { usdFormat } from "../../../utils/utilFunctions";

export const OverLimitBudgetList = () => {
  const { getTotalExpenses, budgets, getBudgetExpensesTotal } = useBudget();
  const { toggleModal, openModal } = useModal();

  const overLimitBudgets: IBudget[] = budgets.filter((budget: IBudget)=>getBudgetExpensesTotal(budget.id)>budget.max);

  return (
    <div className={styles.wrapper}>
      <h3>Over-Limit Budgets</h3>
      <div className={styles.itemsContainer}>
        {
          overLimitBudgets.length?
          overLimitBudgets.map( (budget: IBudget, index: number) => {
            return (
              <div className={styles.itemWrapper} key={`budget ${index}`}>
                <p>{budget.name}</p>
                <p>
                  <h3>{`${usdFormat(getBudgetExpensesTotal(budget.id) - budget.max)}`}</h3>
                  <h4>{' over'}</h4>
                </p>
                <button
                    onClick={()=>openModal(<ExpenseList budget={budget} />)}
                >
                  <Image
                    alt={`See details about ${budget.name}`}
                    src={'/img/icon-cheveron-right-circle-table.svg'}
                    height={24}
                    width={24}
                  />
                </button>
              </div>
            );
          }):
          <div className={styles.empty}>
            <h3> Great News!</h3>
            <p>No budgets over limit</p>
          </div>
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
  )
}
