import { Dispatch, SetStateAction } from "react"

export interface IUser {
  name: string,
  email: string,
  budgets: IBudget,
  expenses: IExpense
}

export interface IBudgetContext {
  budgets: IBudget[],
  expenses: IExpense[],
  currentBudget: IBudget | undefined,
  setCurrentBudget: Dispatch<SetStateAction<IBudget | undefined>>,
  getBudgetExpenses: (budgetId: string)=>IExpense[],
  getBudgetExpenseTotal: (budgetId:string) => number,
  addBudget: ({name, max}: {name:string, max: number}) => void,
  addExpense: ({budgetId, budgetName, amount, description}:{budgetId: string, budgetName: string, amount: number, description: string}) => void,
  deleteBudget: (id:string) => void,
  deleteExpense: (id:string) => void,
}

export interface IBudget {
  id: string,
  name: string,
  max: number
}

export interface IExpense {
  id: string,
  budgetId: string,
  budgetName: string,
  amount: number,
  description: string
}
