import { createContext, useContext, useState } from "react";
import { filterByParam, removeRedundantBreaks } from "../utils/genericHelperFuntions";
import { v4 as uuidV4 } from "uuid";
import { IBudget, IBudgetContext, IExpense } from "../utils/interfaces";
import { getSession } from "next-auth/react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

const defaultContext: IBudgetContext = {
  budgets: [],
  expenses: [],
  currentBudget: undefined,
  setCurrentBudget: () => {},
  getBudgetExpenses: () => [],
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
  const [currentBudget,setCurrentBudget] = useState<IBudget|undefined>();

  function getBudgetExpenses(budgetId:string): IExpense[] {
    const expenseList: IExpense[] = [];
    expenses.forEach((expense:IExpense)=>{
      if (expense.budgetId===budgetId) expenseList.push(expense);
    });  
    return expenseList;
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
    {budgetId, budgetName, amount, description}: 
    {budgetId: string, budgetName: string, amount: number, description: string}
  ): void {
    if (!budgetId) throw new Error('Budget does not exist to enter expense into');
    const newExpense:IExpense = {
      id: uuidV4(),
      budgetId: budgetId,
      budgetName: budgetName,
      amount: amount,
      description: description
    };
    setExpenses([...expenses,newExpense]);
  }

  function addBudget({name, max}: {name: string, max: number}): void {
    if (removeRedundantBreaks(name) in budgets) {
      throw new Error('attempted to create budget with existing name');
    }
    const newBudget:IBudget= {
      id: uuidV4(),
      name: name,
      max: max,
    };
    setBudgets([...budgets,newBudget]);
  }

  function deleteBudget(id:string): void {
    const filteredBudget:IBudget[] = filterByParam(budgets,'id',id);
    setBudgets(filteredBudget);
  }

  function deleteExpense(id: string): void {
    const filteredExpenses: IExpense[] = filterByParam(expenses,'id',id);
    setExpenses(filteredExpenses);
  }
  
  return(
    <BudgetsContext.Provider value={
      {
        budgets: budgets,
        expenses: expenses,
        currentBudget: currentBudget,
        setCurrentBudget: setCurrentBudget,
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

// Fetch Budget and Expense data from (mock)DB using user
export const getServerSideProps: GetServerSideProps = async (context:GetServerSidePropsContext): Promise<{
  props: {userData: {budgets: IBudget[], expenses: IExpense[]}}}
> => {
  // Retrieve logged user from session
  const session = await getSession(context);
  // Check for user information
  if (!session || !session.user) {
    throw new Error('No session user found');
  }
  // Fetch current user data from back end api
  const res = await fetch(`../pages/api/user/${session.user}`);
  const userData: {budgets: IBudget[], expenses: IExpense[]} = await res.json();

  return {
    props: {
      userData: {...userData}
    },
  }
}