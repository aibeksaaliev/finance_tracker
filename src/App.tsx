import React from 'react';
import Layout from "./components/Layout/Layout";
import {Route, Routes} from "react-router-dom";
import Categories from "./containers/Categories/Categories";
import NewCategory from "./containers/Categories/NewCategory";
import EditCategory from "./containers/Categories/EditCategory";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/categories" element={(
            <Categories/>
          )}/>
          <Route path="/categories/new-category" element={(
            <NewCategory/>
          )}/>
          <Route path="/categories/edit-category/:id" element={(
            <EditCategory/>
          )}/>
        </Routes>
      </Layout>
    </>
  );
}

export default App;
