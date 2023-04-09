import { useBudget } from "../../../contexts/BudgetsContext";
import { IExpense } from "../../../utils/interfaces";
import { usdFormat } from "../../../utils/utilFunctions";
import styles from "./TotalSpentList.module.scss"
import Image from "next/image";
import { useModal } from "../../../contexts/ModalContext";
import { ExpenseEditForm } from "../ExpenseEditForm/ExpenseEditForm";

export const TotalSpentList = () => {
  const { expenses} = useBudget();
  const { openModal, toggleModal } = useModal();
  const expenseList: IExpense[] = expenses;

  function handleExpenseEdit(expense: IExpense) {
    openModal(
      <ExpenseEditForm expense={expense} />
    );
  }

  return (
    <div
      className={styles.wrapper}
    >
      <h3>Total Expenses</h3>
      <div className={styles.itemsContainer}>
        {
          expenseList.map( (expense: IExpense, index: number) => {
            return (
              <div className={styles.itemWrapper} key={`expense ${index}`}>
                <p>{expense.description}</p>
                <div>{usdFormat(expense.amount)}</div>
                <button 
                  className={styles.expenseActions}
                  type='button'
                  onClick={()=>handleExpenseEdit(expense)}
                >
                  <Image
                    fill
                    src={'/img/icon-dots-vertical.svg'}
                    alt={`More actions for expense ${index}`}
                  />
                </button>
              </div>
            );
          })
        }
      </div>
      <button
          type="button"
          onClick={toggleModal}
          className={styles.cancelButton}
        >
          Close
        </button>
    </div>
  )
}
