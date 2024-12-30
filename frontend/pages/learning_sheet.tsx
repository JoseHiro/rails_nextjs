import React from "react";
import data from "../resource/hiragana.json"; // Ensure the JSON is properly imported
import styles from "../styles/learning_sheet.module.css";

const LearningSheet = () => {
  return (
    <div className={styles.learningSheet}>
      <h1 className={styles.title}>Hiragana Learning Sheet</h1>
      <div className={styles.gridContainer}>
        {data.hiraganas.map((item, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.character}>{item.character}</div>
            <div className={styles.romaji}>{item.romaji}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningSheet;
