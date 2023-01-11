import React, {useEffect} from 'react';
import TransactionForm from "../../components/TransactionForm/TransactionForm";
import {useAppDispatch} from "../../app/hooks";
import {fetchAllCategories} from "../../store/CategoriesThunks";

const NewTransaction = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  return (
    <div className="text-center pt-5">
      <h4 className="text-uppercase">Create transaction</h4>
      <TransactionForm/>
    </div>
  );
};

export default NewTransaction;