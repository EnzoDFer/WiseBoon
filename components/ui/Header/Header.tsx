import styles from "./Header.module.scss";
import Image from "next/image";
import { useModal } from "../../../contexts/ModalContext";
import { BurgerMenu } from "../BurgerMenu/BurgerMenu";
import { ReactNode } from "react";
import CreateBudgetForm from "../CreateBudgetForm/CreateBudgetForm";
import CreateExpenseForm from "../CreateExpenseForm/CreateExpenseForm";
import CSVlink from "../CSVlink";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  const {data: session} = useSession();
  return (
    <header 
      className={styles.header}
    >
      <div
        className={styles.menuWrapper}
      >
        <BurgerMenu/>
        <div
          className={styles.menuItems}
        >
          <ModalPrompt component={<CreateBudgetForm/>} text='CREATE NEW BUDGET'/>
          <ModalPrompt component={<CreateExpenseForm/>} text='CREATE NEW EXPENSE'/>
          <CSVlink/>
          {session?
            <button className={styles.menuButton} onClick={() => signOut()}>LOG OUT</button>:
            <Link href='/'>LOG IN</Link>
          }
        </div>
      </div>
      <a className={styles.iconWrapper} href={'/'}>
        <Image
          src={'/img/wiseboon-logo.svg'}
          fill
          alt='WiseBoon Logo'
        />
      </a>
    </header>
  )
}


const ModalPrompt = ({component, text}:{component:ReactNode, text: string}) => {
  const {openModal} = useModal();
  
  return (
    <button
      className={styles.menuButton}
      onClick={()=>openModal(component)}
    >
      {text}
    </button>
  );
}