import React, { useState } from "react";


export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  //transitions to the next mode with the next component
  const transition = (newMode, replace = false) => {
    setMode(newMode);
    setHistory(prev => replace === true ? [...prev.slice(0, prev.length -1), newMode] : [...prev, newMode])
  }

  //goes back to the previous component
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
