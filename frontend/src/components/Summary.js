import React, { useState } from 'react';
import Home from './Home';
import styled from 'styled-components';
import ViewTransactions from './ViewTransactions';

import upArrow from '../icons/upArrow.svg';
import downArrow from '../icons/downArrow.svg';

const SummaryContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 20px 0px;
  margin-bottom: 50px;

  max-height: 100%;
  overflow-y: scroll;
`;

const CategoryBoxStyle = styled.div`
  display: flex;
  flex-grow: 1;
  max-width: 93%;
  min-width: 42%;
  transition: width 0.3s ease-in-out;
  margin: 10px;
  padding: 10px;
  border: 1px solid #8a94ad;
  border-radius: 10px;
  flex-direction: column;
  flex-wrap: wrap;
`;

const SummaryBoxStyle = styled.div`
  display: flex;
  width: 40%;
  margin: 10px;
  padding: 10px;
  border: 1px solid #8a94ad;
  border-radius: 10px;
  flex-direction: column;
  flex-wrap: wrap;
  margin-bottom: 35px;
`;

const IconBox = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
  margin-left: 5px;
`;

const CollapseIcon = ({ isExpanded, setIsExpanded }) => {
  return <IconBox src={isExpanded ? upArrow : downArrow} onClick={() => setIsExpanded(!isExpanded)} />;
};

function printAmount(amount) {
  amount = amount.toFixed(2);
  if (amount < 0) {
    return `-$${-1 * amount}`;
  }
  return `$${amount}`;
}

const CategorySummary = ({ summary }) => {
  return (
    <>
      <p className='secondary-text'>Cashflow: {printAmount(summary.cashflow)}</p>
      <p className='secondary-text'>Total Transactions: {summary.numTransactions}</p>
    </>
  );
};

const CategoryBox = ({ name, category, summary }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <CategoryBoxStyle>
      <h1 style={{ paddingBottom: '10px' }} className='primary-text'>{name}</h1>
      <CategorySummary summary={summary} />
      <CollapseIcon isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      {isExpanded && <ViewTransactions transactions={category} />}
    </CategoryBoxStyle>
  );
};

function printDate(date) {
  return (new Date(date)).toISOString().split('T')[0];
}

const SummaryBox = ({ title, summary }) => {
  return (
    <SummaryBoxStyle key={title} className='primary-text border secondary-background'>
      <h1 className='primary-text' style={{ paddingBottom: '10px' }}>Summary</h1>
      <p>Start Date: {printDate(summary.startDate)}</p>
      <p>End Date: {printDate(summary.endDate)}</p>
      <p>Cashflow: {printAmount(summary.cashflow)}</p>
    </SummaryBoxStyle>
  );
};

const Summary = ({ categories, summary }) => {
  if (!categories || categories.length === 0 || !summary) {
    return (<Home />);
  }
  const boxes = [];
  
  for (const [name, category] of Object.entries(categories)) {
    if (category.length > 0) {
      boxes.push(<CategoryBox key={name} name={name} category={category} summary={summary['categories'][name]} />);
    }
  }

  return (
    <SummaryContainer>
      {boxes}
      <SummaryBox sx={{ marginBottom: '50px' }} title='Summary' summary={summary} />
    </SummaryContainer>
  );
};

export default Summary;