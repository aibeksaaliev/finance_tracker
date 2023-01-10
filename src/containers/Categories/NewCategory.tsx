import React from 'react';
import CategoriesForm from "../../components/CategoriesForm/CategoriesForm";

const NewCategory = () => {
  return (
    <div className="text-center pt-5">
      <h4 className="text-uppercase">Create category</h4>
      <CategoriesForm/>
    </div>
  );
};

export default NewCategory;