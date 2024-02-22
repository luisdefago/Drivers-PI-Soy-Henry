import { useState } from "react";
import "./searchBar.css";

export default function SearchBar({ onSearch }) {
  const [name, setName] = useState("");
  function handleChange(evento) {
    setName(evento.target.value);
  }
  function search() {
    if (name.trim() !== "") {
      onSearch(name);
      setName("");
    }
  }

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
        placeholder="Enter an name"
        value={name}
        className="searchInput"
      />
      <button className="searchButton" onClick={search}>
        Add
      </button>
    </div>
  );
}
