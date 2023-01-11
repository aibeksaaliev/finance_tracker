import React from 'react';
import {Button, Card} from "react-bootstrap";
import dayjs from "dayjs";
import {useNavigate} from "react-router-dom";
import {ExtendedTransactionType} from "../../types";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {deleteOneTransaction, fetchAllTransactions} from "../../store/TransactionsThunks";
import {selectTransactionDeleteLoading} from "../../store/TransactionsSlice";
import ButtonSpinner from "../ButtonSpinner/ButtonSpinner";

interface TransactionCardProps {
  transaction: ExtendedTransactionType;
}

const TransactionCard: React.FC<TransactionCardProps> = ({transaction}) => {
  const dispatch = useAppDispatch();
  const deleteLoading = useAppSelector(selectTransactionDeleteLoading);
  const navigate = useNavigate();

  const editTransaction = async (id: string) => {
    navigate("/edit-transaction/" + id);
  };

  const deleteTransaction = async (id: string) => {
    await dispatch(deleteOneTransaction(id));
    await dispatch(fetchAllTransactions());
  };

  return (
    <Card className="mb-1">
      <Card.Body className="d-flex flex-row align-items-center px-1">
        <Card.Text
          className="m-0 w-25 text-capitalize"
        >
          {dayjs(transaction.createdAt).format('DD.MM.YYYY HH:mm')}
        </Card.Text>
        <div className="w-50 d-flex justify-content-between align-items-center">
          <Card.Text className="m-0 w-25 text-capitalize">{transaction.categoryTitle}</Card.Text>
          <Card.Text className="m-0 w-25 text-capitalize text-center text-white">
            <b className={transaction.type === "income" ? "d-block bg-success rounded" : "d-block bg-danger rounded"}>
              {transaction.type === "income" ? "+" : "-"}
              {transaction.amount} KGS
            </b>
          </Card.Text>
        </div>
        <div className="w-25 d-flex justify-content-around">
          <Button
            disabled={deleteLoading ? deleteLoading === transaction.transactionId : false}
            onClick={() => editTransaction(transaction.transactionId)}
          >
            <i className="bi bi-pencil-square"></i>
          </Button>
          <Button
            variant="danger"
            onClick={() => deleteTransaction(transaction.transactionId)}
            disabled={deleteLoading ? deleteLoading === transaction.transactionId : false}
          >
            {deleteLoading === transaction.transactionId ? <ButtonSpinner/> : <i className="bi bi-trash3-fill"></i>}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TransactionCard;