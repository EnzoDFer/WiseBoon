import { ReactNode } from "react";
import styles from "./Button.module.css"

export default function Button(
  {children,onClick,variant,disabled}:
  {
    children?:ReactNode,
    variant:"fill"|"outline",
    onClick?:()=>void,
    disabled?:boolean,
  }
) {
  return (
    <button
      className={variant==='fill'?styles.filledButton:styles.outlinedButton}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
