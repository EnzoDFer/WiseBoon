import { useContext, useState } from "react";
import { v4 as uuidV4 } from "uuid";

const BudgetsContext = useContext();

export function useBudget() {
  return useContext(BudgetsContext);
}

//Provider component for the Budgets context
export const BudgetsProvider = ({children}:{children:React.ReactNode}):JSX.Element => {
  
  const [budgets, setBudgets] = useState<IBudget[]>([]);
  const [expenses, setExpenses] = useState<IExpense[]>([]);

  function getBudgetExpenses(budgetId:number) {

  }
  
  function addExpense() {

  }

  function addBudget() {

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
  id: number,
  name: string,
  max: number
}

interface IExpense {
  id: number,
  budgetId: string,
  amount: number,
  description: string
}