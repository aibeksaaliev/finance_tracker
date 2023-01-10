import React from 'react';
import {Spinner} from "react-bootstrap";

const LoadSpinner = () => {
  return (
    <div className="text-center mt-5">
      <Spinner animation="grow" size="sm"/>
    </div>
  );
};

export default LoadSpinner;