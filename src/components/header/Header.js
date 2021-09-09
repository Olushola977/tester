import { Link } from "react-router-dom";
import './Header.css';

/**
 * Header Component
 */

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="#">
          Restaurant
        </Link>
        <div>
          <ul className="ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/ordersummary">
                Cart
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/userprofile">
                Profile
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
