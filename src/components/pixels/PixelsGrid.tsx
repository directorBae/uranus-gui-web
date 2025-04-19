import React from "react";
import styled from "styled-components";
import NbyNPixels from "./NbyNPixels";

const PixelsGridContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 100%;
  height: 100%;
`;

interface PixelsGridProps {
  rows: number;
  cols: number;
  pixelLists: [number, number, number][][];
}

const PixelsGrid = ({ rows, cols, pixelLists }: PixelsGridProps) => {
  return (
    <PixelsGridContainer>
      {pixelLists.map((pixelList, index) => (
        <NbyNPixels key={index} row={rows} col={cols} colors={pixelList} />
      ))}
    </PixelsGridContainer>
  );
};

export default PixelsGrid;
