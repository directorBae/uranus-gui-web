import { assert } from "console";
import React from "react";
import styled from "styled-components";

const Pixel = styled.div<{
  colorR: number;
  colorG: number;
  colorB: number;
}>`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  display: inline-block;
  background-color: rgb(
    ${(props) => props.colorR},
    ${(props) => props.colorG},
    ${(props) => props.colorB}
  );

  margin: 5px;
`;

const PixelContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
`;

interface NbyNPixelsProps {
  row: number;
  col: number;
  colors: [number, number, number][];
}

const NbyNPixels = ({ row, col, colors }: NbyNPixelsProps) => {
  assert(
    colors.length === row * col,
    "Number of colors must be equal to n * n"
  );
  assert(
    colors.every((color) => color.length === 3),
    "Each color must be an array of 3 numbers (R, G, B)"
  );

  return (
    <PixelContainer>
      {colors.map((color, index) => (
        <Pixel
          key={index}
          colorR={color[0]}
          colorG={color[1]}
          colorB={color[2]}
        />
      ))}
    </PixelContainer>
  );
};

export default NbyNPixels;
