import styles from "./BudgetCard.module.scss";
import { usdFormatter } from "../../../utils/formatCurrency";
import ProgressBar from "../ProgressBar/ProgressBar";
import Button from "../Button/Button";

export default function BudgetCard(
  {title, current, maximum}:
  {title:string, current: number, maximum: number}
) {
  return (
    <div
      className={styles.card}
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
        <Button type={"outline"}>Add Expense</Button>
        <Button type={"outline"}>View Expenses</Button>
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
        {usdFormatter.format(current)} 
        <span
          id={styles.max}
        >
          / {usdFormatter.format(maximum)}
        </span>
      </div>
    </div>
  );
}