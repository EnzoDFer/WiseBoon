import { warn } from "console";
import { Context, createContext, useContext, useState } from "react";
import { v4 as uuidV4 } from "uuid";

const BudgetsContext: Context<{}> = createContext({});

export function useBudget() {
  return useContext(BudgetsContext);
}

//Provider component for the Budgets context
export const BudgetsProvider = ({children}:{children:React.ReactNode}):JSX.Element => {
  
  const [budgets, setBudgets] = useState<IBudget[]>([]);
  const [expenses, setExpenses] = useState<IExpense[]>([]);

  function getBudgetExpenses(budgetId:string):(IExpense | undefined)[] {
    return expenses.map((expense: IExpense)=> {
      if (expense.budgetId===budgetId) return expense;
    },[] as IExpense[])
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
    const newBudget:IBudget= {
      id: uuidV4(),
      name: name,
      max: max,
    }
    setBudgets([...budgets,newBudget])
  }

  function deleteBudget(id:string): void {
    const filteredBudget:IBudget[] = filterById(budgets,id);
    setBudgets(filteredBudget);
  }

  function deleteExpense(id: string): void {
    const filteredExpenses: IExpense[] = filterById(expenses,id);
    setExpenses(filteredExpenses);
  }
  
  return(
    <BudgetsContext.Provider value={
        {
          budgets,
          expenses,
          getBudgetExpenses,
          addBudget,
          addExpense,
          deleteBudget,
          deleteExpense
        }
      }
    >
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

function filterById<T extends {id:string}>(myArray:T[],id:string):T[] {
  return myArray.filter((ele:T) => ele.id!==id);
}