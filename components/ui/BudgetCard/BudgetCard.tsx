import styles from "./BudgetCard.module.scss";
import { usdFormatter } from "../../../utils/formatCurrency";
import ProgressBar from "../ProgressBar/ProgressBar";

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
        current={20}
        total={100}
      />
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