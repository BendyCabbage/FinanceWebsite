import React, { useState } from "react";
import styled from "styled-components";

import updownarrow from "../icons/updownarrow.svg";

const CentredBackground = styled.div`
  width: calc(100% - 20px);
  height: 100%;

  overflow-y: scroll;
  z-index: 0;

  padding: 10px;
`;

const HeadingBox = styled.div`
  width: 100%;
  height: 130px;
  
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`;

const SearchBar = styled.input`
  border-radius: 5px;
  width: 300px;
  height: 40px;

  margin: 10px;
  padding: 5px 10px;
  font-size: 1.0em;

  &:focus {
    outline: none;
    border: 1px solid #7493e0;
  }
`;

const SearchTransactionsBox = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <SearchBar value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="primary-text secondary-background border" placeholder="Search Transactions" type="search"></SearchBar>
  );
};

const Heading = () => {
  return (
    <HeadingBox>
      <h1 style={{margin: '10px'}} className="primary-text">Transactions</h1>
      <SearchTransactionsBox />
    </HeadingBox>
  );
};

const TransactionTable = styled.table`
  width: 100%;
  height: 100%;
`;

const TransactionTableHead = styled.thead`
  width: 100%;
  height: 40px;
`;

const TableHeadStyle = styled.th`
  padding: 0px;
`;

const HeaderIcon = styled.img`
  color: #8a94ad;
  fill: #8a94ad;
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const TableHeadEntry = ({ text }) => {
  return (
    <TableHeadStyle>
      <HeaderIcon src={updownarrow}/>
      {text}
    </TableHeadStyle>
  );
};

const TableHead = () => {
  return (
    <TransactionTableHead>
      <tr className="secondary-background primary-text">
        <TableHeadEntry text="Date"/>
        <TableHeadEntry text="Amount"/>
        <TableHeadEntry text="Description"/>
      </tr>
    </TransactionTableHead>
  );
};

const TransactionTableBody = styled.tbody`
  width: 100%;
  height: 100%;
  `;

const TransactionRow = styled.tr`
  width: 90%;
  height: 40px;

  align-text: center;
  padding: 2px 5px;

  margin: 5px;
  border-radius: 5px;

  font-size: 20px;
`;

const TableData = styled.td`
  padding-left: 10px;
`;

const Date = ({ date }) => {
  return <TableData>{date}</TableData>
};

const Amount = ({ amount }) => {
  return <TableData>{amount}</TableData>
};

const Description = ({ description }) => {
  return <TableData>{description}</TableData>
};


const Transaction = ({ transaction }) => {
  return (
    <TransactionRow className="secondary-background primary-text">
      <Date date={transaction.date} />
      <Amount amount={transaction.amount} />
      <Description description={transaction.transaction_name} />
    </TransactionRow>
  );
};

const ViewTransactions = ({ transactions }) => {
  const TransactionComponents = transactions.map((t, index) => <Transaction transaction={t} key={index} />)
  return (
    <CentredBackground>
      <Heading />
      <TransactionTable>
        <TableHead />
        <TransactionTableBody>
          {TransactionComponents}
        </TransactionTableBody>
      </TransactionTable>
      <div style={{height: '20px'}}></div>
    </CentredBackground>
    
  );
};

export default ViewTransactions;