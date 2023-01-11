import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {ApiCategory} from "../../types";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {createCategory, fetchAllCategories, updateOneCategory} from "../../store/CategoriesThunks";
import {useNavigate} from "react-router-dom";
import {selectCreateLoading} from "../../store/CategoriesSlice";
import ButtonSpinner from "../ButtonSpinner/ButtonSpinner";

interface CategoriesFormProps {
  existingCategory?: ApiCategory;
  id?: string;
}

const CategoriesForm: React.FC<CategoriesFormProps> = ({existingCategory, id}) => {
  const dispatch = useAppDispatch();
  const createLoading = useAppSelector(selectCreateLoading);
  const navigate = useNavigate();
  const initialState: ApiCategory = existingCategory ? existingCategory : {
    type: "",
    title: ""
  };
  const [categoryInfo, setCategoryInfo] = useState<ApiCategory>(initialState);

  const onTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const {name, value} = e.target;
    setCategoryInfo(prevState => ({...prevState, [name]: value}));
  };

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setCategoryInfo(prevState => ({...prevState, [name]: value}));
  };

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (id) {
      await dispatch(updateOneCategory({id: id, category: categoryInfo}));
    } else {
      await dispatch(createCategory(categoryInfo));
    }
    await dispatch(fetchAllCategories());
    setCategoryInfo(initialState);
    navigate("/categories");
  };

  return (
    <>
      <Form className="text-center mt-3" onSubmit={onFormSubmit}>
        <Form.Group>
          <Form.Label>Category type</Form.Label>
          <Form.Select
            name="type"
            value={categoryInfo.type}
            onChange={onTypeChange}
            required
          >
            <option value="" hidden>Choose a type</option>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label>Category name</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={categoryInfo.title}
            onChange={onTitleChange}
            required/>
        </Form.Group>
        <Form.Group className="mt-4">
          <Button
            type="submit"
            disabled={createLoading}
          >
            {createLoading ? <ButtonSpinner/> : <i className="bi bi-file-earmark-plus"></i>}
          </Button>
        </Form.Group>
      </Form>
    </>
  );
};

export default CategoriesForm;