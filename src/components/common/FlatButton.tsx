import React from "react";
import styled from "styled-components";

interface FlatButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "danger";
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
}

const StyledButton = styled.button<{
  variant: string;
  fullWidth: boolean;
  disabled: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  border-radius: 4px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.2s ease-in-out;
  width: ${(props) => (props.fullWidth ? "100%" : "auto")};
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};
  
  ${(props) => {
    switch (props.variant) {
      case "primary":
        return `
          background-color: #1976d2;
          color: white;
          &:hover {
            background-color: ${props.disabled ? "#1976d2" : "#1565c0"};
          }
        `;
      case "secondary":
        return `
          background-color: #f5f5f5;
          color: #333;
          border: 1px solid #ddd;
          &:hover {
            background-color: ${props.disabled ? "#f5f5f5" : "#eaeaea"};
          }
        `;
      case "danger":
        return `
          background-color: #f44336;
          color: white;
          &:hover {
            background-color: ${props.disabled ? "#f44336" : "#d32f2f"};
          }
        `;
      default:
        return `
          background-color: #1976d2;
          color: white;
          &:hover {
            background-color: ${props.disabled ? "#1976d2" : "#1565c0"};
          }
        `;
    }
  }}
`;

const FlatButton: React.FC<FlatButtonProps> = ({
  children,
  onClick,
  disabled = false,
  variant = "primary",
  fullWidth = false,
  type = "button",
}) => {
  return (
    <StyledButton
      onClick={onClick}
      disabled={disabled}
      variant={variant}
      fullWidth={fullWidth}
      type={type}
    >
      {children}
    </StyledButton>
  );
};

export default FlatButton;
