import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {ApiTransaction, TransactionMutationType} from "../../types";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectCategories} from "../../store/CategoriesSlice";
import {createTransaction, updateOneTransaction} from "../../store/TransactionsThunks";
import {selectCreateTransactionLoading} from "../../store/TransactionsSlice";
import ButtonSpinner from "../ButtonSpinner/ButtonSpinner";
import {useNavigate} from "react-router-dom";

interface TransactionFormProps {
  existingTransaction?: ApiTransaction;
  id?: string;
}

const NOW = new Date();

const TransactionForm: React.FC<TransactionFormProps> = ({existingTransaction, id}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const categories = useAppSelector(selectCategories);
  const createLoading = useAppSelector(selectCreateTransactionLoading);
  const initialState: TransactionMutationType = existingTransaction ? {
    category: existingTransaction.category,
    amount: existingTransaction.amount.toString(),
    createdAt: existingTransaction.createdAt
  } : {
    category: "",
    amount: "",
    createdAt: NOW.toISOString(),
  };
  let existingType = "";

  if (existingTransaction) {
    categories.forEach(category => {
      if (category.id === existingTransaction.category) {
        existingType = category.type;
      }
    })
  }

  const [type, setType] = useState(existingType);
  const [transactionInfo, setTransactionInfo] = useState<TransactionMutationType>(initialState);

  const filteredCategoriesByType = categories.filter(category => category.type === type);

  const onTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value);
  };

  const onCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const {name, value} = e.target;
    setTransactionInfo(prevState => ({...prevState, [name]: value}));
  };

  const onAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setTransactionInfo(prevState => ({...prevState, [name]: value}));
  };

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (id) {
      await dispatch(updateOneTransaction({
        id: id,
        transaction: {...transactionInfo, amount: parseFloat(transactionInfo.amount)}
      }));
    } else {
      await dispatch(createTransaction({...transactionInfo, amount: parseFloat(transactionInfo.amount)}));
    }
    navigate("/");
  };

  return (
    <Form onSubmit={onFormSubmit}>
      <Form.Group>
        <Form.Label>Type</Form.Label>
        <Form.Select name="type" value={type} onChange={onTypeChange}>
          <option hidden>Choose a type</option>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mt-3">
        <Form.Label>Category</Form.Label>
        <Form.Select name="category" value={transactionInfo.category} onChange={onCategoryChange}>
          <option hidden>Choose a category</option>
          {filteredCategoriesByType.map(category => {
            return <option key={category.id} value={category.id}>{category.title}</option>
          })}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mt-3">
        <Form.Label>Amount</Form.Label>
        <Form.Control type="number" name="amount" value={transactionInfo.amount} onChange={onAmountChange}/>
      </Form.Group>
      <Form.Group className="mt-4">
        <Button
          type="submit"
          disabled={createLoading}
        >
          {createLoading ? <ButtonSpinner/> : <i className="bi bi-plus-circle-fill"></i>}
        </Button>
      </Form.Group>
    </Form>
  );
};

export default TransactionForm;