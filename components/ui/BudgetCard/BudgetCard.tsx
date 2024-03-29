import styles from "./BudgetCard.module.scss";
import { usdFormat } from '../../../utils/utilFunctions'
import ProgressBar from "../ProgressBar/ProgressBar";
import Button from "../Button/Button";
import { useBudget } from "../../../contexts/BudgetsContext";
import { useState } from "react";

export default function BudgetCard(
  {title, current, maximum, id,createExpenseModal,expenseListModal}:
  {title:string, current: number, maximum: number, id:string, createExpenseModal: ()=>void,expenseListModal: ()=>void}
):JSX.Element {

  const {deleteBudget} = useBudget();
  const [popup, setPopup] = useState<boolean>(false);

  function handlePopup(): void {
    setPopup(!popup);
  }
  
  function handleBudgetDel(): void {
    if (popup) deleteBudget(id);
    else return;
  }

  return (
    <div
      className={styles.card}
      style={{
        backgroundColor: getPriorityColor(current/maximum)
      }}
    >
      <CardTitle
        title={title}
        current={current}
        maximum={maximum}
      />
      <ProgressBar
        current={current}
        total={maximum}
      />
      <div
        className={styles.buttonWrapper}
      >
        <Button 
          variant={"outline"} 
          onClick={()=>handlePopup()}
        >
          {popup?'Cancel':'Del'}
        </Button>
        <Button 
          variant={"outline"} 
          onClick={popup?()=>handleBudgetDel():()=>{}}
          className={popup?styles.popupButton:styles.hidden}
        >Confirm Delete</Button>
        <Button variant={"outline"} onClick={createExpenseModal}>Add Expense</Button>
        <Button variant={"outline"} onClick={expenseListModal}>View Expenses</Button>
      </div>
    </div>
  )
}


const CardTitle = (
  {title, current, maximum}:
  {title:string, current: number, maximum: number}
): JSX.Element => {
  return(
    <div
      className={styles.title}
    >
      <title>{title}</title>
      <div
        className={styles.balanceDisplayWrapper}
      >
        {usdFormat(current)} 
        <span
          id={styles.max}
        >
          / {usdFormat(maximum)}
        </span>
      </div>
    </div>
  );
}

function getPriorityColor(ratio:number): string {
  let colors: string[] = [
    "rgb(234,251,212,0.6)", //grey with green tint
    "rgb(243,245,121,0.6)", //light yellow tint
    "rgb(251,59,33,0.6)", //light red tint
  ]
  if (ratio<0.5) return colors[0];
  else if (ratio<0.75) return colors[1];
  else return colors[2];
}