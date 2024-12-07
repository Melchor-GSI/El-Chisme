"use client";

import { ReactNode, useReducer } from "react";
import { initialState, LocationContext } from "./context";
import { reducer } from "./reducer";

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <LocationContext.Provider value={{ state, dispatch }}>
      {children}
    </LocationContext.Provider>
  );
};
