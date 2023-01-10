import React, {useEffect} from 'react';
import CategoriesForm from "../../components/CategoriesForm/CategoriesForm";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {useParams} from "react-router-dom";
import {fetchOneCategory} from "../../store/CategoriesThunks";
import {selectCategory, selectFormLoading} from "../../store/CategoriesSlice";
import LoadSpinner from "../../components/LoadSpinner/LoadSpinner";

const NewCategory = () => {
  const dispatch = useAppDispatch();
  const formLoading = useAppSelector(selectFormLoading);
  const existingCategory = useAppSelector(selectCategory);
  const {id} = useParams() as {id: string};

  useEffect(() => {
    dispatch(fetchOneCategory(id));
  }, [dispatch]);

  return (
    <div className="text-center pt-5">
      <h4 className="text-uppercase">Edit category</h4>
      {formLoading ? <LoadSpinner/> : <CategoriesForm existingCategory={existingCategory!} id={id}/>}
    </div>
  );
};

export default NewCategory;