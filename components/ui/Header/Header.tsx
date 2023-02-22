import styles from "./Header.module.scss";
import Image from "next/image";

export default function Header() {
  return (
    <header 
      className={styles.header}
    >
      <div className={styles.iconWrapper}>
        <Image
          src={'/img/icon-menu.svg'}
          fill
          alt='WiseBoon Logo'
        />
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
