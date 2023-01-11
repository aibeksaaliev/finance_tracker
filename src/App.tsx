import React from 'react';
import Layout from "./components/Layout/Layout";
import {Route, Routes} from "react-router-dom";
import Categories from "./containers/Categories/Categories";
import NewCategory from "./containers/Categories/NewCategory";
import EditCategory from "./containers/Categories/EditCategory";
import Transactions from "./containers/Transactions/Transactions";
import NewTransaction from "./containers/Transactions/NewTransaction";
import EditTransaction from "./containers/Transactions/EditTransaction";

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
          <Route path="/" element={(
            <Transactions/>
          )}/>
          <Route path="/new-transaction" element={(
            <NewTransaction/>
          )}/>
          <Route path="/edit-transaction/:id" element={(
            <EditTransaction/>
          )}/>
        </Routes>
      </Layout>
    </>
  );
}

export default App;
