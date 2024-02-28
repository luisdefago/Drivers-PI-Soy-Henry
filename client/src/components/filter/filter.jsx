// Filter.js
import { useState, useEffect } from "react";
import { setOrderDob, setOrderName } from "../../redux/actions/actionsCreators";
import { useDispatch } from "react-redux";

const Filter = ({ teams, handleFilter }) => {
  const [filterstate, setFilterstate] = useState({
    teams: "all",
    origin: "all",
  });
  const [selectedOrder, setSelectedOrder] = useState("name");
  const [selectedDirection, setSelectedDirection] = useState("ASC");
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "origin" || name === "teams") {
      setFilterstate({
        ...filterstate,
        [name]: value,
      });
    } else if (name === "order") {
      setSelectedOrder(value);
    } else if (name === "direction") {
      setSelectedDirection(value);
    }
  };

  useEffect(() => {
    handleFilter(filterstate);
  }, [filterstate]);

  useEffect(() => {
    if (selectedOrder === "name" || selectedOrder === "dob") {
      dispatch(
        selectedOrder === "name"
          ? setOrderName(selectedDirection)
          : setOrderDob(selectedDirection)
      );
    }
  }, [dispatch, selectedOrder, selectedDirection]);

  return (
    <div className="homeOrder">
      <div className="homeConteinerSelect">
        <select
          value={selectedOrder}
          name="order"
          onChange={handleChange}
          className="homeOrderSelect"
        >
          <option value="name">Order by Name</option>
          <option value="dob">Order by Date of Birth</option>
        </select>
        <select
          value={selectedDirection}
          name="direction"
          onChange={handleChange}
          className="homeOrderSelect"
        >
          <option value="ASC">Ascending</option>
          <option value="DESC">Descending</option>
        </select>
      </div>
      <div className="homeConteinerSelect">
        <label className="homeOrderLabel">Origin : </label>
        <select
          value={filterstate.origin}
          name="origin"
          onChange={handleChange}
          className="homeOrderSelect"
        >
          <option value="all">All</option>
          <option value="DB">My Drivers</option>
          <option value="API">Original Drivers</option>
        </select>
      </div>
      <div className="homeConteinerSelect borderRight">
        <label className="homeOrderLabel">Team : </label>
        <select
          value={filterstate.teams}
          onChange={handleChange}
          className="homeOrderSelect"
          name="teams"
        >
          <option value="all">All</option>
          {teams.map((team) => (
            <option key={team} value={team}>
              {team}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filter;
