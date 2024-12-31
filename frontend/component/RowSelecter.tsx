import React, { useState } from "react";
import Mode from "@/component/Mode";
import { usePathname } from "next/navigation";
import hiraganaData from "../resource/hiragana.json";
import katakanaData from "../resource/katakanas.json";
import styles from "../styles/hiragana.module.css"; // Optional for styling

type HiraganaCharacter = {
  character: string;
  romaji: string;
};

const HIRAGANA = ["あ", "か", "さ", "た", "な", "は", "ま", "ら", "わ"];
const KATAKANA = ["ア", "カ", "サ", "タ", "ナ", "ハ", "マ", "ラ", "ワ"];

const RowSelector = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  // const [practiceSet, setPracticeSet] = useState<string[]>([]);
  const [startPractice, setStartPractice] = useState<boolean>(false);
  const [selectedLetters, setSelectedLetters] = useState<HiraganaCharacter[]>([
    {
      character: "",
      romaji: "",
    },
  ]);
  const pathname = usePathname();

  // Toggle selection of a row
  const toggleRowSelection = (row: string) => {
    setSelectedRows((prev) =>
      prev.includes(row) ? prev.filter((r) => r !== row) : [...prev, row]
    );
  };

  const handleStartPractice = () => {
    const selectedLettersFromRows = selectedRows.flatMap((row: string) =>
      pathname === "/hiragana"
        ? hiraganaData.rows[row as keyof typeof hiraganaData.rows]
        : katakanaData.rows[row as keyof typeof katakanaData.rows]
    );
    setSelectedLetters(selectedLettersFromRows);
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
          {pathname === "/hiragana" ? (
            <h1>Hiragana Practice</h1>
          ) : (
            <h1>Katakana Practice</h1>
          )}

          <div className={styles.selectionGrid}>
            {pathname === "/hiragana"
              ? HIRAGANA.map((row) => (
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
                ))
              : KATAKANA.map((row) => (
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

export default RowSelector;
