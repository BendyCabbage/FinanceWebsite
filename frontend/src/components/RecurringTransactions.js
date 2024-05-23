import ViewTransactions from "./ViewTransactions";

const RecurringTransactions = ({ transactions }) => {
  function findRecurringTransactions() {
    const recurringTransactions = [];
    const transactionMap = {};

    transactions.forEach((transaction) => {
      const key = transaction.transaction_name;
      if (transactionMap[key]) {
        transactionMap[key].push(transaction);
      } else {
        transactionMap[key] = [transaction];
      }
    });

    Object.values(transactionMap).forEach((transactionList) => {
      if (transactionList.length >= 2) {
        const timeDifferences = [];
        for (let i = 1; i < transactionList.length; i++) {
          const date1 = new Date(transactionList[i].date);
          const date2 = new Date(transactionList[i - 1].date);

          const timeDifference = (Math.abs(date1 - date2) / 86400000); // In Milliseconds, convert to days (1000 * 60 * 60 * 24)
          timeDifferences.push(timeDifference);
        }
        const isRecurring = isRecurringTransaction(transactionList, timeDifferences);
        //console.log(`Is same for ${transactionList[0].transaction_name}: ${isRecurring}, differences: `, timeDifferences);
        if (isRecurring) {
          recurringTransactions.push(transactionList[transactionList.length - 1]);
        }
      }
    });

    return recurringTransactions;
  };

  function isRecurringTransaction(transactionList, timeDifferences) {
    //console.log(`Name: ${transactionList[0].transaction_name}, Len: ${transactionList.length}`);
    if (transactionList.length <= 2) {
      return false;
    } else if (transactionList.length === 2 && transactionList[0].amount === transactionList[1].amount) {
      return true;
    } else if (timeDifferences.length < 2) {
      return false;
    } else if (timeDifferences[0] === 0) {
      return false;
    } else if (timeDifferences[0] >= 28 && timeDifferences[0] <= 32) {
      // Monthly
      return timeDifferences.every((difference) => difference >= 28 && difference <= 32);
    } else if (timeDifferences[0] >= 12 && timeDifferences[0] <= 15) {
      //Fortnightly
      return timeDifferences.every((difference) => difference >= 12 && difference <= 15);
    }
    return false;
  }

  const recurringTransactions = findRecurringTransactions();

  return (
    <ViewTransactions titleText="Recurring Transactions" transactions={recurringTransactions} />
  );
};

export default RecurringTransactions;