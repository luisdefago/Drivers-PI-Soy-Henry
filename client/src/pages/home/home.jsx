import { useEffect } from "react";
import Card from "../../components/card/card";
import "./home.css";

const Home = ({ drivers, fetchDrivers }) => {
  useEffect(() => {
    if (drivers.length === 0) {
      fetchDrivers();
    }
  }, [drivers, fetchDrivers]);

  return (
    <main className="home">
      <section className="homeCards">
        {drivers.map((driver) =>
          drivers.length === 0 ? (
            <img
              className="detailCarga"
              src="/assets/auto-f1.png"
              alt="Loading..."
            />
          ) : (
            <Card
              key={driver.id}
              id={driver.id}
              name={
                driver.name
                  ? `${driver.name.forename} ${driver.name.surname}`
                  : `${driver.forename} ${driver.surname}`
              }
              image={driver.image.url ? driver.image.url : driver.image}
              teams={driver.teams}
            />
          )
        )}
      </section>
    </main>
  );
};

export default Home;
