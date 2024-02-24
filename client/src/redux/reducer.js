import {
  FETCH_DRIVERS,
  FETCH_DRIVER_BY_ID,
  SEARCH_DRIVERS,
} from "./actions/actionsTypes";

const initialState = {
  drivers: [],
  driver: null,
  loading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_DRIVERS:
      // Combinar los conductores existentes con los resultados de la búsqueda
      return {
        ...state,
        drivers: [...action.payload, ...state.drivers],
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
    default:
      return state;
  }
};

export default reducer;
