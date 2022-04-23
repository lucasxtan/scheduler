import React, { useState } from "react";


export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    setMode(newMode);

    if (replace === true){
      const newHistory = [...history];
      newHistory[newHistory.length -1] = newMode
      setHistory(newHistory);
    } else {
      const newHistory = [...history]
      newHistory.push(newMode);
      setHistory(newHistory);
    }
  }

  const back = () => {
    const currentHistory = [...history];
    currentHistory.pop();
    setHistory(currentHistory)
    if (currentHistory.length > 0){
      setMode(currentHistory[currentHistory.length-1])
    }
  }

  return { mode, transition, back };
}
