import { Link } from "react-router-dom";
import SearchBar from "../searchBar/searchBar";
import "./nav.css";

const Nav = ({ onSearch }) => {
  return (
    <header className="header">
      <nav className="nav">
        <div className="navButtons">
          <Link to={"/home"}>
            <button className="navButton">Home</button>
          </Link>
          <Link to={"/form"}>
            <button className="navButton">Create</button>
          </Link>
        </div>
        <div className="navSearch">
          <SearchBar onSearch={onSearch} />
        </div>
      </nav>
    </header>
  );
};

export default Nav;
