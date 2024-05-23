import React from "react";
import styled from "styled-components";

const TransactionRow = styled.tr`
  width: 90%;
  max-height: 70px;

  padding: 2px 5px;

  margin: 5px;
  border-radius: 5px;

  font-size: 20px;
`;

const TableData = styled.td`
  padding-left: 10px;
  height: 40px;
  max-height: 40px;
`;

const DataHolder = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  max-height: 40px;
`;

const Data = ({ data }) => {
  return (
    <TableData style={{ height: '40px', maxHeight: '40px'}}>
      <DataHolder style={{ display: 'flex', alignItems: 'center', maxHeight: '40px', height: '40px' }}>
        {data}
      </DataHolder>
    </TableData>
  );
};


const Transaction = ({ transaction }) => {
  return (
    <TransactionRow className="secondary-background primary-text">
      <Data data={transaction.date} />
      <Data data={transaction.amount} />
      <Data data={transaction.transaction_name} />
    </TransactionRow>
  );
};

export default Transaction;