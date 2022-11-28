import styles from "./BudgetCard.module.scss";
import { usdFormatter } from "../../../utils/formatCurrency";
import ProgressBar from "../ProgressBar/ProgressBar";
import Button from "../Button/Button";

export default function BudgetCard(
  {title, current, maximum, createExpenseModal,expenseListModal}:
  {title:string, current: number, maximum: number,createExpenseModal: ()=>void,expenseListModal: ()=>void}
) {

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