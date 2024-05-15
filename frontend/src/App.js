import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import styled from 'styled-components';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Home from './components/Home';
import ViewTransactions from './components/ViewTransactions';

import { sidebarWidth } from './components/Sidebar';
import { headerHeight } from './components/Header';

const MainContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;

const ContentContainer = styled.div`
  position: fixed;
  top: ${headerHeight}px;
  left: ${sidebarWidth}px;

  width: calc(100% - ${sidebarWidth}px);
  height: calc(100% - ${headerHeight}px);
`;

const App = () => {
  const [transactions, setTransactions] = React.useState([]);

  return (
    <Router>
      <MainContainer>
        <Header />
        <Sidebar setTransactions={setTransactions} />
        <ContentContainer className='primary-background'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/viewtransactions" element={<ViewTransactions transactions={transactions} />} />
          </Routes>
        </ContentContainer>
      </MainContainer>
    </Router>
  );
};

export default App;
