import React from 'react'
import { useBudget } from '../../../contexts/BudgetsContext'
import { IBudget } from '../../../utils/interfaces';
import styles from "./SummaryTable.module.scss"

export const SummaryTable = () => {
  const { budgets } = useBudget();
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
                <td>{}</td>      
              </tr>
            );
          })
        }
      </tbody>
      <tfoot/>
    </table>
  )
}

