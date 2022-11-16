import styles from "./Container.module.css";

export default function Container(
  {children,className}:{children:React.ReactNode,className:String}
):JSX.Element {
  return (
    <div
      className={`${styles.container} ${className}`}
    >
      {children}
    </div>
  )
}
