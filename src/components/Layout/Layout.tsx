import React, {PropsWithChildren} from 'react';
import {Container} from "react-bootstrap";
import {Link, NavLink} from "react-router-dom";

const Layout: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <>
      <header className="text-bg-dark">
        <Container className="d-flex align-items-center justify-content-between py-3 navbar navbar-dark">
          <h3 className="m-0"><NavLink to="/" className="text-decoration-none text-white">Finance Tracker</NavLink></h3>
          <div className="w-25 d-flex">
            <ul className="navbar-nav d-flex flex-row ms-auto">
              <li className="nav-item ms-4">
                <NavLink to="/categories" className="nav-link">Categories</NavLink>
              </li>
              <li className="nav-item ms-4">
                <Link to="/new-transaction" className="nav-link">Add</Link>
              </li>
            </ul>
          </div>
        </Container>
      </header>
      <main>
        <Container>
          {children}
        </Container>
      </main>
    </>
  );
};

export default Layout;