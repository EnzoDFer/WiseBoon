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
      <SumValue
        val={expenses.length}
        text={'total expenses'}
        alt={'See more regarding total expenses'}
      />
      <SumValue
        val={getOverLimitBudgets()}
        text={'budgets over limit'}
        alt={'See more regarding over-limit budgets'}
      />
    </section>
  )
}

const SumValue = ({val,text, alt}: {val: string | number, text: string, alt: string}) => {
  return (
    <p  className={styles.sumValue} >
      <span>{val}</span>
      <span>{` ${text}`}</span>
      <Image
        alt={`${text} Help Tooltip Button`}
        src={'/img/icon-help.svg'}
        height={16}
        width={16}
      />
      <Image
        alt={alt}
        src={'/img/icon-cheveron-right-circle.svg'}
        height={24}
        width={24}
      />
    </p>
  );
}