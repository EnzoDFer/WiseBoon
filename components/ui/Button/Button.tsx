import { ReactNode } from "react";
import styles from "./Button.module.css"

export default function Button(
  {children,type, onClick}:
  {children?:ReactNode,type:"fill"|"outline",onClick:()=>void}
) {
  return (
    <button
      className={type==='fill'?styles.filledButton:styles.outlinedButton}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
