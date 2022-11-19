import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css"

export default function Button(
  {children,onClick,variant,...props}:
  {
    children?:ReactNode,
    variant:"fill"|"outline",
    onClick?:()=>void,
    props?:ButtonHTMLAttributes<HTMLButtonElement>[]|ButtonHTMLAttributes<HTMLButtonElement>
  }
) {
  return (
    <button
      className={variant==='fill'?styles.filledButton:styles.outlinedButton}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}
