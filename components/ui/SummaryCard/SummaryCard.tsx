import React from 'react'
import { useBudget } from '../../../contexts/BudgetsContext'
import styles from './SummaryCard.module.scss'

export const SummaryCard = () => {

  const {
    expenses
  } = useBudget();

  return (
    <section
      className={styles.summary}
    >
      <p  className={styles.sumValue} ><span>$100</span><span> spent</span></p>
      <p  className={styles.sumValue} ><span>{expenses.length}</span><span> total expenses</span></p>
      <p  className={styles.sumValue} ><span>2</span><span> budgets over limit</span></p>
    </section>
  )
}
