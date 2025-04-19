import React from "react";
import styled from "styled-components";

const RowBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;
  padding: 0 1rem;
  margin: 0;
  gap: 1rem;
`;

const ColumnBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;
  padding: 0 1rem;
  margin: 0;
  gap: 1rem;
`;

export { RowBox, ColumnBox };
