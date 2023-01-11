import React, {useEffect} from 'react';
import TransactionForm from "../../components/TransactionForm/TransactionForm";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {useParams} from "react-router-dom";
import {selectTransaction, selectTransactionFormLoading} from "../../store/TransactionsSlice";
import {fetchOneTransaction} from "../../store/TransactionsThunks";
import LoadSpinner from "../../components/LoadSpinner/LoadSpinner";

const EditTransaction = () => {
  const dispatch = useAppDispatch();
  const {id} = useParams() as {id: string};
  const formLoading = useAppSelector(selectTransactionFormLoading);
  const existingTransaction = useAppSelector(selectTransaction);

  useEffect(() => {
    dispatch(fetchOneTransaction(id));
  }, [dispatch]);

  return (
    <div className="text-center pt-5">
      <h4 className="text-uppercase">Edit transaction</h4>
      {formLoading ? <LoadSpinner/> : <TransactionForm existingTransaction={existingTransaction!} id={id}/>}
    </div>
  );
};

export default EditTransaction;