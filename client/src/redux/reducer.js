import { sortDrivers } from "./actions/actionsCreators";
import {
  FETCH_DRIVERS,
  FETCH_DRIVER_BY_ID,
  ORDER_DOB,
  ORDER_NAME,
  PAGINATE,
  SEARCH_DRIVERS,
} from "./actions/actionsTypes";

const initialState = {
  drivers: [],
  driver: {},
  loading: false,
  error: null,
  currentPage: 1,
  driversPerPage: 9,
  selectedOrder: "name", // Estado para el tipo de ordenamiento seleccionado
  selectedDirection: "ASC", // Estado para el orden ascendente/descendente
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_DRIVERS:
      const filteredDrivers = action.payload.filter((driver) =>
        state.drivers.every((existingDriver) => existingDriver.id !== driver.id)
      );
      const orderedFilteredDrivers = sortDrivers(
        filteredDrivers,
        state.selectedOrder,
        state.selectedDirection
      );
      return {
        ...state,
        drivers: [...orderedFilteredDrivers, ...state.drivers],
      };
    case FETCH_DRIVERS:
      return {
        ...state,
        drivers: action.payload,
      };
    case FETCH_DRIVER_BY_ID:
      return {
        ...state,
        driver: action.payload,
        loading: false,
        error: null,
      };
    case PAGINATE:
      return {
        ...state,
        currentPage: action.payload.page,
        driversPerPage: action.payload.driversPerPage,
      };
    case ORDER_NAME:
      return {
        ...state,
        selectedOrder: "name",
        selectedDirection: action.payload,
        drivers: sortDrivers(state.drivers, "name", action.payload),
      };
    case ORDER_DOB:
      return {
        ...state,
        selectedOrder: "dob",
        selectedDirection: action.payload,
        drivers: sortDrivers(state.drivers, "dob", action.payload),
      };
    default:
      return state;
  }
};

export default reducer;
