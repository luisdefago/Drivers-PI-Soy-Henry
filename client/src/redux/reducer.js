import { mergeDriversWithFilter, sortDrivers } from "./actions/actionsCreators";
import {
  FETCH_DRIVERS,
  FETCH_DRIVER_BY_ID,
  FILTER,
  ORDER_DOB,
  ORDER_NAME,
  PAGINATE,
  SEARCH_DRIVERS,
} from "./actions/actionsTypes";

const initialState = {
  drivers: [],
  filteredDrivers: [],
  driver: {},
  loading: false,
  error: null,
  currentPage: 1,
  driversPerPage: 9,
  selectedOrder: "name",
  selectedDirection: "ASC",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_DRIVERS:
      const filteredDriversSearch = action.payload.filter((driver) =>
        state.drivers.every((existingDriver) => existingDriver.id !== driver.id)
      );
      const orderedFilteredDriversSearch = sortDrivers(
        filteredDriversSearch,
        state.selectedOrder,
        state.selectedDirection
      );
      const newDrivers = [
        ...orderedFilteredDriversSearch.filter(
          (driver) =>
            !state.drivers.some(
              (existingDriver) => existingDriver.id === driver.id
            )
        ),
        ...state.drivers,
      ];
      const mergedDrivers = mergeDriversWithFilter(
        state.filteredDrivers,
        newDrivers,
        state.selectedOrder,
        state.selectedDirection
      );
      return {
        ...state,
        drivers: newDrivers,
        filteredDrivers: mergedDrivers,
        origin: "all",
      };

    case FETCH_DRIVERS:
      return {
        ...state,
        drivers: action.payload,
        filteredDrivers: action.payload,
        loading: false,
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
      const sortedDriversByName = sortDrivers(
        state.filteredDrivers,
        "name",
        action.payload
      );
      return {
        ...state,
        selectedOrder: "name",
        selectedDirection: action.payload,
        filteredDrivers: sortedDriversByName, // Actualiza los conductores filtrados
      };

    case ORDER_DOB:
      const sortedDriversByDob = sortDrivers(
        state.filteredDrivers,
        "dob",
        action.payload
      );
      return {
        ...state,
        selectedOrder: "dob",
        selectedDirection: action.payload,
        filteredDrivers: sortedDriversByDob, // Actualiza los conductores filtrados
      };

    case FILTER:
      const { teams, origin } = action.payload;
      let filteredDrivers;

      if (teams !== "all") {
        filteredDrivers = state.drivers.filter(
          (driver) => driver && driver.teams && driver.teams.includes(teams)
        );
      } else {
        filteredDrivers = state.drivers;
      }

      if (origin === "API") {
        console.log("Filtrando por origen API");
        filteredDrivers = filteredDrivers.filter(
          (driver) => driver && driver.driverRef
        );
      } else if (origin === "DB") {
        console.log("Filtrando por origen DB");
        filteredDrivers = filteredDrivers.filter(
          (driver) => driver && !driver.driverRef
        );
      }

      filteredDrivers = sortDrivers(
        filteredDrivers,
        state.selectedOrder,
        state.selectedDirection
      );

      return {
        ...state,
        filteredDrivers: filteredDrivers,
      };

    default:
      return state;
  }
};

export default reducer;
