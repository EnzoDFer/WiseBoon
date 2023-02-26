import styles from "./Header.module.scss";
import Image from "next/image";
import { useModal } from "../../../contexts/ModalContext";
import { BurgerMenu } from "../BurgerMenu/BurgerMenu";
import { ReactNode } from "react";
import BudgetModal from "../Modals/BudgetModal";

export default function Header() {

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
          <MenuButton component={<BudgetModal/>} text='test button'/>
          <MenuButton component={<div>test</div>} text='test button'/>
          <MenuButton component={<div>test</div>} text='test button'/>
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


const MenuButton = ({component, text}:{component:ReactNode, text: string}) => {
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