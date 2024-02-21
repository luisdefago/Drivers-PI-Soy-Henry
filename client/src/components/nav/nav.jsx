import SearchBar from "../searchBar/searchBar";
import "./nav.css";

const Nav = ({ onSearch }) => {
  return (
    <header className="header">
      <nav>
        <div>
          <button>Home</button>
          <button>About me</button>
        </div>
        <div>
          <SearchBar onSearch={onSearch} />
        </div>
      </nav>
    </header>
  );
};

export default Nav;
