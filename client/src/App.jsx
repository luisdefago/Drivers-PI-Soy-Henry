import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Landing from "./pages/landingPage/landingPage";
import Nav from "./components/nav/nav";
import Home from "./pages/home/home";
import { useState } from "react";
import axios from "axios";
import Detail from "./pages/detail/detail";

function App() {
  const [drivers, setDrivers] = useState([]);
  const { pathname } = useLocation();

  const onSearch = async (name) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:3001/drivers/driverByName/name?name=${name}`
      );
      const { data } = response;
      if (!data.length) {
        console.log("No se encontraron conductores con este nombre.");
      } else {
        // Filtrar los conductores nuevos para evitar duplicados
        const filteredData = data.filter((newDriver) => {
          return !drivers.some(
            (existingDriver) => existingDriver.id === newDriver.id
          );
        });

        // Agregar los conductores filtrados al estado
        setDrivers((oldDrivers) => [...filteredData, ...oldDrivers]);
      }
    } catch (error) {
      console.error("Error al buscar conductores:", error);
      alert(
        "Hubo un error al buscar conductores. Por favor, inténtalo de nuevo más tarde."
      );
    }
  };

  return (
    <div className="App">
      {pathname !== "/" && <Nav onSearch={onSearch} />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="home" element={<Home drivers={drivers} />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
