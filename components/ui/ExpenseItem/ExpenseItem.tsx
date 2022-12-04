import { useState } from "react";
import { usdFormatter } from "../../../utils/formatCurrency";
import Button from "../Button/Button";
import styles from "./ExpenseItem.module.scss";

interface IExpenseItemProps {
  description: string,
  amount: number,
  handleDel: () => void,
}

export const ExpenseItem = ({description,amount,handleDel}:IExpenseItemProps):JSX.Element => {
  const [popup, setPopup] = useState<boolean>(false);

  function handlePopup(): void {
    setPopup(!popup);
  }
  
  function handleBudgetDel(): void {
    if (popup) handleDel();
    else return;
  }
  
  return (
    <div className={styles.wrapper}>
      <p className={styles.description}>{description}</p>
      <div className={styles.innerWrapper}>
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
        >
          Confirm Delete
        </Button>
        <h1 className={styles.amount}>{usdFormatter.format(amount)}</h1>
      </div>
    </div>
  );
}