import Card from "../../components/card/card";
import "./home.css";

const Home = ({ drivers }) => {
  return (
    <main className="home">
      <section className="homeCards">
        {drivers.map((driver) => (
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
        ))}
      </section>
    </main>
  );
};

export default Home;
