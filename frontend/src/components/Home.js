import React from 'react';
import styled from 'styled-components';
import CashflowGraph from './CashflowGraph';

const CentredBackground = styled.div`
  width: 100%;
  height: 100%;

  overflow-y: auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const NoDataMessage = styled.p`
  color: white;
  font-size: 1.2rem;
  text-align: center;
  margin: 20px;
`;

export default function Home({ transactions }) {
  return (
    <CentredBackground>
      {transactions && transactions.length > 0 ? (
        <CashflowGraph transactions={transactions} />
      ) : (
        <NoDataMessage>Upload your transactions to get started</NoDataMessage>
      )}
    </CentredBackground>
  );
}

