import { Bilbo_Swash_Caps } from "next/font/google";
import { useGameContext } from "@/context";

import styles from "./score.module.css";

const bilbo = Bilbo_Swash_Caps({ weight: "400", subsets: ["latin"] });

const ScoreBar = () => {
  const { score, displayPlayground } = useGameContext();

  if (!displayPlayground) {
    return null;
  }

  return (
    <div className={bilbo.className} style={{ marginTop: -80 }}>
      <h3 className={styles.header}>
        Selected Characters: <span className={styles.score}>{score}</span>
      </h3>
    </div>
  );
};

export default ScoreBar;
