import { createContext, useContext, useState } from "react";
import { filterByParam, cleanString } from "../utils/utilFunctions";
import { v4 as uuidV4 } from "uuid";
import { IBudget, IBudgetContext, IExpense, IUserData } from "../utils/interfaces";
import { useSession } from "next-auth/react";

const defaultContext: IBudgetContext = {
  budgets: [],
  expenses: [],
  currentBudget: undefined,
  setCurrentBudget: () => {},
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
export const BudgetsProvider = (
  {children,userData}:{children:React.ReactNode,userData: IUserData}
):JSX.Element => {

  const {data: session} = useSession();

  const [budgets, setBudgets] = useState<IBudget[]>(userData.budgets);
  const [expenses, setExpenses] = useState<IExpense[]>(userData.expenses);
  const [currentBudget,setCurrentBudget] = useState<IBudget|undefined>();
  
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
    fetch(`${process.env.HOST_URL}/api/user/${session?.user?.name}`,{
      method: 'POST',
      body: JSON.stringify(newExpense),
    })
  }

  function addBudget({name, max}: {name: string, max: number}): void {
    if (cleanString(name) in budgets) {
      throw new Error('attempted to create budget with existing name');
    }
    const newBudget:IBudget= {
      id: uuidV4(),
      name: name,
      max: max,
    };
    setBudgets([...budgets,newBudget]);
    fetch(`${process.env.HOST_URL}/api/user/${session?.user?.name}`,{
      method: 'POST',
      body: JSON.stringify(newBudget),
    })
  }

  function deleteBudget(id:string): void {
    const filteredBudget:IBudget[] = filterByParam(budgets,'id',id,'exclude');
    setBudgets(filteredBudget);
    fetch(`${process.env.HOST_URL}/api/user/${session?.user?.name}`,{
      method: 'DELETE',
      body: JSON.stringify(filterByParam(budgets,'id',id,'include')[0]),
    })
  }

  function deleteExpense(id: string): void {
    const filteredExpenses: IExpense[] = filterByParam(expenses,'id',id,'exclude');
    setExpenses(filteredExpenses);
    fetch(`${process.env.HOST_URL}/api/user/${session?.user?.name}`,{
      method: 'DELETE',
      body: JSON.stringify(filterByParam(expenses,'id',id,'include')[0]),
    })
  }
  
  return(
    <BudgetsContext.Provider value={
      {
        budgets,
        expenses,
        currentBudget,
        setCurrentBudget,
        addBudget,
        addExpense,
        deleteBudget,
        deleteExpense,
      }
    }>
      {children}
    </BudgetsContext.Provider>
  );
}