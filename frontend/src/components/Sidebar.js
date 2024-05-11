import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import { headerHeight } from './Header';

// Icons
import homeIcon from '../icons/homeIcon.svg';
import clockIcon from '../icons/clockIcon.svg';
import uploadIcon from '../icons/uploadIcon.svg';
import spendingIcon from '../icons/spendingIcon.svg';

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

  overflow-y: scroll;
`;

const SidebarIcon = styled.img`
  color: #8a94ad;
  fill: #8a94ad;
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const SidebarHolder = styled.div`
  cursor: pointer;
  margin: 0px 10px;
  margin-top: 10px;
  text-decoration: none;

  display: flex;

  align-items: center;
  justify-content: flex-start;

  padding: 10px;
  color: #8a94ad;
  width: 100%;
  border-radius: 10px;

  &:hover {
    background-color: #2f3549;
    color: #eff2f6;
  }
`;

const SidebarItem = ({ icon, text, route }) => {
  const navigate = useNavigate();

  return (
    <SidebarHolder onClick={() => navigate(route)}>
      <SidebarIcon src={icon} />
      {text}
    </SidebarHolder>
  );

}

const FileUploadButton = () => {
  const handleUpload = (e) => {
    const file = e.target.files[0];
    console.log(file);
  };

  return <>
    <input type="file" id="file" ref={useRef()} style={{ display: 'none' }} onChange={handleUpload} />
    <SidebarHolder onClick={() => document.getElementById('file').click()}>
      <SidebarIcon src={uploadIcon} />
      Upload Transactions
    </SidebarHolder>
  </>;
};

const Sidebar = () => {
  return (
    <SidebarContainer className='border secondary-background' >
      <Nav>
        <FileUploadButton />
        <SidebarItem icon={homeIcon} text='Home' route='/home' />
        <SidebarItem icon={spendingIcon} text='Spending Summary' route='/spending' />
        <SidebarItem icon={clockIcon} text='Recurring Payments' route='/recurring' />
      </Nav>
    </SidebarContainer>
  );
};

export default Sidebar;
