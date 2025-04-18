import React from "react";
import styled from "styled-components";

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  padding: 1rem;
  width: 12rem;
  height: 100vh;

  box-sizing: border-box;
  gap: 1rem;

  background-color: #f0f0f0;
`;

interface SidebarProps {
  children?: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }: SidebarProps) => {
  return <SidebarContainer>{children}</SidebarContainer>;
};

export default Sidebar;
