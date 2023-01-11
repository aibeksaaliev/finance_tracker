import React from 'react';
import {Button, Modal} from "react-bootstrap";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {
  closeModal,
  confirmDelete,
  selectDeleteStatus,
  selectModalTransactionStatus, selectTransactions
} from "../../store/TransactionsSlice";
import {deleteOneTransaction, fetchAllTransactions} from "../../store/TransactionsThunks";
import {useLocation} from "react-router-dom";
import {deleteOneCategory, fetchAllCategories} from "../../store/CategoriesThunks";

interface ModalConfirmProps {
  id: string;
}

const ModalConfirm: React.FC<ModalConfirmProps> = ({id}) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const modalStatus = useAppSelector(selectModalTransactionStatus);
  const confirmStatus = useAppSelector(selectDeleteStatus);
  const transactions = useAppSelector(selectTransactions);

  const deleteCard = async () => {
    dispatch(confirmDelete());
    if (confirmStatus) {
      dispatch(closeModal());
      if (location.pathname === "/") {
        await dispatch(deleteOneTransaction(id));
        await dispatch(fetchAllTransactions());
      } else {
        await dispatch(deleteOneCategory(id));
        transactions.forEach(transaction => {
          if (transaction.categoryId === id) {
            dispatch(deleteOneTransaction(transaction.transactionId));
          }
        })
        await dispatch(fetchAllCategories());
        await dispatch(fetchAllTransactions());
      }
    }

  };

  return (
    <Modal show={modalStatus}>
      <Modal.Header>
        <Modal.Title className="m-auto text-uppercase">Attention</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        Do you really want to delete the transaction?
      </Modal.Body>
      <Modal.Footer className="d-flex flex-row justify-content-center">
        <Button variant="secondary" onClick={() => dispatch(closeModal())}>Close</Button>
        <Button variant="danger" onClick={deleteCard}>Delete</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalConfirm;