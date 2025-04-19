import React from "react";
import styled from "styled-components";

const FileListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 1rem;
  width: 12rem;
  height: 100vh;

  box-sizing: border-box;
  gap: 1rem;

  background-color: #f0f0f0;
`;

const FileListTitle = styled.h2`
  font-size: 1.5rem;
  margin: 0;
`;

const FileListItem = styled.div`
  font-size: 0.8rem;
  padding: 0.5rem;
  background-color: #e0e0e0;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  text-align: center;

  &:hover {
    background-color: #d0d0d0;
  }
`;

const FileList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

interface ListBoxProps {
  title: string;
  items: string[];
  onItemClick: (item: string) => void;
  clickedItem?: string;
}

const ListBox = ({ title, items, onItemClick, clickedItem }: ListBoxProps) => {
  return (
    <FileListContainer>
      <FileListTitle>{title}</FileListTitle>
      <FileList>
        {items.map((item, index) => (
          <FileListItem key={index} onClick={() => onItemClick(item)}>
            {item}
          </FileListItem>
        ))}
      </FileList>
    </FileListContainer>
  );
};

export default ListBox;
