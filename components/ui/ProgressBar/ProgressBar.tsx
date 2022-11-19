import { useEffect, useState } from "react";
import styles from "./ProgressBar.module.scss";

export default function ProgressBar({current,total}:{current:number,total:number}) {
  const [progress,setProgress] = useState(current / total);

  useEffect(()=>{
    setProgress(current/total);
  })

  return (
    <div
      className={styles.bar}
      style={{
        backgroundImage:`
          linear-gradient(90deg, 
          ${getPriorityColor(progress)} ${progress*100}%, 
          rgba(214,221,212,1) ${progress*100}%
        ) `
      }}
    >
    </div>
  )
}

function getPriorityColor(ratio:number): string {
  let colors: string[] = [
    "rgb(7,248,88,1)", //green
    "rgb(224,236,32)", //light yellow
    "rgb(236,62,62)", //light red 
  ]
  if (ratio<0.5) return colors[0];
  else if (ratio<0.75) return colors[1];
  else return colors[2];
}