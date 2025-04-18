import React from "react";
import styled from "styled-components";

const Button = styled.button`
  background-color: hsl(9, 100%, 63.9%); /* Tomato color */

  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;

  font-size: 1.2rem;
  font-weight: bold;

  cursor: pointer;
  transition: background-color 0.3s ease;

  width: 10rem;
  height: 5rem;

  white-space: pre-line;

  &:hover {
    background-color: #ff4500; /* Darker tomato color */
  }
`;

interface ButtonProps {
  children?: React.ReactNode;
  onClick: () => void;
}

const FuckinRacistButton: React.FC<ButtonProps> = ({
  children,
  onClick,
}: ButtonProps) => {
  return <Button onClick={onClick}>{children}</Button>;
};

export default FuckinRacistButton;
