import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/card/card";
import "./home.css";
import {
  fetchDrivers,
  setFilter,
  setOrderDob,
  setOrderName,
  setPage,
} from "../../redux/actions/actionsCreators";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState("name");
  const [selectedDirection, setSelectedDirection] = useState("ASC");
  const dispatch = useDispatch();
  const drivers = useSelector((state) => state.drivers);
  const filteredDrivers = useSelector((state) => state.filteredDrivers);
  const currentPage = useSelector((state) => state.currentPage);
  const driversPerPage = useSelector((state) => state.driversPerPage);

  const [filterstate, setFilterstate] = useState({
    teams: "all",
    origin: "all",
  });

  // Para ordenar los conductores cuando cambie la orden o la dirección
  useEffect(() => {
    if (selectedOrder === "name") {
      dispatch(setOrderName(selectedDirection));
    } else if (selectedOrder === "dob") {
      dispatch(setOrderDob(selectedDirection));
    }
  }, [dispatch, selectedOrder, selectedDirection]);

  useEffect(() => {
    setFilterstate({
      ...filterstate,
      origin: "all",
    });
  }, [drivers]);

  // Para cargar los conductores cuando cambie la orden o la dirección
  useEffect(() => {
    dispatch(fetchDrivers())
      .then(() => setLoading(false))
      .catch((error) =>
        console.error("Error al cargar los conductores:", error)
      );
  }, [dispatch]);

  useEffect(() => {
    dispatch(setFilter(filterstate));
  }, [dispatch, filterstate]);

  const startIndex = (currentPage - 1) * driversPerPage;
  const endIndex = startIndex + driversPerPage;

  const handleOrderChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOrder(selectedValue);
  };

  const handleFilter = (event) => {
    const { name, value } = event.target;
    setFilterstate({
      ...filterstate,
      [name]: value,
    });
  };

  const handleDirectionChange = (event) => {
    const selectedDirection = event.target.value;
    setSelectedDirection(selectedDirection);
  };

  return (
    <main className="home">
      <div className="homeOrder">
        <div className="homeConteinerSelect">
          <select
            value={selectedOrder}
            onChange={handleOrderChange}
            className="homeOrderSelect"
          >
            <option className="homeOrderOption" value="name">
              Order by Name
            </option>
            <option className="homeOrderOption" value="dob">
              Order by Date of Birth
            </option>
          </select>
          <select
            value={selectedDirection}
            onChange={handleDirectionChange}
            className="homeOrderSelect"
          >
            <option value="ASC">Ascending</option>
            <option value="DESC">Descending</option>
          </select>
        </div>
        <div className="homeConteinerSelect">
          <label className="homeOrderLabel">Por Origen : </label>
          <select
            value={filterstate.origin}
            name="origin"
            onChange={handleFilter}
            className="homeOrderSelect"
          >
            <option value="all">All</option>
            <option value="DB">My Drivers</option>
            <option value="API">Original Drivers</option>
          </select>
        </div>
      </div>
      <section className="homeCards">
        {loading ? (
          <img
            className="detailCarga"
            src="/assets/auto-f1.png"
            alt="Loading..."
          />
        ) : (
          filteredDrivers
            .slice(startIndex, endIndex)
            .map((driver) => (
              <Card
                key={driver.id}
                id={driver.id}
                name={
                  driver.name
                    ? `${driver.name.forename} ${driver.name.surname}`
                    : `${driver.forename} ${driver.surname}`
                }
                image={driver.image.url ? driver.image.url : driver.image}
                teams={
                  Array.isArray(driver?.Teams)
                    ? driver?.Teams.map((team) => team.name).join(", ")
                    : driver?.teams
                }
              />
            ))
        )}
      </section>
      {filteredDrivers.length > driversPerPage && (
        <div className="homePagination">
          <button
            onClick={() => dispatch(setPage(1))}
            disabled={currentPage === 1}
            className="homePaginationButton"
          >
            First
          </button>
          <button
            onClick={() => dispatch(setPage(currentPage - 1))}
            disabled={currentPage === 1}
            className="homePaginationButton"
          >
            Previous
          </button>
          <span className="homePaginationsSpan">{currentPage}</span>
          <button
            onClick={() => dispatch(setPage(currentPage + 1))}
            disabled={endIndex >= filteredDrivers.length}
            className="homePaginationButton"
          >
            Next
          </button>
          <button
            onClick={() =>
              dispatch(
                setPage(Math.ceil(filteredDrivers.length / driversPerPage))
              )
            }
            disabled={endIndex >= filteredDrivers.length}
            className="homePaginationButton"
          >
            Last
          </button>
        </div>
      )}
    </main>
  );
};

export default Home;
