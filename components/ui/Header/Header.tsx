import styles from "./Header.module.scss";
import Image from "next/image";
import { useModal } from "../../../contexts/ModalContext";

export default function Header() {
  const {openModal, opened} = useModal();

  return (
    <header 
      className={styles.header}
    >
      <button
        className={styles.iconWrapper}
        onClick={()=>openModal(<div>Menu Place Holder</div>)}
      >
        <Image
          src={'/img/icon-menu.svg'}
          fill
          alt='WiseBoon Logo'
        />
      </button>
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
