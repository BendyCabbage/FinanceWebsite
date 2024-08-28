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
import RecurringTransactions from './components/RecurringTransactions';
import Summary from './components/Summary';

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
  const [categories, setCategories] = React.useState([]);
  const [summary, setSummary] = React.useState(null);

  return (
    <Router>
      <MainContainer>
        <Header />
        <Sidebar setTransactions={setTransactions} setCategories={setCategories} setSummary={setSummary} />
        <ContentContainer className='primary-background'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/viewtransactions" element={<ViewTransactions transactions={transactions} />} />
            <Route path="/recurring" element={<RecurringTransactions transactions={transactions} />} />
            <Route path="/summary" element={<Summary summary={summary} categories={categories}/>} />
          </Routes>
        </ContentContainer>
      </MainContainer>
    </Router>
  );
};

export default App;
