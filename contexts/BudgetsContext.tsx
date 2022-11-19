import { createContext, useContext, useState } from "react";
import { filterById } from "../utils/genericHelperFuntions";
import { v4 as uuidV4 } from "uuid";

interface IBudgetContext {
  budgets: IBudget[],
  expenses: IExpense[],
  getBudgetExpenses: (budgetId: string)=>(IExpense | undefined)[],
  getBudgetExpenseTotal: (budgetId:string) => number,
  addBudget: ({name, max}: {name:string, max: number}) => void,
  addExpense: ({budgetId, amount, description}:{budgetId: string, amount: number, description: string}) => void,
  deleteBudget: (id:string) => void,
  deleteExpense: (id:string) => void,
}

const defaultContext: IBudgetContext = {
  budgets: [],
  expenses: [],
  getBudgetExpenses: ()=>[],
  getBudgetExpenseTotal: () => 0,
  addBudget: () => {},
  addExpense: () => {},
  deleteBudget: () => {},
  deleteExpense: () => {},
}

const BudgetsContext = createContext<IBudgetContext>(defaultContext);

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

  function getBudgetExpenseTotal(budgetId:string):number {
    return expenses.reduce<number>((total:number, currentExpense:IExpense): number => {
      if (currentExpense.budgetId===budgetId) {
        return total + currentExpense.amount;
      }
      return total;
    },0)
  }
  
  function addExpense(
    {budgetId, amount, description}: 
    {budgetId: string, amount: number, description: string}
  ): void {
    if (!budgetId) throw new Error('Budget does not exist to enter expense into');
    const newExpense:IExpense = {
      id: uuidV4(),
      budgetId: budgetId,
      amount: amount,
      description: description
    };
    setExpenses([...expenses,newExpense]);
  }

  function addBudget({name, max}: {name: string, max: number}): void {
    if (name in budgets) return;
    const newBudget:IBudget= {
      id: uuidV4(),
      name: name,
      max: max,
    };
    setBudgets([...budgets,newBudget]);
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
        budgets: budgets,
        expenses: expenses,
        getBudgetExpenses: getBudgetExpenses,
        getBudgetExpenseTotal: getBudgetExpenseTotal,
        addBudget: addBudget,
        addExpense: addExpense,
        deleteBudget: deleteBudget,
        deleteExpense: deleteExpense,
      }
    }>
      {children}
    </BudgetsContext.Provider>
  );
}

export interface IBudget {
  id: string,
  name: string,
  max: number
}

export interface IExpense {
  id: string,
  budgetId: string,
  amount: number,
  description: string
}
