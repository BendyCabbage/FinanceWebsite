import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import styled from 'styled-components';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Home from './components/Home';

const MainContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;

const ContentContainer = styled.div`
  height: 100%;
  width: 100%;
`;

const App = () => {
  return (
    <Router>
      <MainContainer>
        <Header />
        <Sidebar />
        <ContentContainer className='primary-background'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </ContentContainer>
      </MainContainer>
    </Router>
  );
};

export default App;
