import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import { headerHeight } from './Header';

// Icons
import homeIcon from '../icons/homeIcon.svg';
import clockIcon from '../icons/clockIcon.svg';
import uploadIcon from '../icons/uploadIcon.svg';
import spendingIcon from '../icons/spendingIcon.svg';
import listIcon from '../icons/listIcon.svg';

export const sidebarWidth = 250;
export const backendURL = 'http://127.0.0.1:5000';

const SidebarContainer = styled.div`
  position: fixed;
  left: 0;
  top: calc(${headerHeight}px + 2px);
  width: ${sidebarWidth}px;
  height: calc(100% - ${headerHeight}px - 2px);
  border-top: 0px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  z-index: 1;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  flex-wrap:  wrap;
  align-items: center;
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

const FileUploadButton = ({ setTransactions, setCategories, setSummary }) => {
  const handleUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (file.type === "text/csv") {
        const formData = new FormData();
        formData.append('file', file);

        fetch(backendURL + '/upload', {
          method: 'POST',
          body: formData,
          credentials: 'include'
        })
          .then(response => response.json())
          .then(data => {
            setTransactions(data.transactions);

            fetch(backendURL + '/summary', { method: 'GET', credentials: 'include' }).then(response => response.json())
            .then(data => {
              console.log(data);
              setSummary(data.summary);
              setCategories(data.categories);
            }).catch(error => {
              console.error('Error:', error);
            });
          })
          .catch(error => {
            console.error('Error:', error);
          });

      } else {
        alert("Please upload a CSV file.");
      }
    }
  };

  return <>
    <input type="file" id="file" ref={useRef()} style={{ display: 'none' }} onChange={handleUpload} accept=".csv, text/csv" />
    <SidebarHolder onClick={() => document.getElementById('file').click()}>
      <SidebarIcon src={uploadIcon} />
      Upload Transactions
    </SidebarHolder>
  </>;
};

const Sidebar = ({ setTransactions, setCategories, setSummary }) => {
  return (
    <SidebarContainer className='border secondary-background' >
      <Nav>
        <FileUploadButton setTransactions={setTransactions} setCategories={setCategories} setSummary={setSummary} />
        <SidebarItem icon={homeIcon} text='Home' route='/home' />
        <SidebarItem icon={spendingIcon} text='Spending Summary' route='/summary' />
        <SidebarItem icon={clockIcon} text='Recurring Payments' route='/recurring' />
        <SidebarItem icon={listIcon} text='View All Transactions' route='/viewtransactions' />
      </Nav>
    </SidebarContainer>
  );
};

export default Sidebar;
