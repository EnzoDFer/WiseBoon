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
        <th>Budget</th>
        <th>Balance</th>
      </thead>
      <tbody>
        {
          budgets.map( (budget: IBudget, index: number) => {
            return (
              <tr key={`budget ${index}`}>
                <td>{budget.name}</td>
                <td>
                  <div>{usdFormat(getBudgetExpensesTotal(budget.id))}</div>
                  <div>{'/ ' + usdFormat(budget.max)}</div>
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

