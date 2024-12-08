import "./navbar.css";
import { Link } from "react-router";

const NavBar = () => {
  return (
    <div id="navbar">
      <div className="nav-items">
        <Link to="/home">Home</Link>
      </div>
      <div className="nav-items">
        <Link to="/about">About</Link>
      </div>
      <div className="nav-items">
        <h2>SORTING VISUALIZER</h2>
      </div>
    </div>
  );
};

export default NavBar;
