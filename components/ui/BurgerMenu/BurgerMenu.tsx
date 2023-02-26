import styles from "./BurgerMenu.module.scss"

export const BurgerMenu = () => {
  return (
    <div className={styles.burgerMenu}>
      <input className={styles.checkbox} type='checkbox'/>
      <div className={styles.bun+ ' ' + styles.bun1}/>
      <div className={styles.bun+ ' ' + styles.bun2}/>
      <div className={styles.bun+ ' ' + styles.bun3}/>
    </div>
  )
}
