import axios from "axios";
import {
  FETCH_DRIVERS,
  SEARCH_DRIVERS,
  FETCH_DRIVER_BY_ID,
  PAGINATE,
  ORDER_DOB,
  ORDER_NAME,
  FILTER,
  CREATE_DRIVER_REQUEST,
  CREATE_DRIVER_SUCCESS,
  CREATE_DRIVER_FAILURE,
} from "./actionsTypes";

export const mergeDriversWithFilter = (
  filteredDrivers,
  newDrivers,
  selectedOrder,
  selectedDirection
) => {
  const mergedDrivers = [...filteredDrivers];
  newDrivers.forEach((driver) => {
    if (
      !filteredDrivers.some((existingDriver) => existingDriver.id === driver.id)
    ) {
      mergedDrivers.push(driver);
    }
  });
  return sortDrivers(mergedDrivers, selectedOrder, selectedDirection);
};

export const fetchDriverById = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:3001/drivers/driverById/${id}`
      );
      const data = response.data;

      if (Array.isArray(data) && data.length > 0) {
        dispatch({
          type: FETCH_DRIVER_BY_ID,
          payload: data[0][0],
        });
      } else if (typeof data === "object") {
        dispatch({
          type: FETCH_DRIVER_BY_ID,
          payload: data,
        });
      } else {
        console.error("Error: Respuesta de servidor inesperada");
      }
    } catch (error) {
      console.error("Error al obtener detalles del conductor:", error);
    }
  };
};

export const searchDrivers = (name) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:3001/drivers/driverByName/name?name=${name}`
      );
      const { data } = response;
      const currentState = getState();

      if (!Array.isArray(data) || data.length === 0) {
        return;
      }

      const filteredDrivers = data.filter((driver) => {
        return !currentState.drivers.some(
          (existingDriver) => existingDriver.id === driver.id
        );
      });

      if (filteredDrivers.length === 0) {
        return;
      }

      dispatch({
        type: SEARCH_DRIVERS,
        payload: filteredDrivers,
      });
    } catch (error) {
      console.error("Error al buscar conductores:", error);
      alert("No drivers were found with that name. You can try creating one.");
    }
  };
};

export const searchDriverByName = (name) => {
  return async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:3001/drivers/driverByName/name?name=${name}`
      );
      const { data } = response;

      if (!Array.isArray(data) || data.length === 0) {
        return null;
      }

      return data[0];
    } catch (error) {
      console.error("Error al buscar conductor por nombre:", error);
      return null;
    }
  };
};

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
  return {
    type: PAGINATE,
    payload: { page, driversPerPage },
  };
};

export const setOrderName = (direction) => {
  return {
    type: ORDER_NAME,
    payload: direction,
  };
};

export const setOrderDob = (direction) => {
  return {
    type: ORDER_DOB,
    payload: direction,
  };
};

export const setFilter = (filters) => {
  return {
    type: FILTER,
    payload: filters,
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

export const createDriverRequest = (driverData) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_DRIVER_REQUEST });
    try {
      await axios.post("http://127.0.0.1:3001/drivers/addDriver", driverData);
      dispatch({ type: CREATE_DRIVER_SUCCESS });
    } catch (error) {
      dispatch({ type: CREATE_DRIVER_FAILURE, payload: error.message });
    }
  };
};
