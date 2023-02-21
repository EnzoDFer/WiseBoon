import styles from "./Header.module.scss";
import Image from "next/image";

export default function Header() {
  return (
    <header 
      className={styles.header}
    >
      <div>Burger</div>
      <div className={styles.iconWrapper}>
        <Image
          src={'/img/wiseboon-logo.svg'}
          fill
          alt='WiseBoon Logo'
        />
      </div>
    </header>
  )
}
