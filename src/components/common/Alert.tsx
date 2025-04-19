import React from "react";
import styled from "styled-components";

const AlertContainer = styled.div`
  position: fixed;
  top: calc(50% - 50px);
  right: calc(50% - 150px);

  width: 300px;
  height: 100px;
  background-color: #f44336;
  color: white;
  padding: 15px;
  border-radius: 5px;
  z-index: 1000;
`;

const AlertMessage = styled.p`
  margin: 0;
`;
const AlertButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
`;

interface AlertProps {
  message: string;
  onClose: () => void;
}

const Alert = ({ message, onClose }: AlertProps) => {
  return (
    <AlertContainer>
      <AlertMessage>{message}</AlertMessage>
      <AlertButton onClick={onClose}>Close</AlertButton>
    </AlertContainer>
  );
};

export default Alert;
