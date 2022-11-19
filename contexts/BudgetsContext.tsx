import { warn } from "console";
import { createContext, useContext, useState } from "react";
import { v4 as uuidV4 } from "uuid";

const BudgetsContext = createContext();

export function useBudget() {
  return useContext(BudgetsContext);
}

//Provider component for the Budgets context
export const BudgetsProvider = ({children}:{children:React.ReactNode}):JSX.Element => {
  
  const [budgets, setBudgets] = useState<IBudget[]>([]);
  const [expenses, setExpenses] = useState<IExpense[]>([]);

  function getBudgetExpenses(budgetId:number) {

  }
  
  function addExpense(
    {budgetId, amount, description}: 
    {budgetId: string, amount: number, description: string}
  ): void {
    const newExpense:IExpense = {
      id: uuidV4(),
      budgetId: budgetId,
      amount: amount,
      description: description
    }
    setExpenses([...expenses,newExpense]);
  }

  function addBudget({name, max}: {name: string, max: number}): void {
    if (name in budgets) throw warn('Budget already exists.  Please enter unique name.');
    const newBudget = {
      id: uuidV4(),
      name: name,
      max: max,
    }
    setBudgets([...budgets,newBudget])
  }

  function deleteBudget() {

  }

  function deleteExpense() {

  }
  
  return(
    <BudgetsContext.Provider value={
      {

      }
      } >
      {children}
    </BudgetsContext.Provider>
  );
}

interface IBudget {
  id: string,
  name: string,
  max: number
}

interface IExpense {
  id: string,
  budgetId: string,
  amount: number,
  description: string
}