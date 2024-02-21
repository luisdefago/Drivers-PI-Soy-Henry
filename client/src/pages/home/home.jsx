import Card from "../../components/card/card";

const Home = ({ drivers }) => {
  console.log(drivers);
  return (
    <div>
      {drivers.map(({ id, name, teams, image }) => (
        <Card
          key={id}
          name={`${name.forename} ${name.surname}`}
          image={image.url}
          teams={teams}
        />
      ))}
    </div>
  );
};

export default Home;
