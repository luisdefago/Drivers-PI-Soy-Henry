import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./detail.css";

const Detail = () => {
  const { id } = useParams();
  const [driver, setDriver] = useState([]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:3001/drivers/driverById/${id}`)
      .then(({ data }) => {
        if (!data || data.length === 0) {
          alert("No hay conductor con ese ID");
          setDriver([]);
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
    <main className="detailPage">
      {driver.length === 0 ? (
        <p className="detailCarga">Cargando...</p>
      ) : (
        <section className="detail">
          <div className="detailInfImg">
            <div className="detailConteinInf">
              <div className="detailContName">
                <h3 className="detailName">
                  Nombre: {driver[0][0]?.name?.forename}
                </h3>
                <h3 className="detailName">
                  Apellido: {driver[0][0]?.name?.surname}
                </h3>
              </div>
              <p className="detailInf">Teams: {driver[0][0]?.teams}</p>
              <p className="detailInf">
                Nationality: {driver[0][0]?.nationality}
              </p>
              <p className="detailInf">Dob: {driver[0][0]?.dob}</p>
              <p className="detailInf">Id: {driver[0][0]?.id}</p>
            </div>
            <div className="det-cont-img">
              <img
                className="detailImg detail-img"
                src={driver[0][0]?.image?.url}
                alt={`${driver[0][0]?.name?.forename} ${driver[0][0]?.name?.surname}`}
              />
            </div>
          </div>
          {driver[0][0]?.description ? (
            <p className="detailDescrip">
              Description: {driver[0][0]?.description}
            </p>
          ) : null}
        </section>
      )}
    </main>
  );
};

export default Detail;
