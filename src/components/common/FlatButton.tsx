import React from "react";
import styled from "styled-components";

const Button = styled.button`
  background-color: #363636;

  color: hsl(9, 100%, 83.9%);
  border: none;
  border-radius: 2px;

  font-size: 0.9rem;

  cursor: pointer;

  width: 8rem;
  height: 2rem;

  white-space: pre-line;
`;

interface ButtonProps {
  children?: React.ReactNode;
  onClick: () => void;
}

const FlatButton: React.FC<ButtonProps> = ({
  children,
  onClick,
}: ButtonProps) => {
  return <Button onClick={onClick}>{children}</Button>;
};

export default FlatButton;
