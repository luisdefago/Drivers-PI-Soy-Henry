import {
  FETCH_DRIVERS,
  FETCH_DRIVER_BY_ID,
  ORDER,
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
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_DRIVERS:
      // Filtrar conductores duplicados antes de agregar nuevos conductores
      const newDrivers = action.payload.filter((driver) =>
        state.drivers.every((existingDriver) => existingDriver.id !== driver.id)
      );
      return {
        ...state,
        drivers: [...newDrivers, ...state.drivers],
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
    case ORDER:
      const { type, direction } = action.payload;
      let orderedDrivers = [...state.drivers];
      if (type === "name") {
        orderedDrivers.sort((a, b) => {
          const nameA = `${a.name?.forename || a.forename || ""} ${
            a.name?.surname || a.surname || ""
          }`;
          const nameB = `${b.name?.forename || b.forename || ""} ${
            b.name?.surname || b.surname || ""
          }`;
          const comparison = nameA.localeCompare(nameB);
          // Si los nombres son iguales, compara por apellidos
          if (comparison === 0) {
            const surnameA = a.name?.surname || a.surname || "";
            const surnameB = b.name?.surname || b.surname || "";
            return direction === "ASC"
              ? surnameA.localeCompare(surnameB)
              : surnameB.localeCompare(surnameA);
          }
          return direction === "ASC" ? comparison : -comparison;
        });
      } else if (type === "dob") {
        orderedDrivers.sort((a, b) => {
          const dobA = new Date(a.dob);
          const dobB = new Date(b.dob);
          return direction === "ASC" ? dobA - dobB : dobB - dobA;
        });
      }

      return {
        ...state,
        drivers: orderedDrivers,
      };
    default:
      return state;
  }
};

export default reducer;
