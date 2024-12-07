import { Action, State } from "@/types/types";

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_LOCATIONS":
      return {
        ...state,
        locations: action.payload,
      };
    default:
      return state;
  }
};
