import React , {Fragment} from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../reducers/actions/authAction";

const Navbar = ({auth:{isAuthenticated,loading},logout}) => {
  const guestLinks = () => (
    <ul>
      <li>
        <a href="profiles.html">Developers</a>
      </li>
      <li>
        <Link to="register">Register</Link>
      </li>
      <li>
        <Link to="login">Login</Link>
      </li>
    </ul>
  );

  const authLinks = () => (
    <ul>
      <li>
        <Link to='/posts'>Posts</Link>
      </li>
      <li>
        <Link to='/profiles'>Devlopers</Link>
      </li>
      <li>
        <Link to='/dashboard'>Dashboard</Link>
      </li>
        <li>
          <Link onClick={logout} to='/'>LogOut</Link>
        </li>
    </ul>
  )

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> DevConnector
        </Link>
      </h1>
      { !loading && (<Fragment>{isAuthenticated ? authLinks() : guestLinks() }</Fragment>)}
    </nav>
  );
};

const mapStateToProps = (state) => ({
  auth: state.register,
});

export default connect(mapStateToProps, { logout })(Navbar);
