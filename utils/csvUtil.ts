import { IExpense } from "../contexts/BudgetsContext";
import { removeRedundantBreaks } from "./utilFunctions";

const CSV_HEADER: string= 'Budget Name,Expense Amount,Expense Description';

function sortExpensesByBudget(unsortedArray: IExpense[]):IExpense[] {
  //Creates a copy of the unsorted array which it then sorts and returns
  //Chose to use Intl.Collator over localeCompare() as documentation states
  //better performance comparing larger arrays
  const sortedArray: IExpense[] = [...unsortedArray];
  return sortedArray.sort((prev:IExpense,current:IExpense)=>{
    return new Intl.Collator().compare(prev.budgetName,current.budgetName)
  });
}

export function expenseArrayToCSV(expenseArray:IExpense[]):string {
  //We first sort the expense array by the Budget Name alphabetically
  const sortedArray: IExpense[] = sortExpensesByBudget(expenseArray);
  //Change element structure from [{name:X,amount:Y,description:Z},etc]
  //to [`name,amount,description`,etc]
  const csvBodyAsArray: string[] = sortedArray.map((expense:IExpense)=>{
    return `${expense.budgetName},${expense.amount},${removeRedundantBreaks(expense.description)}`
  });
  //Change structure from [`name,amount,description`,`name,amount,description`]
  //to `name,amount,description`,\n`name,amount,description],\n`
  const csvBodyAsString: string = csvBodyAsArray.join(',\n');
  //final body structure is 'name,amount,description,\n,name,amount,description,\n etc'
  //We combine it with the header
  const completeCSV: string = CSV_HEADER + ',\n' + csvBodyAsString;
  return completeCSV;
}