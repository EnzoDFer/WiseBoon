import React from 'react'
import Image from 'next/image';
import { useBudget } from '../../../contexts/BudgetsContext'
import { IBudget } from '../../../utils/interfaces';
import { usdFormat } from '../../../utils/utilFunctions';
import styles from "./SummaryTable.module.scss"

export const SummaryTable = () => {
  const { budgets, getBudgetExpensesTotal } = useBudget();
  return (
    <table
      className={styles.table}
    >
      <thead>
        <th scope='col'>BUDGET</th>
        <th scope='col'>BALANCE</th>
        <th></th>
      </thead>
      <tbody
        className={styles.body}
      >
        {
          budgets.map( (budget: IBudget, index: number) => {
            return (
              <tr key={`budget ${index}`}>
                <td>{budget.name}</td>
                <td>
                  <div>{usdFormat(getBudgetExpensesTotal(budget.id))}</div>
                  <div className={styles.max}>{'/ ' + usdFormat(budget.max)}</div>
                </td>      
                <td>
                  <Image
                    alt={`See details about ${budget.name}`}
                    src={'/img/icon-cheveron-right-circle-table.svg'}
                    height={24}
                    width={24}
                  />
                </td>
              </tr>
            );
          })
        }
      </tbody>
      <tfoot/>
    </table>
  )
}

