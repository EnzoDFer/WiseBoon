import styles from "./BudgetBreakdownList.module.scss";
import React from 'react'
import { useBudget } from "../../../contexts/BudgetsContext";
import { IBudget } from "../../../utils/interfaces";
import { useModal } from "../../../contexts/ModalContext";
import ExpenseList from "../ExpenseList/ExpenseList";
import Image from "next/image";

export const BudgetBreakdownList = () => {
  const { getTotalExpenses, budgets, getBudgetExpensesTotal } = useBudget();
  const { toggleModal, openModal } = useModal();
  budgets.sort((a: IBudget, b: IBudget) => getBudgetExpensesTotal(b.id) - getBudgetExpensesTotal(a.id))

  return (
    <div className={styles.wrapper}>
      <h3>Budget Breakdown</h3>
      <div className={styles.itemsContainer}>
        {
          budgets.map( (budget: IBudget, index: number) => {
            return (
              <div className={styles.itemWrapper} key={`budget ${index}`}>
                <p>{budget.name}</p>
                <h3>{`${(getBudgetExpensesTotal(budget.id)/getTotalExpenses()*100).toFixed(2)}%`}</h3>
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
  )
}
