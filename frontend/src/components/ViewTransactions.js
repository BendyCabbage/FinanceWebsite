import React, { useEffect, useState } from "react";
import styled from "styled-components";

import updownarrow from "../icons/updownarrow.svg";
import Transaction from "./Transaction";
import Home from "./Home";

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

const SearchTransactionsBox = ({ transactions, setVisibleTransactions }) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (searchTerm.length > 0) {
      const visibleTransactions = transactions.filter((transaction) => {
        return transaction.transaction_name.toLowerCase().includes(searchTerm.toLowerCase());
      });
      setVisibleTransactions(visibleTransactions);
    } else {
      setVisibleTransactions(transactions);
    }
  }, [searchTerm, transactions, setVisibleTransactions]);

  return (
    <SearchBar value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="primary-text secondary-background border" placeholder="Search Transactions" type="search"></SearchBar>
  );
};

const Heading = ({ text, transactions, setVisibleTransactions }) => {
  return (
    <HeadingBox>
      <h1 style={{margin: '10px'}} className="primary-text">{text}</h1>
      <SearchTransactionsBox transactions={transactions} setVisibleTransactions={setVisibleTransactions} />
    </HeadingBox>
  );
};

const TransactionTable = styled.table`
  width: 100%;
`;

const TransactionTableHead = styled.thead`
  width: 100%;
  height: 40px;
`;

const TableHeadStyle = styled.th`
  padding: 0px;
  align-items: center;
`;

const TableHeadItemsHolder = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
`;

const HeaderIcon = styled.img`
  color: #8a94ad;
  fill: #8a94ad;
  width: 20px;
  height: 20px;
  margin-right: 10px;
  cursor: pointer;
  `;

const TableHeadEntry = ({ text, handleClick }) => {
  return (
    <TableHeadStyle>
      <TableHeadItemsHolder>
        <HeaderIcon src={updownarrow} onClick={handleClick} />
        <p>{text}</p>
      </TableHeadItemsHolder>
    </TableHeadStyle>
  );
};

const TableHead = ({ visibleTransactions, setVisibleTransactions }) => {
  const [sortDateOrder, setDateSortOrder] = useState(0);
  const [sortAmountOrder, setAmountSortOrder] = useState(0);
  const [sortNameOrder, setNameSortOrder] = useState(0);

  function sortByDate() {
    const sortingOrder = sortDateOrder !== 1 ? 1 : -1;
    console.log("Sort by date, order: " + sortingOrder);
    setDateSortOrder(sortingOrder);
    setAmountSortOrder(0);
    setNameSortOrder(0);

    const newTransactions = visibleTransactions.sort((a, b) => sortDateOrder * (new Date(b.date) - new Date(a.date))).slice();
    setVisibleTransactions(newTransactions);
  }

  function sortByAmount() {
    const sortingOrder = sortAmountOrder !== 1 ? 1 : -1;
    console.log("Sort by amount, order: " + sortingOrder);
    setDateSortOrder(0);
    setAmountSortOrder(sortingOrder);
    setNameSortOrder(0);

    const newTransactions = visibleTransactions.sort((a, b) => sortingOrder * (parseFloat(b.amount) - parseFloat(a.amount))).slice();
    setVisibleTransactions(newTransactions);
  }

  function sortByName() {
    const sortingOrder = sortNameOrder !== 1 ? 1 : -1;
    console.log("Sort by name, order: " + sortingOrder);


    const newTransactions = visibleTransactions.sort((a, b) => sortingOrder * a.transaction_name.localeCompare(b.transaction_name)).slice();
    setVisibleTransactions(newTransactions);
    setDateSortOrder(0);
    setAmountSortOrder(0);
    setNameSortOrder(sortingOrder);
  }

  return (
    <TransactionTableHead>
      <tr className="secondary-background primary-text">
        <TableHeadEntry text="Date" handleClick={sortByDate} />
        <TableHeadEntry text="Amount" handleClick={sortByAmount} />
        <TableHeadEntry text="Description" handleClick={sortByName}/>
      </tr>
    </TransactionTableHead>
  );
};

const TransactionTableBody = styled.tbody`
  width: 100%;
  height: 100%;
  `;

const ViewTransactions = ({ titleText = "Transactions", transactions, defaultDisplay = false }) => {
  const [visibleTransactions, setVisibleTransactions] = useState(transactions);

  if (defaultDisplay && (!transactions || transactions.length === 0)) {
    console.log("No transactions");
    return <Home />;
  }

  const TransactionComponents = visibleTransactions.map((t, index) => <Transaction transaction={t} key={index} />)
  return (
    <CentredBackground>
      <Heading text={titleText} transactions={transactions} setVisibleTransactions={setVisibleTransactions} />
      <TransactionTable>
        <TableHead visibleTransactions={visibleTransactions} setVisibleTransactions={setVisibleTransactions} />
        <TransactionTableBody>
          {TransactionComponents}
        </TransactionTableBody>
      </TransactionTable>
      <div style={{height: '20px'}}></div>
    </CentredBackground>
    
  );
};

export default ViewTransactions;