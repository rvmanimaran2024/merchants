import React from 'react';

function CapitalizeWord({ word }) {
  // Capitalize the first letter and make the rest lowercase
  const capitalize = (str) => {
    //return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    return str
    .split("_")                   // Split the string into words
    .map((word) =>                 // Capitalize each word
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join(" ");
  };

  return capitalize(word)
}

export default CapitalizeWord;