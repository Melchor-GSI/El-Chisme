"use client";

import { Action, State } from "@/types/types";
import { createContext } from "react";

export const initialState: State = {
  locations: [],
};

export const LocationContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => undefined });