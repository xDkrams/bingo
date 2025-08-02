"use client";
import React, { useState, useEffect } from "react";
import GeneratePrompt from "./components/generatePrompt";
import BingoCardDisplay from "./components/bingoCardDisplay";
import { generateUniqueCards } from "./utils/bingoUtils";

export default function Home() {
  const [cards, setCards] = useState([]);
  const [triggerExport, setTriggerExport] = useState(false);

  const handleGenerate = (count) => {
    const generated = generateUniqueCards(count);
    setCards(generated);
    setTriggerExport(true); // trigger PDF export once rendered
  };

  const handleDone = () => {
    setCards([]);
    setTriggerExport(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      {cards.length === 0 ? (
        <GeneratePrompt onGenerate={handleGenerate} />
      ) : (
        <BingoCardDisplay
          cards={cards}
          onDone={handleDone}
          triggerExport={triggerExport}
        />
      )}
    </div>
  );
}
