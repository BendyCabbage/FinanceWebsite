import React from 'react';
import styled from 'styled-components';

const CentredBackground = styled.div`
  width: 100%;
  height: 100%;

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

