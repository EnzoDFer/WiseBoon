import React from 'react'
import { useBudget } from '../../../contexts/BudgetsContext'
import { usdFormat } from '../../../utils/utilFunctions';
import styles from './SummaryCard.module.scss'

export const SummaryCard = () => {

  const {
    getTotalExpenses,
    getOverLimitBudgets,
    expenses,
  } = useBudget();

  return (
    <section
      className={styles.summary}
    >
      <p  className={styles.sumValue} >
        <span>{usdFormat(getTotalExpenses())}</span>
        <span> spent</span>
      </p>
      <p  className={styles.sumValue} >
        <span>{expenses.length}</span>
        <span> total expenses</span>
      </p>
      <p  className={styles.sumValue} >
        <span>{getOverLimitBudgets()}</span>
        <span> budgets over limit</span>
      </p>
    </section>
  )
}
