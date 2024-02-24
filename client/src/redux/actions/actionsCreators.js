import axios from "axios";
import {
  FETCH_DRIVERS,
  SEARCH_DRIVERS,
  FETCH_DRIVER_BY_ID,
  PAGINATE,
  ORDER_DOB,
  ORDER_NAME,
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
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:3001/drivers/driverByName/name?name=${name}`
      );
      const { data } = response;
      const currentState = getState(); // Obtener el estado actual

      if (!data.length) {
        console.log("No se encontraron conductores con este nombre.");
      } else {
        // Filtrar los conductores para evitar duplicados
        const filteredDrivers = data.filter((driver) => {
          return !currentState.drivers.some(
            (existingDriver) => existingDriver.id === driver.id
          );
        });

        if (filteredDrivers.length === 0) {
          console.log("Todos los conductores ya están en la lista.");
        } else {
          dispatch({
            type: SEARCH_DRIVERS,
            payload: filteredDrivers,
          });
        }
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

export const setPage = (page, driversPerPage = 9) => {
  return async function (dispatch) {
    try {
      dispatch({
        type: PAGINATE,
        payload: { page, driversPerPage },
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const setOrderName = (direction) => {
  return async function (dispatch) {
    try {
      dispatch({
        type: ORDER_NAME,
        payload: direction,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const setOrderDob = (direction) => {
  return async function (dispatch) {
    try {
      dispatch({
        type: ORDER_DOB,
        payload: direction,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const sortDrivers = (drivers, selectedOrder, selectedDirection) => {
  let sortedDrivers = [...drivers];
  if (selectedOrder === "name") {
    sortedDrivers.sort((a, b) => {
      const nameA = `${a.name?.forename || a.forename || ""} ${
        a.name?.surname || a.surname || ""
      }`;
      const nameB = `${b.name?.forename || b.forename || ""} ${
        b.name?.surname || b.surname || ""
      }`;
      const comparison = nameA.localeCompare(nameB);
      return selectedDirection === "ASC" ? comparison : -comparison;
    });
  } else if (selectedOrder === "dob") {
    sortedDrivers.sort((a, b) => {
      const dobA = new Date(a.dob);
      const dobB = new Date(b.dob);
      return selectedDirection === "ASC" ? dobA - dobB : dobB - dobA;
    });
  }
  return sortedDrivers;
};
