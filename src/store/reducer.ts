import { Action, State } from "@/types/types";

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_LOCATIONS":
      return {
        ...state,
        locations: action.payload,
      };
    case "SET_SELECTED_LOCATION":
      return {
        ...state,
        selectedLocation: action.payload,
      };
    case "SET_LOCATING":
      return {
        ...state,
        locating: action.payload,
      };
    case "SET_LOCATING_COORDS":
      return {
        ...state,
        locatingCoords: action.payload,
      };
    default:
      return state;
  }
};
