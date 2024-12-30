import React, { useState } from "react";
import Mode from "@/component/Mode";
import data from "../resource/hiragana.json";
import styles from "../styles/hiragana.module.css"; // Optional for styling

type HiraganaCharacter = {
  character: string;
  romaji: string;
};

// const HIRAGANA = {
//   "あ": ["あ", "い", "う", "え", "お"],
//   "か": ["か", "き", "く", "け", "こ"],
//   "さ": ["さ", "し", "す", "せ", "そ"],
//   "た": ["た", "ち", "つ", "て", "と"],
//   "な": ["な", "に", "ぬ", "ね", "の"],
//   "は": ["は", "ひ", "ふ", "へ", "ほ"],
//   "ま": ["ま", "み", "む", "め", "も"],
//   "や": ["や", "ゆ", "よ"],
//   "ら": ["ら", "り", "る", "れ", "ろ"],
//   "わ": ["わ", "を", "ん"],
// };
const HIRAGANA = ["あ", "か", "さ", "た", "な", "は", "ま", "ら", "わ"];

const Hiragana = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  // const [practiceSet, setPracticeSet] = useState<string[]>([]);
  const [startPractice, setStartPractice] = useState<boolean>(false);
  const [selectedLetters, setSelectedLetters] = useState<HiraganaCharacter[]>([
    {
      character: "",
      romaji: "",
    },
  ]);

  // Toggle selection of a row
  const toggleRowSelection = (row: string) => {
    setSelectedRows((prev) =>
      prev.includes(row) ? prev.filter((r) => r !== row) : [...prev, row]
    );
  };

  const handleStartPractice = () => {
    // selected rows
    const selectedLettersFromRows = selectedRows.flatMap((row: string) => {
      return data.rows[row as keyof typeof data.rows];
    });

    setSelectedLetters(selectedLettersFromRows);
    console.log(selectedLettersFromRows);

    setStartPractice(true);
  };

  // useEffect(() => {
  //   console.log(selectedRows);
  // }, [selectedRows]);

  // Start practicing
  // const startPractice = () => {
  //   const letters = selectedRows.flatMap((row) => HIRAGANA[row]);
  //   setPracticeSet(letters);
  // };

  return (
    <div className={styles.container}>
      {!startPractice ? (
        <>
          <h1>Hiragana Practice</h1>
          <div className={styles.selectionGrid}>
            {HIRAGANA.map((row) => (
              <div key={row} className={styles.row}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(row)}
                    onChange={() => toggleRowSelection(row)}
                  />
                  {row} Row
                </label>
              </div>
            ))}
          </div>
          <button
            className={styles.startButton}
            onClick={() => handleStartPractice()}
            disabled={selectedRows.length === 0}
          >
            Start Practice
          </button>
        </>
      ) : (
        <Mode selectedLetters={selectedLetters} />
      )}
    </div>
  );
};

export default Hiragana;
