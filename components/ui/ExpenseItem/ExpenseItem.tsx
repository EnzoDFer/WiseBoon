import { usdFormatter } from "../../../utils/formatCurrency";
import Button from "../Button/Button";
import styles from "./ExpenseItem.module.scss";

interface IExpenseItemProps {
  description: string,
  amount: number,
  handleDel: () => void,
}

export const ExpenseItem = ({description,amount,handleDel}:IExpenseItemProps):JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.description}>{description}</p>
      <div className={styles.innerWrapper}>
        <Button 
          variant={"outline"}
          onClick={handleDel}
        >Del</Button>
        <h1 className={styles.amount}>{usdFormatter.format(amount)}</h1>
      </div>
    </div>
  );
}