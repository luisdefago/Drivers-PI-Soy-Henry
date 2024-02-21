import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();
  const [driver, setDriver] = useState({});

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:3001/drivers/driverById/${id}`)
      .then(({ data }) => {
        if (!data) {
          alert("No hay conductor con ese ID");
          setDriver({});
        } else {
          setDriver(data);
        }
      })
      .catch((error) => {
        console.error("Error al obtener detalles del conductor:", error);
        alert("Hubo un error al obtener detalles del conductor.");
      });
  }, [id]);

  console.log(driver);

  return (
    <div>
      <h2>Detalles del Conductor</h2>
      {/* <p>Nombre: {driver.forename}</p>
      <p>Apellido: {driver.surname}</p> */}
      {/* Agrega más detalles del conductor aquí */}
    </div>
  );
};

export default Detail;
