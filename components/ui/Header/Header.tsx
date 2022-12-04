import styles from "./Header.module.scss";

export default function Header({children}:{children:React.ReactNode}) {
  return (
    <header
      className={styles.layout}
    >
      {children}
    </header>
  )
}
