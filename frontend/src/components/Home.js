import React from 'react';
import styled from 'styled-components';

import { headerHeight } from './Header';
import { sidebarWidth } from './Sidebar';

const CentredBackground = styled.div`
  position: fixed;
  top: ${headerHeight}px;
  left: ${sidebarWidth}px;

  width: calc(100% - ${sidebarWidth}px);
  height: calc(100% - ${headerHeight}px);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default function Home() {
  return (
    <CentredBackground>
      <p style={{ color: 'white' }}>Upload your transactions to get started</p>
    </CentredBackground>
  );
}

