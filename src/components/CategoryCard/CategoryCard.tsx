import React from 'react';
import {Button, Card} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {CategoryType} from "../../types";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {deleteOneCategory, fetchAllCategories} from "../../store/CategoriesThunks";
import {selectDeleteLoading} from "../../store/CategoriesSlice";
import ButtonSpinner from "../ButtonSpinner/ButtonSpinner";

interface CategoryCardProps {
  category: CategoryType;
}

const CategoryCard: React.FC<CategoryCardProps> = ({category}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const deleteLoading = useAppSelector(selectDeleteLoading);

  const editCategory = async (id: string) => {
    navigate("/categories/edit-category/" + id);
  };

  const removeCategory = async (id: string) => {
    await dispatch(deleteOneCategory(id));
    await dispatch(fetchAllCategories());
  };

  return (
    <Card className="mb-1">
      <Card.Body className="d-flex flex-row align-items-center px-1">
        <Card.Text className="m-0 w-50 text-capitalize">{category.title}</Card.Text>
        <Card.Text className="m-0 w-25 text-capitalize">{category.type}</Card.Text>
        <div className="w-25 d-flex justify-content-around">
          <Button
            disabled={deleteLoading ? deleteLoading === category.id : false}
            onClick={() => editCategory(category.id)}
          >
            <i className="bi bi-pencil-square"></i>
          </Button>
          <Button
            variant="danger"
            disabled={deleteLoading ? deleteLoading === category.id : false}
            onClick={() => removeCategory(category.id)}
          >
            {deleteLoading === category.id ? <ButtonSpinner/> : <i className="bi bi-trash3-fill"></i>}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CategoryCard;