import React, { useState } from "react";
import axios from "axios";
import styles from "../styles/index.module.css";

type HiraganaCharacter = {
  character: string;
  romaji: string;
};

const base = "http://0.0.0.0:3000/";

const HIRAGANA: HiraganaCharacter[] = [
  { character: "あ", romaji: "a" },
  { character: "い", romaji: "i" },
  { character: "う", romaji: "u" },
  { character: "え", romaji: "e" },
  { character: "お", romaji: "o" },
  { character: "か", romaji: "ka" },
  { character: "き", romaji: "ki" },
  { character: "く", romaji: "ku" },
  { character: "け", romaji: "ke" },
  { character: "こ", romaji: "ko" },
  // Add more Hiragana characters as needed
];

const Home: React.FC = () => {
  const [current, setCurrent] = useState<HiraganaCharacter>(HIRAGANA[0]);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [consecutiveCounts, setConsecutiveCounts] = useState(0);

  const getNextCharacter = () => {
    const nextIndex = Math.floor(Math.random() * HIRAGANA.length);
    setCurrent(HIRAGANA[nextIndex]);
    setInput("");
    setFeedback("");
  };

  const handleLogin = async () => {
    const response = await axios.post(base + "login", {
      user: {
        email: "test8@example.com",
        password: "password123",
      },
    });

    if (response.status === 200) {
      console.log(response);
    }
  };

  const checkAnswer = async () => {
    if (input.trim().toLowerCase() === current.romaji) {
      setFeedback("Correct! 🎉");
      const updateCounts = consecutiveCounts + 1;
      setConsecutiveCounts(updateCounts);
      setTimeout(getNextCharacter, 1500); // Automatically move to the next character after 1.5 seconds
    } else {
      if (consecutiveCounts > 0) {
        const response = await axios.post(base + "api/update_ranking", {
          consecutiveCounts,
        });

        if (response.status === 200) {
          console.log("updated data");
        } else {
          console.log("Something went wrong");
        }
      }
      setFeedback("Incorrect. Try again!");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Hiragana Practice</h1>
      <div className={styles.characterBox}>
        <h2>{current.character}</h2>
      </div>
      <input
        type="text"
        placeholder="Type the Romaji"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className={styles.input}
      />
      <button onClick={checkAnswer} className={styles.button}>
        Submit
      </button>
      <p
        className={`${styles.feedback} ${
          feedback === "Correct! 🎉" ? styles.correct : styles.incorrect
        }`}
      >
        {feedback}
      </p>

      <button onClick={handleLogin}>login</button>
    </div>
  );
};

export default Home;
