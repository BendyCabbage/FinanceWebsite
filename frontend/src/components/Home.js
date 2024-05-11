import React from 'react';
import styled from 'styled-components';

const CentredBackground = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
min-height: calc(100vh - 50px);
`;

export default function Home() {
  return (
    <CentredBackground>
      <p style={{ color: 'white' }}>Please choose an option from the sidebar.</p>
    </CentredBackground>
  );
}

