import React, { useState, useEffect } from "react";
import axios from "axios";
// import data from "../resource/hiragana.json";
import confetti from "canvas-confetti";
import styles from "./Mode.module.css";

type HiraganaCharacter = {
  character: string;
  romaji: string;
};

const base = "http://0.0.0.0:3000/";

const Mode = (props: any) => {
  const { selectedLetters } = props;
  const [current, setCurrent] = useState<HiraganaCharacter>({
    character: "",
    romaji: "",
  });
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("");
  // const [consecutiveCounts, setConsecutiveCounts] = useState<number>(0);
  const [input, setInput] = useState<string>("");
  const [letters, setLetters] = useState<HiraganaCharacter[]>([]);
  const [finish, setFinish] = useState<boolean>(false);

  useEffect(() => {
    setLetters(selectedLetters);
    const randomIndex = Math.floor(Math.random() * selectedLetters.length);
    setCurrentIndex(randomIndex);
    setCurrent(selectedLetters[randomIndex]);
  }, []);

  const getNextCharacter = () => {
    const updatedLetters = [...letters];
    updatedLetters.splice(currentIndex, 1);
    setLetters(updatedLetters);
    if (updatedLetters.length > 0) {
      const randomIndex = Math.floor(Math.random() * updatedLetters.length);
      setCurrent(updatedLetters[randomIndex]);
      setCurrentIndex(randomIndex);
    } else {
      handleFinishExercise();
    }
    setInput("");
    setFeedback("");
  };

  const shootConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handleFinishExercise = () => {
    shootConfetti();

    setFinish(true);
  };

  const restartQuiz = () => {
    window.location.reload();
  };

  const checkAnswer = async () => {
    if (input.trim().toLowerCase() === current.romaji) {
      setFeedback("Correct! 🎉");
      setTimeout(getNextCharacter, 500);

      // const updateCounts = consecutiveCounts + 1;
      // setConsecutiveCounts(updateCounts);
      // Automatically move to the next character after 1.5 seconds
    } else {
      // if (consecutiveCounts > 0) {
      //   const response = await axios.post(base + "api/update_ranking", {
      //     consecutiveCounts,
      //   });

      //   if (response.status === 200) {
      //     console.log("updated data");
      //   } else {
      //     console.log("Something went wrong");
      //   }
      // }
      setFeedback("Incorrect. Try again!");
    }
  };
  return (
    <div id="congrats" className={styles.exercise_container}>
      {current.character !== "" && !finish && (
        <>
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
        </>
      )}
      {finish && (
        <div className={styles.finishScreen}>
          <h1>🎉 Congratulations! 🎉</h1>
          <p>You've completed the Hiragana quiz! Well done!</p>
          <button className={styles.restartButton} onClick={restartQuiz}>
            Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default Mode;

// all letters (in order, disorder)
// selective rows
// in vocabularies
