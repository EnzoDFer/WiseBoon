import React from 'react'
import { useBudget } from '../../contexts/BudgetsContext';
import { expenseArrayToCSV } from '../../utils/csvUtil';

export default function CSVlink() {
  const {expenses} = useBudget();
  return (
    <a
      href={'data:text/csv;charset=utf-8,'+encodeURI(expenseArrayToCSV(expenses))}
      download={`budgets_${new Date().toLocaleDateString()}.csv`}
    >
      EXPORT AS CSV
    </a>
  )
}
