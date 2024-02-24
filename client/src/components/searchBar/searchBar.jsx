import { useState } from "react";
import "./searchBar.css";
import { useDispatch } from "react-redux";
import { searchDrivers } from "../../redux/actions/actionsCreators";

export default function SearchBar() {
  const [name, setName] = useState("");
  const dispatch = useDispatch(); // Obtén la función dispatch del store

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const search = () => {
    if (name.trim() !== "") {
      // Dispatch de la acción searchDrivers con el nombre como argumento
      dispatch(searchDrivers(name));
      setName("");
    }
  };

  return (
    <div className="searchBar">
      <input
        type="search"
        onChange={handleChange}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            search();
          }
        }}
        placeholder="Enter a name"
        value={name}
        className="searchInput"
      />
      <button className="searchButton" onClick={search}>
        Search
      </button>
    </div>
  );
}
