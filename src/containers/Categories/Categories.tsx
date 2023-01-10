import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchAllCategories} from "../../store/CategoriesThunks";
import {selectCategories, selectPageLoading} from "../../store/CategoriesSlice";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import LoadSpinner from "../../components/LoadSpinner/LoadSpinner";
import {Button} from "react-bootstrap";

const Categories = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const loading = useAppSelector(selectPageLoading);

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  let categoriesContent = (
    categories.map(category => {
      return <CategoryCard category={category} key={category.id}/>
    })
  );

  return (
    <>
      <div className="d-flex justify-content-between align-items-center py-2 my-2">
        <h5>Categories</h5>
        <Link to="/categories/new-category"><Button><i className="bi bi-plus-square"></i></Button></Link>
      </div>
      <div>
        {loading ? <LoadSpinner/> : categoriesContent}
      </div>
    </>
  );
};

export default Categories;