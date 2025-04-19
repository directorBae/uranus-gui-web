// <Select>
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const SelectContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 200px;
`;

const SelectButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  text-align: left;
  font-size: 16px;
`;

const OptionsList = styled.ul<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  max-height: 200px;
  overflow-y: auto;
  list-style: none;
  padding: 0;
  margin: 0;
  display: ${(props) => (props.isOpen ? "block" : "none")};
  z-index: 1000;
`;

const OptionItem = styled.li<{ isSelected: boolean }>`
  padding: 10px;
  cursor: pointer;

  background-color: ${(props) => (props.isSelected ? "#e0e0e0" : "#fff")};
  &:hover {
    background-color: #e0e0e0;
  }
`;

const Select: React.FC<{
  options: string[];
  selectedOption: string;
  onOptionSelect: (option: string) => void;
}> = ({ options, selectedOption, onOptionSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option: string) => {
    onOptionSelect(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if ((event.target as HTMLElement).closest(`.${SelectContainer}`) === null) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <SelectContainer>
      <SelectButton onClick={() => setIsOpen(!isOpen)}>
        {selectedOption}
      </SelectButton>
      <OptionsList isOpen={isOpen}>
        {options.map((option, index) => (
          <OptionItem
            key={index}
            isSelected={option === selectedOption}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </OptionItem>
        ))}
      </OptionsList>
    </SelectContainer>
  );
};
export default Select;
