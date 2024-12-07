import { GetProductDto } from "./product";

export type Location = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string | null;
  store: {
    id: number;
    name: string;
    lat: number;
    long: number;
    opening_hours: string;
    contact_information: string;
  };
};

export type State = {
  locations: Location[];
};

// Define action types
export type Action = { type: "SET_LOCATIONS"; payload: GetProductDto[] };
