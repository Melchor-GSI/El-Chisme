import { Location } from "./location";
import { GetProductDto } from "./product";

export type State = {
  locating: boolean;
  locatingCoords: Location | null;
  selectedLocation: GetProductDto | null;
  locations: GetProductDto[];
};

// Define action types
export type Action =
  | { type: "SET_LOCATIONS"; payload: GetProductDto[] }
  | { type: "SET_SELECTED_LOCATION"; payload: GetProductDto | null }
  | { type: "SET_LOCATING_COORDS"; payload: Location | null }
  | { type: "SET_LOCATING"; payload: boolean };
