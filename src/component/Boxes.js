import React from "react";
import { boardWidth, boxSize, borderWidth } from "../utils/constant";
import Box from "./Box";
const Boxes = () => {
  const boxSpacing = (boardWidth / 10) * 0.4;
  const boxes = [];

  for (let i = 0; i < 11; i++) {
    const pos = [
      boardWidth / 2 + borderWidth + boxSize + 1,
      boardWidth / 2 - (boxSize + boxSpacing) * i,
      boxSize / 2,
    ];
    boxes.push(<Box position={pos} num={i} />);
  }

  return boxes;
};

export default Boxes;
