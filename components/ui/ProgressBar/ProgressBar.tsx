import { useState } from "react";
import styles from "./ProgressBar.module.scss";

export default function ProgressBar({current,total}:{current:number,total:number}) {
  const [progress,setProgress] = useState(current / total * 100);
  let barColor: string;
  if (progress<50) barColor = "rgb(7,248,88,1)";
  else if (progress<75) barColor = "rgb(224,236,32)";
  else barColor = "rgb(236,62,62)"

  return (
    <div
      className={styles.bar}
      style={{
        backgroundImage:`
          linear-gradient(90deg, 
          ${barColor} ${progress}%, 
          rgba(214,221,212,1) ${progress}%
        ) `
      }}
    >
    </div>
  )
}
