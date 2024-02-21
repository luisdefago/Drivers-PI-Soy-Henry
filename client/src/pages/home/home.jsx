import Card from "../../components/card/card";
import "./home.css";

const Home = ({ drivers }) => {
  console.log(drivers);
  return (
    <main className="home">
      <section className="homeCards">
        {drivers.map(({ id, name, teams, image }) => (
          <Card
            key={id}
            id={id}
            name={`${name.forename} ${name.surname}`}
            image={image.url}
            teams={teams}
          />
        ))}
      </section>
    </main>
  );
};

export default Home;
