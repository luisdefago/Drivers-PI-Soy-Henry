import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./detail.css";

const Detail = () => {
  const { id } = useParams();
  const [driver, setDriver] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:3001/drivers/driverById/${id}`)
      .then(({ data }) => {
        if (!data || data.length === 0) {
          setError("No se encontró ningún conductor con ese ID");
        } else {
          if (Array.isArray(data[0])) {
            setDriver(data[0][0]);
          } else {
            setDriver(data);
          }
        }
      })
      .catch((error) => {
        console.error("Error al obtener detalles del conductor:", error);
        setError("Hubo un error al obtener detalles del conductor");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <main className="detailPage">
        <img
          className="detailCarga"
          src="/assets/auto-f1.png"
          alt="Cargando..."
        />
      </main>
    );
  }

  if (error) {
    return (
      <main className="detailPage">
        <p>Error: {error}</p>
      </main>
    );
  }

  console.log(driver);

  return (
    <main className="detailPage">
      <section className="detail">
        <div className="detailInfImg">
          <div className="detailConteinInf">
            <div className="detailContName">
              <h3 className="detailName">
                Nombre: {driver?.name?.forename || driver?.forename}
              </h3>
              <h3 className="detailName">
                Apellido: {driver?.name?.surname || driver?.surname}
              </h3>
            </div>
            <p className="detailInf">Teams: {driver?.teams}</p>
            <p className="detailInf">Nationality: {driver?.nationality}</p>
            <p className="detailInf">Dob: {driver?.dob}</p>
            <p className="detailInf">Id: {driver?.id}</p>
          </div>
          <div className="det-cont-img">
            <img
              className="detailImg detail-img"
              src={driver?.image?.url || driver?.image}
              alt={`${driver?.name?.forename} ${driver?.name?.surname}`}
            />
          </div>
        </div>
        {driver?.description && (
          <p className="detailDescrip">Description: {driver?.description}</p>
        )}
      </section>
    </main>
  );
};

export default Detail;
