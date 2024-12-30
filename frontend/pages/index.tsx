import React from "react";
import { useRouter } from "next/navigation";

import styles from "../styles/index.module.css";

const Home: React.FC = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <>
        <h1 className={styles.title}>Choose Mode</h1>
        <div className={styles.mode_select_container}>
          <div className={styles.mode_button_display}>
            <div
              className={styles.characterBox}
              onClick={() => router.push("/hiragana")}
            >
              <h2>あ</h2>
            </div>
            <h3>Hiragana</h3>
          </div>
          <div className={styles.mode_button_display}>
            <div
              className={styles.characterBox}
              onClick={() => router.push("/katakana")}
            >
              <h2>ア</h2>
            </div>
            <h3>Katakana</h3>
          </div>
        </div>
        {/* Button to navigate to learning sheet */}
        <button className={styles.learningSheetButton} onClick={() => router.push("/learning_sheet")}>
          Go to Learning Sheet
        </button>
      </>
    </div>
  );
};

export default Home;
