import React, { useState } from "react";

const GeneratePrompt = ({ onGenerate }) => {
  const [count, setCount] = useState(1);

  const handleClick = () => {
    const num = parseInt(count);
    if (!isNaN(num) && num > 0) {
      onGenerate(num);
    } else {
      alert("Please enter a valid number");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>How many Bingo Cards?</h2>
      <input
        type="number"
        min="1"
        value={count}
        onChange={(e) => setCount(e.target.value)}
        style={{ padding: "10px", fontSize: "18px", marginRight: "10px" }}
      />
      <button
        onClick={handleClick}
        style={{ padding: "10px 20px", fontSize: "18px", cursor: "pointer" }}
      >
        Generate & Export
      </button>
    </div>
  );
};

export default GeneratePrompt;
