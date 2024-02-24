import { Link } from "react-router-dom";
import SearchBar from "../searchBar/searchBar";
import "./nav.css";

const Nav = () => {
  return (
    <header className="header">
      <nav className="nav">
        <Link to={"/"}>
          <button className="navButton">Close</button>
        </Link>
        <div className="navButtons">
          <Link to={"/home"}>
            <button className="navButton">Home</button>
          </Link>
          <Link to={"/form"}>
            <button className="navButton">Create</button>
          </Link>
          <div className="navSearch">
            <SearchBar />
          </div>
        </div>
        <div></div>
      </nav>
    </header>
  );
};

export default Nav;
