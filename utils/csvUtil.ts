import { IExpense } from "../contexts/BudgetsContext";

const CSV_HEADER: string = 'Budget Name,Expense Amount,Expense Description,';

function sortExpensesByBudget(unsortedArray: IExpense[]):IExpense[] {
  //Creates a copy of the unsorted array which it then sorts and returns
  //Chose to use Intl.Collator over localeCompare() as documentation states
  //better performance comparing larger arrays
  const sortedArray: IExpense[] = [...unsortedArray];
  return sortedArray.sort((prev:IExpense,current:IExpense)=>{
    return new Intl.Collator().compare(prev.budgetName,current.budgetName)
  });
}


`
Every Budget is as follows:
Budget,Expense Amount,Expense Description,
X,X,X
X,X,X
Y,Y,Y
Y,Y,Y
`

export {};