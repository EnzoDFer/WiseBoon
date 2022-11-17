import styles from "./Header.module.css";

export default function Header({children}:{children:React.ReactNode}) {
  return (
    <header
      className={styles.layout}
    >
      {children}
    </header>
  )
}
