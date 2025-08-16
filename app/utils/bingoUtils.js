// export const generateUniqueCards = (count) => {
//   const generateCard = () => {
//     const getColumn = (start, end, free = false) => {
//       const nums = [];
//       while (nums.length < 5) {
//         const num = Math.floor(Math.random() * (end - start + 1)) + start;
//         if (!nums.includes(num)) nums.push(num);
//       }
//       return nums;
//     };

//     const columns = [
//       getColumn(1, 15),
//       getColumn(16, 30),
//       getColumn(31, 45),
//       getColumn(46, 60),
//       getColumn(61, 75),
//     ];

//     columns[2][2] = "FREE"; // middle cell

//     const card = [];
//     for (let i = 0; i < 5; i++) {
//       card.push([
//         columns[0][i],
//         columns[1][i],
//         columns[2][i],
//         columns[3][i],
//         columns[4][i],
//       ]);
//     }

//     return card;
//   };

//   const uniqueCards = new Set();
//   const cards = [];

//   while (cards.length < count) {
//     const card = generateCard();
//     const key = JSON.stringify(card);
//     if (!uniqueCards.has(key)) {
//       uniqueCards.add(key);
//       cards.push(card);
//     }
//   }

//   return cards;
// };

import bingoWords from "./bingoWords";

export const generateUniqueCards = (count) => {
  const generateCard = () => {
    const getColumn = (letter) => {
      const words = [...bingoWords[letter]];
      const selected = [];

      while (selected.length < 5) {
        const index = Math.floor(Math.random() * words.length);
        const word = words[index];
        if (!selected.includes(word)) selected.push(word);
      }

      return selected;
    };

    const columns = [
      getColumn("B"),
      getColumn("I"),
      getColumn("N"),
      getColumn("G"),
      getColumn("O"),
    ];

    columns[2][2] = "FREE"; // middle cell

    const card = [];
    for (let i = 0; i < 5; i++) {
      card.push([
        columns[0][i],
        columns[1][i],
        columns[2][i],
        columns[3][i],
        columns[4][i],
      ]);
    }

    return card;
  };

  const uniqueCards = new Set();
  const cards = [];

  while (cards.length < count) {
    const card = generateCard();
    const key = JSON.stringify(card);
    if (!uniqueCards.has(key)) {
      uniqueCards.add(key);
      cards.push(card);
    }
  }

  return cards;
};
