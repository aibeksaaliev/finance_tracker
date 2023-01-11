import React, {useCallback, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectTransactions, selectTransactionsLoading} from "../../store/TransactionsSlice";
import {fetchAllTransactions} from "../../store/TransactionsThunks";
import TransactionCard from "../../components/TransactionCard/TransactionCard";
import LoadSpinner from "../../components/LoadSpinner/LoadSpinner";
import {fetchAllCategories} from "../../store/CategoriesThunks";

const Transactions = () => {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(selectTransactions);
  const pageLoading = useAppSelector(selectTransactionsLoading);

  const getExtendedTransactions = useCallback(async () => {
    await dispatch(fetchAllCategories());
    await dispatch(fetchAllTransactions());
  }, [dispatch])

  useEffect(() => {
    void getExtendedTransactions();
  }, [getExtendedTransactions]);

  const total = transactions.reduce((acc, transaction) => {
      if (transaction.type === "income") {
        return acc + transaction.amount;
      } else {
        return acc - transaction.amount;
      }
    }, 0);


  let transactionsContent = (
    transactions.map(transaction => {
       return <TransactionCard transaction={transaction} key={transaction.transactionId}/>
    })
  );

  return (
    <>
      <div className="w-25 py-2 border border-dark border-2 my-2 text-center rounded-2">
        <h4 className="text-uppercase m-0">Total: {total} KGS</h4>
      </div>
      <div>
        {pageLoading ? <LoadSpinner/> : transactionsContent}
      </div>
    </>
  );
};

export default Transactions;