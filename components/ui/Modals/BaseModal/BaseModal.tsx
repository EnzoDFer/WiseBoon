import styles from "./BaseModal.module.scss";
import { useModal } from "../../../../contexts/ModalContext";

export default function BaseModal(): JSX.Element|null {

  const { content, opened, toggleModal } = useModal();

  if (opened) return (
    <div
      className={styles.wrapper}
    >
      <div 
        className={styles.background} 
        onClick={toggleModal}
      />
      <div
        className={styles.modal}
      >
        {content}
      </div>
    </div>
  );

  return null;
}