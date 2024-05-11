import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { headerHeight } from './Header';

export const sidebarWidth = 250;

const SidebarContainer = styled.div`
  position: fixed;
  left: 0;
  top: calc(${headerHeight}px + 2px);
  width: ${sidebarWidth}px;
  height: calc(100% - ${headerHeight}px - 2px);
  border-top: 0px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  flex-wrap:  wrap;
  align-items: center;
  margin-right: 15px;

  overflow-y: scroll;
`;

const SidebarIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const SidebarItem = styled.a`
  cursor: pointer;
  margin-left: 15px;
  margin-top: 15px;
  text-decoration: none;

  padding: 10px;
  color: #8a94ad;
  width: 100%;
  border-radius: 10px;

  &:hover {
    background-color: #2f3549;
    color: #eff2f6;
  }
`;

const Sidebar = () => {
  return (
    <SidebarContainer className='border secondary-background' >
      <Nav>
        <SidebarItem style={{ marginTop: '10px' }} as={Link} to="/home">Home</SidebarItem>
        <SidebarItem as={Link} to="/recurring">Recurring Payments</SidebarItem>
      </Nav>
    </SidebarContainer>
  );
};

export default Sidebar;
