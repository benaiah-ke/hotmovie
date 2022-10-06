import * as React from 'react';
import { Link } from 'react-router-dom';

function NavBar(){
  return (
    <div className="navbar navbar-expand navbar-dark bg-primary">
        <div className="container-fluid">

            <Link to="/" className="navbar-brand">HotMovie</Link>

            <div className="ml-auto">
                <ul className="navbar-nav d-flex align-items-center">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Vote</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/results">Results</Link>
                    </li>
                </ul>
            </div>

        </div>
    </div>
  );
}

export default NavBar;
