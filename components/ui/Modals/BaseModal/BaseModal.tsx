import { Dispatch, ReactNode, SetStateAction } from "react";
import styles from "./BaseModal.module.scss";

interface IBaseModalProps {
  children: ReactNode,
  opened: boolean,
  setOpened: Dispatch<SetStateAction<boolean>>,
  title: string,
}

export default function BaseModal(
  {children,opened,setOpened,title }:IBaseModalProps
): JSX.Element|null {
  
  
  if (opened) return (
    <div
      className={styles.wrapper}
    >
      <div 
        className={styles.background} 
        onClick={()=>setOpened(false)}
      />
      <div
        className={styles.modal}
      >
        <div
          className={styles.titleWrapper}
        >
          <h1>{title}</h1>
          <button 
            onClick={()=>setOpened(false)}
            className={styles.closeButton}
            name='close button'
          >
            x
          </button>
        </div>
        <hr className={styles.divider}/>
        {children}
      </div>
    </div>
  );

  return null;
}

