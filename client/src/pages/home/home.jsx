import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/card/card";
import "./home.css";
import { fetchDrivers, setPage } from "../../redux/actions/actionsCreators";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const drivers = useSelector((state) => state.drivers);
  const currentPage = useSelector((state) => state.currentPage);
  const driversPerPage = useSelector((state) => state.driversPerPage);

  useEffect(() => {
    if (drivers.length === 0) {
      dispatch(fetchDrivers())
        .then(() => setLoading(false))
        .catch((error) =>
          console.error("Error al cargar los conductores:", error)
        );
    } else {
      setLoading(false);
    }
  }, [drivers, dispatch]);

  // Calcula los índices de inicio y fin para la paginación
  const startIndex = (currentPage - 1) * driversPerPage;
  const endIndex = startIndex + driversPerPage;

  return (
    <main className="home">
      <section className="homeCards">
        {loading ? (
          <img
            className="detailCarga"
            src="/assets/auto-f1.png"
            alt="Loading..."
          />
        ) : (
          drivers
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
          disabled={endIndex >= drivers.length}
          className="homePaginationButton"
        >
          Next
        </button>
        <button
          onClick={() =>
            dispatch(setPage(Math.ceil(drivers.length / driversPerPage)))
          }
          disabled={endIndex >= drivers.length}
          className="homePaginationButton"
        >
          Last
        </button>
      </div>
    </main>
  );
};

export default Home;
