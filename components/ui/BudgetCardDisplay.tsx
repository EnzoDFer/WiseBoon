export {}
/* import React, { Dispatch, SetStateAction } from 'react'
import { useBudget } from '../../contexts/BudgetsContext';
import { IBudget } from '../../utils/interfaces';
import BudgetCard from './BudgetCard/BudgetCard';

export default function BudgetCardDisplay(
  {expenseModalState,expenseModalContol,expenseListModalState,expenseListModalControl}:
  {expenseModalState:boolean,expenseModalContol:Dispatch<SetStateAction<boolean>>,expenseListModalState:boolean,expenseListModalControl:Dispatch<SetStateAction<boolean>>}
) {
  const {budgets, getBudgetExpenseTotal,setCurrentBudget} = useBudget();
  console.log(budgets);
  
  return (
    <>  
      {budgets.map((budget:IBudget, index: number)=>{ 
            return <BudgetCard
              key={`card ${index}`}
              title={budget.name}
              id={budget.id}
              current={getBudgetExpenseTotal(budget.id)}
              maximum={budget.max}
              createExpenseModal={()=>{
                setCurrentBudget(budget);
                expenseModalContol(!expenseModalState);
              }}
              expenseListModal={()=>{
                setCurrentBudget(budget);
                expenseListModalControl(!expenseListModalState);
              }}
            />
          })}
    </>
  )
}
 */