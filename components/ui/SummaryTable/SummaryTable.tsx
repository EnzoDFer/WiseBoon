import React from 'react'
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
        <th scope='col'>Budget</th>
        <th scope='col'>Balance</th>
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
              </tr>
            );
          })
        }
      </tbody>
      <tfoot/>
    </table>
  )
}

