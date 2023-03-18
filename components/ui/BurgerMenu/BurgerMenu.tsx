import styles from "./BurgerMenu.module.scss"

export const BurgerMenu = () => {
  return (
    <div className={styles.burgerMenu}>
      <label htmlFor="burgerMenu" className="hidden">Open Menu Button</label>
      <input className={styles.checkbox} type='checkbox' id='burgerMenu' tabIndex={0}/>
      <div className={styles.bun+ ' ' + styles.bun1}/>
      <div className={styles.bun+ ' ' + styles.bun2}/>
      <div className={styles.bun+ ' ' + styles.bun3}/>
    </div>
  )
}
