import React from 'react';
import Home from './Home';
import styled from 'styled-components';

const SummaryBoxStyle = styled.div`
  display: flex;
  width: 40%;
  height: 100px;
  margin: 0px;
  padding: 0px;

  border: 1px solid #8a94ad;
  border-radius: 10px;
`;

const SummaryBox = ({ title, value }) => {
  return (
    <SummaryBoxStyle>
      <h1>{title}</h1>
      <h2>${value}</h2>
    </SummaryBoxStyle>
  );
};

const Summary = ({ transactions }) => {
  if (!transactions || transactions.length === 0) {
    return (<Home />);
  }
  const categories = ["utilities", "transport", "groceries", "rent", "income", "eating out", "miscellaneous"];
  const boxes = categories.map(category => SummaryBox(category, 0));
  return (
    <div>
      {boxes}
    </div>
  );
};

export default Summary;