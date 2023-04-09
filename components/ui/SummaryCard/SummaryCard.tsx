import Image from 'next/image';
import React from 'react'
import { useBudget } from '../../../contexts/BudgetsContext'
import { useModal } from '../../../contexts/ModalContext';
import { usdFormat } from '../../../utils/utilFunctions';
import { BudgetBreakdownList } from '../BudgetBreakdownList/BudgetBreakdownList';
import { TotalSpentList } from '../TotalSpentList/TotalSpentList';
import styles from './SummaryCard.module.scss'

export const SummaryCard = () => {

  const {
    getTotalExpenses,
    getOverLimitBudgets,
    expenses,
  } = useBudget();

  const {openModal} = useModal();

  return (
    <section
      className={styles.summary}
    >
      <SumValue
        val={usdFormat(getTotalExpenses())}
        text={'spent'}
        alt={'See more regarding total spent'}
        onClick={()=>openModal(<BudgetBreakdownList/>)}
      />
      <SumValue
        val={expenses.length}
        text={'total expenses'}
        alt={'See more regarding total expenses'}
        onClick={()=>openModal(<TotalSpentList/>)}
      />
      <SumValue
        val={getOverLimitBudgets()}
        text={'budgets over limit'}
        alt={'See more regarding over-limit budgets'}
        onClick={()=>openModal(<BudgetBreakdownList/>)}
      />
    </section>
  )
}

const SumValue = ({val,text, alt, onClick}: {val: string | number, text: string, alt: string, onClick: ()=>void}) => {
  return (
    <p  className={styles.sumValue} >
      <span>{val}</span>
      <span>{` ${text}`}</span>
      <button
        onClick={onClick}
      >
        <Image
          alt={alt}
          src={'/img/icon-cheveron-right-circle.svg'}
          height={24}
          width={24}
        />
      </button>
    </p>
  );
}