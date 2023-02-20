import { ReactNode } from "react";
import styles from "./Button.module.css"

export default function Button(
  {children,onClick,variant,disabled,className}:
  {
    children?:ReactNode,
    variant:"fill"|"outline",
    onClick?:()=>void,
    disabled?:boolean,
    className?:string,
  }
) {
  return (
    <button
      className={className?className:`${variant==='fill'?styles.filledButton:styles.outlinedButton}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
