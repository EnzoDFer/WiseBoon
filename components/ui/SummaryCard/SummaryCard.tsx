import Image from 'next/image';
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
      <SumValue
        val={usdFormat(getTotalExpenses())}
        text={'spent'}
        alt={'See more regarding total spent'}
      />
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

const SumValue = ({val,text, alt}: {val: string | number, text: string, alt: string}) => {
  return (
    <p  className={styles.sumValue} >
      <span>{val}</span>
      <span>{` ${text}`}</span>
      <Image
        alt={alt}
        src={'/img/icon-cheveron-right-circle.svg'}
        height={24}
        width={24}
      />
    </p>
  );
}