import React from 'react';
import Home from './Home';
import styled from 'styled-components';

const SummaryBoxStyle = styled.div`
  display: flex;
  width: 40%;
  height: 100px;
  margin: 10px;
  padding: 10px;
  border: 1px solid #8a94ad;
  border-radius: 10px;
`;

const SummaryBox = ({ title, value }) => {
  return (
    <SummaryBoxStyle key={title} className='primary-text border secondary-background'>
      <h1>{title}</h1><br/>
      <h2>{value}</h2>
    </SummaryBoxStyle>
  );
};

const Summary = ({ categories, summary }) => {
  console.log('In Summary component');
  console.log(categories);
  console.log(summary);

  if (!categories || categories.length === 0 || !summary) {
    return (<Home />);
  }
  const boxes = [];
  
  for (const [key, value] of Object.entries(categories)) {
    boxes.push(<SummaryBox title={key} value={value} />);
  }

  return (
    <div>
      <p className='primary-text'>{Object.toString(summary)}</p>
      {boxes}
    </div>
  );
};

export default Summary;