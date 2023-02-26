import styles from "./Header.module.scss";
import Image from "next/image";
import { useModal } from "../../../contexts/ModalContext";
import { BurgerMenu } from "../BurgerMenu/BurgerMenu";

export default function Header() {
  const {openModal, opened} = useModal();

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
          <button
            className={styles.menuButton}
          >ADD NEW BUDGET</button>
          <button
            className={styles.menuButton}
          >ADD NEW BUDGET</button>
          <button
            className={styles.menuButton}
          >ADD NEW BUDGET</button>
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
