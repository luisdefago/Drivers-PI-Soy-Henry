import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/card/card";
import "./home.css";
import { fetchDrivers } from "../../redux/actions/actionsCreators";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const drivers = useSelector((state) => state.drivers);

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
          drivers.map((driver) => (
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
    </main>
  );
};

export default Home;
