import axios from "axios";
import {
  FETCH_DRIVERS,
  SEARCH_DRIVERS,
  FETCH_DRIVER_BY_ID,
} from "./actionsTypes";

// Función creadora de acción para buscar conductores por id
export const fetchDriverById = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:3001/drivers/driverById/${id}`
      );
      const data = response.data;

      // Si data es un array y tiene al menos un elemento
      if (Array.isArray(data) && data.length > 0) {
        dispatch({
          type: FETCH_DRIVER_BY_ID,
          payload: data[0][0],
        });
      } else if (!Array.isArray(data) && typeof data === "object") {
        // Si data es un objeto
        dispatch({
          type: FETCH_DRIVER_BY_ID,
          payload: data, // Tomar el objeto directamente
        });
      } else {
        console.error("Error: Respuesta de servidor inesperada");
      }
    } catch (error) {
      console.error("Error al obtener detalles del conductor:", error);
    }
  };
};

// Función creadora de acción para buscar conductores por nombre
export const searchDrivers = (name) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:3001/drivers/driverByName/name?name=${name}`
      );
      const { data } = response;
      if (!data.length) {
        console.log("No se encontraron conductores con este nombre.");
      } else {
        dispatch({
          type: SEARCH_DRIVERS,
          payload: data,
        });
      }
    } catch (error) {
      console.error("Error al buscar conductores:", error);
      alert(
        "Hubo un error al buscar conductores. Por favor, inténtalo de nuevo más tarde."
      );
    }
  };
};

// Función creadora de acción para cargar conductores
export const fetchDrivers = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:3001/drivers/AllDrivers"
      );
      const data = response.data.slice(0, 3);
      dispatch({
        type: FETCH_DRIVERS,
        payload: data,
      });
    } catch (error) {
      console.error("Error al cargar los drivers:", error);
    }
  };
};
