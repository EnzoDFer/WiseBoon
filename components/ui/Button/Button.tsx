import { ReactNode } from "react";
import styles from "./Button.module.css"

export default function Button(
  {children,type}:
  {children:ReactNode,type:"fill"|"outline"}
) {
  return (
    <button
      className={type==='fill'?styles.filledButton:styles.outlinedButton}
    >
      {children}
    </button>
  )
}
